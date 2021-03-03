import api from './api'
import Qs from 'qs'

const URL = {
  base: 'titulo',
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
  cadastrar (titulo) {
    return api.post(URL.cadastrar(), titulo)
  },
  editar (titulo) {
    return api.put(URL.editar(), titulo)
  },
  getById (tituloId) {
    return api.get(URL.getById(tituloId))
  },
  deleteById (tituloId) {
    return api.delete(URL.deleteById(tituloId))
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
