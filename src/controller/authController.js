const jwt = require('jsonwebtoken')
const UsuarioModel = require('../models/usuarioModel')

async function login(req, res) {

	const {
		username,
		password
	} = req.body

	const usuario =
		await UsuarioModel.findOne({
			where: {
				username,
				password
			}
		})

	if (!usuario)
		return res.status(404).json({
			message: 'user not found'
		})

	const jwtHash =
		jwt.sign({
			username,
			password
		},
		`${process.env.NODE_ENV || 'development'} token`)

	usuario.activeSession = jwtHash
	await usuario.save()

	return res.status(200).json({
		token: jwtHash
	})
}

async function authorize(req, res) {
	const token = req.headers.authorization
	if (!token || token == 'null') {
		return res.sendStatus(400)
	}

	const {
		username,
		password
	} = jwt.decode(token, `${process.env.NODE_ENV || 'development'} token`)

	let usuario
	try {
		usuario = await UsuarioModel.findOne({
			where: {
				username,
				password
			}
		})
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}

	if (!usuario) {
		return res.status(404).json({
			message: 'Usuário não encontrado'
		})
	}

	if (usuario.activeSession != token) {
		try {
			usuario.activeSession = token
			await usuario.save()
		} catch (err) {
			console.error(err)
			return res.sendStatus(500)
		}
	}

	return res.status(200).json({
		authorized: true
	})
}

async function logout(req, res) {
	const token = req.headers.authorization
	if (!token) {
		req.redirect('/login')
		return res.sendStatus(400)
	}
	const {
		username,
		password
	} = jwt.decode(token, `${process.env.NODE_ENV || 'development'} token`)

	let usuario
	try {
		usuario = await UsuarioModel.findOne({
			where: {
				username,
				password
			}
		})

		usuario.activeSession = ''
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}

	res.sendStatus(204)
}

module.exports = {
	login,
	authorize,
	logout
}