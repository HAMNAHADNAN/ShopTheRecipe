

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSec = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    country: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (userId) {
      axios.get(`http://localhost:8081/profile/${userId}`)
        .then((res) => {
          setUser(res.data);
          setFormData({
            name: res.data.name,
            email: res.data.email,
            phone_number: res.data.phone_number,
            country: res.data.country
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setMessage("Failed to fetch user data.");
          setMessageType("error");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setMessage("User not found.");
      setMessageType("error");
    }
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000); // auto-hide after 4s
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user?.id;

    axios.put(`http://localhost:8081/profile/${userId}`, formData)
      .then((res) => {
        setUser({ ...user, ...formData });
        setEditing(false);
        showMessage('Profile updated successfully!', 'success');
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        showMessage('Failed to update profile.', 'error');
      });
  };

  if (loading) return <p className="p-6">Loading user data...</p>;
  if (!user) return <p className="p-6">User not found!</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm border ${
          messageType === 'success'
            ? 'bg-green-100 text-green-700 border-green-300'
            : 'bg-red-100 text-red-700 border-red-300'
        }`}>
          {message}
        </div>
      )}

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="p-2 border rounded w-full bg-gray-200"
            />
          </div>
          <div>
            <label className="block">Phone:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save Changes</button>
        </form>
      ) : (
        <div className="p-4 border rounded shadow">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone_number}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 p-2 bg-yellow-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSec;

