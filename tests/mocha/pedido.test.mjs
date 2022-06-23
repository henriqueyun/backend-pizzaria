import Pedido from '../src/classes/Pedido.mjs'
// todo, usar classe de cliente dentro da instancia de pedido
// import Cliente from '../src/classes/Cliente.mjs'
import { expect, request } from './setup.mjs'

const endpoint = '/api/v1/pedido'

describe(`${endpoint} endpoint tests`, function () {
  it('should save a new order', done => {
    request()
      .post(endpoint)
      .send(new Pedido(
          'Nilo Peçanha',
          'Rua do Bobo, número 0',
          'nilo@zeze.com',
          {
            pizzas: [
              {
                pizzaId: 1,
                qtd: 1
              }
            ]
          },
        'debito',
        '',
        'Sem picles'
      ))
      .end((err, res) => {
        if (err) {
          done()
        }
        expect(res).to.have.status(201)
        done()
      })
  }).timeout(10000)
})