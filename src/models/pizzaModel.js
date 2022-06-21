const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const PizzaModel = sequelize.define('pizza', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ingredientes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  alcoolica: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  volume: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
})

PizzaModel.sync()
  .then(() => {
    console.log('Pizza sincronizada')
  })

module.exports = PizzaModel