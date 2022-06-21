const express = require('express')
const router = require('./router/index')
const config = require('./config/index')
const logger = require('./logger')
const cors = require('cors')
const sequelize = require('./sequelize')

const app = express()
app.use(express.json({ limit: '10mb'}))
app.use(cors())

app.use('/api/v1/', router)

const server = app.listen(config.port, () => {
  logger.info(`running on ${config.port}`)
})

server.on('error', (error) => {
  logger.error(error)
})

module.exports = app 