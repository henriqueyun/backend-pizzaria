module.exports = function existirErros(erros) {
	if (erros.length) {
		return erros.join('\n')
	}
	return ''
}