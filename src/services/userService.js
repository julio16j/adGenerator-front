import api from './api'
export default {
  login (usuario) {
    return api.post('usuario/login', usuario)
  },
  cadastrar (usuario) {
    return api.post('usuario', usuario)
  },
  getById (id) {
    return api.get('usuario/' + id)
  },
  getUsuarioDisponiveis () {
    return api.get('usuario/disponiveis')
  }
}
