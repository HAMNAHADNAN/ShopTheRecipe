

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config();
//STRIPE CODE
// server.js (near top)
require('dotenv').config(); // Load environment variables from .env

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'shoptherecipe'
});

// ✅ Test route
app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// ✅ Get all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// ✅ Signup route
app.post('/signup', async (req, res) => {
    const { name, email, phone, country, password } = req.body;

    if (!name || !email || !phone || !country || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = "INSERT INTO users (name, email, phone_number, country, password) VALUES (?, ?, ?, ?, ?)";
            const values = [name, email, phone, country, hashedPassword];

            db.query(insertSql, values, (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(201).json({ message: "User registered successfully" });
            });
        } catch (hashErr) {
            return res.status(500).json({ message: "Password hashing failed" });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password, } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Email not found. Please signup.' });
        }

        const user = results[0];

        try {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const userId = user.id; // ✅ Yeh raha tumhara variable
                console.log("Logged in user ID:", userId); // Optional: print in console

                const { password, ...userWithoutPassword } = user;
                return res.status(200).json({ 
                    message: 'Login successful', 
                    userId, // ✅ You can send it back in response too if needed
                    user: userWithoutPassword 
                });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        } catch (compareErr) {
            return res.status(500).json({ message: 'Error verifying password' });
        }
    });
});





// ✅ Contact form submission
app.post('/contact', (req, res) => {
    const { name, email, category, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const sql = "INSERT INTO contact_form_submissions (name, email, category, message) VALUES (?, ?, ?, ?)";
    const values = [name, email, category, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving contact form:', err);
            return res.status(500).json({ message: 'Failed to save message', error: err });
        }
        return res.status(201).json({ message: 'Message Submitted Successfully!' });
    });
});

// ✅ Chatbot API route
app.post('/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant for an online food ordering website.' },
                ...messages
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (error) {
        console.error('Chatbot API error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Chatbot failed to respond' });
    }
});


app.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;

    const sql = "SELECT * FROM recipes WHERE id = ?";
    const sql2 = `
        SELECT i.id, i.name, i.price, ri.quantity 
        FROM ingredients i 
        JOIN recipe_ingredients ri ON ri.ingredient_id = i.id 
        WHERE ri.recipe_id = ?
    `;

    db.query(sql, [recipeId], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
            const recipe = results[0];

            db.query(sql2, [recipeId], (err2, ingredients) => {
                if (err2) return res.status(500).json(err2);

                const response = {
                    ...recipe,
                    ingredients: ingredients
                };

                res.json(response);
            });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    });
});


// ✅ Get all ingredients
app.get('/ingredients', (req, res) => {
    const sql = "SELECT id, name, unit, price FROM ingredients";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching ingredients:", err);
            return res.status(500).json({ message: "Failed to fetch ingredients", error: err });
        }
        return res.status(200).json(data);
    });
});



// ✅ Add Item to Cart (with quantity update)
app.post('/cart', (req, res) => {
  const { user_id, ingredient_id, quantity } = req.body;

  // Log the request body to ensure it's being received as expected
  console.log("Received data:", req.body);

  if (!user_id || !ingredient_id || !quantity) {
    return res.status(400).json({ message: 'User ID, Ingredient ID, and quantity are required' });
  }

  const sql = "INSERT INTO cart (user_id, ingredient_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";
  const values = [user_id, ingredient_id, quantity, quantity];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Add to cart error:', err);
      return res.status(500).json({ message: 'Failed to add to cart', error: err });
    }
    return res.status(200).json({ message: 'Item added to cart' });
  });
});

