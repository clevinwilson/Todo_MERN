import { Link, useNavigate, useLocation } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updatePassword } from "../services/user";
import { toast } from "react-toastify";

function NewPassword() {
    const navigate = useNavigate();


    //Yup form validation
    const validate = Yup.object({
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is Required')
    });

    //formik state
    const initialValues = {
        newPassword: '',
    }

    //submiting the form data
    const onSubmit = (values: object): void => {
        updatePassword(values)
            .then((response) => {
                navigate('/')
            }).catch((err) => {
                toast.error(err.message, {
                    position: "top-center",
                });
            })
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Formik initialValues={initialValues}
                validationSchema={validate}
                onSubmit={onSubmit}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                                Change password
                            </h1>
                            <Form className="space-y-4 md:space-y-6" >

                                <div>
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <Field type="text" name="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="newPassword" >
                                        {(error: string) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <button type="submit" className="w-full  bg-primary-600 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Submit</button>

                                <Link to={'/'}>

                                    <p className="text-sm font-light text-gray-800  text-center mt-4 dark:text-gray-400">
                                        Back to Login ?  <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</span>
                                    </p>

                                </Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </Formik>
        </section>
    )
}

export default NewPassword