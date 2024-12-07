import { request } from "../lib/requester.js";

const baseUrl = `http://localhost:3030/data/solutions`

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

/////
export const getAllOwner = (userId) =>{
    return request ('GET', `${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export const getByYear = (year) =>{
    return request ('GET', `${baseUrl}?where=year%3D${year}`)
}


const bonusUrl = "http://localhost:3030";
export const endpointLikes = {
    getItemLikes: (solutionId) => `${bonusUrl}/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    hasUserLikedItem: (itemId, userId) => `${bonusUrl}/data/likes?where=solutionId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    likeItem: `${bonusUrl}/data/likes`,
};