class Cliente {
  /** Cliente
  * @param {string} nome - O nome informado pelo cliente
  * @param {string} endereco - O endereço informado pelo cliente
  * @param {string} telefone - O telefone informado pelo cliente
  */
  constructor({nome, endereco, telefone} = {}) {
    this.nome = nome
    this.endereco = endereco
    this.telefone = telefone
  }
}

module.exports = Cliente