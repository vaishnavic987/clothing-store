import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Star, ChevronRight } from 'lucide-react'
import { products } from '../data/products'
import '../styles/ProductDetails.scss'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedImage(0)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    console.log('Adding to cart:', { product, size: selectedSize })
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

  return (
    <div className="product-details-page">
      <Navbar />
      
      <main className="product-details-main">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-item" onClick={() => navigate('/')}>HOME</span>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item" onClick={() => navigate('/')}>SHOP</span>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item">Men</span>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">{product.name}</span>
        </div>

        <div className="product-details-content">
          {/* Left Side - Images */}
          <div className="product-images">
            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="review-count">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="product-pricing">
              <span className="original-price">${product.originalPrice}</span>
              <span className="current-price">${product.price}</span>
            </div>

            {/* Description */}
            <p className="product-description">{product.description}</p>

            {/* Size Selector */}
            <div className="size-selector">
              <h3 className="size-label">Select Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>

            {/* Category */}
            <div className="product-category">
              <span className="label">Category :</span>
              <span className="value">{product.category.join(', ')}</span>
            </div>

            {/* Tags */}
            <div className="product-tags">
              <span className="label">Tags :</span>
              <span className="value">{product.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetails
