const app = require('../app')
const supertest = require('supertest')
const Produto = require('../classes/Produto')

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

const pizzaInvalida = new Produto({
	nome: 'Cacamarão',
	tipo: 'pizza',
	imgURL: null,
	ingredientes: 'Ca-camarão, queijo e orégano'
})

describe('CRUD produto', () => {
	it('Deve cadastrar um produto', async () => {
		const novaBebida = await supertest(app)
			.post(endpointProduto)
			.send(bebida)
			.expect(201)

		const novaPizza = await supertest(app)
			.post(endpointProduto)
			.send(pizza)

		expect(novaPizza.body).toEqual({
			...pizza,
			id: expect.any(Number),
			createdAt: expect.any(String),
			updatedAt: expect.any(String)
		})
		expect(novaBebida.body).toEqual({
			...bebida,
			id: expect.any(Number),
			createdAt: expect.any(String),
			updatedAt: expect.any(String)
		})
		expect(novaBebida.status).toBe(201)
		expect(novaPizza.status).toBe(201)
		idPizza = novaPizza.body.id
	})

	it('Deve buscar um produto', async () => {
		const pizzaBuscada = await supertest(app)
			.get(`${endpointProduto}/${idPizza}`)

		expect(pizzaBuscada.body).toEqual({
			...pizza,
			id: expect.any(Number),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			volume: 0,
			alcoolica: false
		})
		expect(pizzaBuscada.status).toBe(200)
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
		const pizzaResponse = await supertest(app)
			.delete(`${endpointProduto}/${idPizza}`)
			.expect(200)
		expect(pizzaResponse.body).toBeGreaterThanOrEqual(0)
	})

	it('Deve dar erro ao cadastrar um produto por falta de parâmetros obrigatórios', async () => {
		const pizzaResponseInvalida = await supertest(app)
			.post(endpointProduto)
			.send(pizzaInvalida)
		expect(pizzaResponseInvalida.status).toBe(400)
		expect(pizzaResponseInvalida.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao cadastrar um produto por conta de parâmetros inválidos', async () => {
		pizzaInvalida.preco = '-13'
		const pizzaResponseInvalida = await supertest(app)
			.post(endpointProduto)
			.send(pizzaInvalida)
			.expect(400)
		expect(pizzaResponseInvalida.status).toBe(400)
		expect(pizzaResponseInvalida.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao editar um produto por falta de informações', async () => {
		const produtoInfoInvalida = await supertest(app)
			.put(`${endpointProduto}/${idPizza}`)
		expect(produtoInfoInvalida.status).toBe(400)
		expect(produtoInfoInvalida.body).toHaveProperty('erros')
	})


	it('Deve dar erro ao editar um produto por informar código não existente', async () => {
		pizza.nome = 'Invaliduçarela'
		pizza.preco = 99
		const pizzaResponseInvalida = await supertest(app)
			.put(`${endpointProduto}/9999`)
			.send(pizza)
		expect(pizzaResponseInvalida.status).toBe(404)
	})

	it('Deve dar erro ao editar um produto por passar novos dados do produto inválido', async () => {
		pizza.nome = ''
		pizza.preco = 0
		const pizzaResponseInvalida = await supertest(app)
			.put(`${endpointProduto}/9999`)
			.send(pizza)
		expect(pizzaResponseInvalida.status).toBe(400)
		expect(pizzaResponseInvalida.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao excluir um produto com código não existente', async () => {
		const pizzaResponseInvalida = await supertest(app)
			.delete(`${endpointProduto}/9999`)
		expect(pizzaResponseInvalida.status).toBe(404)
	})

	it('Deve dar erro ao buscar um produto por informar código não existente', async () => {
		const pizzaResponseInvalida = await supertest(app)
			.get(`${endpointProduto}/9999`)
		expect(pizzaResponseInvalida.status).toBe(404)
	})

	it('Deve dar erro ao excluir um produto com código negativo', async () => {
		const pizzaResponseInvalida = await supertest(app)
			.delete(`${endpointProduto}/-1`)
		expect(pizzaResponseInvalida.status).toBe(400)
		expect(pizzaResponseInvalida.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao buscar um produto por informar código negativo', async () => {
		const pizzaResponseInvalida = await supertest(app)
			.get(`${endpointProduto}/-1`)
		expect(pizzaResponseInvalida.status).toBe(400)
		expect(pizzaResponseInvalida.body).toHaveProperty('erros')
	})
})