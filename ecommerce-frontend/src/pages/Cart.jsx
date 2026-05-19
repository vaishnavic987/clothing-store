import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { X, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { removeFromCart, updateQuantity } from '../store/cartSlice'
import '../styles/Cart.scss'
import api from '../services/axios'

const Cart = () => {
  const [promoCode, setPromoCode] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { isAuthenticated } = useSelector(state => state.auth)
  const { items, totalAmount } = useSelector(state => state.cart)

  const shippingFee = 0 // Free shipping
  const total = totalAmount + shippingFee

  const handleRemoveItem = (id, selectedSize) => {
    dispatch(removeFromCart({ id, selectedSize }))
  }

  const handleQuantityChange = (id, selectedSize, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, selectedSize, quantity: newQuantity }))
    }
  }

  useEffect(() => {
    try {
      const fetchCart = async () => {
        if (isAuthenticated) {
          const response = await api.get('/orders/mine')
          const cartItems = response.data.items || []
          // Update cart state with fetched items
          cartItems.forEach(item => {
            dispatch(addToCart({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              selectedSize: item.selectedSize,
              quantity: item.quantity
            }))
          })
        }
      }

      fetchCart()
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
  }, [])

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout')
  }

  return (
    <div className="cart-page">
      <Navbar />

      <main className="cart-main">
        {!isAuthenticated && (
          <div className="auth-warning">
            <AlertCircle className="warning-icon" />
            <p>
              Please <Link to="/login">login</Link> to save your cart and proceed with checkout.
            </p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items Table */}
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.id}-${item.selectedSize}`}>
                      <td>
                        <div className="product-image-cell">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </td>
                      <td>
                        <div className="product-title">
                          {item.name}
                          {item.selectedSize && (
                            <span className="product-size">Size: {item.selectedSize}</span>
                          )}
                        </div>
                      </td>
                      <td className="price-cell">${item.price}</td>
                      <td>
                        <div className="quantity-control">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                item.selectedSize,
                                parseInt(e.target.value) || 1
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="total-cell">${item.totalPrice}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                          aria-label="Remove item"
                        >
                          <X />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary-wrapper">
              <div className="cart-totals">
                <h2>Cart Totals</h2>

                <div className="totals-row">
                  <span>Subtotal</span>
                  <span className="amount">${totalAmount.toFixed(2)}</span>
                </div>

                <div className="totals-row">
                  <span>Shipping Fee</span>
                  <span className="amount">{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</span>
                </div>

                <div className="totals-row total">
                  <span>Total</span>
                  <span className="amount">${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Cart
