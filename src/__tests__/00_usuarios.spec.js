const app = require('../app')
const supertest = require('supertest')

const Usuario = require('../classes/Usuario')

const endpointUsuario = '/api/v1/usuario'
let idUsuario = 0

const usuario = new Usuario({
	username: 'Zeze',
	password: '12345678',
	fullName: 'Zeze Gumorni',
	role: 'customer service'
})

const usuarioInvalido = new Usuario({
	username: 'Edimilson',
	password: '12345678',
	fullName: 'Edimilson'
})

describe('CRUD usuários', () => {
	it('Deve cadastrar um usuário', async () => {
		const novoUsuario = await supertest(app)
			.post(endpointUsuario)
			.send(usuario)

		expect(novoUsuario.status).toBe(201)
		expect(novoUsuario.body).toEqual({
			...usuario,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			id: expect.any(Number)
		})
		idUsuario = novoUsuario.body.id
	})

	it('Deve editar um usuário', async () => {
		usuario.username = 'Zaza'
		usuario.password = '87654321'
		const usuarioEditado = await supertest(app)
			.put(`${endpointUsuario}/${idUsuario}`)
			.send(usuario)
		expect(usuarioEditado.status).toBe(200)
		expect(usuarioEditado.body.username).toBe('Zaza')
		expect(usuarioEditado.body.password).toBe('87654321')
	})

	it('Deve buscar todos os usuários', async () => {
		const usuariosBuscados = await supertest(app)
			.get(`${endpointUsuario}/all`)
		expect(usuariosBuscados.status).toBe(200)
		expect(usuariosBuscados.body.length).toBeGreaterThan(0)
	})

	it('Deve dar erro ao excluir um usuário com código menor que 0', async () => {
		const usuarioResponseInvalido = await supertest(app)
			.delete(`${endpointUsuario}/-1`)
		expect(usuarioResponseInvalido.status).toBe(400)
	})

	it('Deve dar erro ao cadastrar um usuário com dados inválidos', async () => {
		const usuarioResponseInvalido = await supertest(app)
			.post(endpointUsuario)
			.send(usuarioInvalido)
		expect(usuarioResponseInvalido.status).toBe(400)
		expect(usuarioResponseInvalido.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao editar um usuário com dados inválidos', async () => {
		const usuarioResponseInvalido = await supertest(app)
			.put(`${endpointUsuario}/${idUsuario}`)
			.send(endpointUsuario)
		expect(usuarioResponseInvalido.status).toBe(400)
		expect(usuarioResponseInvalido.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao editar um usuário com código menor que 0', async () => {
		const usuarioResponseInvalido = await supertest(app)
			.put(`${endpointUsuario}/-1`)
			.send(usuario)
		expect(usuarioResponseInvalido.status).toBe(400)
		expect(usuarioResponseInvalido.body).toHaveProperty('erros')
	})

	it('Deve dar erro ao editar um usuário com código não existente', async () => {
		usuario.username = 'Zozo'
		const usuarioResponseInvalido = await supertest(app)
			.put(`${endpointUsuario}/9999`)
			.send(usuario)
		expect(usuarioResponseInvalido.status).toBe(404)
	})

	it('Deve dar erro ao excluir um usuário com código não existente', async () => {
		const usuarioResponseInvalido = await supertest(app)
			.delete(`${endpointUsuario}/9999`)
		expect(usuarioResponseInvalido.status).toBe(404)
	})
	// precisa ser o último teste
	it('Deve excluir um usuário', async () => {
		const usuarioResponse = await supertest(app)
			.delete(`${endpointUsuario}/${idUsuario}`)
			.expect(200)
		expect(usuarioResponse.body).toBeGreaterThanOrEqual(0)
	})
})