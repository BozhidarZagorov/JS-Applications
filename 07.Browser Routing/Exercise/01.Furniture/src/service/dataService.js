import { api } from "../requester.js"

const BASE_URL = "http://localhost:3030/data"

const endpoints = {
    myFurnitures:(userId)=> `/catalog?where=_ownerId%3D%22${userId}%22`,
    furnitures: '/catalog'
}
async function createFurniture(data) {
    return await api.post(BASE_URL + endpoints.furnitures,data)
}
async function getAllFurniture() {
    return await api.get(BASE_URL + endpoints.furnitures)
}

async function getFurnitureDetails(id) {
    return await api.get(BASE_URL + endpoints.furnitures + `/${id}`)
}
async function updateFurniture(id,data) {
    return await api.put(BASE_URL + endpoints.furnitures + `/${id}`,data)
}
async function deleteFurniture(id) {
    return await api.del(BASE_URL + endpoints.furnitures + `/${id}`)
}
async function getMyFurniture(id,data) {
    return await api.get(BASE_URL + endpoints.myFurnitures(userId),data)
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    getFurnitureDetails,
    updateFurniture,
    deleteFurniture,
    getMyFurniture
}