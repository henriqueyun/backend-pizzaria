const app = require('../app')
const supertest = require('supertest')

let endpointHealthchecker = `/api/v1/health`

describe('Health Checker', () => {
  it('Deve encontrar algo', async () => {
    await supertest(app)
      .get(endpointHealthchecker)
      .expect(200)
  })
})