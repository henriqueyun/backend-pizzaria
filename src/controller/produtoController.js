const Produto = require('../classes/Produto')
const ProdutoModel = require('../models/produtoModel')
const logger = require('../logger')

async function cadastrar(req, res) {
  const novoProduto = new Produto(req.body)
  try {
    const registroProduto = ProdutoModel.build(novoProduto)
    await registroProduto.save()
    return res.status(201).json(registroProduto)
  } catch (error) {
    const errorMessage = `Erro ao cadastrar ${novoProduto.tipo}: ${error.message} no banco de dados!`
    logger.error(errorMessage)
    return res.status(500).send(errorMessage)
  }
}

async function editar(req, res) {
  try {
    const {
      id
    } = req.params
    const registroProduto = await ProdutoModel.findOne({
      where: {
        id
      }
    }).catch(error => {
      const errorMessage = `Erro na edição, houve um erro ao buscar ${novoProduto.tipo}: ${error.message}!`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })

    if (!registroProduto) {
      return res.status(404).send(`Não foi possível encontrar produto com o código ${id}`)
    }

    const novoProduto = new Produto(req.body)

    // if (novoProduto.imgURL && !novoProduto.imgURL.includes('https://')) {
    //   pizzaNovosDados.imgURL = await uploadImage(pizzaNovosDados.imgURL)
    // }

    await registroProduto.update(novoProduto)
    await registroProduto.save()
      .catch(error => {
        const errorMessage = `Erro ao realizar edição de ${novoProduto.tipo}: ${error.message}!`
        logger.error(errorMessage)
        return res.status(500).send(errorMessage)
      })
    return res.status(200).json(registroProduto)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function excluir(req, res) {
  const {
    id
  } = req.params

  await ProdutoModel.destroy({
      where: {
        id
      }
    })
    .catch(error => {
      const errorMessage = `Houve um erro ao excluir ${novoProduto.tipo}: ${error.message}!`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })
  return res.sendStatus(200)
}

async function buscarUma(req, res) {
  const {
    id
  } = req.params
  const produto = await ProdutoModel.findOne({
      where: {
        id
      }
    })
    .catch(error => {
      const errorMessage = `Houve um ao buscar produto: ${error.message}!`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })

  if (!produto) {
    return res.status(404).send(`Não foi possível encontrar produto com o código ${id}`)
  }
  return res.status(200).json(produto)
}

async function buscarTodas(_, res) {
  const registrosProdutos = await ProdutoModel.findAll()
    .catch(error => {
      const errorMessage = `Houve um ao buscar produtos: ${error.message}!`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })
  if (!registrosProdutos.length) {
    return res.status(404).send('Não existem produtos cadastrados')
  }
  return res.status(200).json(registrosProdutos)
}


const produtoController = {
  cadastrar,
  editar,
  excluir,
  buscarUma,
  buscarTodas
}

module.exports = produtoController