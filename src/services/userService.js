import api from './api'
const URL = {
  base: 'usuario',
  login: () => `${URL.base}/login`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  getUsuarioDisponiveis: () => `${URL.base}/disponiveis`
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
  }
}
