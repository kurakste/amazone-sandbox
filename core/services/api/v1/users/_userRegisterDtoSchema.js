const userDtoSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: {type: 'string', description: 'Имя пользователя.'},
    email: {type: 'string',format: 'email', description: 'email'},
    password: {type: 'string', description: 'Пароль'}
  }
}

module.exports = userDtoSchema
