const pizzaController = require('./pizzaController')
const bebidaController = require('./bebidaController')
const pedidoController = require('./pedidoController')
const authController = require('./authController')
const produtoController = require('./produtoController')

const controller = {
  pizzaController,
  bebidaController,
  pedidoController,
  authController,
  produtoController
}

module.exports = controller