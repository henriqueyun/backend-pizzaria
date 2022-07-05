const Pedido = require('../classes/Pedido')
const PedidoModel = require('../models/pedidoModel')
const ProdutoModel = require('../models/produtoModel')
const ItemPedidoModel = require('../models/itemPedidoModel')
const logger = require('../logger')
async function cadastrar(pedidoData) {
	try {
		const pedido = new Pedido(pedidoData)
		const registroPedido = PedidoModel.build(pedido)
		await registroPedido.save()
		pedido.id = registroPedido.dataValues.id
		await registroPedido.update({ itensPedido: await cadastrarItensPedido(pedido)})
		return registroPedido
	} catch (error) {
		const errorMessage = `Erro ao cadastrar pedido: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function cadastrarItensPedido(pedido) {
	try {
		await pedido.itensPedido.map(async (item) => {
			item.produtoId = item.produto.id
			item.pedidoId = pedido.id
			const registroItemPedido = ItemPedidoModel.build(item)
			return await registroItemPedido.save()
		})
		return pedido.itensPedido
	} catch (error) {
		const errorMessage = `Erro ao cadastrar item de pedido: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function atualizarStatus(id, status) {
	try {
		const pedido = await PedidoModel.findOne({
			where: {
				id
			}
		})
		if (!pedido)
			return pedido
		await pedido.update({
			status
		})
		return await pedido.save()
	} catch (error) {
		const errorMessage = `Erro ao atualizar status: ${error.message}`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function buscar(id) {
	try {
		return await PedidoModel.findOne({
			where: {
				id
			},
			include: [{
				model: ItemPedidoModel,
				include: [{
					model: ProdutoModel
				}]
			}]
		})
	} catch (error) {
		const errorMessage = `Houve um erro ao buscar pedidos: ${error.message}!`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}

async function buscarTodos() {
	try {

		const pedidos = await PedidoModel.findAll({
			include: [{
				model: ItemPedidoModel,
				include: [{
					model: ProdutoModel
				}]
			}]
		})
		return pedidos
	} catch (error) {
		const errorMessage = `Houve um ao buscar pedidos: ${error.message}!`
		logger.error(errorMessage)
		throw new Error(errorMessage)
	}
}
module.exports = {
	cadastrar,
	atualizarStatus,
	buscar,
	buscarTodos
}