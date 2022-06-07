import Pizza from '../classes/Pizza.mjs'
import PizzaModel from '../models/pizzaModel.mjs'
import logger from '../logger.mjs'
import axios from 'axios'
import config from '../config/index.mjs'
import FormData from 'form-data'

export async function cadastrar(req, res) {
  try {
    let {
      nome,
      preco,
      ingredientes,
      imgURL
    } = req.body

    imgURL = await uploadImage(imgURL)

    const pizza = new Pizza(nome, preco, imgURL, ingredientes)
    const novaPizza = PizzaModel.build(pizza)

    await novaPizza.save()
      .catch(error => {
        logger.error('Erro ao cadastrar pizza no banco!', error)
        return res.sendStatus(500)
      })
    return res.sendStatus(201)
  } catch (error) {
    logger.error('Erro na função cadastrar pizza!', error)
    return res.sendStatus(500)
  }
}

export async function editar(req, res) {
  try {
    const pizza = await PizzaModel.findOne({
        where: {
          id: req.params.id
        }
      })
      .catch(error => {
        logger.error('Erro buscar pizza!', error)
        return res.sendStatus(500)
      })
    if (!pizza) {
      return res.sendStatus(404)
    }

    const pizzaNovosDados = req.body

    if (pizzaNovosDados.imgURL && !pizzaNovosDados.imgURL.includes('https://')) {
      pizzaNovosDados.imgURL = await uploadImage(pizzaNovosDados.imgURL)
    }

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
  await PizzaModel.destroy({
      where: {
        id: idPizza
      }
    })
    .catch(error => {
      logger.error('Erro na função excluir pizza!', error)
      return res.sendStatus(500)
    })
  res.sendStatus(200)
}

export async function buscar(req, res) {
  const pizza = await PizzaModel.findOne({
      where: {
        id: req.params.id
      }
    })
    .catch(error => {
      logger.error('Erro buscar pizza!', error)
      return res.sendStatus(500)
    })
  if (!pizza) {
    return res.status(404).send('Pizza não encontrada')
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

/** Upload image to imgur and returns the uploaded image URL */
async function uploadImage(imageURL) {
  const [type, base64] = imageURL.split(';')[1].split(',')

  const imageFormData = new FormData()
  imageFormData.append('image', base64)
  imageFormData.append('type', type)

  const uploadResponse = await axios.post('https://api.imgur.com/3/upload', imageFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `Client-ID 9dab4a9f9067d57`
      }
    })
    .catch(error => {
      console.error(error)
      throw error
    })

  return uploadResponse.data.data.link
}

const pizzaController = {
  cadastrar,
  editar,
  excluir,
  buscar,
  buscar,
  buscarTodas
}

export default pizzaController