function healthCheck (_, res) {
  res.send('Health Ok')
}

module.exports = { healthCheck }