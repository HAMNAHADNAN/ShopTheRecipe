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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // new

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
      .catch(() => showMessage('Failed to load contact submissions.', 'error'));
  };

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
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
        showMessage('Contact submission updated successfully.', 'success');
      })
      .catch(() => showMessage('Failed to update contact submission.', 'error'));
  };

  const handleDeleteConfirm = (id) => {
    axios.delete(`http://localhost:8081/api/contact-submissions/${id}`)
      .then(() => {
        fetchContactSubmissions();
        setDeleteConfirmId(null);
        showMessage('Contact submission deleted successfully.', 'success');
      })
      .catch(() => {
        showMessage('Failed to delete contact submission.', 'error');
        setDeleteConfirmId(null);
      });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>
        Contact Form Submissions
      </h1>

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
                  <td style={cellStyle}><input name="name" value={editData.name} onChange={handleEditChange} /></td>
                  <td style={cellStyle}><input name="email" value={editData.email} onChange={handleEditChange} /></td>
                  <td style={cellStyle}><input name="category" value={editData.category} onChange={handleEditChange} /></td>
                  <td style={cellStyle}><textarea name="message" value={editData.message} onChange={handleEditChange}></textarea></td>
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
                    {deleteConfirmId === submission.id ? (
                      <>
                        <span style={{ marginRight: '10px', color: '#d9534f', fontWeight: 'bold' }}>Confirm delete?</span>
                        <button
                          onClick={() => handleDeleteConfirm(submission.id)}
                          style={{
                            backgroundColor: '#d9534f',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            marginRight: '5px'
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
                            borderRadius: '4px'
                          }}
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(submission)}>Edit</button>
                        <button
                          onClick={() => setDeleteConfirmId(submission.id)}
                          style={{ marginLeft: '10px', color: 'red', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </>
              )}
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

export default AdminContactForm;
