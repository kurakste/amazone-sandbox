'use strict'

const paymentsPostDtoSchema = {
  type: 'object',
  additionalProperties: false,
  required:['sum', 'recipientId', 'comment'],
  properties: {
    productId: {type: 'string', description: 'GUID продукта.'},
    recipientId: {type: 'string', description: 'GUID пользователя.'},
    sum: {type: 'number', description: 'Начисленная сумма выплаты. Может быть отрицательной.'},
    comment: {type:'string', description:'комментарий'}
  }
}
module.exports = paymentsPostDtoSchema
