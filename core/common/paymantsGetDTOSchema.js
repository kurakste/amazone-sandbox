'use strict'

const userSchema = {
  type: 'object',
  nullable: true,
  required: ['name', 'email'],
  properties: {
    name: {type: 'string', description: 'Имя пользователя.'},
    email: {type: 'string', format: 'email', description: 'email'},
  }

}
const paymentsGetDtoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    _id: {type: 'string', description: 'GUID платежа'},
    createdDate: {type: 'string', format: 'date-time', description: 'Дата создания.'},
    createdBy: userSchema,
    productId: {type: 'string', description: 'GUID продукта.'},
    recipient: userSchema,
    sum: {type: 'number', description: 'Начисленная сумма выплаты. Равна рейту сотрудника в момент начисления.'},
    comment: {type:'string', description:'комментарий'}
  }
}
module.exports = paymentsGetDtoSchema
