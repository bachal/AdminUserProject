import { httpAxios } from "../helper/httpAxios";

const apiHeaderToken = { headers: { 'token': localStorage.getItem('userToken') } }
const tokenUpdate = async () => {
    return apiHeaderToken.headers.token = localStorage.getItem('userToken')
}

const userLogin = async (payload) => {
    try {
        const response = await httpAxios.post('/login', payload)
        const userData = await response.data
        return userData
    }
    catch (err) {
        console.log(err)
    }
}

const getUserList = async () => {
    await tokenUpdate();
    try {
        const response = await httpAxios.get('/seller-list', apiHeaderToken)
        const users = await response.data
        return users
    }
    catch (err) {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    try {
        const response = await httpAxios.get(`/seller-delete?userId=${id}`, apiHeaderToken)
        const users = await response.data
        return users
    }
    catch (err) {
        console.log(err)
    }
}

const getCountry = async () => {
    try {
        const response = await httpAxios.get(`/country-list`, apiHeaderToken)
        const countryData = await response.data
        return countryData
    }
    catch (err) {
        console.log(err)
    }
}

const getStates = async (id) => {
    try {
        const response = await httpAxios.get(`state-list-by-country?countryId=${id}`, apiHeaderToken)
        const statesData = await response.data
        return statesData
    }
    catch (err) {
        console.log(err)
    }
}

const addUser = async (data) => {
    try {
        const response = await httpAxios.post(`seller-create`, data, apiHeaderToken)
        const userAdded = await response.data
        return userAdded
    }
    catch (err) {
        console.log(err)
    }
}

const uploadImage = async (data) => {
    try {
        const response = await httpAxios.post(`upload-image`, data)
        const uploadImage = await response.data
        return uploadImage
    }
    catch (err) {
        console.log(err)
    }

}
export { userLogin, getUserList, deleteUser, getCountry, getStates, addUser, uploadImage }