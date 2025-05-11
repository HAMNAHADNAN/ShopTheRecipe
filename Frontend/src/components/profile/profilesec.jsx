import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSec = () => {
  const [user, setUser] = useState(null); // Store a specific user
  const [loading, setLoading] = useState(true); // Loading state
  const [editing, setEditing] = useState(false); // To toggle edit mode
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    country: ''
  });

  useEffect(() => {
    // Retrieve the user id from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (userId) {
      // Fetch specific user profile by ID from the backend
      axios.get(`http://localhost:8081/profile/${userId}`) // Fetch the user profile
        .then((res) => {
          console.log("Fetched user:", res.data);
          
          // Set the user and form data
          setUser(res.data); // Set the specific user
          setFormData({
            name: res.data.name,
            email: res.data.email,
            phone_number: res.data.phone_number,
            country: res.data.country
          });
          setLoading(false); // Set loading state to false once data is fetched
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setLoading(false); // Set loading state to false on error
        });
    } else {
      setLoading(false); // If no userId in localStorage, stop loading
    }
  }, []);

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

    // Update user data in the backend
    axios.put(`http://localhost:8081/profile/${userId}`, formData) // Send PUT request to update user profile
      .then((res) => {
        console.log("User updated:", res.data);
        setUser({ ...user, ...formData }); // Update user state with the new data
        setEditing(false); // Exit edit mode
        alert('Profile updated successfully!'); // Show alert message
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  if (loading) {
    return <p className="p-6">Loading user data...</p>;
  }

  if (!user) {
    return <p className="p-6">User not found!</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly 
              onChange={handleChange}
              className="p-2 border rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block">Phone:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="p-2 border rounded"
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


