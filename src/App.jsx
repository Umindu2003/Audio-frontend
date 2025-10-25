import { Toaster } from 'react-hot-toast'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import LoginPage from './pages/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/register/register'
import Testing from './components/testing'
import BookingPage from './pages/home/bookingPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import VerifyEmail from './pages/verifyEmail/verifyEmail'

function App() {
  return (
    <GoogleOAuthProvider clientId='682183102181-tqbgti21jf47ekra8d4kan6u2rde7q33.apps.googleusercontent.com'>
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>

        <Route path="/testing" element={<Testing />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
