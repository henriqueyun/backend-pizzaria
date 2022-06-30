const {
	DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')
const logger = require('../logger')

const UsuarioModel = sequelize.define('usuario', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	fullName: {
		type: DataTypes.STRING,
		allowNull: true
	},
	role: {
		type: DataTypes.STRING,
		allowNull: true
	},

	activeSession: {
		type: DataTypes.STRING,
		allowNull: true
	}
})

UsuarioModel.sync()
	.then(() => {
		logger.info('Usuario sincronizada')
	})

module.exports = UsuarioModel