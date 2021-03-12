const baseUrl = process.env.BASE_URL

export const URL = {
  base: 'storage/download',
  download: (fileName) => `${URL.base}/${fileName}`
}

export default {
  downloadUrl (fileName) {
    let url = baseUrl + '/' + URL.download(fileName)
    url = url.substring(1).replace('"', '')
    return url
  }
}
