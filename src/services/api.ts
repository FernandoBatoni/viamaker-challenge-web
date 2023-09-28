import axios from 'axios'

import { server } from '../config'

const api = axios.create({
  baseURL: server,
  timeout: 30000
})

api.defaults.headers.post['Content-Type'] = 'application/json'

export default api
