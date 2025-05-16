
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCarts = () => {
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  
  // State for inline delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = () => {
    axios.get('http://localhost:8081/api/carts')
      .then(res => setCarts(res.data))
      .catch(err => {
        console.error('Error fetching carts:', err);
        showMessage('Failed to load carts.', 'error');
      });
  };

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  // Called when Delete button clicked: just set confirmDeleteId
  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  // Called when user confirms delete
  const confirmDelete = () => {
    axios.delete(`http://localhost:8081/api/carts/${confirmDeleteId}`)
      .then(() => {
        fetchCarts();
        showMessage('Cart deleted successfully.', 'success');
        setConfirmDeleteId(null);
      })
      .catch(err => {
        console.error('Delete error:', err);
        showMessage('Failed to delete cart.', 'error');
        setConfirmDeleteId(null);
      });
  };

  // Cancel deletion confirmation
  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto', position: 'relative' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Cart Management</h1>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {['User ID', 'Ingredient Name', 'Quantity', 'Created At', 'Actions'].map(col => (
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
          {carts.map((cart, idx) => (
            <tr key={cart.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={cellStyle}>{cart.user_id}</td>
              <td style={cellStyle}>{cart.ingredient_name}</td>
              <td style={cellStyle}>{cart.quantity}</td>
              <td style={cellStyle}>{cart.created_at}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleDeleteClick(cart.id)}
                  style={{
                    padding: '5px 10px',
                    color: 'white',
                    backgroundColor: '#d9534f',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Success/Error Message */}
      {message && (
        <div className={`mt-4 p-3 rounded text-sm border w-fit ${
          messageType === 'success'
            ? 'bg-green-100 text-green-700 border-green-300'
            : 'bg-red-100 text-red-700 border-red-300'
        }`}>
          {message}
        </div>
      )}

      {/* Inline Confirmation Dialog */}
      {confirmDeleteId !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '320px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              Are you sure you want to delete this cart?
            </p>
            <button
              onClick={confirmDelete}
              style={{
                marginRight: '15px',
                padding: '10px 20px',
                backgroundColor: '#d9534f',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              No
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCarts;
