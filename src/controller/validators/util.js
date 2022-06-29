/**
 * Checa os campos informados no parâmetro `camposObrigatorios` no `objeto` informado e valida se eles estão em branco ou indefinidos.
 * @param {Object} objeto Objeto que será validado
 * @param {string[]} camposObrigatorios Campos que serão checados/validados
 * @returns {boolean} Se houverem campos em branco/indefinidos retorna `true` caso contrário retorna `false`
 */
function hasCamposVazios(objeto, camposObrigatorios) {
  return camposObrigatorios.some(campo => {
    return objeto[campo] === '' || objeto[campo] === undefined
  })
}

module.exports = {
  hasCamposVazios
}