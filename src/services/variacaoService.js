import api from './api'
import Qs from 'qs'

const URL = {
  base: 'variacaoModelo',
  listar: () => `${URL.base}/`,
  deleteById: (id) => `${URL.base}/${id}`,
  pesquisar: () => `${URL.base}/filtrar`,
  listarVariacoesSemAnuncio: () => `${URL.base}/semAnuncio`
}
export default {
  listar () {
    return api.get(URL.listar())
  },
  deleteById (chave) {
    return api.delete(URL.deleteById(chave))
  },
  pesquisar (filtro) {
    return api.get(URL.pesquisar(), {
      silentNotify: true,
      params: filtro,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })
  },
  listarVariacoesSemAnuncio (filtro) {
    return api.get(URL.listarVariacoesSemAnuncio(), {
      silentNotify: true,
      params: filtro,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })
  }
}
