const Pedido = require('../classes/Pedido')
const PedidoModel = require('../models/pedidoModel')
const ProdutoModel = require('../models/produtoModel')
const ItemPedidoModel = require('../models/itemPedidoModel')
const logger = require('../logger')

async function cadastrar(req, res) {

  const novoPedido = new Pedido(req.body)
  const registroPedido = PedidoModel.build(novoPedido)
  try {
    await registroPedido.save()
    await adicionarItensPedido(novoPedido.itensPedido, registroPedido.dataValues.id)
  } catch (error) {
    const errorMessage = `Erro ao cadastrar pedido: ${error.message}`
    logger.error(errorMessage)
    return res.sendStatus(500)
  }
  return res.status(201).json({
    id: registroPedido.id
  })
}

async function adicionarItensPedido(itensPedido, pedidoId) {
  itensPedido.map(item => {
    item.produtoId = item.produto.id
    item.pedidoId = pedidoId
    return item
  })

  await itensPedido.forEach(async (item) => {

    const registroItemPedido = ItemPedidoModel.build(item)
    await registroItemPedido.save()
      .catch(error => {
        return Promise.reject(`Erro ao cadastrar o item do pedido de código ${item.id}: ${error.message}`)
      })
  })
}

async function atualizarStatus(req, res) {
  const {
    id
  } = req.params
  try {
    const pedido = await PedidoModel.findOne({
        where: {
          id
        }
      })
      .catch(error => {
        const errorMessage = `Erro ao realizar atualização de status do pedido com o código ${id}: ${error.message}`
        logger.error(errorMessage)
        return res.status(500).send(errorMessage)
      })

    if (!pedido) {
      return res.sendStatus(404)
    }

    const {
      status
    } = req.body
    await pedido.update({
      status
    })
    await pedido.save()

    return res.sendStatus(200)
  } catch (error) {
    const errorMessage = `Erro ao atualizar pedidos: ${error.message}!`
    logger.error(errorMessage)
    return res.status(500).send(errorMessage)
  }
}

async function buscar(req, res) {
  const {
    id
  } = req.params
  const pedido = await PedidoModel.findOne({
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
    .catch(error => {
      const errorMessage = `Houve um erro ao buscar pedidos: ${error.message}!`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })
  if (!pedido) {
    return res.status(404).send(`Não foi possível encontrar pedido com o código ${id}`)
  }
  return res.status(200).json(pedido)
}

async function buscarTodos(_, res) {

  const pedidos = await PedidoModel.findAll({
    include: [{
      model: ItemPedidoModel,
      include: [{
        model: ProdutoModel
      }]
    }]
  }).catch(error => {
    const errorMessage = `Houve um ao buscar pedidos: ${error.message}!`
    logger.error(errorMessage)
    return res.status(500).send(errorMessage)
  })

  if (!pedidos.length) {
    return res.status(404).send('Não existem pedidos cadastrados')
  }
  return res.status(200).json(pedidos)
}

const pedidoController = {
  cadastrar,
  atualizarStatus,
  buscar,
  buscarTodos
}
module.exports = pedidoController