const roleDescription = 'Код роли присвоенный пользователю. \n\n' + `
roles.root = 0 \n\n
roles.director = 1 \n\n
roles.super = 2 \n\n
roles.researcher = 3 \n\n
roles.buyer = 4 \n\n
roles.candidate = 5 \n\n
`


const userDtoSchema = {
  type: 'object',
  required: ['name', 'email', '_id', 'role', 'fba', 'active', 'rate'],
  additionalProperties: false,
  nullable: true,
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
    balance: {type: 'number', description: 'Баланс пользователя', example: 1500},
    balanceFreeze: {type: 'number', description: 'Замороженная при оплате ордера сумма.'}
  }
}
module.exports = userDtoSchema
