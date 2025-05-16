


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartSec = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      console.warn('No user ID found in localStorage');
    }
  }, [userId]);

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8081/cart/${userId}`);
      setCartItems(res.data);
      localStorage.setItem('cart', JSON.stringify(res.data)); // Sync with localStorage
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };



  const updateQuantity = async (cartItemId, newQuantity) => {
  if (newQuantity < 1) return;
  try {
    // Check if the item already exists with the updated quantity in the cart
    const existingItem = cartItems.find(item => item.id === cartItemId);
    if (existingItem) {
      existingItem.quantity = newQuantity;
    }
    
    await axios.put(`http://localhost:8081/cart/${cartItemId}`, { quantity: newQuantity });
    fetchCart(userId);  // Refresh the cart to get updated data
  } catch (err) {
    console.error('Error updating quantity:', err);
  }
};


  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8081/cart/${cartItemId}`);
      fetchCart(userId);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = (item.quantity || 0) * (item.price || 0);
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Ensure localStorage is updated
    navigate('/checkout');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Ingredient</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.name || 'N/A'}</td>
                  <td className="p-2 border">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border">
                    {item.price ? `$ ${item.price.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="p-2 border">
                    {item.price && item.quantity
                      ? `$ ${(item.price * item.quantity).toFixed(2)}`
                      : 'N/A'}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-semibold mb-4">
            Total: $ {calculateTotal()}
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartSec;
