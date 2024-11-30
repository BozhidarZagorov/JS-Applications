export const saveUserData = (userData) => {
    localStorage.setItem('_id',userData._id)
    localStorage.setItem('username',userData.username)
    localStorage.setItem('accessToken',userData.accessToken)
}

export const getUserData = () =>{
    const userData = {
        _id:localStorage.getItem('_id'),
        username:localStorage.getItem('username'),
        accessToken:localStorage.getItem('accessToken')
    }
    return userData
}

export const clearUserData = () =>{
    localStorage.clear()
}