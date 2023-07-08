import { toast } from "react-toastify";
import Form from '../components/AuthForm'
import { signup } from '../services/user';

function SignupPage() {

    const handleSignUp = (values: object) => {
        console.log(values);
        signup(values).then((response) => {
            console.log(response);
        }).catch((err) => {
            toast.error(err.error.message, {
                position: "top-center",
            });
        })
    }

    return (
        <div>
            <Form
                header={"SignUp"}
                redirect={"/"}
                buttonName={"Sign Up"}
                redirectBtnName={"Login"}
                handleFunction={handleSignUp}
                formType={'signup'}>
            </Form>
        </div>
    )
}

export default SignupPage