import { request } from "../lib/requester.js";
import { getUserData } from "../utils/userUtils.js";

const baseUrl = `http://localhost:3030/data/characters`

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

////

const bonusUrl = `http://localhost:3030/data/useful`

export const likeChar = (itemId) =>{
    return request ('POST',bonusUrl,{itemId})
}
export async function getLikesByCharId(characterId) {
    const userData = getUserData()

    const requests = [
        request('GET',`${bonusUrl}?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`)
    ]
    if (userData) {
        requests.push(request('GET',`${bonusUrl}?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userData._id}%22&count`))
    }
    const [likes,hasLiked] = await Promise.all(requests)

    return{
        likes,
        hasLiked:Boolean(hasLiked)
    }
}


// export const getlikesOnPost = (characterId) =>{
//     return request ('GET', `${bonusUrl}?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`)
// }
// export const likesByUser = (characterId,userId) =>{
//     return request ('GET', `${bonusUrl}?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
// }