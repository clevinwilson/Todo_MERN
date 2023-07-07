import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
