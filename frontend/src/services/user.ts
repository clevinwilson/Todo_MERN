import axiosInstance from "../axios/axios";

//signup
export const signup = (values: object) => {
  return axiosInstance().post("/register", { ...values });
};

//login
export const login = (values: object) => {
  return axiosInstance().post("/login", { ...values });
};

//add todo
export const addTodoApi = (value: object) => {
  return axiosInstance().post("/todos", { ...value });
};

//fetchTodo
export const fetchTodos = () => {
  return axiosInstance().get("/todo");
};

//edit todo
export const editTodoApi = (id: string, text: string) => {
  return axiosInstance().patch(`/todo/${id}`, { text });
};

//delete todo
export const deleteTodoApi=(id:string)=>{
    return axiosInstance().delete(`/todo/${id}`)
}

//find account
export const findAccount=(values:object)=>{
  return axiosInstance().post('/send-otp', { ...values });
}

export const verifyOtp=(otp:string,email:string|boolean)=>{
  return axiosInstance().post('/verify-otp',{otp,email})
}


export const updatePassword=(value:string)=>{
  console.log(value);
  
  return axiosInstance().post('/update-password',{value})
}