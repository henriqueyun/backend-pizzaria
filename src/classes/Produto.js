class Produto {
  constructor({nome, preco, imgURL, tipo, ingredientes, alcoolica, volume} = {}) {
    this.nome = nome
    this.preco = preco
    this.imgURL = imgURL || ''
    this.tipo = tipo
    this.ingredientes = ingredientes || ''
    this.alcoolica = alcoolica || ''
    this.volume = volume || ''
  }
}

module.exports = Produto