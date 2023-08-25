import { parseJwt } from '@/plugins/token'

function setCookie(name, value, { exp }){
    const date = new Date()
    if( exp ) date.setTime(exp)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value},${expires};path=/;`
}

function getCookie(name){
    const cookies = document.cookie
    const cookie = cookies.split(`${name}=`)
    if(cookie.length == 2) return cookie[1].split(',')[0]
}

function delCookie(name){
   setCookie(name,"", -1)
}

function validateToken(){
    const cookie = getCookie('auth')
    const payload = parseJwt(cookie)
    if(payload){
        return {
            id: payload.id,
            name: payload.name,
            role: payload.role,
            exp: payload.exp
        }
    }
    return {
        id: undefined,
        name: undefined,
        role: undefined,
        exp: undefined
    }
}

export {
    setCookie,
    getCookie,
    delCookie,
    validateToken
}