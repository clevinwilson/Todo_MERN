import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });


  //instance request interceptor
  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  

  // instance response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error.response?.data)
  );

  return instance;
};

export default axiosInstance;
