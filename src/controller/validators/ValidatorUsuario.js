const {
  hasCamposVazios
} = require('./util')

const camposObrigatorios = ['username', 'password', 'fullName', 'role']
module.exports = ValidatorUsuario = {
  validar: {
    cadastro: (usuario) => {
      const erros = []
      if (hasCamposVazios(usuario, camposObrigatorios)) {
        erros.push(`Há campos obrigatórios em branco. Campos obrigatórios:\n ${camposObrigatorios.join('\n')}`)
        return erros
      }
      regrasUsuario.usuarioBody(usuario, erros)
      return erros
    },
    edicao: (id, usuario) => {
      const erros = []
      if (!id || id <= 0) {
        erros.push('É necessário informar um código válido de usuário para edição')
        return erros
      }
      if (hasCamposVazios(usuario, camposObrigatorios)) {
        erros.push(`Há campos obrigatórios em branco. Campos obrigatórios:\n ${camposObrigatorios.join('\n')}`)
        return erros
      }
      regrasUsuario.usuarioBody(usuario, erros)
      return erros
    },
    exclusao: (id) => {
      const erros = []
      if (!id || id <= 0) {
        erros.push('É necessário informar um código válido de usuário para exclusão')
      }
      return erros
    }
  }
}

const regrasUsuario = {
  usuarioBody: (usuario, erros) => {
    if (usuario.username.length < 3) {
      erros.push(`O campo de nome de usuário deve possuir no mínimo três caracteres:\n ${camposObrigatorios.join('\n')}`)
    }
    if (usuario.password.length < 8) {
      erros.push(`O campo de nome de usuário deve possuir no mínimo três caracteres:\n ${camposObrigatorios.join('\n')}`)
    }
  }
}