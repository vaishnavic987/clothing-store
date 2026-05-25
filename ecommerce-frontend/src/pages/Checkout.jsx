import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Checkout.scss'
import api from '../services/axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Checkout = () => {
    const navigate = useNavigate()
    const { items, totalAmount } = useSelector(state => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        shippingAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        phoneNumber: '',
        shippingMethod: 'standard'
    })


    const shippingFees = {
        standard: 8.00,
        express: 18.00
    }

    const selectedShippingFee = shippingFees[formData.shippingMethod]
    const taxRate = 0.075
    const subtotal = totalAmount
    const tax = subtotal * taxRate
    const total = subtotal + selectedShippingFee + tax

    const regionsByCountry = {
        India: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
            'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
            'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
            'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jamnu & Kashmir'
        ]
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleShippingMethodChange = (method) => {
        setFormData(prev => ({ ...prev, shippingMethod: method }))
    }

    const handleProceedToPayment = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const response = await api.post('/payments/create-checkout-session', {
            items,
            shippingDetails: formData,
            orderSummary: {
                subtotal,
                tax,
                shipping: selectedShippingFee,
                total
            }
        })


        const { sessionId, url } = response.data

        const stripe = await stripePromise
        if (!stripe) {
            console.log("Stripe failed to load properly.")
        }


        if (url) {
            window.location.href = url
        } else {
            const result = await stripe.redirectToCheckout({ sessionId })
            if (result.error) {
                alert(result.error.message)
            }
        }
    }

    if (items.length === 0) {
        return (
            <div className="checkout-page">
                <Navbar />
                <main className="checkout-main">
                    <div className="empty-checkout">
                        <h2>Your cart is empty</h2>
                        <p>Add some products before checking out!</p>
                        <button onClick={() => navigate('/')} className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <Navbar />

            <main className="checkout-main">
                <h1 className="checkout-title">CHECKOUT</h1>

                <div className="checkout-content">
                    <div className="shipping-section">
                        <h2>Shipping Information</h2>

                        <form id="checkout-form" onSubmit={handleProceedToPayment}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        minLength={3}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        minLength={3}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Shipping Address</label>
                                <input
                                    type="text"
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ZIP/Postal Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                        pattern="[0-9a-zA-Z]{5,10}"
                                        title="Please enter a valid postal code (5 to 10 alphanumeric characters)"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>
                                        State
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">
                                            Select State
                                        </option>
                                        {regionsByCountry[formData.country].map((region) => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{7,15}"
                                    title="Please enter a valid phone number containing 7 to 15 digits without spaces."
                                />
                            </div>

                            <div className="shipping-method">
                                <h3>Shipping Method</h3>
                                <div className="shipping-options">
                                    <label className="shipping-option">
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="standard"
                                            checked={formData.shippingMethod === 'standard'}
                                            onChange={() => handleShippingMethodChange('standard')}
                                        />
                                        <span>Standard (3-5 days) - $8.00</span>
                                    </label>
                                    <label className="shipping-option">
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="express"
                                            checked={formData.shippingMethod === 'express'}
                                            onChange={() => handleShippingMethodChange('express')}
                                        />
                                        <span>Express (1-2 days) - $18.00</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-header">
                            <span>Products</span>
                            <span>Image</span>
                        </div>

                        <div className="products-list">
                            {items.map((item, index) => (
                                <div key={`${item.product}-${item.size}`} className="summary-product">
                                    <div className="product-info">
                                        <span className="product-number">{index + 1}.</span>
                                        <img src={item.image} alt={item.name} className="product-image" />
                                        <div className="product-details">
                                            <p className="product-name">{item.name}</p>
                                            <p className="product-qty">Qty: {item.qty}</p>
                                            {item.qty > 1 && (
                                                <p className="product-unit-price">${item.price} each</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="total-items">
                                Total Items: {items.reduce((acc, item) => acc + item.qty, 0)}
                            </div>

                            <div className="total-row">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="total-row">
                                <span>Shipping:</span>
                                <span>${selectedShippingFee.toFixed(2)} (Standard)</span>
                            </div>

                            <div className="total-row">
                                <span>{`Tax ${formData.country === 'UAE' ? '(VAT)' : '(GST)'}:`}</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            <div className="total-row grand-total">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className="payment-btn"
                            form='checkout-form'
                        >
                            <Lock size={18} />
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Checkout
