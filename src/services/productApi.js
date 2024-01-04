import { httpAxios, httpLoginAxios } from "../helper/httpAxios";
const apiHeaderToken = { headers: { 'token': localStorage.getItem('userToken') } }
const tokenUpdate = async () => {
    return apiHeaderToken.headers.token = localStorage.getItem('userToken')
}

const getProducts = async () => {
    await tokenUpdate();
    try {
        const response = await httpAxios.get(`/product-list`, apiHeaderToken)
        const productData = await response.data
        return productData
    }
    catch (err) {
        console.log(err)
    }
}

const addProduct = async (data) => {
    try {
        const response = await httpAxios.post(`create-product`, data, apiHeaderToken)
        const productAdded = await response.data
        return productAdded
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
export { getProducts, addProduct,uploadImage }