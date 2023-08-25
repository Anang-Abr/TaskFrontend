function parseJwt(token){
    if(!token) return {}
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    return payload
}

export {
    parseJwt
}