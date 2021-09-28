/**
 * @jest-environment node
 */

const {fastify} = require('../../../../../app')
const getRnd = () => [...Array(4)].map(i => (~~(Math.random() * 36)).toString(36)).join('')


const timOutDelay = 66500
describe('/users', () => {
  const rnd = getRnd()

  let guidAfterPost =  null
  it('01. ### POST /users GENERAL', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: 'Bearer -=*test_token*=-'
      },
      url: '/api/v1/users',
      body: {
        name: 'PetrI',
        email: `petia.${rnd}@qwerty.com`,
        password:'qwerty'
      }
    })

    expect(response.statusCode).toEqual(201)
    const data = JSON.parse(response.body)
    guidAfterPost = data._id
    await done()
  }, timOutDelay)

  it('02. ### POST /users 400', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: 'Bearer -=*test_token*=-'
      },
      url: '/api/v1/users',
      body: {
        name: 'PetrI',
        email: 'petiaI5@qwerty.com',
        password:'qwerty'
      }
    })

    expect(response.statusCode).toEqual(400)
    await done()
  }, timOutDelay)

  it('03. ### POST /users/sign_in ', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: 'Bearer -=*test_token*=-'
      },
      url: '/api/v1/users/sign_in',
      body: {
        email: 'petiaI5@qwerty.com',
        password:'qwerty'
      }
    })

    expect(response.statusCode).toEqual(201)
    const data = JSON.parse(response.body)
    expect(data.hasOwnProperty('token')).toEqual(true)
    await done()
  }, timOutDelay)

  it('04. ### DELETE /users/:guid ', async done => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/v1/users/${guidAfterPost}`,
      headers: {
        Authorization: 'Bearer -=*test_token*=-'
      },
    })

    expect(response.statusCode).toEqual(204)
    await done()
  }, timOutDelay)

  it('05. ### DELETE /users/:guid ', async done => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/v1/users/${guidAfterPost}`,
      headers: {
        Authorization: 'Bearer -=*test_token*=-'
      },
    })

    expect(response.statusCode).toEqual(404)
    await done()
  }, timOutDelay)
  // -------------------------------------------------------------------------------------

  afterAll(async () => {
    await fastify['dbInstance'].close()
    await fastify.close()
  })
})
