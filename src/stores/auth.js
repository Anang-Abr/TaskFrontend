import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { validateToken, setCookie, delCookie } from '@/plugins/cookie'
import s$api from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  const cred = reactive({
    id: undefined,
    name: undefined,
    role: undefined
  })
  
  const isLoggedIn = computed(() => !!cred.id)
  const getCred = computed(() => cred)

  function setUser() {
    const data = validateToken() || {
    id: undefined,
    name: undefined,
    role: undefined
    }
    Object.assign(cred, data)
    console.log("cred",cred)
    if(!data.id) logout()
    return data
  }

  async function register(payload) {
    const result = await s$api.register(payload)
    return result
  }

  async function login(payload) {
    const result = await s$api.login(payload)
    if(result.status){
      setCookie('auth', result.data.token, {exp: result.data.expiresAt})
      return true
    }
    return false
  }

  async function logout() {
    delCookie('auth')
  }
  

  return { getCred, setUser, register, login, logout, isLoggedIn }
})
