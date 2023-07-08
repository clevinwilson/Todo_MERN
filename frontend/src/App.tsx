import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './pages/TodoList';
import NewPassword from './pages/NewPassword';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/todo-list' element={<TodoList />} />
          <Route path='/change-password' element={<NewPassword/>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
