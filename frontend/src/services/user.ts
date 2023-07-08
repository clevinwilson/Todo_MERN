import axiosInstance from "../axios/axios";

//signup
export const signup = (values:object)=>{
    return axiosInstance().post("/signup", { ...values });
}