// ✅ Get Cart Items for a specific user
app.get('/cart/:userId', (req, res) => {
  console.log('🛒 Cart API called for user:', req.params.userId);

  const userId = req.params.userId;
  const sql = `
    SELECT c.id, i.id AS ingredient_id, i.name, c.quantity, i.price
    FROM cart c
    JOIN ingredients i ON c.ingredient_id = i.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Fetch cart error:', err);
      return res.status(500).json({ message: 'Failed to fetch cart items', error: err });
    }
    return res.status(200).json(results);
  });
});

// ✅ Update Cart Item Quantity
app.put('/cart/:id', (req, res) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;

  const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
  db.query(sql, [quantity, cartItemId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update cart' });
    res.status(200).json({ message: 'Quantity updated' });
  });
});

// ✅ Delete Cart Item
app.delete('/cart/:id', (req, res) => {
  const cartItemId = req.params.id;

  const sql = 'DELETE FROM cart WHERE id = ?';
  db.query(sql, [cartItemId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete item' });
    res.status(200).json({ message: 'Item removed' });
  });
});

// ✅ Place Order (Improved with Ingredient Existence Check)
app.post('/place-order', (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required to place order' });
  }

  const getCartQuery = `SELECT ingredient_id, quantity FROM cart WHERE user_id = ?`;

  db.query(getCartQuery, [user_id], (err, cartItems) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch cart items' });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const updateStockQueries = cartItems.map(item => {
      return new Promise((resolve, reject) => {
        // Check if ingredient exists first
        const checkIngredientQuery = `SELECT id FROM ingredients WHERE id = ?`;
        db.query(checkIngredientQuery, [item.ingredient_id], (err, result) => {
          if (err) return reject(err);
          if (result.length === 0) {
            return reject(new Error(`Ingredient ID ${item.ingredient_id} does not exist`));
          }

          // Proceed to update stock
          const updateQuery = `
            UPDATE ingredients 
            SET quantity = quantity - ? 
            WHERE id = ? AND quantity >= ?
          `;
          db.query(updateQuery, [item.quantity, item.ingredient_id, item.quantity], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) {
              return reject(new Error(`Insufficient stock for ingredient ID ${item.ingredient_id}`));
            }
            resolve(result);
          });
        });
      });
    });

    Promise.all(updateStockQueries)
      .then(() => {
        db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
          if (err) return res.status(500).json({ error: 'Failed to clear cart after order' });

          res.status(200).json({ message: 'Order placed successfully!' });
        });
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
      });
  });
});


// app.post('/checkout', (req, res) => {
//   const { userId, items, totalAmount, shippingAddress } = req.body;
//   console.log("Received /checkout payload:", req.body);

//   // Input validation
//   if (!userId || !Array.isArray(items) || items.length === 0 || !totalAmount || !shippingAddress) {
//     return res.status(400).json({
//       message: 'Missing or invalid fields',
//       userId, items, totalAmount, shippingAddress
//     });
//   }

//   db.beginTransaction(err => {
//     if (err) {
//       console.error('Transaction Error:', err);
//       return res.status(500).json({ message: 'Transaction start failed' });
//     }

//     const orderQuery = 'INSERT INTO orders (user_id, total, shipping_address) VALUES (?, ?, ?)';
//     db.query(orderQuery, [userId, totalAmount, shippingAddress], (err, result) => {
//       if (err) {
//         return db.rollback(() => {
//           console.error('Error inserting order:', err);
//           res.status(500).json({ message: 'Failed to process order' });
//         });
//       }

//       const orderId = result.insertId;

//       // Prepare order items data and check for duplicates
//       const orderItemsValues = [];
//       const updateStockPromises = [];
      
//       items.forEach(item => {
//         // Check if the item already exists in the order
//         const checkItemQuery = 'SELECT * FROM order_items WHERE order_id = ? AND ingredient_id = ?';
//         db.query(checkItemQuery, [orderId, item.ingredient_id], (err, existingItem) => {
//           if (existingItem.length > 0) {
//             // Item already exists, update quantity
//             const updateQuery = 'UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND ingredient_id = ?';
//             db.query(updateQuery, [item.quantity, orderId, item.ingredient_id]);
//           } else {
//             // Item does not exist, insert a new one
//             orderItemsValues.push([orderId, item.ingredient_id, item.quantity, item.price]);
//           }
//         });

//         // Update ingredient stock
//         updateStockPromises.push(new Promise((resolve, reject) => {
//           const updateQuery = 'UPDATE ingredients SET quantity = quantity - ? WHERE id = ? AND quantity >= ?';
//           db.query(updateQuery, [item.quantity, item.ingredient_id, item.quantity], (err, result) => {
//             if (err || result.affectedRows === 0) {
//               reject(`Error updating ingredient ${item.ingredient_id}`);
//             } else {
//               resolve();
//             }
//           });
//         }));
//       });

//       // After checking and inserting, proceed to insert new items and update stocks
//       Promise.all(updateStockPromises)
//         .then(() => {
//           if (orderItemsValues.length > 0) {
//             const orderItemsQuery = 'INSERT INTO order_items (order_id, ingredient_id, quantity, price) VALUES ?';
//             db.query(orderItemsQuery, [orderItemsValues], (err) => {
//               if (err) {
//                 return db.rollback(() => {
//                   console.error('Error inserting order items:', err);
//                   res.status(500).json({ message: 'Failed to insert order items' });
//                 });
//               }
//               db.commit(err => {
//                 if (err) {
//                   return db.rollback(() => {
//                     console.error('Commit error:', err);
//                     res.status(500).json({ message: 'Failed to finalize order' });
//                   });
//                 }
//                 const clearCartQuery = 'DELETE FROM cart WHERE user_id = ?';
//                 db.query(clearCartQuery, [userId], (err) => {
//                   if (err) {
//                     console.error('Error clearing cart:', err);
//                     return res.status(500).json({ message: 'Failed to clear cart after checkout' });
//                   }

//                   res.status(200).json({ message: 'Order placed successfully', orderId });
//                 });

//               });
//             });
//           } else {
//             db.commit(err => {
//               if (err) {
//                 return db.rollback(() => {
//                   console.error('Commit error:', err);
//                   res.status(500).json({ message: 'Failed to finalize order' });
//                 });
//               }
//               res.status(200).json({ message: 'Order placed successfully', orderId });
//             });
//           }
//         })
//         .catch(err => {
//           db.rollback(() => {
//             console.error('Error updating stocks or insufficient stock:', err);
//             res.status(500).json({ message: err.message || 'Failed to update ingredient stock' });
//           });
//         });
//     });
//   });
// });

//STRIPE PAYMENT
const util = require('util');
const query = util.promisify(db.query).bind(db);

app.post('/checkout', async (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;
  console.log("Received /checkout payload:", req.body);

  // Input validation
  if (!userId || !Array.isArray(items) || items.length === 0 || !totalAmount || !shippingAddress) {
    return res.status(400).json({
      message: 'Missing or invalid fields',
      userId, items, totalAmount, shippingAddress
    });
  }

  // Create Stripe PaymentIntent
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ message: 'Failed to create payment intent' });
  }

  db.beginTransaction(async (err) => {
    if (err) {
      console.error('Transaction start error:', err);
      return res.status(500).json({ message: 'Transaction start failed' });
    }

    try {
      // Insert order into 'orders' table
      const orderResult = await query(
        'INSERT INTO orders (user_id, total, shipping_address) VALUES (?, ?, ?)',
        [userId, totalAmount, shippingAddress]
      );
      const orderId = orderResult.insertId;

      const orderItemsValues = [];
      const updateStockPromises = [];

      // Loop through each item and insert into 'order_items' and update stock
      for (const item of items) {
        const existingItem = await query(
          'SELECT * FROM order_items WHERE order_id = ? AND ingredient_id = ?',
          [orderId, item.ingredient_id]
        );

        if (existingItem.length > 0) {
          // If item already exists in the order, update the quantity
          await query(
            'UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND ingredient_id = ?',
            [item.quantity, orderId, item.ingredient_id]
          );
        } else {
          // If item does not exist, add it to 'order_items'
          orderItemsValues.push([orderId, item.ingredient_id, item.quantity, item.price]);
        }

        // Update the stock quantity in 'ingredients' table
        const stockUpdatePromise = new Promise(async (resolve, reject) => {
          try {
            const result = await query(
              'UPDATE ingredients SET quantity = quantity - ? WHERE id = ? AND quantity >= ?',
              [item.quantity, item.ingredient_id, item.quantity]
            );
            if (result.affectedRows === 0) {
              reject(new Error(`Insufficient stock for ingredient ID ${item.ingredient_id}`));
            } else {
              resolve();
            }
          } catch (err) {
            reject(err);
          }
        });

        updateStockPromises.push(stockUpdatePromise);
      }

      // Wait for all stock updates to complete
      await Promise.all(updateStockPromises);

      // Insert all new order items if there are any
      if (orderItemsValues.length > 0) {
        await query(
          'INSERT INTO order_items (order_id, ingredient_id, quantity, price) VALUES ?',
          [orderItemsValues]
        );
      }

      // Clear the user's cart after placing the order
      await query('DELETE FROM cart WHERE user_id = ?', [userId]);

      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error('Commit error:', err);
            res.status(500).json({ message: 'Failed to finalize order' });
          });
        }

        // Send the Stripe client secret back to frontend to complete the payment
        return res.status(200).json({
          message: 'Order placed successfully',
          orderId,
          clientSecret: paymentIntent.client_secret
        });
      });
    } catch (err) {
      // Rollback in case of any error during the transaction
      db.rollback(() => {
        console.error('Checkout transaction error:', err);
        res.status(500).json({ message: err.message || 'Checkout failed' });
      });
    }
  });
});


  

// ✅ Get User Profile by ID
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT id, name, email, phone_number, country FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(results[0]);
  });
});

// Update user by ID
app.put('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const { name, phone_number, country } = req.body;

  // Sanitize inputs if necessary (optional step)
  if (!name || !phone_number || !country) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = 'UPDATE users SET name = ?, phone_number = ?, country = ? WHERE id = ?';
  db.query(sql, [name, phone_number, country, userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    res.json({ message: 'User updated successfully' });
  });
});




app.post('/api/gemini', async (req, res) => {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAKtFfWj5ubr5VriffaBz43pOMEWQrn03Q',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.json(data);
});

app.get('/api/orders-by-day', (req, res) => {
  db.query(
    `SELECT DATE(order_date) AS order_date, COUNT(*) AS order_count
     FROM orders
     GROUP BY DATE(order_date)
     ORDER BY order_date`,
    (err, rows) => {
      if (err) {
        console.error('Error fetching orders by day:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Set the Content-Type to application/json
      res.setHeader('Content-Type', 'application/json');
      res.json(rows);
    }
  );
});

// Assuming you're using Express.js for the backend
app.get('/api/top-products', (req, res) => {
  // Replace with the correct query to fetch top ingredients
  db.query(
    `SELECT i.name AS ingredient_name, SUM(oi.quantity) AS total_quantity
     FROM order_items oi
     JOIN ingredients i ON oi.ingredient_id = i.id
     GROUP BY i.name
     ORDER BY total_quantity DESC
     LIMIT 10`,
    (err, rows) => {
      if (err) {
        console.error('Error fetching top products:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows); // Send the data as JSON to the frontend
    }
  );
});

// app.get('/api/user-signups', (req, res) => {
//   const query = `
//     SELECT
//       DATE_FORMAT(created_at, '%Y-%m-01') AS signup_date,  -- Monthly grouping
//       COUNT(*) AS user_count
//     FROM users
//     GROUP BY signup_date
//     ORDER BY signup_date;
//   `;

//   db.query(query, (err, rows) => {
//     if (err) {
//       console.error('Error fetching signups:', err);
//       return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
//     res.json(rows);
//   });
// });


app.get('/api/user-signups', (req, res) => {
  const query = `
    SELECT
      DATE(created_at) AS signup_date,  -- Group by date
      COUNT(*) AS user_count
    FROM users
    WHERE created_at IS NOT NULL AND created_at != '0000-00-00 00:00:00'
    GROUP BY signup_date
    ORDER BY signup_date;
  `;

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching signups:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    res.json(rows);
  });
});


