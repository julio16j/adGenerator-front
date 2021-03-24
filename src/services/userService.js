import api from './api'
import Qs from 'qs'
const URL = {
  base: 'usuario',
  login: () => `${URL.base}/login`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  getUsuarioDisponiveis: () => `${URL.base}/disponiveis`,
  pesquisarDivulgador: () => `${URL.base}/divulgador`
}
export default {
  login (usuario) {
    return api.post(URL.login(), usuario)
  },
  cadastrar (usuario) {
    return api.post(URL.cadastrar(), usuario)
  },
  getById (id) {
    return api.get(URL.getById(id))
  },
  getUsuarioDisponiveis () {
    return api.get(URL.getUsuarioDisponiveis())
  },
  pesquisarDivulgador (filtro) {
    return api.get(URL.pesquisarDivulgador(), {
      silentNotify: true,
      params: filtro,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })
  }
}
