const express = require('express')
const router = require('./routes/index')
const cors = require('cors')

const app = express()

app.use(express.json({
  limit: '10mb'
}))
app.use(cors())
app.use('/api/v1/', router)

module.exports = app