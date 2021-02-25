import api from './api'
import Qs from 'qs'
const URL = {
  base: 'modelo',
  listar: () => `${URL.base}/`,
  pesquisar: () => `${URL.base}/filtrar`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: (modeloId) => `${URL.base}/${modeloId}`
}
export default {
  listar () {
    return api.get(URL.listar())
  },
  cadastrar (modelo) {
    return api.post(URL.cadastrar(), modelo)
  },
  getById (modeloId) {
    return api.get(URL.getById(modeloId))
  },
  deleteById (modeloId) {
    return api.delete(URL.deleteById(modeloId))
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
