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
      .catch(err => console.error('Error fetching ingredients:', err));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      axios.put(`http://localhost:8081/api/ingredients/${editId}`, formData)
        .then(() => {
          alert('Ingredient updated');
          resetForm();
          fetchIngredients();
        })
        .catch(() => alert('Failed to update'));
    } else {
      axios.post('http://localhost:8081/api/ingredients', formData)
        .then(() => {
          alert('Ingredient added');
          resetForm();
          fetchIngredients();
        })
        .catch(() => alert('Failed to add'));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', unit: '', price: '', quantity: '' });
    setEditId(null);
    setShowForm(false);
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      axios.delete(`http://localhost:8081/api/ingredients/${id}`)
        .then(() => fetchIngredients())
        .catch(() => alert('Failed to delete'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy'   }}>Ingredients Management</h1>

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
              <td style={{ ...cellStyle, display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(ing)} style={{ cursor: 'pointer' }}>✏️</button>
                <button onClick={() => handleDelete(ing.id)} style={{ cursor: 'pointer' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminIngredients;
