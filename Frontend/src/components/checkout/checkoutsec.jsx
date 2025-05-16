


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/CheckoutSec.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RNAAX2VepmVN62YyRMUS14kHFTbaIj4Ec2wvY3SXssf5Q8cqbJAhotbktS5qC28Vfj9KY9ZzUrKFWNBU8bLEm94003r3SqlL8');

const CheckoutSec = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;
  const [placingOrder, setPlacingOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null); // message state
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const total = storedCart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalAmount(total);
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      showMessage("User not logged in!", 'error');
      return;
    }

    if (!cart.length) {
      showMessage("Your cart is empty!", 'error');
      return;
    }

    if (!shippingAddress) {
      showMessage("Please enter a shipping address!", 'error');
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
      showMessage("Please proceed with the payment...", 'error');
    } catch (error) {
      console.error("Order error:", error);
      showMessage("Failed to place order.", 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Review your items and click below to place your order.</p>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm border ${
          messageType === 'success'
            ? 'bg-green-100 text-green-700 border-green-300'
            : 'bg-red-100 text-red-700 border-red-300'
        }`}>
          {message}
        </div>
      )}

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

      {clientSecret && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm clientSecret={clientSecret} totalAmount={totalAmount} />
        </Elements>
      )}
    </div>
  );
};

const StripePaymentForm = ({ clientSecret, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setPaymentError(error.message);
      setIsSubmitting(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess('Payment successful! Thank you for your order.');
        localStorage.removeItem('cart');
        setTimeout(() => navigate('/'), 2000);
      }
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? 'Processing...' : `Pay $${totalAmount.toFixed(3)}`}
      </button>

      {paymentError && (
        <p className="mt-3 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {paymentError}
        </p>
      )}

      {paymentSuccess && (
        <p className="mt-3 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {paymentSuccess}
        </p>
      )}
    </form>
  );
};

export default CheckoutSec;
