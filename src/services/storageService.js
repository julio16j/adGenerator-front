import api from './api'
const baseUrl = process.env.BASE_URL
export const URL = {
  base: 'storage',
  download: (fileName) => `${URL.base}/download/${fileName}`
}

export default {
  download (fileName) {
    return api.get(URL.download(fileName))
  },
  downloadUrl (fileName) {
    let url = baseUrl + '/' + URL.download(fileName)
    url = url.substring(1).replace('"', '')
    return url
  }
}
