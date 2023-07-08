import React from 'react'
import Form from '../components/AuthForm'
import { signup } from '../services/user';

function SignupPage() {

    const handleSignUp = (values: object) => {
        console.log(values);
        signup(values).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <Form
                header={"SignUp"}
                redirect={"/login"}
                buttonName={"Sign Up"}
                redirectBtnName={"Login"}
                handleFunction={handleSignUp}
                formType={'signup'}>
            </Form>
        </div>
    )
}

export default SignupPage