app.get('/api/low-stock', (req, res) => {
  const threshold = 990; // change as needed
  db.query(
    `SELECT name AS ingredient_name, quantity FROM ingredients WHERE quantity < ? ORDER BY quantity ASC`,
    [threshold],
    (err, rows) => {
      if (err) {
        console.error('Error fetching low stock ingredients:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    }
  );
});


app.get('/api/recipes', (req, res) => {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/recipes', (req, res) => {
  const {
    title,
    description,
    image_url,
    category,
    cook_time,
    cuisine,
    diet,
    difficulty,
    host,
    instructions,
    language,
    prep_time,
    yields,
    ratings,
    ratings_count
  } = req.body;

  const total_time = parseInt(cook_time) + parseInt(prep_time);

  const sql = `INSERT INTO recipes 
    (title, description, image_url, category, cook_time, cuisine, diet, difficulty, host, instructions, language, prep_time, total_time, yields, ratings, ratings_count) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    description,
    image_url,
    category,
    cook_time,
    cuisine,
    diet,
    difficulty,
    host,
    instructions,
    language,
    prep_time,
    total_time,
    yields,
    ratings,
    ratings_count
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).json({ error: 'Failed to add recipe' });
    }
    res.status(201).json({ message: 'Recipe added successfully', recipeId: result.insertId });
  });
});

// PUT: Update a recipe
app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const {
    title, description, image_url, category, cook_time, cuisine, diet, difficulty,
    instructions, language, prep_time, yields, ratings, ratings_count, total_time
  } = req.body;

  const query = `
    UPDATE recipes SET
      title = ?, description = ?, image_url = ?, category = ?, cook_time = ?, cuisine = ?,
      diet = ?, difficulty = ?, instructions = ?, language = ?, prep_time = ?, yields = ?,
      ratings = ?, ratings_count = ?, total_time = ?
    WHERE id = ?
  `;

  const values = [
    title, description, image_url, category, cook_time, cuisine, diet, difficulty,
    instructions, language, prep_time, yields, ratings, ratings_count, total_time, id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating recipe:', err);
      return res.status(500).json({ message: 'Update failed' });
    }
    res.json({ message: 'Recipe updated successfully' });
  });
});

// DELETE: Remove a recipe
app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM recipes WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting recipe:', err);
      return res.status(500).json({ message: 'Delete failed' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  });
});


// Get all ingredients
app.get('/api/ingredients', (req, res) => {
  const q = 'SELECT * FROM ingredients';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
});

// Add a new ingredient
app.post('/api/ingredients', (req, res) => {
  const { name, unit, price, quantity } = req.body;
  const q = 'INSERT INTO ingredients (name, unit, price, quantity) VALUES (?, ?, ?, ?)';
  db.query(q, [name, unit, price, quantity], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: 'Ingredient added' });
  });
});

// Update an ingredient
app.put('/api/ingredients/:id', (req, res) => {
  const { id } = req.params;
  const { name, unit, price, quantity } = req.body;
  const q = 'UPDATE ingredients SET name = ?, unit = ?, price = ?, quantity = ? WHERE id = ?';
  db.query(q, [name, unit, price, quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Ingredient updated' });
  });
});

// Delete an ingredient
app.delete('/api/ingredients/:id', (req, res) => {
  const { id } = req.params;
  const q = 'DELETE FROM ingredients WHERE id = ?';
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Ingredient deleted' });
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Update order
app.put('/api/orders/:id', (req, res) => {
  const { user_id, total, shipping_address, order_date } = req.body;
  db.query(
    'UPDATE orders SET user_id = ?, total = ?, shipping_address = ?, order_date = ? WHERE id = ?',
    [user_id, total, shipping_address, order_date, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  db.query('DELETE FROM orders WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});


// Get detailed order items with ingredient names for a specific order
app.get('/api/orders/:id/items', (req, res) => {
  const orderId = req.params.id;
  const sql = `
    SELECT oi.order_id, oi.ingredient_id, i.name AS ingredient_name, oi.quantity, oi.price
    FROM order_items oi
    JOIN ingredients i ON oi.ingredient_id = i.id
    WHERE oi.order_id = ?
  `;
  db.query(sql, [orderId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT id, name, email, phone_number, country, created_at FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.send('User deleted successfully');
  });
});

// Get all carts
// Get all carts
app.get('/api/carts', (req, res) => {
  const query = `
    SELECT cart.id, cart.user_id, cart.ingredient_id, cart.quantity, cart.created_at, ingredients.name AS ingredient_name
    FROM cart
    JOIN ingredients ON cart.ingredient_id = ingredients.id;
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching carts:', err);
      return res.status(500).send('Error fetching carts');
    }
    res.json(result);  // Send the result as a JSON response
  });
});



