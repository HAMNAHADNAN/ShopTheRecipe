

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image_url: '',
//     category: '',
//     cook_time: '',
//     cuisine: '',
//     diet: '',
//     difficulty: '',
//     instructions: '',
//     language: '',
//     prep_time: '',
//     yields: '',
//     ratings: '',
//     ratings_count: ''
//   });
//   const [showForm, setShowForm] = useState(false);
//   const cellStyle = {
//   border: '1px solid #ccc',
//   padding: '10px',
//   verticalAlign: 'top',
//   minHeight: '50px'
// };


//   useEffect(() => {
//     axios.get('http://localhost:8081/api/recipes')
//       .then(res => setRecipes(res.data))
//       .catch(err => console.error('Error fetching recipes:', err));
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const total_time = parseInt(formData.cook_time || 0) + parseInt(formData.prep_time || 0);

//     const newRecipe = { ...formData, total_time };

//     axios.post('http://localhost:8081/api/recipes', newRecipe)
//       .then(() => {
//         alert('Recipe added successfully');
//         setFormData({
//           title: '', description: '', image_url: '', category: '', cook_time: '', cuisine: '',
//           diet: '', difficulty: '', instructions: '', language: '', prep_time: '',
//           yields: '', ratings: '', ratings_count: ''
//         });
//         setShowForm(false);
//         return axios.get('http://localhost:8081/api/recipes');
//       })
//       .then(res => setRecipes(res.data))
//       .catch(err => alert('Failed to add recipe'));
//   };

//   return (
//   <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
//     <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Recipe Management</h1>
    
//     <button
//       onClick={() => setShowForm(!showForm)}
//       style={{
//         marginBottom: '20px',
//         padding: '10px 20px',
//         fontSize: '16px',
//         backgroundColor: '#000054',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer'
//       }}
//     >
//       {showForm ? 'Cancel' : 'Add a Recipe'}
//     </button>

//     {showForm && (
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: '15px',
//           marginBottom: '40px'
//         }}
//       >
//         {Object.keys(formData).map((field) => (
//           <input
//             key={field}
//             name={field}
//             placeholder={field.replace(/_/g, ' ')}
//             value={formData[field]}
//             onChange={handleChange}
//             required={field !== 'image_url'}
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc'
//             }}
//           />
//         ))}
//         <button
//           type="submit"
//           style={{
//             gridColumn: 'span 2',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Submit
//         </button>
//       </form>
//     )}

//     <table style={{
//       width: '100%',
//       borderCollapse: 'collapse',
//       boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//     }}>
//       <thead style={{ backgroundColor: '#f0f0f0' }}>
//         <tr>
//           {[
//             'Title', 'Description', 'Category', 'Cook Time', 'Cuisine', 'Diet',
//             'Difficulty', 'Instructions', 'Language', 'Prep Time', 'Total Time',
//             'Yields', 'Ratings', 'Ratings Count'
//           ].map(col => (
//             <th
//               key={col}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '12px',
//                 textAlign: 'left',
//                 fontWeight: 'bold'
//               }}
//             >
//               {col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {recipes.map((recipe, idx) => (
//           <tr
//             key={recipe.id}
//             style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}
//           >
//             <td style={cellStyle}>{recipe.title}</td>
//             <td style={cellStyle}>{recipe.description}</td>
//             {/* <td style={cellStyle}>{recipe.image_url}</td> */}
//             <td style={cellStyle}>{recipe.category}</td>
//             <td style={cellStyle}>{recipe.cook_time}</td>
//             <td style={cellStyle}>{recipe.cuisine}</td>
//             <td style={cellStyle}>{recipe.diet}</td>
//             <td style={cellStyle}>{recipe.difficulty}</td>
//             <td style={{ ...cellStyle, width: '300px' }}>{recipe.instructions}</td>
//             <td style={cellStyle}>{recipe.language}</td>
//             <td style={cellStyle}>{recipe.prep_time}</td>
//             <td style={cellStyle}>{recipe.total_time}</td>
//             <td style={cellStyle}>{recipe.yields}</td>
//             <td style={cellStyle}>{recipe.ratings}</td>
//             <td style={cellStyle}>{recipe.ratings_count}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );};


// export default AdminRecipes;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    cook_time: '',
    cuisine: '',
    diet: '',
    difficulty: '',
    instructions: '',
    language: '',
    prep_time: '',
    yields: '',
    ratings: '',
    ratings_count: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  const fetchRecipes = () => {
    axios.get('http://localhost:8081/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Error fetching recipes:', err));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total_time = parseInt(formData.cook_time || 0) + parseInt(formData.prep_time || 0);
    const updatedData = { ...formData, total_time };

    const request = editingId
      ? axios.put(`http://localhost:8081/api/recipes/${editingId}`, updatedData)
      : axios.post('http://localhost:8081/api/recipes', updatedData);

    request
      .then(() => {
        alert(editingId ? 'Recipe updated' : 'Recipe added');
        setFormData({
          title: '', description: '', image_url: '', category: '', cook_time: '', cuisine: '',
          diet: '', difficulty: '', instructions: '', language: '', prep_time: '',
          yields: '', ratings: '', ratings_count: ''
        });
        setEditingId(null);
        setShowForm(false);
        fetchRecipes();
      })
      .catch(err => alert('Failed to submit recipe'));
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      axios.delete(`http://localhost:8081/api/recipes/${id}`)
        .then(() => {
          alert('Recipe deleted');
          fetchRecipes();
        })
        .catch(err => alert('Failed to delete recipe'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy'   }}>Recipe Management</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            title: '', description: '', image_url: '', category: '', cook_time: '', cuisine: '',
            diet: '', difficulty: '', instructions: '', language: '', prep_time: '',
            yields: '', ratings: '', ratings_count: ''
          });
        }}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#000054',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {showForm ? 'Cancel' : 'Add a Recipe'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '40px'
          }}
        >
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/_/g, ' ')}
              value={formData[field]}
              onChange={handleChange}
              required={field !== 'image_url'}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          ))}
          <button
            type="submit"
            style={{
              gridColumn: 'span 2',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>
      )}

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {[
              'Title', 'Description', 'Category', 'Cook Time', 'Cuisine', 'Diet',
              'Difficulty', 'Instructions', 'Language', 'Prep Time', 'Total Time',
              'Yields', 'Ratings', 'Ratings Count', 'Actions'
            ].map(col => (
              <th
                key={col}
                style={{
                  border: '1px solid #ccc',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: 'bold'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, idx) => (
            <tr
              key={recipe.id}
              style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}
            >
              <td style={cellStyle}>{recipe.title}</td>
              <td style={cellStyle}>{recipe.description}</td>
              <td style={cellStyle}>{recipe.category}</td>
              <td style={cellStyle}>{recipe.cook_time}</td>
              <td style={cellStyle}>{recipe.cuisine}</td>
              <td style={cellStyle}>{recipe.diet}</td>
              <td style={cellStyle}>{recipe.difficulty}</td>
              <td style={{ ...cellStyle, width: '300px' }}>{recipe.instructions}</td>
              <td style={cellStyle}>{recipe.language}</td>
              <td style={cellStyle}>{recipe.prep_time}</td>
              <td style={cellStyle}>{recipe.total_time}</td>
              <td style={cellStyle}>{recipe.yields}</td>
              <td style={cellStyle}>{recipe.ratings}</td>
              <td style={cellStyle}>{recipe.ratings_count}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(recipe)} style={{ marginRight: '8px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(recipe.id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRecipes;
