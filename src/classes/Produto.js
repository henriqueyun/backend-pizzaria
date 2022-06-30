class Produto {
	/** Produto
  * @param {string} nome - O nome/descrição do produto
  * @param {number} preco - O preço em reais do produto
  * @param {string} imgURL - A URL de referência de uma imagem de produto
  * @param {string} tipo - O tipo de produto (e.g.: pizza, bebida, esfiha etc.)
  * @param {string} ingredientes - A lista de ingredientes da composição do produto
  * @param {string} alcoolica - Se o produto contem álcool ou não
  * @param {number} volume - O volume em mililitros do produto 
  */
	constructor({id = undefined, nome, preco, imgURL, tipo, ingredientes, alcoolica, volume} = {}) {
		this.id = id
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