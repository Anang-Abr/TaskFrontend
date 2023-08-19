function setCookie(name, value, { exp }){
    const date = new Date()
    if( exp ) date.setTime(exp)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;`
}

function getCookie = (name){
    const cookies = document.cookie
    const cookie = cookies.split(`${name}=`)
    if(cookie.length == 2) return cookie[0].split(';')[0]
}

function delCookie(name){
   setCookie(name,"", -1)
}

export {
    setCookie,
    getCookie,
    delCookie
}