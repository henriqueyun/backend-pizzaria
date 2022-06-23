class ItemPedido {
  /** ItemPedido
  * @param {Produto} produto - O nome/descrição do produto
  * @param {number} quantidade - O preço em reais do produto
  * @param {number} pedidoId - O pedido ao qual o item pertence
  */
  constructor({produto, qtd, pedidoId = 0} = {}) {
    this.produto = produto
    this.qtd = qtd
    this.pedidoId = pedidoId
  }
}

module.exports = ItemPedido