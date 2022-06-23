const { app, supertest } = require('./00_setup')

const Cliente = require('../../src/classes/Cliente')
const Produto = require('../../src/classes/Produto')
const Pedido = require('../../src/classes/Pedido')
const ItemPedido = require('../../src/classes/ItemPedido')

let apiPath = '/api/v1'
let endpointPedido = `${apiPath}/pedido`
let endpointProduto = `${apiPath}/produto`
let idPedido = 0

const cliente = new Cliente({
  nome: 'Robert Oppenheimer',
  endereco: 'Praça da Luz, 2, Centro 01120-010',
  telefone: '(11) 91234-5678'
})

const pizzaCalabresa = new Produto({
  nome: 'Cacalabresa',
  preco: 34,
  tipo: 'pizza',
  imgURL: null,
  ingredientes: 'Linguiça calabresa fatiada, cebola, molho de tomate e orégano'
})

const sprite = new Produto({
  nome: 'Sprite 2L',
  preco: 11,
  tipo: 'bebida',
  imgURL: null,
  alcoolica: false,
  volume: 2000
})

const pedido = new Pedido({
  cliente,
  formaPagamento: 'dinheiro',
  status: 'entrada',
  observacao: 'Agradeceria se mandassem copinhos descartáveis :)'
})

describe('CRUD pedido', () => {
  it('Deve primeiro cadastrar produtos para o pedido', async () => {
    const novaBebida = await supertest(app)
      .post(endpointProduto)
      .send(sprite)
      .expect(201)

    const novaPizza = await supertest(app)
      .post(endpointProduto)
      .send(pizzaCalabresa)
      .expect(201)

    const pizzaItemPedido = new ItemPedido({
      produto: novaPizza.body,
      qtd: 2,
    })
    
    const bebidaItemPedido = new ItemPedido({
      produto: novaBebida.body,
      qtd: 1,
    })

    pedido.itensPedido = [bebidaItemPedido, pizzaItemPedido]
})

  it('Deve cadastrar um pedido', async () => {
    const novoPedido = await supertest(app)
      .post(endpointPedido)
      .send(pedido)
      .expect(201)

    idPedido = novoPedido.body.id
  })

  it('Deve buscar um pedido', async () => {
    await supertest(app)
      .get(`${endpointPedido}/${idPedido}`)
      .expect(200)
  })

  it('Deve atualizar o status de um pedido', async () => {
    await supertest(app)
      .patch(`${endpointPedido}/${idPedido}`)
      .send({status: 'em preparo'})
      .expect(200)
  })

  it('Deve buscar todos os pedidos', async () => {
    const pedidosBuscados = await supertest(app)
      .get(`${endpointPedido}/all`)
      .expect(200)
    expect(pedidosBuscados.length)
  })
})