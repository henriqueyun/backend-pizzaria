const pino = require('pino')
const config = require('./config/index')

const logger = pino({ level: config.logLevel })

module.exports = logger