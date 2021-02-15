import api from './api'
const URL = {
  base: 'modelo',
  listar: () => `${URL.base}/`,
  cadastrar: () => `${URL.base}`,
  getById: (id) => `${URL.base}/${id}`,
  deleteById: () => `${URL.base}/`
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
    return api.delete(URL.deleteById(), { modeloId })
  }
}
