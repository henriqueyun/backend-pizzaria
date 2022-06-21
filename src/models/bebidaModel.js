const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const BebidaModel = sequelize.define('bebida', {
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
  alcoolica: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  volume: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
})

BebidaModel.sync()
  .then(() => {
    console.log('Bebida sincronizada')
  })

module.exports = BebidaModel