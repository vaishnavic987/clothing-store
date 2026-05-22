import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Star, ChevronRight, ArrowLeft } from 'lucide-react'
import { addToCart } from '../store/cartSlice'
import api from '../services/axios'
import '../styles/ProductDetails.scss'

const ProductDetails = ({ product, onBack }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [sizeError, setSizeError] = useState('')

  useEffect(() => {
    // Reset selections when product changes
    setSelectedImage(0)
    setSelectedSize('')
  }, [product])

  const handleAddToCart = async() => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }

    if (!selectedSize) {
      setSizeError('Please select a size')
      return
    }
    
    setSizeError('')
    const productId = product._id || product.id
    const displayPrice = product.price >= 100 ? parseFloat((product.price / 100).toFixed(2)) : product.price
    
    dispatch(addToCart({
      product: productId,
      name: product.name,
      price: displayPrice,
      image: product.image,
      size: selectedSize,
      qty: 1
    }))

    try {
      await api.post('/cart', {
        product: productId,
        name: product.name,
        price: displayPrice,
        image: product.image,
        size: selectedSize,
        qty: 1
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ))
  }

  if (!product) {
    return <div>Loading...</div>
  }

  const availableSizes = product.size || product.sizes || []
  const productImages = product.images || [product.image]
  const displayPrice = product.price >= 100 ? (product.price / 100).toFixed(2) : product.price
  const productCategory = product.category || 'Product'

  return (
    <div className="product-details-page">
      <Navbar />
      
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              ×
            </button>
            <h2>Login Required</h2>
            <p>Please login to add items to your cart</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowLoginModal(false)}>
                Cancel
              </button>
              <button className="modal-btn login" onClick={() => navigate('/login', { state: { redirectToProduct: product } })}>
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="product-details-main">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="breadcrumb">
          <span className="breadcrumb-item" onClick={onBack}>HOME</span>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">{product.name}</span>
        </div>

        <div className="product-details-content">
          <div className="product-images">
            {productImages.length > 1 && (
              <div className="thumbnail-gallery">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}

            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating || 0)}
              </div>
              {product.numReviews !== undefined && (
                <span className="review-count">({product.numReviews})</span>
              )}
              {product.reviewCount !== undefined && (
                <span className="review-count">({product.reviewCount})</span>
              )}
            </div>

            <div className="product-pricing">
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
              <span className="current-price">${displayPrice}</span>
            </div>

            <p className="product-description">{product.description}</p>

            {availableSizes.length > 0 && (
              <div className="size-selector">
                <h3 className="size-label">Select Size</h3>
                <div className="size-options">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSize(size)
                        setSizeError('')
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeError && (
              <div className="size-error-message">
                {sizeError}
              </div>
            )}

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>

            {product.category && (
              <div className="product-category">
                <span className="label">Category :</span>
                <span className="value">{Array.isArray(product.category) ? product.category.join(', ') : product.category}</span>
              </div>
            )}

            {product.brand && (
              <div className="product-brand">
                <span className="label">Brand :</span>
                <span className="value">{product.brand}</span>
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                <span className="label">Tags :</span>
                <span className="value">{product.tags.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetails
