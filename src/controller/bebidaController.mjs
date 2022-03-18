import Bebida from '../classes/Bebida.mjs'
import BebidaModel from '../models/bebidaModel.mjs'
import logger from '../logger.mjs'

export async function cadastrar(req, res) {
  try {
    const { nome, preco, imgURL, volume, alcoolica } = req.body
    
    const bebida = new Bebida(nome, preco, imgURL, volume, alcoolica)
    const novaBebida = BebidaModel.build(bebida)

    await novaBebida.save()
      .catch(error => {
        logger.error(`Erro na função cadastrar bebida! ${error}`)
        return res.sendStatus(500)
      })
    return res.status(201).json({ id: novaBebida.id }) 
  } catch (error) {
    logger.error(error)
  }
}

export async function editar(req, res) {
  const bebida = await BebidaModel.findOne({ where: { id: req.params.id } })
    .catch(error => {
      logger.error('Erro buscar bebida!', error)
      return res.sendStatus(500)
    })
  if (!bebida) {
    return res.sendStatus(404)
  }
  try {
    const bebidaNovosDados = req.body
    await bebida.update(bebidaNovosDados)
    await bebida.save()
      .catch(error => {
        logger.error('Erro editar bebida!', error)
        return res.sendStatus(500)
      })
    return res.sendStatus(200)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

export async function excluir(req, res) {
  await BebidaModel.destroy({ where: { id: req.params.id } })
    .catch(error => {
      logger.error(`Erro excluir bebida! ${error}`)
      return res.sendStatus(500)
    })
  res.sendStatus(200)
}

export async function buscar(req, res) {
  const bebida = await BebidaModel.findOne({ where: { id: req.params.id } })
    .catch(error => {
      logger.error(`Erro buscar bebida!' ${error}`)
      return res.sendStatus(500)
    })
  if (!bebida) {
    return res.sendStatus(404)
  }
  return res.status(200).json(bebida)
}

const bebidaController = { cadastrar, editar, excluir, buscar }

export default bebidaController