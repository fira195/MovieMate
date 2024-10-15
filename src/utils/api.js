import axios from "axios";
const getToken=()=>{
    console.log(localStorage.getItem('accessToken'))
    return localStorage.getItem('accessToken')
}
export const api=axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjkwMDU2MDgsImV4cCI6MTcyOTAwNTY2OH0.c2aF4B9om6eRq-5mn--vJ0AnyaoqMaOlhGwrHLPaG00`,
      },
    
})
