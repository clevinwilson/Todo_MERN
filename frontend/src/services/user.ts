import axiosInstance from "../axios/axios";

//signup
export const signup = (values:object)=>{
    return axiosInstance().post("/register", { ...values });
}

//login 
export const login =(values:object)=>{
    return axiosInstance().post('/login',{...values})
}