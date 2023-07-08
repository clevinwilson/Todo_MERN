import Form from '../components/AuthForm'
import { login } from '../services/user';

function LoginPage() {


    const handleLogin = (values:object) => {
        console.log(values);
        login(values).then((response)=>{
            console.log(response);
            
        })
        .catch((error)=>{
            console.log(error);
            
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