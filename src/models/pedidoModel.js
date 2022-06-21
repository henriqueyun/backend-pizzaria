const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const PedidoModel = sequelize.define('pedido', {
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  enderecoCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefoneCliente: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  formaPagamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

PedidoModel.sync()
  .then(() => {
    console.log('PedidoModel sincronizado')
  })
  
module.exports = PedidoModel