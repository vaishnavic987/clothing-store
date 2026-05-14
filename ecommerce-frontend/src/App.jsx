import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Logout from './pages/Logout'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Home />} />
      <Route path="/women" element={<Home />} />
      <Route path="/kids" element={<Home />} />
      <Route path="/shop/:category" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  )
}

export default App

