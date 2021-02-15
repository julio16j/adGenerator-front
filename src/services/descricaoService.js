import api from './api'
const URL = {
  base: 'descricaoValor',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: () => `${URL.base}/`
}
export default {
  listar () {
    return api.get(URL.listar())
  },
  cadastrar (descricaoValor) {
    return api.post(URL.cadastrar(), descricaoValor)
  },
  getById (descricaoValorId) {
    return api.get(URL.getById(descricaoValorId))
  },
  deleteById (descricaoValorId) {
    return api.delete(URL.deleteById(), { descricaoValorId })
  }
}
