import React from 'react'
import Form from '../components/AuthForm'

function LoginPage() {


    const handleLogin = () => {
        console.log('he');
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