import { getUserData } from "../utils/userUtils.js";

export const request = async (method,url,data) =>{
    const { accessToken }= getUserData()
    let requestOptions = {}

    if (data) {
        requestOptions.headers = {
            'Content-Type': 'application/json',
        };
        requestOptions.body = JSON.stringify(data)
    }
    if (accessToken) {
        requestOptions.headers={
            ...requestOptions.headers,
            'X-Authorization': accessToken,
        }
    }
    if (method !=='GET') {
        requestOptions.method = method
    }
    const responce = await fetch(url,requestOptions)

    if (!responce.ok) {
        throw responce.json()
        
    }
    if (responce.status == 204) {
        return
    }

    const result = await responce.json()

    return result
}