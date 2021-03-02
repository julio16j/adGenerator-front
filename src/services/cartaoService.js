import api from './api'
import Qs from 'qs'

const URL = {
  base: 'cartao',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}/`,
  editar: () => `${URL.base}/`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: (id) => `${URL.base}/${id}`,
  pesquisar: () => `${URL.base}/filtrar`
}

export default {
  listar () {
    return api.get(URL.listar())
  },
  cadastrar (cartao) {
    return api.post(URL.cadastrar(), cartao)
  },
  editar (cartao) {
    return api.put(URL.editar(), cartao)
  },
  getById (cartaoId) {
    return api.get(URL.getById(cartaoId))
  },
  deleteById (cartaoId) {
    return api.delete(URL.deleteById(cartaoId))
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
