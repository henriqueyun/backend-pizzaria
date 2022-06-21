const Produto = require('./Produto')

class Pizza extends Produto {
  constructor(nome, preco, imgURL, ingredientes) {
    super(nome, preco, imgURL)
    this.ingredientes = ingredientes
  }
}

module.exports = Pizza