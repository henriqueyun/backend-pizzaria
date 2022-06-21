const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const ProdutoModel = sequelize.define('produto', {
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
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredientes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  alcoolica: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  volume: {
    type: DataTypes.SMALLINT,
    allowNull: true
  }
})

ProdutoModel.sync()
  .then(() => {
    console.log('Produto sincronizada')
  })

module.exports = ProdutoModel