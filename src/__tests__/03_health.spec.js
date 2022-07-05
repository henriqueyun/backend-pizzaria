
const app = require('../app')
const supertest = require('supertest')

let endpointHealthchecker = '/api/v1/health'

jest.useFakeTimers()
describe('Health Checker', () => {
	it('Deve encontrar algo', async () => {
		const healthCheckResponse = await supertest(app)
			.get(endpointHealthchecker)
		expect(healthCheckResponse.status).toBe(200)
		expect(healthCheckResponse.text).toBe('Health Ok')
	})
})