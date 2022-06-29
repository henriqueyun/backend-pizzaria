const PedidoService = require('../services/PedidoService')
const ValidatorPedido = require('./validators/ValidatorPedido')
const existirErros = require('./validators/erros')
const logger = require('../logger')

async function cadastrar(req, res) {
  try {
    const erros = ValidatorPedido.validar.cadastro(req.body)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      return res.status(400).json({
        erros: mensagemErro
      })
    }
    const pedido = await PedidoService.cadastrar(req.body)
    return res.status(201).json(pedido)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function atualizarStatus(req, res) {
  try {
    const {
      id
    } = req.params
    const {
      status
    } = req.body
    const erros = ValidatorPedido.validar.atualizacaoStatus(id, status)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      return res.status(400).json({
        erros: mensagemErro
      })
    }
    const pedido = await PedidoService.atualizarStatus(id, status)
    if (!pedido) {
      return res.status(404).send(`Não foi possível encontrar pedido com o código ${id}`)
    }
    return res.status(200).json(pedido)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function buscar(req, res) {
  try {
    const { id } = req.params
    const erros = ValidatorPedido.validar.busca(id)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      return res.status(400).json({
        erros: mensagemErro
      })
    }
    const pedido = await PedidoService.buscar(id)
    if (!pedido) {
      return res.status(404).send(`Não foi possível encontrar pedido com o código ${id}`)
    }
    return res.status(200).json(pedido)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function buscarTodos(_, res) {
  try {
    const pedidos = await PedidoService.buscarTodos()
    if (!pedidos.length) {
      return res.status(404).send('Não existem pedidos cadastrados')
    }
    return res.status(200).json(pedidos)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

const pedidoController = {
  cadastrar,
  atualizarStatus,
  buscar,
  buscarTodos
}
module.exports = pedidoController