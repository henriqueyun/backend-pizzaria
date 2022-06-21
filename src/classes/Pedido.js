class Pedido {
  constructor(nomeCliente, enderecoCliente, telefoneCliente, itensPedido, formaPagamento, status, observacao) {
    this.nomeCliente = nomeCliente
    this.enderecoCliente = enderecoCliente
    this.telefoneCliente = telefoneCliente
    this.itensPedido = itensPedido
    this.formaPagamento = formaPagamento
    this.status = status
    this.observacao = observacao
  }
}

module.exports = Pedido