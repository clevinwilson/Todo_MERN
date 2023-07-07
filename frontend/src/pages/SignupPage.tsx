import React from 'react'
import Form from '../components/AuthForm'

function SignupPage() {

    const handleSignUp = () => {
        console.log('hellog');

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