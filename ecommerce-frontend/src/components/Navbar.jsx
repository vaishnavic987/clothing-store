import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import '../styles/Navbar.scss'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <ShoppingCart />
            </div>
            <span className="logo-text">SHOPPER</span>
          </Link>

          {/* Navigation Links */}
          <div className="navbar-links">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/men"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Men
            </NavLink>
            <NavLink 
              to="/women"
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

          {/* Right Side - Login/User and Cart */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-section">
                <span className="user-greeting">Hi, {user?.name}</span>
                <Link to="/logout" className="logout-link">
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <button className="login-button">
                  Login
                </button>
              </Link>
            )}
            
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="cart-link">
              <ShoppingCart className="cart-icon" />
              <span className="cart-badge">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
