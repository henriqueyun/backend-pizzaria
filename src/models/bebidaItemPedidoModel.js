const {
  DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')
const PedidoModel = require('./pedidoModel')
const logger = require('../logger')

const BebidaItemPedido = sequelize.define('bebidaItemPedido', {
  pedidoId: {
    type: DataTypes.INTEGER,
    references: {
      model: PedidoModel,
      key: 'id'
    }
  },
  bebidaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Bebida',
      key: 'id'
    }
  },
  qtd: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const BebidaModel = require('./bebidaModel')

PedidoModel.belongsToMany(BebidaModel, {
  through: BebidaItemPedido
})
PedidoModel.hasMany(BebidaItemPedido, {
  foreignKey: 'pedidoId',
  sourceKey: 'id'
})
BebidaItemPedido.hasOne(BebidaModel, {
  foreignKey: 'id',
  sourceKey: 'bebidaId'
})

BebidaItemPedido.sync()
  .then(() => {
    logger.info('BebidaItemPedido sincronizado')
  })

module.exports = BebidaItemPedido