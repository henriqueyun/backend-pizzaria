const Usuario = require('../classes/Usuario')
const UsuarioModel = require('../models/usuarioModel')
const logger = require('../logger')

async function cadastrar(req, res) {
  const novoUsuario = new Usuario(req.body)
  try {
    const registroUsuario = UsuarioModel.build(novoUsuario)
    await registroUsuario.save()
    return res.status(201).json(registroUsuario)
  } catch (error) {
    const errorMessage = `Erro ao cadastrar usuário no banco de dados: ${error.message}`
    logger.error(errorMessage)
    return res.status(500).send(errorMessage)
  }
}

async function editar(req, res) {
  const {
    id
  } = req.params
  try {
    const registroUsuario = await UsuarioModel.findOne({
      where: {
        id
      }
    }).catch(error => {
      const errorMessage = `Erro na edição, houve um erro ao buscar usuário: ${error.message}`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })

    if (!registroUsuario) {
      return res.status(404).send(`Não foi possível encontrar usuário com o código ${id}`)
    }

    const novoUsuario = new Usuario(req.body)
    await registroUsuario.update(novoUsuario)
    await registroUsuario.save()
      .catch(error => {
        const errorMessage = `Erro ao realizar edição de usuário: ${error.message}`
        logger.error(errorMessage)
        return res.status(500).send(errorMessage)
      })

    return res.status(200).json(registroUsuario)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

async function excluir(req, res) {
  const {
    id
  } = req.params

  await UsuarioModel.destroy({
      where: {
        id
      }
    })
    .catch(error => {
      const errorMessage = `Houve um erro ao excluir usuário: ${error.message}`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })
  return res.sendStatus(200)
}

async function buscarTodos(_, res) {
  const registrosUsuarios = await UsuarioModel.findAll()
    .catch(error => {
      const errorMessage = `Houve um erro ao buscar usuários: ${error.message}`
      logger.error(errorMessage)
      return res.status(500).send(errorMessage)
    })
  if (!registrosUsuarios.length) {
    return res.status(404).send('Não existem usuários cadastrados')
  }
  return res.status(200).json(registrosUsuarios)
}

const usuarioController = {
  cadastrar,
  editar,
  excluir,
  buscarTodos
}

module.exports = usuarioController