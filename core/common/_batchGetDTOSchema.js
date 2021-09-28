'use strict'
const boxGetSchema = require('../services/api/v1/boxes/_boxGetSchema.buyers')
const batchDtoSchema = {
  type: 'object',
  required: ['batch', 'boxes'],
  properties: {
    batch: {
      type: 'object', properties: {
        deliveryMethod: {type: 'number'},
        warehouse: {type: 'number'},
        scheduledDispatchDate: {type: 'string'}
      }
    },
    boxes: {type: 'array', description:'Массив коробок.',items: boxGetSchema}
  }
}

module.exports = batchDtoSchema
