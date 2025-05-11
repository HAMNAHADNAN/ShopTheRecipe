// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import recipes from '../../data/recipes'; // 👈 Import the data here
// import '../../scss/recipes.scss';

// const RecipeList = () => {
//   const navigate = useNavigate();
//   const [dietary, setDietary] = useState('All');
//   const [difficulty, setDifficulty] = useState('All');

//   const filteredRecipes = recipes.filter(recipe => {
//     return (
//       (dietary === 'All' || recipe.diet === dietary) &&
//       (difficulty === 'All' || recipe.difficulty === difficulty)
//     );
//   });

//   return (
//     <div className="recipe-list-container">
//       <h1>Our Recipes</h1>

//       <div className="filters">
//         <label>Dietary:</label>
//         <select onChange={(e) => setDietary(e.target.value)} value={dietary}>
//           <option value="All">All</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//         </select>

//         <label>Difficulty:</label>
//         <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
//           <option value="All">All</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>
//       </div>

//       <div className="vertical-recipe-list">
//         {filteredRecipes.map((recipe) => (
//           <div
//             key={recipe.id}
//             className="recipe-card"
//             onClick={() => navigate(`/recipes/${recipe.id}`)}
//             style={{ cursor: 'pointer' }}
//           >
//             <img src={recipe.image} alt={recipe.title} className="recipe-image" />
//             <div className="recipe-details">
//               <h2>{recipe.title}</h2>
//               <p><strong>Cusine: {recipe.cuisine} </strong></p>
//               <p><strong>Cook Time: {recipe.cook_time+recipe.prep_time} mins </strong></p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import '../../scss/recipes.scss';

const RecipeList = () => {
  const navigate = useNavigate();
  const [dietary, setDietary] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [recipes, setRecipes] = useState([]); // State to hold the recipes fetched from the database

  // Fetch recipes from the backend API
  useEffect(() => {
    axios.get('http://localhost:8081/api/recipes') // Adjust the URL to your API endpoint
      .then((response) => {
        setRecipes(response.data); // Assuming the response contains the recipe data
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  // Filter recipes based on dietary and difficulty
  const filteredRecipes = recipes.filter(recipe => {
    return (
      (dietary === 'All' || recipe.diet === dietary) &&
      (difficulty === 'All' || recipe.difficulty === difficulty)
    );
  });

  return (
    <div className="recipe-list-container">
      <h1>Our Recipes</h1>

      <div className="filters">
        <label>Dietary:</label>
        <select onChange={(e) => setDietary(e.target.value)} value={dietary}>
          <option value="All">All</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>

        <label>Difficulty:</label>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="vertical-recipe-list">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h2>{recipe.title}</h2>
              <p><strong>Cuisine: {recipe.cuisine}</strong></p>
              <p><strong>Cook Time: {recipe.cook_time + recipe.prep_time} mins</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
