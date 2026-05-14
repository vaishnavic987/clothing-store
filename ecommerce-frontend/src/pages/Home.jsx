import { useState, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import '../styles/Home.scss'
import api from '../api'

const Home = () => {
  const [sortBy, setSortBy] = useState('relevant')
  const navigate = useNavigate()
  const { category: paramCategory } = useParams()
  const location = useLocation()

  // Get category from URL path or params
  const category = useMemo(() => {
    if (paramCategory) return paramCategory
    const path = location.pathname.slice(1) // Remove leading slash
    if (['men', 'women', 'kids'].includes(path)) return path
    return null
  }, [paramCategory, location.pathname])

  // Filter products by category
  const filteredProducts = useMemo(async () => {

    try {
      const response = await api.get('/products')
      const data = response.data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }

    if (!category) {
      return data ?? products
    }
    return data ?? products.filter(product => product.mainCategory === category.toLowerCase())
  }, [category])

  const displayCount = filteredProducts.length

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-main">
        {/* Header with product count and sort */}
        <div className="home-header">
          <h2 className="product-count">
            Showing 1 - {displayCount} <span className="total-products">out of {displayCount} Products</span>
          </h2>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <button className="sort-button">
              <span className="sort-text">Sort by</span>
              <ChevronDown className="sort-icon" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Product Image */}
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">
                  {product.name}
                </h3>

                {/* Prices */}
                <div className="product-prices">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
