/**
 * @jest-environment node
 */

const {fastify} = require('../../../../app')
const getRnd = () => [...Array(6)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
const timOutDelay = 66500
const testConfig = require('../../../../http-client.env.json')

describe('/flow', () => {
  const rnd = getRnd()


  afterAll(async () => {
    await fastify['dbInstance'].close()
    await fastify.close()
  })
})
