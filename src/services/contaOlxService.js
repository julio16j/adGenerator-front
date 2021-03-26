import api from './api'
import Qs from 'qs'

const URL = {
  base: 'contaOlx',
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
  cadastrar (formData) {
    return api.post(URL.cadastrar(), formData)
  },
  editar (formData) {
    return api.put(URL.editar(), formData)
  },
  getById (contaOlxId) {
    return api.get(URL.getById(contaOlxId))
  },
  deleteById (contaOlxId) {
    return api.delete(URL.deleteById(contaOlxId))
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
