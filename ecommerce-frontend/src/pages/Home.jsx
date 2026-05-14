import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ChevronDown } from 'lucide-react'
import '../styles/Home.scss'
import api from '../services/axios'

const Home = () => {
  const [sortBy, setSortBy] = useState('relevant')
  const [allProducts, setAllProducts] = useState([])
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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        const apiProducts = response.data.products || response.data
        setAllProducts(apiProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (!category) {
      return allProducts
    }
    return allProducts.filter(product => {
      const productCategory = product.category || product.mainCategory
      return productCategory === category.toLowerCase() || productCategory === `${category.toLowerCase()}s`
    })
  }, [category, allProducts])

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
          {filteredProducts.map((product) => {
            const productId = product._id || product.id
            const displayPrice = product.price >= 100 ? (product.price / 100).toFixed(2) : product.price
            
            return (
              <div
                key={productId}
                className="product-card"
                onClick={() => navigate(`/product/${productId}`)}
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
                    <span className="current-price">${displayPrice}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
