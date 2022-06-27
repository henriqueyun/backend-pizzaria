const { Router } = require('express')
const controller = require('../controller/index')

const router = Router()

router.post('/produto', controller.produtoController.cadastrar)
router.get('/produto/all', controller.produtoController.buscarTodos)
router.get('/produto/:id', controller.produtoController.buscarUma)
router.delete('/produto/:id', controller.produtoController.excluir)
router.put('/produto/:id', controller.produtoController.editar)

router.post('/pedido', controller.pedidoController.cadastrar)
router.get('/pedido/all', controller.pedidoController.buscarTodos)
router.get('/pedido/:id', controller.pedidoController.buscar)
router.patch('/pedido/:id', controller.pedidoController.atualizarStatus)

router.post('/usuario', controller.usuarioController.cadastrar)
router.get('/usuario/all', controller.usuarioController.buscarTodos)
router.delete('/usuario/:id', controller.usuarioController.excluir)
router.put('/usuario/:id', controller.usuarioController.editar)

router.post('/auth/login', controller.authController.login)
router.post('/auth/authorize', controller.authController.authorize)
router.post('/auth/logout', controller.authController.logout)

router.get('/health', controller.healthController.healthCheck)

module.exports = router