const { app, supertest } = require('./00_setup')

const Produto = require('../../src/classes/Produto')

let endpointProduto = '/api/v1/produto'
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
      .post(endpointProduto)
      .send(bebida)
      .expect(201)

    const novaPizza = await supertest(app)
      .post(endpointProduto)
      .send(pizza)
      .expect(201)
    idPizza = novaPizza.body.id
  })

  it('Deve buscar um produto', async () => {
    const pizzaBuscada = await supertest(app)
      .get(`${endpointProduto}/${idPizza}`)
      .expect(200)
    expect(pizzaBuscada.body.nome).toBe(pizza.nome)
    expect(pizzaBuscada.body.preco).toBe(pizza.preco)
    expect(pizzaBuscada.body.tipo).toBe(pizza.tipo)
    expect(pizzaBuscada.body.imgURL).toBe(pizza.imgURL)
    expect(pizzaBuscada.body.ingredientes).toBe(pizza.ingredientes)
  })

  it('Deve buscar diferentes produtos', async () => {
    const produtosEncontrados = await supertest(app)
      .get(`${endpointProduto}/all`)
      .expect(200)
    expect(produtosEncontrados.body.length).toBeGreaterThanOrEqual(2)
  })

  it('Deve editar um produto', async () => {
    pizza.nome = 'Nomuçarela'
    pizza.preco = 45
    const pizzaEditada = await supertest(app)
      .put(`${endpointProduto}/${idPizza}`)
      .send(pizza)
      .expect(200)
    expect(pizzaEditada.body.nome).toBe('Nomuçarela')
    expect(pizzaEditada.body.preco).toBe(45)
  })

  it('Deve excluir um produto', async () => {
    await supertest(app)
      .delete(`${endpointProduto}/${idPizza}`)
      .expect(200)
  })
})