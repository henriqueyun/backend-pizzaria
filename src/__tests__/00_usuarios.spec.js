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
			.expect(201)
		idUsuario = novoUsuario.body.id
	})

	it('Deve editar um usuário', async () => {
		usuario.username = 'Zaza'
		usuario.password = '87654321'
		const usuarioEditado = await supertest(app)
			.put(`${endpointUsuario}/${idUsuario}`)
			.send(usuario)
			.expect(200)
		expect(usuarioEditado.body.username).toBe('Zaza')
		expect(usuarioEditado.body.password).toBe('87654321')
	})

	it('Deve buscar todos os usuários', async () => {
		await supertest(app)
			.get(`${endpointUsuario}/all`)
			.expect(200)
	})

	it('Deve dar erro ao excluir um usuário com código menor que 0', async () => {
		await supertest(app)
			.delete(`${endpointUsuario}/-1`)
			.expect(400)
	})

	it('Deve dar erro ao cadastrar um usuário com dados inválidos', async () => {
		await supertest(app)
			.post(endpointUsuario)
			.send(usuarioInvalido)
			.expect(400)
	})

	it('Deve dar erro ao editar um usuário com dados inválidos', async () => {
		await supertest(app)
			.put(`${endpointUsuario}/${idUsuario}`)
			.send(endpointUsuario)
			.expect(400)
	})

	it('Deve dar erro ao editar um usuário com código menor que 0', async () => {
		await supertest(app)
			.put(`${endpointUsuario}/-1`)
			.send(usuario)
			.expect(400)
	})

	it('Deve dar erro ao editar um usuário com código não existente', async () => {
		usuario.username = 'Zozo'
		await supertest(app)
			.put(`${endpointUsuario}/9999`)
			.send(usuario)
			.expect(404)
	})

	it('Deve dar erro ao excluir um usuário com código não existente', async () => {
		await supertest(app)
			.delete(`${endpointUsuario}/9999`)
			.expect(404)
	})

	it('Deve excluir um usuário', async () => {
		await supertest(app)
			.delete(`${endpointUsuario}/${idUsuario}`)
			.expect(200)
	})
})