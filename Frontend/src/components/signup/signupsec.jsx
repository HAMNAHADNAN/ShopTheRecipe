import React, { useState } from 'react';
import '../../scss/signup.scss';
import { useNavigate } from 'react-router-dom';

const Signupsec = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // 🚀 For redirection

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            console.log("Sending signup data:", formData);

            const response = await fetch('http://localhost:8081/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Signup successful! Redirecting to login...');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    country: '',
                    password: '',
                    confirmPassword: ''
                });

                // Redirect after 1.5 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                setError(result.message || 'Signup failed');
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError('An error occurred. Try again later.');
        }
    };

    return (
        <div className='signupsec-container'>
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="signup-title">Create Account</h2>

                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="signup-input" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="signup-input" required />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="signup-input" required />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="signup-input" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="signup-input" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="signup-input" required />
                <button className="signup-button" type="submit">Sign Up</button>
                <p>Already have an account? <a href="/login">Log In</a></p>
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
            </form>
        </div>
        </div>
    );
};

export default Signupsec;
