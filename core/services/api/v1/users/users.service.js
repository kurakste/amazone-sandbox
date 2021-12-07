'use strict'
const bearer = [{AccessTokenBearer: []}]

const tag = ['User']
module.exports = async function (fastify) {

  // GET /users/:id
  // noinspection JSCheckFunctionSignatures
  fastify.route({
    method: 'GET',
    url: '/info',
    schema: {
      tags: tag,
      summary: 'Получить информацию от текущем пользователе.',
      description:
        '## Получить информацию от текущем пользователе. \n\n',
      produces: ['text/html'],
      // security: bearer,
      // headers: {$ref: 'defaultHeaders#'},
      response: {
        // 200: {type: 'string', example: 'ok'}
        // 200: {$ref: 'def-0#'},
        // 400: {$ref: 'badRequestError#'},
        // 404: {$ref: 'notFoundError#'},
        // 500: {$ref: 'internalServerError#'}
      }
    },
    // noinspection JSCheckFunctionSignatures
    handler: async (req, resp) => {
      return resp.status(200).send({
        _id: 'guid-guid-guid',
        name: 'Сусанин Иван',
        email: 'susanin@yandex.sru',
        role: 20,
        fba: false,
        active: true,
        rate: 200,
        balance: 3000
      })
    }
  })

}

module.exports.autoload = true
