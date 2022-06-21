const supertest = require('supertest')
const app = require('../index')
const Produto = require('../classes/Produto')

let idPizza = 0
const pizza = new Produto({
  nome: 'Mumuçarela',
  preco: 34.50,
  tipo: 'pizza',
  imgURL: null,
  ingredientes: 'Que-queijo, azeitonas, tomates e orégano'
})

const bebida = new Produto({
  nome: 'Coca-cola 2L',
  preco: 12,
  tipo: 'bebida',
  imgURL: null,
  alcoolica: false,
  volume: 2000
})

describe('CRUD produto', () => {

  it('Deve cadastrar um produto', async () => {
    await supertest(app)
      .post('/api/v1/produto')
      .send(bebida)
      .expect(201)

    const responsePizza = await supertest(app)
      .post('/api/v1/produto')
      .send(pizza)
      .expect(201)
    idPizza = responsePizza.body.id
  })

  it('Deve buscar um produto', async () => {
    const pizzaEncontrada = await supertest(app)
      .get(`/api/v1/produto/${idPizza}`)
      .expect(200)
    expect(pizzaEncontrada.body.nome).toBe(pizza.nome)
    expect(pizzaEncontrada.body.preco).toBe(pizza.preco)
    expect(pizzaEncontrada.body.tipo).toBe(pizza.tipo)
    expect(pizzaEncontrada.body.imgURL).toBe(pizza.imgURL)
    expect(pizzaEncontrada.body.ingredientes).toBe(pizza.ingredientes)
  })

  it('Deve buscar diferentes produtos', async () => {
    const produtosEncontrados = await supertest(app)
      .get(`/api/v1/produto/all`)
      .expect(200)
    expect(produtosEncontrados.body.length).toBeGreaterThanOrEqual(2)
  })

  it('Deve editar um produto', async () => {
    pizza.nome = 'Nomuçarela'
    pizza.preco = 45
    const pizzaEditada = await supertest(app)
      .put(`/api/v1/produto/${idPizza}`)
      .send(pizza)
      .expect(200)
    expect(pizzaEditada.body.nome).toBe('Nomuçarela')
    expect(pizzaEditada.body.preco).toBe(45)
  })

  it('Deve excluir um produto', async () => {
    await supertest(app)
      .delete(`/api/v1/produto/${idPizza}`)
      .expect(200)
  })
})