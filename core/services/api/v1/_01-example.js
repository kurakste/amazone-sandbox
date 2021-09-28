'use strict'

/*
 * Пример сервиса
 *
 * Если есть информация которая позволит лучше понять для чего этот сервис
 * ее можно описать тут, например рассказать как тут все плохо и как не надо делать
 *
 * Функционал сервиса:
 *  - запрос курса валют
 *  - вызов процедуры в БД
 *
 */

const https = require('https')
const fetch = require('node-fetch')
const AbortController = require('abort-controller')
const urlcat = require('urlcat').default

module.exports = async function (fastify) {
  /**
   * Генерация параметров fetch запроса
   *
   * @return {array} instance параметры и контроллер
   */
  const getInstanceFR = () => {
    const controller = new AbortController()
    const instance = {
      redirect: 'error',
      signal: controller.signal,
      compress: true,
      size: 0,
      agent: new https.Agent({
        rejectUnauthorized: false,
        keepAlive: true
      })
    }
    return [instance, controller]
  }

  // Регистрация URL
  fastify.route({
    method: 'GET',
    url: '/example',
    schema: {
      tags: ['Пример сервиса'],
      summary: 'Курс валют',
      description: 'Актуальный курс валют **ЦБР**',
      headers: {$ref: 'defaultHeaders#'},
      response: {
        200: {
          type: 'object',
          additionalProperties: true,
          example: {
            Date: '2020-11-10T11:30:00+03:00',
            PreviousDate: '2020-11-07T11:30:00+03:00',
            PreviousURL: '//www.cbr-xml-daily.ru/archive/2020/11/07/daily_json.js',
            Timestamp: '2020-11-09T23:00:00+03:00',
            Valute: {
              USD: {
                ID: 'R01235',
                NumCode: '840',
                CharCode: 'USD',
                Nominal: 1,
                Name: 'Доллар США',
                Value: 76.9515,
                Previous: 77.1875
              },
              EUR: {
                ID: 'R01239',
                NumCode: '978',
                CharCode: 'EUR',
                Nominal: 1,
                Name: 'Евро',
                Value: 91.4953,
                Previous: 91.3514
              }
            }
          }
        },
        400: {$ref: 'badRequestError#'},
        422: {$ref: 'pluginOracleDBError#'},
        500: {$ref: 'internalServerError#'}
      }
    },
    handler: async (req) => {
      // Пример запроса в БД

      // Пример вывода информации в консоль
      req.log.debug('example debug message', 'DB')

      // Параметры для экземпляра fetch
      const [paramsFR, controller] = getInstanceFR()

      // Отмена запроса "ЦБР" при разрыве соединения
      req.raw.on('close', () => controller.abort())

      // Запрос в "ЦБР"
      const url = urlcat('https://www.cbr-xml-daily.ru', 'daily_json.js', {gp: 'example'})
      const fr = await fetch(url, Object.assign({method: 'GET'}, paramsFR))

      let data = null
      try {
        data = await fr.json()
      } catch (e) {
        throw fastify.httpErrors.conflict(`Не удалось обработать ответ: ${e.message}`)
      }

      if (fr.status !== 200) throw fastify.httpErrors.conflict(`Не удалось обработать ответ "ЦБР"`)

      return data
    }
  })
}

// Для настройки префиксов используйте
// module.exports.autoPrefix = '/something'
// module.exports.prefixOverride = '/overriddenPrefix'

module.exports.autoload = true
