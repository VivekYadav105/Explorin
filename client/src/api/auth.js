import fetcherInstance from "./axiosUtils"

const loginApi = async(data)=>{
    const axios = fetcherInstance()
    const response = await axios.post('/user/login',data)
    console.log(response.data.token);
    localStorage.setItem('token',response.data.token)
    return response.data
}

const verifyToken = async()=>{
    const axios = fetcherInstance()
    const response = await axios.post('/verifyToken')
    return response
}

export {loginApi,verifyToken}