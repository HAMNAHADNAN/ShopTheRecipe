import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

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
      .catch(err => console.error('Error fetching users:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:8081/api/users/${id}`)
        .then(() => fetchUsers())
        .catch(err => alert('Failed to delete user'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>User Management</h1>

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
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
