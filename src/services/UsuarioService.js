const Usuario = require('../classes/Usuario')
const UsuarioModel = require('../models/usuarioModel')
const logger = require('../logger')

async function cadastrar(usuarioData) {
	try {
		const usuario = new Usuario(usuarioData)
		const registroUsuario = UsuarioModel.build(usuario)
		return await registroUsuario.save()
	} catch (error) {
		const errorMessage = `Erro ao cadastrar usuário: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function editar(id, usuarioData) {
	try {
		const registroUsuario = await UsuarioModel.findOne({
			where: {
				id
			}
		})
		if (!registroUsuario)
			return registroUsuario
		const usuario = new Usuario(usuarioData)
		await registroUsuario.update(usuario)
		return await registroUsuario.save()
	} catch (error) {
		const errorMessage = `Erro ao realizar edição de usuário: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function excluir(id) {
	try {
		return await UsuarioModel.destroy({
			where: {
				id
			}
		})
	} catch (error) {
		const errorMessage = `Houve um erro ao excluir usuário: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function buscarTodos() {
	try {
		return await UsuarioModel.findAll()
	} catch (error) {
		const errorMessage = `Houve um erro ao buscar usuários: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

module.exports = {
	cadastrar,
	editar,
	excluir,
	buscarTodos
}