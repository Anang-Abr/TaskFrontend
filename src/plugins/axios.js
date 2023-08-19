import axios from 'axios'
import { delCookie, getCookie } from '@/plugins/cookie'

const api = axios.create({
    baseURL : "https://be.tautan.tk"
})

api.interceptors.request.use(
    (config) => {
        const token = getCookie('auth')
        if(!token) {
            delCookie('auth')
            return config
        }
        config.headers.Authorization = `Bearer ${token}`
    },
    (err) => {
        throw new err
    }
)

api.interceptors.response.use(
    (response) => response.data,
    (err) => {
        if(err.response.status === 401){
            delCookie('auth')
        }
        throw err
    }
)

export { api }