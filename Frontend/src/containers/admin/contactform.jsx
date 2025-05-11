import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContactForm = () => {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px',
  };

  useEffect(() => {
    fetchContactSubmissions();
  }, []);

  const fetchContactSubmissions = () => {
    axios.get('http://localhost:8081/api/contact-submissions')
      .then(res => setContactSubmissions(res.data))
      .catch(err => console.error('Error fetching contact submissions:', err));
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditClick = (submission) => {
    setEditingId(submission.id);
    setEditData({
      name: submission.name,
      email: submission.email,
      category: submission.category,
      message: submission.message
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', email: '', category: '', message: '' });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:8081/api/contact-submissions/${id}`, editData)
      .then(() => {
        setEditingId(null);
        fetchContactSubmissions();
      })
      .catch(err => alert('Failed to update contact submission'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      axios.delete(`http://localhost:8081/api/contact-submissions/${id}`)
        .then(() => fetchContactSubmissions())
        .catch(err => alert('Failed to delete contact submission'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Contact Form Submissions</h1>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {['Name', 'Email', 'Category', 'Message', 'Submitted At', 'Actions'].map(col => (
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
          {contactSubmissions.map((submission, idx) => (
            <tr key={submission.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              {editingId === submission.id ? (
                <>
                  <td style={cellStyle}>
                    <input name="name" value={editData.name} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <input name="email" value={editData.email} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <input name="category" value={editData.category} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <textarea name="message" value={editData.message} onChange={handleEditChange}></textarea>
                  </td>
                  <td style={cellStyle}>{submission.submitted_at}</td>
                  <td style={cellStyle}>
                    <button onClick={() => handleUpdate(submission.id)}>Save</button>
                    <button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={cellStyle}>{submission.name}</td>
                  <td style={cellStyle}>{submission.email}</td>
                  <td style={cellStyle}>{submission.category}</td>
                  <td style={cellStyle}>{submission.message}</td>
                  <td style={cellStyle}>{submission.submitted_at}</td>
                  <td style={cellStyle}>
                    <button onClick={() => handleEditClick(submission)}>Edit</button>
                    <button onClick={() => handleDelete(submission.id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactForm;
