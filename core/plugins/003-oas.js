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
    fastify.register(require('fastify-swagger'), {
      routePrefix: '/documentation',
      swagger: {
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.1.0'
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [],
        definitions: {
          User: {
            $id: 'User',
            type: 'object',
            required: ['id', 'email'],
            properties: {
              id: {type: 'string', format: 'uuid'},
              firstName: {type: 'string'},
              lastName: {type: 'string'},
              email: {type: 'string', format: 'email'}
            }
          }
        },
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      },
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next()
        },
        preHandler: function (request, reply, next) {
          next()
        }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      exposeRoute: true,
      // refResolver: {
      //   buildLocalReference(json, baseUri, fragment, i) {
      //     return json.$id || `my-fragment-${i}`
      //   }
      // }
    })

    // Регистрация плагина fastify-oas

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
        await fastify.swagger()
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
