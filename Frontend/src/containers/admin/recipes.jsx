


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

  // Inline messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  // NEW: Track which recipe is pending delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  const fetchRecipes = () => {
    axios.get('http://localhost:8081/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(() => showMessage('Error fetching recipes.', 'error'));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000); // auto-clear after 4 seconds
  };

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
        showMessage(editingId ? 'Recipe updated' : 'Recipe added', 'success');
        setFormData({
          title: '', description: '', image_url: '', category: '', cook_time: '', cuisine: '',
          diet: '', difficulty: '', instructions: '', language: '', prep_time: '',
          yields: '', ratings: '', ratings_count: ''
        });
        setEditingId(null);
        setShowForm(false);
        fetchRecipes();
      })
      .catch(() => showMessage('Failed to submit recipe', 'error'));
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
    setShowForm(true);
  };

  // When delete button clicked, set id for confirmation instead of immediately deleting
  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  // Confirm delete action, call API, then reset confirmDeleteId and refetch
  const confirmDelete = (id) => {
    axios.delete(`http://localhost:8081/api/recipes/${id}`)
      .then(() => {
        showMessage('Recipe deleted', 'success');
        fetchRecipes();
        setConfirmDeleteId(null);
      })
      .catch(() => showMessage('Failed to delete recipe', 'error'));
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>
        Recipe Management
      </h1>

      {/* Inline message box */}
      {message && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            color: messageType === 'success' ? '#155724' : '#721c24',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            border: messageType === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}

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
                {confirmDeleteId === recipe.id ? (
                  <>
                    <span style={{ marginRight: '10px', color: 'red' }}>
                      Are you sure?
                    </span>
                    <button
                      onClick={() => confirmDelete(recipe.id)}
                      style={{
                        marginRight: '5px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelDelete}
                      style={{
                        backgroundColor: '#ccc',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(recipe)}
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      style={{ color: 'red' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRecipes;
