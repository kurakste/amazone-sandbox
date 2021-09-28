'use strict'

/*
 * Генерация документации OpenAPI
 * https://swagger.io/docs/specification/about
 */

const fp = require('fastify-plugin')

// Генерация ошибок плагина
// https://github.com/fastify/fastify-error
const createError = require('fastify-error')
const ErrorOpenAPI = createError('FST_OAS_ERROR', '%s', 500)

const fastifyOpenAPI = async function (fastify) {
  // Обработка функционала плагина
  try {
    // Регистрация плагина fastify-oas
    // https://gitlab.com/m03geek/fastify-oas
    fastify.register(require('fastify-oas'), {
      exposeRoute: fastify.config.debug || fastify.config.custom.oas.expose,
      addModels: true,
      openapi:'3.0.0',
      hideUntagged: true,
      routePrefix: '/documentation',
      swagger: {
        info: {
          title: fastify.config.app.name,
          version: fastify.config.app.release
        },
        securityDefinitions: {
          AccessTokenBearer: {
            type: 'apiKey',
            description:
              'Токен доступа передается в заголовке `Authorization` с префиксом `Bearer`\n' +
              'Пример заголовка: `Authorization: Bearer <access-token>`\n' +
              '**В режиме тестирования можно использовать значения заголовка: `Bearer -=test_token=-:607efd96be91830c8f7fb700`**',
            name: 'Authorization',
            in: 'header'
          }
        },
        servers: [],
        consumes: ['application/json'],
        produces: ['application/json'],
        components: {securitySchemes: {}}
      }
    })

    // Basic авторизация для доступа к документации
    fastify.addHook('preValidation', async (req, reply) => {
      if (!fastify.config.debug && fastify.config.custom.oas.expose && req.raw['url'].includes('/documentation')) {
        const token = Buffer.from(`${fastify.config.custom.oas.user}:${fastify.config.custom.oas.password}`)
        if (req.headers.authorization !== `Basic ${token.toString('base64')}`) {
          reply.header('WWW-Authenticate', 'Basic')
          throw fastify.httpErrors.unauthorized()
        }
      }
      return true
    })

    // Настройка заголовков безопасности
    fastify.addHook('onSend', async (req, reply, payload) => {
      if (req.raw['url'].includes('/documentation'))
        reply.header(`Content-Security-Policy`, `worker-src 'self' blob: ;`)
      return payload
    })

    // Формирование документации
    fastify.addHook('onReady', async function () {
      if (fastify.config.debug || fastify.config.custom.oas.expose) {
        await fastify.oas()
        fastify.log.info('oas: generated OpenAPI documentation successfully')
      }
    })
  } catch (e) {
    throw new ErrorOpenAPI(e.message)
  }
}

module.exports = fp(fastifyOpenAPI, {
  fastify: '>=3.4.1',
  name: 'svs-fastify-open-api'
})

module.exports.autoload = true
