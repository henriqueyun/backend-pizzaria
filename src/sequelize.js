const { Sequelize } = require('sequelize')
const config = require('./config/index')
const logger = require('./logger')

const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUser,
  config.databasePassword,
  {
    host: config.databaseHost,
    port: config.databasePort,
    dialect: 'mysql',
    logging: message => logger.debug(message)
  },
)


module.exports = sequelize