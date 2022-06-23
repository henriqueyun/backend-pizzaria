class Pedido {
  /** Pedido
   * @param {Cliente} cliente - O cliente que realizou o pedido
   * @param {ItemPedido[]} itensPedido - O conjunto de itens pertencentes ao pedido
   * @param {string} formaPagamento - A forma de pagamento
   * @param {string} status - O status do pedido
   * @param {string} observacao - A observação ou as anotações feitas pelo cliente sobre o pedido
   */
  constructor({
    cliente,
    itensPedido = [],
    formaPagamento,
    status,
    observacao
  } = {}) {
    
    this.cliente = cliente

    // this should belong to another table :/
    this.nomeCliente = cliente.nome
    this.telefoneCliente = cliente.telefone
    this.enderecoCliente = cliente.endereco

    this.itensPedido = itensPedido
    this.formaPagamento = formaPagamento
    this.status = status
    this.observacao = observacao
  }
}

module.exports = Pedido