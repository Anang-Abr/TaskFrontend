import { api as baseApi } from '@/plugins/axios.js'

const todo = '/api/todo'

const list = () => baseApi.get(`${todo}`)
const create = (body) => baseApi.post(`${todo}`, body)
const edit = (id, body) => baseApi.put(`${todo}/${id}`, body)
const remove = (id) => baseApi.delete(`${todo}/${id}`)


export default { list, create, edit, remove }