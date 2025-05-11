

// export default CheckoutSec;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import axios from 'axios';
import '../../scss/CheckoutSec.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with the public key
const stripePromise = loadStripe('pk_test_51RNAAX2VepmVN62YyRMUS14kHFTbaIj4Ec2wvY3SXssf5Q8cqbJAhotbktS5qC28Vfj9KY9ZzUrKFWNBU8bLEm94003r3SqlL8'); // Replace with your actual public key

const CheckoutSec = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;
  const [placingOrder, setPlacingOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    // Calculate the total amount for the cart
    const total = storedCart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalAmount(total);
  }, []);

  const handlePlaceOrder = async () => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    if (!shippingAddress) {
      alert("Please enter a shipping address!");
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await axios.post('http://localhost:8081/checkout', {
        userId,
        items: cart.map(item => ({
          quantity: item.quantity,
          ingredient_id: item.ingredient_id,
          price: item.price
        })),
        totalAmount,
        shippingAddress
      });

      setClientSecret(response.data.clientSecret);
      alert('Please proceed with the payment...');
    } catch (error) {
      console.error("Order error:", error);
      alert('Failed to place order.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Review your items and click below to place your order.</p>

      <div className="cart-summary">
        <h3>Items in your cart:</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
    <p className="total">Total: ${totalAmount.toFixed(3)}</p>
      </div>

      <div className="shipping-input">
        <label htmlFor="shippingAddress">Shipping Address</label>
        <input
          id="shippingAddress"
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="place-order-btn"
      >
        {placingOrder ? 'Placing Order...' : 'Place Order'}
      </button>

      {/* If clientSecret is set, show Stripe Elements */}
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm clientSecret={clientSecret} totalAmount={totalAmount} />
        </Elements>
      )}
    </div>
  );
};

// Payment form component for Stripe
const StripePaymentForm = ({ clientSecret, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setPaymentError(error.message);
      setIsSubmitting(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        alert('Payment successful! Thank you for your order.');
        localStorage.removeItem('cart'); // Optionally clear cart after successful payment
        navigate('/');  // Redirect to the home page after successful payment
      }
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? 'Processing...' : `Pay $${totalAmount}`}
      </button>
      {paymentError && <p className="error-msg">{paymentError}</p>}
    </form>
  );
};

export default CheckoutSec;
