import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
  baseURL: 'http://localhost:3000/web/api',
  timeout: 5000 // request timeout
})




export default service