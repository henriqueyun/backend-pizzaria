module.exports = ValidatorProduto = {
  validar: {

    cadastro: (produto) => {
      const camposObrigatorios = ['nome', 'preco', 'tipo']
      const erros = []
      if (hasCamposVazios(produto, camposObrigatorios)) {
        erros.push(`Há campos obrigatórios em branco:\n ${camposObrigatorios.join('\n')}`)
        return erros
      }
  
      if (produto.nome.length >= 50) {
        erros.push('Nome do produto não pode conter mais de 50 caracteres')
      }
  
      if (produto.preco < 0) {
        erros.push('Preço do produto não pode ser menor que 0')
      }
      return erros
    },
    edicao: (id) => {
      const erros = []
      if (!id || id < 0) {
        erros.push('É necessário informar um código válido de produto para edição')
      }
      return erros
    },
    exclusao: (id) => {
      const erros = []
      if (!id || id < 0) {
        erros.push('É necessário informar um código válido de produto para exclusão')
      }
      return erros
    },
    busca: (id) => {
      const erros = []
      if (!id || id < 0) {
        erros.push('É necessário informar um código válido de produto para busca')
      }
      return erros
    }
  }
}

function hasCamposVazios(objeto, camposObrigatorios) {
  return camposObrigatorios.every(campo => {
    objeto[campo] !== '' || objeto[campo] !== undefined
  })
}