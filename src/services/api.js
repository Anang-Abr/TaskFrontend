import { api as baseApi } from '@/plugins/axios.js'

const api = '/auth'

const login = async (body) => baseApi.post(`${api}/login`, body)
const register = async (body) => baseApi.post(`${api}/register`, body)

export default { login, register }