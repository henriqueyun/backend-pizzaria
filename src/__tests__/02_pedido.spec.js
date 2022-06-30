const app = require('../app')
const supertest = require('supertest')

const Cliente = require('../classes/Cliente')
const Produto = require('../classes/Produto')
const Pedido = require('../classes/Pedido')
const ItemPedido = require('../classes/ItemPedido')

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

const pedidoInvalido = new Pedido({
	cliente,
	formaPagamento: 'debito',
	status: 'entrada',
	observacao: '2x pizzas muçarela'
})

const produtoNaoCadastrado = new ItemPedido({
	nome: 'Galão de Água 20L',
	preco: 35,
	tipo: 'bebida',
	imgURL: null,
	alcoolica: false,
	volume: 20000
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
			.send({
				status: 'em preparo'
			})
			.expect(200)
	})

	it('Deve buscar todos os pedidos', async () => {
		const pedidosBuscados = await supertest(app)
			.get(`${endpointPedido}/all`)
			.expect(200)
		expect(pedidosBuscados.body.length).toBeGreaterThan(0)
	})

	it('Deve falhar ao atualizar o status de um pedido sem passar o novo status', async () => {
		await supertest(app)
			.patch(`${endpointPedido}/${idPedido}`)
			.send({})
			.expect(400)
	})

	it('Deve falhar ao atualizar o status de um pedido caso o codigo informado não seja valido', async () => {
		await supertest(app)
			.patch(`${endpointPedido}/9999`)
			.send({
				status: 'em preparo'
			})
			.expect(404)
	})

	it('Deve falhar ao buscar um pedido com um código que não existe', async () => {
		await supertest(app)
			.get(`${endpointPedido}/9999`)
			.expect(404)
	})

	it('Deve falhar ao buscar um pedido caso o código informado seja um número negativo', async () => {
		await supertest(app)
			.get(`${endpointPedido}/-1`)
			.expect(400)
	})

	it('Deve falhar cadastrar um pedido por não ter item algum', async () => {
		await supertest(app)
			.post(endpointPedido)
			.send(pedidoInvalido)
			.expect(400)
	})

	it.skip('Deve falhar cadastrar um pedido por conta do produto não cadastrado', async () => {
		pedido.itensPedido = produtoNaoCadastrado
		await supertest(app)
			.post(endpointPedido)
			.send(pedido)
			.expect(500)
	})
})