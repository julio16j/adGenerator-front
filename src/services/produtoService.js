import api from './api'
import Qs from 'qs'

const URL = {
  base: 'produto',
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
  cadastrar (produto) {
    return api.post(URL.cadastrar(), produto)
  },
  editar (produto) {
    return api.put(URL.editar(), produto)
  },
  getById (produtoId) {
    return api.get(URL.getById(produtoId))
  },
  deleteById (produtoId) {
    return api.delete(URL.deleteById(produtoId))
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
