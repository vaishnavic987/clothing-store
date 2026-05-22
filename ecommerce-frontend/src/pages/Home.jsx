import { useState, useMemo, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductDetails from './ProductDetails'
import { ChevronDown } from 'lucide-react'
import '../styles/Home.scss'
import api from '../services/axios'

const Home = () => {
  const [sortBy, setSortBy] = useState('relevant')
  const [allProducts, setAllProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get('search')

  const category = useMemo(() => {
    const path = location.pathname.slice(1)
    if (['mens', 'womens', 'kids'].includes(path)) return path
    return null
  }, [location.pathname])


  useEffect(() => {
    if (location.state?.openProduct) {
      // Automatically reopen the product details view
      setSelectedProduct(location.state.openProduct)
      
      // Clear the router state so the page doesn't  re-open 
      // the product details view if the user manually reloads the page later
      window.history.replaceState({}, document.title)
    }
  }, [location])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let url = '/products?pageNumber=1'
        if (searchQuery) {
          url = `/products?search=${encodeURIComponent(searchQuery)}`
        }
        if (category) {
          url += `&category=${encodeURIComponent(category.toLowerCase())}`
        }

        const response = await api.get(url)
        const apiProducts = response.data.products || response.data
        setAllProducts(apiProducts)
        setCurrentPage(1)
        setHasMore(apiProducts.length >= 12) 
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery, category])

  const filteredProducts = allProducts

  const displayCount = filteredProducts.length

  const handleLoadMore = async () => {
    if (searchQuery) {
      return
    }
    
    try {
      setLoadingMore(true)
      const nextPage = currentPage + 1
      let url = `/products?pageNumber=${nextPage}`
      
      if (category) {
        url += `&category=${encodeURIComponent(category.toLowerCase())}`
      }
      
      const response = await api.get(url)
      const newProducts = response.data.products || response.data
      
      if (newProducts.length > 0) {
        setAllProducts(prevProducts => [...prevProducts, ...newProducts])
        setCurrentPage(nextPage)
        setHasMore(newProducts.length >= 12) 
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleBackToProducts = () => {
    setSelectedProduct(null)
  }

  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} onBack={handleBackToProducts} />
  }

  if (loading) {
    return (
      <div className="home-page">
        <Navbar />
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <Navbar />

      {!category && !searchQuery && (
        <section className="hero-banner">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Exclusive
                <br />
                Offers For You
              </h1>
              <p className="hero-subtitle">ONLY ON BEST SELLERS PRODUCTS</p>
              <button className="hero-button">Check now</button>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" alt="Latest Fashion" />
            </div>
          </div>
        </section>
      )}

      <main className="home-main">
        {searchQuery && (
          <div style={{ 
            padding: '1rem 2rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
              Search results for: <strong>"{searchQuery}"</strong>
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="latest-products-section">
          <h2 className="latest-products-title">
            {!searchQuery ? 'Latest Products' : ''}
          </h2>
          <div className="title-underline"></div>
        </div>

        <div className="product-grid">
          {filteredProducts.length === 0 && searchQuery ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No products found</h3>
              <p>Try searching with different keywords</p>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const productId = product._id || product.id
              const displayPrice = product.price >= 100 ? (product.price / 100).toFixed(2) : product.price
              
              return (
                <div
                  key={productId}
                  className="product-card"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      loading='lazy'
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">
                      {product.name}
                    </h3>

                    <div className="product-prices">
                      <span className="current-price">${displayPrice}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {hasMore && !loading && !searchQuery && filteredProducts.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: loadingMore ? '#ccc' : '#ff4141',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loadingMore ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!loadingMore) {
                  e.target.style.backgroundColor = '#e63939'
                  e.target.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loadingMore) {
                  e.target.style.backgroundColor = '#ff4141'
                  e.target.style.transform = 'translateY(0)'
                }
              }}
            >
              {loadingMore ? 'Loading...' : 'View More'}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Home
