import api from './api'

const URL = {
  base: 'storage',
  download: (fileName) => `${URL.base}/download/${fileName}`
}

export default {
  download (fileName) {
    return api.get(URL.download(fileName))
  }
}
