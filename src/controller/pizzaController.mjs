import Pizza from '../classes/Pizza.mjs'
import PizzaModel from '../models/pizzaModel.mjs'
import logger from '../logger.mjs'

export async function cadastrar(req, res) {
  const { nome, preco, imgURL, ingredientes } = req.body

  const pizza = new Pizza(nome, preco, imgURL, ingredientes)
  const novaPizza = PizzaModel.build(pizza)
  
  await novaPizza.save()
    .catch(error => {
      logger.error('Erro na função cadastrar pizza!', error)
      return res.sendStatus(500)
    })
  return res.status(201).json({ id: novaPizza.id })
}

export async function editar(req, res) {
  const pizza = await PizzaModel.findOne({ where: { id: req.params.id } })
    .catch(error => {
      logger.error('Erro buscar pizza!', error)
      return res.sendStatus(500)
    })
  if (!pizza) {
    return res.sendStatus(404)
  }
  try {
    const pizzaNovosDados = req.body
    await pizza.update(pizzaNovosDados)
    await pizza.save()
      .catch(error => {
        logger.error('Erro na função editar pizza!', error)
        return res.sendStatus(500)
      })
    return res.sendStatus(200)
  } catch (error) {
    logger.error(error)
    return res.sendStatus(500)
  }
}

export async function excluir(req, res) {
  const idPizza = req.params.id
  await PizzaModel.destroy({ where: { id: idPizza } })
    .catch(error => {
      logger.error('Erro na função excluir pizza!', error)
      return res.sendStatus(500)
    })
  res.sendStatus(200)
}

export async function buscar(req, res) {
  const pizza = await PizzaModel.findOne({ where: { id: req.params.id } })
    .catch(error => {
      logger.error('Erro buscar pizza!', error)
      return res.sendStatus(500)
    })
  if (!pizza) {
    return res.status(404).send('Pizza not found')
  }
  return res.status(200).json(pizza)
}

export async function buscarTodas(req, res) {
  const pizzas = await PizzaModel.findAll()
    .catch(error => {
      logger.error(`Erro ao buscar todas as pizzas ${error}`)
      return res.sendStatus(500)
    })
  if (!pizzas.length) {
    return res.sendStatus(404)
  }
  return res.status(200).json(pizzas)
}

const pizzaController = { cadastrar, editar, excluir, buscar, buscar, buscarTodas }

export default pizzaController