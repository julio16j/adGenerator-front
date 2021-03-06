import api from './api'
import Qs from 'qs'
const URL = {
  base: 'descricaoValor',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}`,
  editar: () => `${URL.base}/`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: (id) => `${URL.base}/${id}`,
  pesquisar: () => `${URL.base}/filtrar`
}
export default {
  listar () {
    return api.get(URL.listar())
  },
  cadastrar (descricaoValor) {
    return api.post(URL.cadastrar(), descricaoValor)
  },
  editar (descricaoValor) {
    return api.put(URL.editar(), descricaoValor)
  },
  getById (descricaoValorId) {
    return api.get(URL.getById(descricaoValorId))
  },
  deleteById (descricaoValorId) {
    return api.delete(URL.deleteById(descricaoValorId))
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
