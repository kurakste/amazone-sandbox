/**
 * @jest-environment node
 */

// noinspection DuplicatedCode

const {fastify} = require('../../app')
const testConfig = require('../../http-client.env.json')
const timOutDelay = 66500

const getAsin = () => [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('')

describe('Complex Flow test 1', () => {
 // ============== researcher part ============================================================================

  const testSupplier1 = {
    'name': 'Bond',
    'link': 'www.bond.uk',
    'price': 1000000,
    'delivery': 2,
    'amount': 300,
    'minlot': 30,
    'lotcost': 300,
    'comment': 'Первый поставщик для теста.'
  }
  const testSupplier2 = {
    'name': 'Bond',
    'link': 'www.bond.uk',
    'price': 20000,
    'delivery': 1,
    'amount': 4200,
    'minlot': 330,
    'lotcost': 330,
    'comment': 'Второй поставщик для теста.'
  }

  let supplierGuidAfterPost1 = null
  it('01. ### POST /suppliers 1', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenBuyer
      },
      url: '/api/v1/suppliers',
      body: testSupplier1
    })

    expect(response.statusCode).toEqual(201)
    const data = JSON.parse(response.body)
    supplierGuidAfterPost1 = data.guid
    done()
  }, timOutDelay)

  let supplierGuidAfterPost2 = null
  it('02. ### POST /suppliers 2', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenBuyer
      },
      url: '/api/v1/suppliers',
      body: testSupplier2
    })

    expect(response.statusCode).toEqual(201)
    const data = JSON.parse(response.body)
    supplierGuidAfterPost2 = data.guid
    done()
  }, timOutDelay)

  let guidProductAfterPost
  it('03. ### POST /researchers/products', async done => {

    const asin1 = getAsin()
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenResearcher1
      },
      url: '/api/v1/researchers/products',
      body: {
        'id': asin1,
        'lamazon': 'www.hh.ru',
        'lsupplier': 'старая ссылка на поставщика',
        'currentSupplierId': supplierGuidAfterPost1,
        'category':'категория фруктов',
        'bsr': 1.23,
        'status':0,
        'amazon': 2341234,
        'suppliersIds': [supplierGuidAfterPost1, supplierGuidAfterPost2],
        'fbafee': 0.23,
        'delivery': 3000,
        'icomment': 'Просто комент.',
        'images': ['string 1', 'string 2'],
        'byboxprice': 42.2,
        'strategyStatus':1
      }
    })

    expect(response.statusCode).toEqual(201)
    const data = JSON.parse(response.body)
    guidProductAfterPost = data.guid
    await done()
  }, timOutDelay)


  it('04. ### PATCH /researchers/products', async done => {
    const response = await fastify.inject({
      method: 'PATCH',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenResearcher1
      },
      url: `/api/v1/researchers/products/${guidProductAfterPost}`,
      body: {
        'lamazon': 'xxxx_www.rbc.ru',
        'currentSupplierId': supplierGuidAfterPost2,
        'bsr': 72,
        'amazon': 72341234,
        'fbafee': 7.23,
        'delivery': 73000,
        'icomment': '_xxxПросто комент.',
        'fba': true,
        'profit': 999,
        'margin': 66
      }
    })
    expect(response.statusCode).toEqual(204)
    await done()
  }, timOutDelay)

  // ============== supervisor part ============================================================================

  it('05. ### GET /supervisors/products/vac', async done => {
    const response = await fastify.inject({
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      url: `/api/v1/supervisors/products/vac`
    })

    expect(response.statusCode).toEqual(200)
    const data = JSON.parse(response.body)
    expect(data.length).toBeGreaterThan(0)
    await done()
  }, timOutDelay)

  it('06. ### POST /supervisors/products/pickup/:guid', async done => {
    const response = await fastify.inject({
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      url: `/api/v1/supervisors/products/pickup/${guidProductAfterPost}`
    })

    expect(response.statusCode).toEqual(204)
    await done()
  }, timOutDelay)

  it(`07. ### GET /supervisors/products/my`, async done => {
    const response = await fastify.inject({
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      url: `/api/v1/supervisors/products/my`
    })

    expect(response.statusCode).toEqual(200)
    await done()
  }, timOutDelay)

  it(`08. ### PATCH /supervisors/products/my`, async done => {
    const response = await fastify.inject({
      method: 'PATCH',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      body: {
        status: 70,
        checkednotes: 'Автотест. Проверка продукта супервайзером.'
      },
      url: `/api/v1/supervisors/products/${guidProductAfterPost }`
    })

    expect(response.statusCode).toEqual(204)
    await done()
  }, timOutDelay)


  it(`09. ### GET /supervisors/payments/my`, async done => {
    const response = await fastify.inject({
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      url: `/api/v1/supervisors/payments/my`
    })

    expect(response.statusCode ===200||response.statusCode===404).toEqual(true)
    await done()
  }, timOutDelay)


  it(`10 ### GET /supervisors/payments/created_by_this_super`, async done => {
    const response = await fastify.inject({
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenSuper
      },
      url: `/api/v1/supervisors/payments/created_by_this_super`
    })

    expect(response.statusCode ===200||response.statusCode===404).toEqual(true)
    await done()
  }, timOutDelay)

  // -------------------------------------------------------------------------------------

  it('97. ### DELETE /researchers/products/:guid', async done => {
    const response = await fastify.inject({
      method: 'DELETE',
      headers: {
        ContentType: 'application/json',
        Authorization: testConfig.localhost.tokenResearcher1
      },
      url: `/api/v1/researchers/products/${guidProductAfterPost}`
    })
    expect(response.statusCode).toEqual(204)
    await done()
  }, timOutDelay)

  it('98. ### DELETE /suppliers 1 ', async done => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/v1/suppliers/${supplierGuidAfterPost1}`,
      headers: {
        Authorization: testConfig.localhost.tokenBuyer
      }
    })

    expect(response.statusCode).toEqual(204)
    done()
  }, timOutDelay)

  it('99. ### delete /suppliers 2', async done => {
    const response = await fastify.inject({
      method: 'delete',
      url: `/api/v1/suppliers/${supplierGuidAfterPost2}`,
      headers: {
        authorization: testConfig.localhost.tokenBuyer
      }
    })

    expect(response.statusCode).toEqual(204)
    done()
  }, timOutDelay)


  afterAll(async () => {
    await fastify['dbInstance'].close()
    await fastify.close()
  })

})
