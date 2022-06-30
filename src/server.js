const app = require('./app')
const config = require('./config/index')
const logger = require('./logger')
require('./sequelize') // starts DB

const server = app.listen(config.port, () => {
	logger.info(`Rodando na porta ${config.port}`)
})

server.on('error', (error) => {
	logger.error(error)
})