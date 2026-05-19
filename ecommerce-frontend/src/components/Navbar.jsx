import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, Search } from 'lucide-react'
import { useState } from 'react';
import { logout } from '../store/authSlice'
import { clearCart } from '../store/cartSlice'
import '../styles/Navbar.scss'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { totalQuantity } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    
    setTimeout(() => {
      dispatch(logout())
      dispatch(clearCart())
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
      setIsLoggingOut(false)
    }, 1000)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <ShoppingCart />
            </div>
            <span className="logo-text">SHOPPER</span>
          </Link>

          <div className="navbar-links">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/mens"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Men
            </NavLink>
            <NavLink 
              to="/womens"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Women
            </NavLink>
            <NavLink 
              to="/kids"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Kids
            </NavLink>
          </div>


          <form onSubmit={handleSearchSubmit} className="navbar-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-section">
                <span className="user-greeting">Hi, {user?.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="logout-link"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <span className="logout-loader">
                      <span className="spinner"></span>
                      Logging out...
                    </span>
                  ) : (
                    'Logout'
                  )}
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <button className="login-button">
                  Login
                </button>
              </Link>
            )}
            
            <Link to="/cart" className="cart-link">
              <ShoppingCart className="cart-icon" />
              {totalQuantity > 0 && (
                <span className="cart-badge">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
