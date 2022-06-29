class Usuario {
  /** Usuario
  * @param {string} username - O nome de usuário do usuário
  * @param {string} password - A senha do usuário
  * @param {string} fullName - O nome completo do usuário
  * @param {string} role - O papel ou cargo do usuário no sistema
  * @param {string} activeSession - O hash da sessão ativa do usuário
  */
  constructor({username, password, fullName, role, activeSession = ''} = {}) {
    this.username = username
    this.password = password
    this.fullName = fullName
    this.role = role
    this.activeSession = activeSession
  }
}

module.exports = Usuario