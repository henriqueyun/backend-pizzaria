const {
  DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')
const PedidoModel = require('./pedidoModel')
const logger = require('../logger')

const ItemPedidoModel = sequelize.define('itemPedido', {
  pedidoId: {
    type: DataTypes.INTEGER,
    references: {
      model: PedidoModel,
      key: 'id'
    }
  },
  produtoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Produto',
      key: 'id'
    }
  },
  qtd: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const ProdutoModel = require('./produtoModel')

PedidoModel.belongsToMany(ProdutoModel, {
  through: ItemPedidoModel
})
PedidoModel.hasMany(ItemPedidoModel, {
  foreignKey: 'pedidoId',
  sourceKey: 'id'
})
ItemPedidoModel.hasOne(ProdutoModel, {
  foreignKey: 'id',
  sourceKey: 'produtoId'
})

ItemPedidoModel.sync()
  .then(() => {
    logger.info('ItemPedido sincronizado')
  })

module.exports = ItemPedidoModel