const app = require('../app')
const supertest = require('supertest')

const Usuario = require('../classes/Usuario')

const endpointUsuario = '/api/v1/usuario'
const endpointAutenticacao = '/api/v1/autenticacao'
let idUsuario = 0

const usuario = new Usuario({
  username: 'Zeze',
  password: '12345678',
  fullName: 'Zeze Gumorni',
  role: 'customer service'
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

  it('Deve excluir um usuário', async () => {
    await supertest(app)
      .delete(`${endpointUsuario}/${idUsuario}`)
      .expect(200)
  })

  it('Deve realizar Login', () => {

  })

  it('Deve verificar se o login do usuário está ativo', () => {
    
  })

  it('Deve realizar Logout', () => {

  })
})