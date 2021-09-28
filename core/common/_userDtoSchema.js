const roleDescription = 'Код роли присвоенный пользователю. \n\n' + `
roles.root = 0 \n\n
roles.client = 10 \n\n
roles.super = 20 \n\n
roles.researcher = 30 \n\n
roles.buyer = 40 \n\n
roles.candidate = 50 \n\n
`
const userDtoSchema = {
  $id: 'userSchema',
  type: 'object',
  description:'Пользователь системы',
  required: ['name', 'email', '_id', 'role', 'fba', 'active', 'rate'],
  properties: {
    _id: {type: 'string', description: 'GUID пользователя в БД.', example: '607dceac3551e3fa7e7fbb69'},
    name: {type: 'string', description: 'Имя пользователя.', example: 'Petia'},
    email: {type: 'string', format: 'email', description: 'email', example: 'petia@gmail.com'},
    role: {type: 'number', description: roleDescription, example: 5},
    fba: {type: 'boolean', description: 'Флаг fba.', example: false},
    active: {
      type: 'boolean',
      description: 'Если истина - пользователь активен. Если нет - заблокирован админом.',
      example: true
    },
    rate: {type: 'number', description: 'Ставка, по который оплачивается сотрудник.', example: 1500},
    balance: {type: 'number', description: 'Баланс пользователя.', example: 1500}
  }
}

module.exports = userDtoSchema
