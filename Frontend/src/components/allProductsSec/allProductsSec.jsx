import '../../scss/contactsec.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProdSec = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/ingredients')
      .then(res => {
        const withQuantities = res.data.map(item => ({
          ...item,
          quantity: 1 // default input quantity
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

//   const handleAddToCart = async (item) => {
//     try {
//       // Assuming you have the user_id stored in localStorage after login
//       const userId = localStorage.getItem('user_id');  // or wherever you store the user's ID
  
//       if (!userId) {
//         alert('User not logged in!');
//         return;
//       }
  
//       // Sending the API request with user_id, ingredient_id, and quantity
//       await axios.post('/cart', {
//         user_id: userId,       // Include the user_id
//         ingredient_id: item.id,
//         quantity: item.quantity
//       });
  
//       alert(`${item.name} added to cart!`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add to cart');
//     }
//   };
  

// const handleAddToCart = async (item) => {
//     try {
//         // Retrieve user_id from localStorage
//         const user = JSON.parse(localStorage.getItem('user'));

//         let userId;
//         if (user) {
//             userId = user.id; // Assuming the user object has an `id` field
//         } else {
//             console.log("No user data found in localStorage");
//         }
        

       

//         await axios.post('http://localhost:8081/cart', {
//             user_id: userId,
//             ingredient_id: item.id,
//             quantity: item.quantity
//         });

//         alert(`${item.name} added to cart!`);
//     } catch (err) {
//         console.error(err);
//         alert('Failed to add to cart');
//     }
// };

const handleAddToCart = async (item) => {
    try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if user data exists and extract userId
        let userId;
        if (user) {
            userId = user.id; // Assuming the user object has an `id` field
        } else {
            console.log("No user data found in localStorage");
            alert("Please log in to add items to the cart.");
            return; // Exit the function if the user is not logged in
        }

        // Send request to add item to cart
        const response = await axios.post('http://localhost:8081/cart', {
            user_id: userId,
            ingredient_id: item.id,
            quantity: item.quantity
        });

        if (response.status === 200) {
            alert(`${item.name} added to cart!`);
        } else {
            alert('Failed to add to cart');
        }
    } catch (err) {
        console.error("Error adding to cart:", err);
        alert('Failed to add to cart');
    }
};



  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Ingredients</h2>
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
