const ProdutoService = require('../services/ProdutoService')
const ValidatorProduto = require('./validators/ValidatorProduto')
const existirErros = require('./validators/erros')
const logger = require('../logger')

async function cadastrar(req, res) {
	try {
		const erros = ValidatorProduto.validar.cadastro(req.body)
		const mensagemErro = existirErros(erros)
		if (mensagemErro) {
			return res.status(400).json({
				erros: mensagemErro
			})
		}
		const produto = await ProdutoService.cadastrar(req.body)
		return res.status(201).json(produto)
	} catch (error) {
		logger.error(error.message)
		return res.sendStatus(500)
	}
}

async function editar(req, res) {
	try {
		const {
			id
		} = req.params
		const erros = ValidatorProduto.validar.edicao(id, req.body)
		const mensagemErro = existirErros(erros)
		if (mensagemErro) {
			return res.status(400).json({
				erros: mensagemErro
			})
		}
		const produto = await ProdutoService.editar(id, req.body)
		if (!produto) {
			return res.status(404).send(`Não foi possível encontrar produto com o código ${id}`)
		}
		return res.status(200).json(produto)
	} catch (error) {
		logger.error(error)
		return res.sendStatus(500)
	}
}

async function excluir(req, res) {
	try {
		const {
			id
		} = req.params
		const erros = ValidatorProduto.validar.exclusao(id)
		const mensagemErro = existirErros(erros)
		if (mensagemErro) {
			return res.status(400).json({
				erros: mensagemErro
			})
		}
		const produto = await ProdutoService.excluir(id)
		if (!produto) { 
			return res.status(404).send('Não foi possível encontrar o produto')
		}
		return res.status(200).json(produto)
	} catch (error) {
		logger.error(error)
		return res.sendStatus(500)
	}
}

async function buscarUma(req, res) {
	try {
		const {
			id
		} = req.params
		const erros = ValidatorProduto.validar.exclusao(id)
		const mensagemErro = existirErros(erros)
		if (mensagemErro) {
			return res.status(400).json({
				erros: mensagemErro
			})
		}
		const produto = await ProdutoService.buscarUma(id)
		if (!produto) {
			return res.status(404).send(`Não foi possível encontrar produto com o código ${id}`)
		}
		return res.status(200).json(produto)
	} catch (error) {
		logger.error(error)
		return res.sendStatus(500)
	}
}

async function buscarTodos(_, res) {
	try {
		const produtos = await ProdutoService.buscarTodos()
		if (!produtos.length) {
			return res.status(404).send('Não existem produtos cadastrados')
		}
		return res.status(200).json(produtos)
	} catch (error) {
		logger.error(error)
		return res.sendStatus(500)
	}
}

const produtoController = {
	cadastrar,
	editar,
	excluir,
	buscarUma,
	buscarTodos
}

module.exports = produtoController