const Produto = require('./Produto')

class Bebida extends Produto {
  constructor(nome, preco, imgURL, volume, alcoolica) {
    super(nome, preco, imgURL)
    this.volume = volume
    this.alcoolica = alcoolica
  }
}

module.exports = Bebida