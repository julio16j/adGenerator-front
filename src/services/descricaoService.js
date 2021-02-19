import api from './api'
import Qs from 'qs'
const URL = {
  base: 'descricaoValor',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: () => `${URL.base}/`,
  pesquisar: () => `${URL.base}/filtrar`
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
  },
  pesquisar (filtro) {
    return api.get(URL.pesquisar(), {
      silentNotify: true,
      params: filtro,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })
  }
}
