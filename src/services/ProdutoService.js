const Produto = require('../classes/Produto')
const ProdutoModel = require('../models/produtoModel')
const logger = require('../logger')

async function cadastrar(produtoData) {
  try {
    const produto = new Produto(produtoData)
    const registroProduto = ProdutoModel.build(produto)
    return await registroProduto.save()
  } catch (error) {
    const errorMessage = `Erro ao cadastrar produto: ${error.message}`
    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}

async function editar(id, produtoData) {
  try {
    const registroProduto = await ProdutoModel.findOne({
      where: {
        id
      }
    })
    if (!registroProduto)
      return registroProduto
    try {
      await registroProduto.update(produtoData)
      return await registroProduto.save()
    } catch (error) {
      const errorMessage = `Erro ao realizar edição de produto: ${error.message}`
      logger.error(errorMessage)
      throw new Error(error)
    }

  } catch (error) {
    const errorMessage = `Erro na edição, houve um erro ao buscar produto: ${error.message}`
    logger.error(errorMessage)
    throw new Error(error)
  }
}

async function excluir(id) {
  try {
    return await ProdutoModel.destroy({
      where: {
        id
      }
    })
  } catch (error) {
    const errorMessage = `Houve um erro ao excluir produto: ${error.message}`
    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}

async function buscarUma(id) {
  try {
    return await ProdutoModel.findOne({
      where: {
        id
      }
    })
  } catch (error) {
    const errorMessage = `Houve um ao buscar produto: ${error.message}!`
    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}

async function buscarTodos() {
  try {
    return await ProdutoModel.findAll()
  } catch (error) {
    const errorMessage = `Houve um erro ao buscar produtos: ${error.message}!`
    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}
module.exports = {
  cadastrar,
  editar,
  excluir,
  buscarUma,
  buscarTodos
}