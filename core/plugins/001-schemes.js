'use strict'

/*
 * Регистрация глобальных JSON схем
 */

const fp = require('fastify-plugin')

// Генерация ошибок плагина
// https://github.com/fastify/fastify-error
const createError = require('fastify-error')
const ErrorSchemes = createError('FST_SCHEMES_ERROR', '%s', 500)

const fastifySchemes = async function (fastify, options) {
  // Обработка функционала плагина
  try {
    options.schemes.forEach((schema) => {
      fastify.addSchema(schema)
    })
  } catch (e) {
    throw new ErrorSchemes(e.message)
  }
}

module.exports = fp(fastifySchemes, {
  fastify: '>=3.4.1',
  name: 'svs-fastify-schemes'
})

const userDtoSchema = require('../common/_userDtoSchema')

module.exports.autoload = true
module.exports.autoConfig = {
  schemes: [
    userDtoSchema,
    {
      $id: 'defaultHeaders',
      type: 'object',
      properties: {
        'Accept-Encoding': {
          type: 'string',
          default: 'gzip, deflate',
          example: 'gzip, deflate'
        }
      }
    },
    {
      $id: 'successBlankResponse',
      description: 'Запрос прошел успешно.',
      type: 'string',
      nullable: true
    },
    {
      $id: 'pasteSuccessfully',
      type: 'object',
      description: 'Данные были успешно добавлены.',
      required: ['statusCode', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 201
        },
        message: {
          type: 'string',
          example: 'Ок'
        },
        guid: {
          type: 'string',
          description: 'GUID созданного объекта'
        }
      }
    },
    {
      $id: 'updatedSuccessfully',
      description: 'Данные были успешно обновлены',
      type: 'object',
      properties: {
        statusCode: {
          type: 'integer',
          example: 203
        },
        code: {
          type: 'string',
          example: 'Ok'
        },
        error: {
          type: 'string',
          nullable: true,
          example: null
        },
        message: {
          type: 'string',
          example: 'Ok'
        }
      }
    },
    {
      $id: 'badRequestError',
      type: 'object',
      description: 'Данные запроса не соответствуют схеме',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 400
        },
        code: {
          type: 'string',
          example: 'FST_VALIDATION'
        },
        error: {
          type: 'string',
          example: 'Bad Request'
        },
        message: {
          type: 'string',
          example: 'Bad Request'
        }
      }
    },
    {
      $id: 'unauthorizedError',
      type: 'object',
      description: 'Не авторизован или не представился.',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 401
        },
        code: {
          type: 'string',
          example: 'FST_VALIDATION'
        },
        error: {
          type: 'string',
          example: 'Unauthorized'
        },
        message: {
          type: 'string',
          example: 'Unauthorized'
        }
      }
    },
    {
      $id: 'forbiddenError',
      type: 'object',
      description: 'Доступ запрещен, клиент отсутствует в БД.',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 403
        },
        code: {
          type: 'string',
          example: 'FST_VALIDATION'
        },
        error: {
          type: 'string',
          example: 'Forbidden'
        },
        message: {
          type: 'string',
          example: 'Forbidden'
        }
      }
    },
    {
      $id: 'notFoundError',
      type: 'object',
      description: 'Запрашиваемый ресурс не найден',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 404
        },
        code: {
          type: 'string',
          example: 'FST_NOT_FOUND'
        },
        error: {
          type: 'string',
          example: 'Not Found'
        },
        message: {
          type: 'string',
          example: 'Not Found'
        }
      }
    },
    {
      $id: 'conflictInTheState',
      type: 'object',
      description: 'Запрос нельзя обработать из-за конфликта в текущем состоянии ресурса.',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 409
        },
        code: {
          type: 'string',
          example: 'FST_CONFLICT'
        },
        error: {
          type: 'string',
          example: 'Conflict'
        },
        message: {
          type: 'string',
          example: 'Conflict'
        }
      }
    },
    {
      $id: 'payloadTooLarge',
      type: 'object',
      description: 'Полезная нагрузка слишком велика',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 413
        },
        code: {
          type: 'string',
          example: 'FST_PAYLOAD_TOO_LARGE'
        },
        error: {
          type: 'string',
          example: 'Payload Too Large'
        },
        message: {
          type: 'string',
          example: 'Request Entity Too Large'
        }
      }
    },
    {
      $id: 'internalServerError',
      type: 'object',
      description: 'Внутренняя ошибка сервера',
      required: ['statusCode', 'error', 'message'],
      properties: {
        statusCode: {
          type: 'integer',
          example: 500
        },
        code: {
          type: 'string',
          example: 'FST_ERR_SERVER'
        },
        error: {
          type: 'string',
          example: 'Internal Server Error'
        },
        message: {
          type: 'string',
          example: 'Internal Server Error'
        }
      }
    }
  ]
}
