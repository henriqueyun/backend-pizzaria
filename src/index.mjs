import express from 'express'
import router from './router/index.mjs'
import config from './config/index.mjs'
import logger from './logger.mjs'
import cors from 'cors'
import sequelize from './sequelize.mjs'

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

export default app 