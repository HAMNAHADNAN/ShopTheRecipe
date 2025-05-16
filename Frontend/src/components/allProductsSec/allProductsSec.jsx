

import '../../scss/contactsec.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProdSec = () => {
  const [ingredients, setIngredients] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/ingredients')
      .then(res => {
        const withQuantities = res.data.map(item => ({
          ...item,
          quantity: 1
        }));
        setIngredients(withQuantities);
      });
  }, []);

  const handleQuantityChange = (id, newQty) => {
    setIngredients(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleAddToCart = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        setMessage({ type: 'error', text: "Please log in to add items to the cart." });
        return;
      }

      const response = await axios.post('http://localhost:8081/cart', {
        user_id: user.id,
        ingredient_id: item.id,
        quantity: item.quantity
      });

      if (response.status === 200) {
        setMessage({ type: 'success', text: `${item.name} added to cart!` });
      } else {
        setMessage({ type: 'error', text: 'Failed to add to cart.' });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage({ type: 'error', text: 'Failed to add to cart.' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Ingredients</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(item => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.unit}</td>
              <td className="p-2 border">$ {item.price}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="w-20 border rounded p-1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td className="p-2 border">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProdSec;
