import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // For inline messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  // Track which user is pending delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8081/api/users')
      .then(res => setUsers(res.data))
      .catch(() => showMessage('Error fetching users.', 'error'));
  };

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000); // Clear after 4 seconds
  };

  // When delete button clicked, show inline confirmation
  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  // Confirm delete and call API
  const confirmDelete = (id) => {
    axios.delete(`http://localhost:8081/api/users/${id}`)
      .then(() => {
        showMessage('User deleted successfully', 'success');
        fetchUsers();
        setConfirmDeleteId(null);
      })
      .catch(() => showMessage('Failed to delete user', 'error'));
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>User Management</h1>

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

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {['Id', 'Name', 'Email', 'Phone Number', 'Country', 'Created At', 'Actions'].map(col => (
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
          {users.map((user, idx) => (
            <tr key={user.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={cellStyle}>{user.id}</td>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.phone_number}</td>
              <td style={cellStyle}>{user.country}</td>
              <td style={cellStyle}>{user.created_at}</td>
              <td style={cellStyle}>
                {confirmDeleteId === user.id ? (
                  <>
                    <span style={{ marginRight: '10px', color: 'red' }}>
                      Are you sure?
                    </span>
                    <button
                      onClick={() => confirmDelete(user.id)}
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
                  <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
