
export const setToken = ({token})=>{
    return localStorage.setItem('app-auth.token',token)
}

export const getToken = ()=>{
   return localStorage.getItem('app-auth.token')
}
