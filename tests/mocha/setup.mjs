import 'dotenv/config'
import app from '../src/app.js'
import chai from 'chai'
import chai_http from 'chai-http'
export const expect = chai.expect
chai.use(chai_http)

export const request = () => {
    return chai.request(app)
}