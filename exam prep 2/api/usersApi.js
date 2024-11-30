import { request } from "../lib/requester.js"

const baseUrl = `http://localhost:3030/users`

export const register = (username,password) =>{
    return request('POST',`${baseUrl}/register`,{username,password})
}
export const login = (username,password) =>{
    return request('POST',`${baseUrl}/login`,{username,password})
}
export const logout = () =>{
    return request('GET', `${baseUrl}/logout`)
}