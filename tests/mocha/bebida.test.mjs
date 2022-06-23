import Bebida from '../src/classes/Bebida.mjs'
import { expect, request } from './setup.mjs'

let bebidaId
const endpoint = '/api/v1/bebida'

describe('/api/v1/bebida endpoint tests', function () {
  it('should save a new bebida', done => {
    request()
      .post(endpoint)
      .send(new Bebida('Sprite', 7.00, null, 350, false))
      .end((err, res) => {
        if (err) {
          done()
        }
        bebidaId = res.body.id
        expect(res).to.have.status(201)
        done()
      })
  })

  it('should edit a existent bebida', done => {
    request()
      .put(`${endpoint}/${bebidaId}`)
      .send(new Bebida('Sprite', 11.00, null, 1000, false))
      .end((err, res) => {
        if (err) {
          done()
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  it('should find a existent bebida', done => {
    request()
      .get(`${endpoint}/${bebidaId}`)
      .send()
      .end((err, res) => {
        if (err) {
          done()
        }
        expect(res).to.have.status(200)
        done()
      })
  }).timeout(5000)

  it('should delete a existent bebida', done => {
    request()
      .delete(`${endpoint}/${bebidaId}`)
      .send()
      .end((err, res) => {
        if (err) {
          done()
        }
        expect(res).to.have.status(200)
        done()
      })
  }).timeout(10000)
})