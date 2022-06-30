const {
	hasCamposVazios
} = require('./util')

const camposObrigatorios = ['cliente', 'itensPedido', 'formaPagamento', 'status']
const camposClienteObrigatorios = ['nome', 'endereco', 'telefone']
module.exports = {
	validar: {
		cadastro: (pedido) => {
			const erros = []
			if (hasCamposVazios(pedido, camposObrigatorios)) {
				erros.push(`Há campos obrigatórios em branco. Campos obrigatórios\n ${camposObrigatorios.join('\n')}`)
				return erros
			}
			if (hasCamposVazios(pedido.cliente, camposClienteObrigatorios)) {
				erros.push(`Há campos obrigatórios em branco. Campos obrigatórios\n ${camposClienteObrigatorios.join('\n')}`)
				return erros
			}
			regrasPedido.pedidoBody(pedido, erros)
			return erros
		},
		atualizacaoStatus: (id, status) => {
			const erros = []
			if (!id || id <= 0) {
				erros.push('É necessário informar um código válido de pedido para atualização de status')
				return erros
			}
			if (!status) {
				erros.push('É necessário informar um status válido de pedido para atualização de status')
			}
			return erros
		},
		busca: (id) => {
			const erros = []
			if (!id || id <= 0) {
				erros.push('É necessário informar um código válido de pedido para busca')
			}
			return erros
		}
	}
}

const regrasPedido = {
	pedidoBody: (pedido, erros) => {
		if (!pedido.itensPedido.length) {
			erros.push('O pedido deve possuir algum item')
			return erros
		}
		const existirItensComQtd0 = pedido.itensPedido.some(item => {
			return !item.qtd && item.qtd <= 0
		})
		if (existirItensComQtd0) {
			erros.push('O pedido não deve possuir itens com quantidade menor ou igual a zero')
		}
		return erros
	}
}