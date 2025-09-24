import { Toaster } from 'react-hot-toast'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import LoginPage from './pages/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
