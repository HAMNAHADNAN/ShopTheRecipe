


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    price: '',
    quantity: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    axios.get('http://localhost:8081/api/ingredients')
      .then(res => setIngredients(res.data))
      .catch(() => showMessage('Error fetching ingredients.', 'error'));
  };

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({ name: '', unit: '', price: '', quantity: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      axios.put(`http://localhost:8081/api/ingredients/${editId}`, formData)
        .then(() => {
          showMessage('Ingredient updated successfully.', 'success');
          resetForm();
          fetchIngredients();
        })
        .catch(() => showMessage('Failed to update ingredient.', 'error'));
    } else {
      axios.post('http://localhost:8081/api/ingredients', formData)
        .then(() => {
          showMessage('Ingredient added successfully.', 'success');
          resetForm();
          fetchIngredients();
        })
        .catch(() => showMessage('Failed to add ingredient.', 'error'));
    }
  };

  const handleEdit = (ingredient) => {
    setFormData({
      name: ingredient.name,
      unit: ingredient.unit,
      price: ingredient.price,
      quantity: ingredient.quantity
    });
    setEditId(ingredient.id);
    setShowForm(true);
  };

  const handleDeleteConfirm = (id) => {
    axios.delete(`http://localhost:8081/api/ingredients/${id}`)
      .then(() => {
        fetchIngredients();
        setDeleteConfirmId(null);
        showMessage('Ingredient deleted successfully.', 'success');
      })
      .catch(() => {
        showMessage('Failed to delete ingredient.', 'error');
        setDeleteConfirmId(null);
      });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>
        Ingredients Management
      </h1>

      <button
        onClick={() => {
          resetForm();
          setShowForm(!showForm);
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
        {showForm ? 'Cancel' : 'Add Ingredient'}
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
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              required
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
            {editId !== null ? 'Update' : 'Submit'}
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
            {['Name', 'Unit', 'Price', 'Quantity', 'Actions'].map(col => (
              <th key={col} style={{
                border: '1px solid #ccc',
                padding: '12px',
                textAlign: 'left',
                fontWeight: 'bold'
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing, idx) => (
            <tr key={ing.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={cellStyle}>{ing.name}</td>
              <td style={cellStyle}>{ing.unit}</td>
              <td style={cellStyle}>{ing.price}</td>
              <td style={cellStyle}>{ing.quantity}</td>
              <td style={{ ...cellStyle, display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => handleEdit(ing)}
                  style={{ cursor: 'pointer', fontSize: '18px' }}
                  title="Edit"
                >
                  ✏️
                </button>

                {deleteConfirmId === ing.id ? (
                  <>
                    <span style={{ color: '#d9534f', fontWeight: 'bold' }}>Confirm delete?</span>
                    <button
                      onClick={() => handleDeleteConfirm(ing.id)}
                      style={{
                        backgroundColor: '#d9534f',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        marginLeft: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      style={{
                        backgroundColor: '#5bc0de',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        marginLeft: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      No
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(ing.id)}
                    style={{
                      cursor: 'pointer',
                      fontSize: '18px',
                      // backgroundColor: '#d9534f',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Message */}
      {message && (
        <div style={{
          marginTop: '20px',
          padding: '12px 20px',
          borderRadius: '6px',
          maxWidth: '400px',
          fontWeight: 'bold',
          backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
          color: messageType === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminIngredients;

