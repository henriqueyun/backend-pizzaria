const produtoController = require('./produtoController')
const pedidoController = require('./pedidoController')
const usuarioController = require('./usuarioController')
const authController = require('./authController')
const healthController = require('./healthController')

const controller = {
	produtoController,
	pedidoController,
	usuarioController,
	authController,
	healthController
}

module.exports = controller