// Delete a cart
app.delete('/api/carts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cart WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting cart:', err);
      return res.status(500).send('Error deleting cart');
    }
    res.send('Cart deleted');
  });
});


app.get('/api/contact-submissions', (req, res) => {
  db.query('SELECT * FROM contact_form_submissions', (err, result) => {
    if (err) {
      console.error('Error fetching contact submissions:', err);
      return res.status(500).send('Error fetching contact submissions');
    }
    res.json(result);  // Send the result as a JSON response
  });
});


app.delete('/api/contact-submissions/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contact_form_submissions WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting contact submission:', err);
      return res.status(500).send('Error deleting contact submission');
    }
    res.send('Contact submission deleted');
  });
});

app.put('/api/contact-submissions/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, category, message } = req.body;
  
  db.query(
    'UPDATE contact_form_submissions SET name = ?, email = ?, category = ?, message = ? WHERE id = ?',
    [name, email, category, message, id],
    (err, result) => {
      if (err) {
        console.error('Error updating contact submission:', err);
        return res.status(500).send('Error updating contact submission');
      }
      res.send('Contact submission updated');
    }
  );
});


app.get('/orders/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT 
      o.id AS order_id,
      o.user_id,
      o.total,
      o.shipping_address,
      o.order_date,
      i.name AS ingredient_name,
      i.unit,
      oi.quantity,
      i.price AS price,
      'Shipped' AS status
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN ingredients i ON oi.ingredient_id = i.id
    WHERE o.user_id = ?
    ORDER BY o.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    return res.status(200).json(results);
  });
});


app.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    await db.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);
    await db.query('DELETE FROM orders WHERE id = ?', [orderId]);

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Database error while cancelling order' });
  }
});



app.get('/api/search', (req, res) => {
  const query = req.query.q; // Extract the query parameter
  if (query) {
    // Sample mock data; replace with actual data fetching logic
    const data = [
  { name: 'Chicken Soup' },
  { name: 'Chicken Salad' },
  { name: 'Grilled Chicken' },
];

// Filter data based on query parameter
const results = data.filter(item =>
  item.name.toLowerCase().includes(query.toLowerCase())
);

console.log('Filtered Results:', results); // Log filtered results for debugging
res.json(results);// Send back filtered results
  } else {
    res.status(400).json({ message: 'Query parameter q is required' });
  }
});



const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
