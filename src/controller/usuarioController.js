const UsuarioService = require('../services/UsuarioService')
const ValidatorUsuario = require('./validators/ValidatorUsuario')
const existirErros = require('./validators/erros')
const logger = require('../logger')

async function cadastrar(req, res) {
  try {
    const erros = ValidatorUsuario.validar.cadastro(req.body)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      res.status(400).send({
        erros: mensagemErro
      })
    }
    const usuario = await UsuarioService.cadastrar(req.body)
    return res.status(201).json(usuario)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function editar(req, res) {
  try {
    const {
      id
    } = req.params
    const erros = ValidatorUsuario.validar.edicao(id, req.body)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      res.status(400).send({
        erros: mensagemErro
      })
    }
    const usuario = await UsuarioService.editar(id, req.body)
    if (!usuario) {
      return res.status(404).send('Não foi possível encontrar usuário')
    }
    return res.status(200).json(usuario)
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
    const erros = ValidatorUsuario.validar.exclusao(id)
    const mensagemErro = existirErros(erros)
    if (mensagemErro) {
      res.status(400).send({
        erros: mensagemErro
      })
    }
    const usuario = await UsuarioService.excluir(id)
    if (!usuario) {
      return res.status(404).send('Não foi possível encontrar usuário')
    }
    return res.status(200).json(usuario)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function buscarTodos(_, res) {
  try {
    const usuarios = await UsuarioService.buscarTodos()
    if (!usuarios || !usuarios.length) {
      return res.status(404).send('Não existem usuários cadastrados')
    }
    return res.status(200).json(usuarios)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

const usuarioController = {
  cadastrar,
  editar,
  excluir,
  buscarTodos
}

module.exports = usuarioController