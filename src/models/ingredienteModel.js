const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

const produto = sequelize.define('ingrediente ', {
	descricao: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

module.exports = produto