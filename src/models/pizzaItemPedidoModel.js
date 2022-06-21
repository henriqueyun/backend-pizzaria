const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const PedidoModel = require('./pedidoModel')

const PizzaItemPedido = sequelize.define('pizzaItemPedido', {
  pedidoId: {
    type: DataTypes.INTEGER,
    references: {
      model: PedidoModel,
      key: 'id'
    }
  },
  pizzaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Pizza',
      key: 'id'
    }
  },
  qtd: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const PizzaModel = require('./pizzaModel')

PedidoModel.belongsToMany(PizzaModel, { through: PizzaItemPedido })
PedidoModel.hasMany(PizzaItemPedido, {
  foreignKey: 'pedidoId',
  sourceKey: 'id'
})
PizzaItemPedido.hasOne(PizzaModel, {
  foreignKey: 'id',
  sourceKey: 'pizzaId'
})

PizzaItemPedido.sync()
  .then(() => {
    console.log('PizzaItemPedido sincronizado')
  })

module.exports = PizzaItemPedido