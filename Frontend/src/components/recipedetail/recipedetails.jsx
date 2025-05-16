


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/recipeDetail.scss';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError('Error loading recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000); // Auto-hide after 4s
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIngredients(recipes.ingredients.map((ingredient) => ingredient.name));
    } else {
      setSelectedIngredients([]);
    }
  };

  const handleIngredientChange = (ingredient, e) => {
    if (e.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredient.name]);
    } else {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient.name));
    }
  };

  const handleBuyIngredients = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.id;

    if (selectedIngredients.length === 0) {
      showMessage("Please select at least one ingredient!", "error");
      return;
    }

    try {
      for (const ingredientName of selectedIngredients) {
        const ingredient = recipes.ingredients.find(
          (ingredient) => ingredient.name === ingredientName
        );

        if (ingredient) {
          const payload = {
            user_id: userId,
            ingredient_id: ingredient.id,
            quantity: 1
          };

          await axios.post('http://localhost:8081/cart', payload);
        }
      }

      showMessage("Ingredients added to cart!", "success");
    } catch (err) {
      console.error("Error adding ingredients to cart:", err);

      if (err.response) {
        showMessage(`Failed to add ingredients to cart. ${err.response.data.message}`, "error");
      } else {
        showMessage("Failed to add ingredients to cart.", "error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipes) return <div>Recipe not found.</div>;

  return (
    <div className="recipe-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <h1 style={{ textAlign: 'center', fontSize: '32px', margin: '20px 0', color: 'navy' }}>
        <strong>{recipes.title}</strong>
      </h1>    

      <img src={recipes.image_url} alt={recipes.title} className="detail-img" />

      <div className="metadata">
        <p><strong>Cuisine:</strong> {recipes.cuisine}</p>
        <p><strong>Diet:</strong> {recipes.diet}</p>
        <p><strong>Difficulty:</strong> {recipes.difficulty}</p>
        <p><strong>Prep Time:</strong> {recipes.prep_time} mins</p>
        <p><strong>Cook Time:</strong> {recipes.cook_time} mins</p>
        <p><strong>Yields:</strong> {recipes.yields}</p>
        <p><strong>Ratings:</strong> ⭐ {recipes.ratings} ({recipes.ratings_count} reviews)</p>
      </div>

      <h2><strong>Ingredients</strong></h2>
      <ul className="ingredients-list">
        {recipes.ingredients && recipes.ingredients.length > 0 ? (
          recipes.ingredients.map((item, idx) => (
            <li key={idx}>
              <input
                type="checkbox"
                id={`ingredient-${idx}`}
                checked={selectedIngredients.includes(item.name)}
                onChange={(e) => handleIngredientChange(item, e)}
              />
              <label htmlFor={`ingredient-${idx}`}>
                {item.name} {item.quantity} - $ {item.price}
              </label>
            </li>
          ))
        ) : (
          <li>No ingredients available.</li>
        )}

        <li>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedIngredients.length === recipes.ingredients.length}
          />
          <label>Select All</label>
        </li>
      </ul>

      <button className="buy-btn" onClick={handleBuyIngredients}>🛒 Add To Cart</button>

      {/* Display success or error message */}
      {message && (
        <div className={`mt-4 p-3 rounded text-sm border w-fit ${
          messageType === 'success'
            ? 'bg-green-100 text-green-700 border-green-300'
            : 'bg-red-100 text-red-700 border-red-300'
        }`}>
          {message}
        </div>
      )}

      <h2>Instructions</h2>
      <p>{recipes.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
