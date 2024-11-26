import { request } from "../lib/requester.js";

const baseUrl = `http://localhost:3030/data/cyberpunk`

export const getAll = () =>{
    return request ('GET', `${baseUrl}?sortBy=_createdOn%20desc`)
}
export const create = (itemData) =>{
    return request ('POST',baseUrl,itemData)
}
export const getOne = (itemId) =>{
    return request ('GET',`${baseUrl}/${itemId}`)
}
export const edit = (itemId,data) =>{
    return request ('PUT',`${baseUrl}/${itemId}`,data)
}

export const remove = (itemId) =>{
    return request ('DELETE', `${baseUrl}/${itemId}`)
}