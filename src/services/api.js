import axios from 'axios'
let baseUrl = process.env.BASE_URL
baseUrl = baseUrl.substring(1).replace('"', '')
export default axios.create({
  baseURL: baseUrl
})
