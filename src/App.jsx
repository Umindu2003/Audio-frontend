import { Toaster } from 'react-hot-toast'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import LoginPage from './pages/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/register/register'
import Testing from './components/testing'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/testing" element={<Testing />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
