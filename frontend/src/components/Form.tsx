import { Link } from "react-router-dom";

type FormProps = {
    header: string,
    redirect: string,
    buttonName: string,
    redirectBtnName: string,
    handleFunction: () => void,
    formType: string,
}

function Form({ header, redirect, buttonName, redirectBtnName, handleFunction, formType }: FormProps) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                            {header}
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>


                            <button type="submit" className="w-full  bg-primary-600 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">{buttonName}</button>
                            {formType === 'login' && (
                                <Link to={'/forgot-password'} >
                                    <div className="flex items-center mt-4 justify-center">
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ">Forgot password?</a>
                                    </div>
                                </Link>
                            )}
                            <Link to={redirect}>
                                {formType === 'login' ?
                                    <p className="text-sm font-light text-gray-800 mt-4 text-center dark:text-gray-400">
                                        Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">{redirectBtnName}</span>
                                    </p>
                                    :
                                    <p className="text-sm font-light text-gray-800  text-center mt-4 dark:text-gray-400">
                                        Already On learnwise ?  <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">{redirectBtnName}</span>
                                    </p>
                                }
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form