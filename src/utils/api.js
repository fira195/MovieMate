import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

const getToken=()=>{
    console.log(localStorage.getItem('accessToken'))
    return localStorage.getItem('accessToken')
}
export const api=axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
    
})
api.interceptors.response.use(response=>{
    return response
}, error=>{
    if (error.response.status === 403)console.log(error)
    return Promise.reject(error)
})
