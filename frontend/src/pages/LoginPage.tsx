import { useNavigate } from 'react-router-dom';
import Form from '../components/AuthForm'
import { login } from '../services/user';
import { toast } from "react-toastify";


interface Response {
    data?: {
        token?: string;
    };
    error: {
        message: string;
    };
}


function LoginPage() {

    const navigate=useNavigate();

    const handleLogin = (values:object) => {
        console.log(values);
        login(values).then((response)=>{
            localStorage.setItem('jwtToken', response.data?.token);
            navigate('/todo-list');
        })
        .catch((err:Response)=>{
            toast.error(err.error.message, {
                position: "top-center",
            });
            
        })
    }
    return (
        <Form
            header={"Login"}
            redirect={"/signup"}
            buttonName={"Login"}
            redirectBtnName={"Sign up"}
            handleFunction={handleLogin}
            formType={'login'}>
        </Form>
    )
}

export default LoginPage