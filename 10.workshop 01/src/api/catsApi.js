const url = 'https://rent-a-cat-c2471-default-rtdb.europe-west1.firebasedatabase.app/cats'

async function getAll (){
    const responce = await fetch(`${url}.json`)
    const result = await responce.json()

    const cats = Object.keys(result).map(id=> ({id, ...result[id]}))
    return cats
}

async function getOne(catId) {
    const responce = await fetch(`${url}/${catId}.json`)
    const data = await responce.json()

    return data
}

async function create(data) {
    const response = await fetch(`${url}.json`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()

    return result
}
export default {
    getAll,
    create,
    getOne
}