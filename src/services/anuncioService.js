import api from './api'
import Qs from 'qs'

const URL = {
  base: 'anuncio',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}/`,
  editar: () => `${URL.base}/`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: (id) => `${URL.base}/${id}`,
  pesquisar: () => `${URL.base}/filtrar`,
  totalDia: (divulgadorId) => `${URL.base}/dia/${divulgadorId}`,
  totalMes: (divulgadorId) => `${URL.base}/mes/${divulgadorId}`
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
  getById (anuncioId) {
    return api.get(URL.getById(anuncioId))
  },
  deleteById (anuncioId) {
    return api.delete(URL.deleteById(anuncioId))
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
  totalDia (divulgadorId) {
    return api.get(URL.totalDia(divulgadorId))
  },
  totalMes (divulgadorId) {
    return api.get(URL.totalMes(divulgadorId))
  }
}
