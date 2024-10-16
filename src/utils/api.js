import axios from "axios";
import { toast } from "sonner";

const getToken = () => {
  return localStorage.getItem("accessToken");
};
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

const refreshToken = async (originalRequest) => {
  axios
    .post("http://localhost:3000/api/users/refresh-token",{},{
        withCredentials:true
    })
    .then((response) => {
        console.log('token refreshed')
      localStorage.setItem('accessToken',response?.data?.data?.accessToken);
      return api(originalRequest)
    })
    .catch((err) => {
        console.log(err)
      if (err.status === 401)
        return toast.error(err  .response?.data?.data?.message);
      console.log(err);
    });
};
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest=error.config
    console.log(!originalRequest._retry)
    if (error.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      refreshToken(originalRequest);
    }

    return Promise.reject(error);
  }
);
