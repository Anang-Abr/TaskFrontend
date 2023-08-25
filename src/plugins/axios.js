import axios from 'axios'
import { delCookie, getCookie } from '@/plugins/cookie'

const api = axios.create({
    baseURL : "https://be.tautan.tk"
})

api.interceptors.request.use(
    (config) => {
        const token = getCookie('auth')
        if(token) {
        config.headers.Authorization = `Bearer ${token}`
        }
        else{
            delCookie('auth')
            delete config.headers.Authorization
        }
        return config

    },
    (err) => {
        throw new err
    }
)

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        switch (error.response.status) {
      case 401:
        delCookie('CERT')
        break
      default:
        break
    }
    throw error?.response?.data ?? error
    }
)

export { api }