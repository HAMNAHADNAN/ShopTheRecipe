


import React, { useState } from 'react';
import '../../scss/login.scss';
import { useNavigate } from 'react-router-dom';

const Loginsec = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setSuccess('');
    
    //     try {
    //         console.log("Sending login data:", formData);
    
    //         const response = await fetch('http://localhost:8081/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         });
    
    //         const result = await response.json();
    
    //         if (response.ok) {
    //             // ✅ Save user data in localStorage
    //             localStorage.setItem('user', JSON.stringify(result.user));

    //             // 🔄 Notify BaseComponent to update navbar
    //             window.dispatchEvent(new Event("userChanged"));

    //             setSuccess('Login successful! Redirecting...');
    //             setTimeout(() => {
    //                 navigate('/'); // Redirect to home or any other route
    //             }, 1500);
    //         } else {
    //             if (result.message === 'Email not found') {
    //                 setError('Email not found. Redirecting to signup...');
    //                 setTimeout(() => {
    //                     navigate('/signup');
    //                 }, 2000);
    //             } else {
    //                 setError(result.message || 'Incorrect email or password.');
    //             }
    //         }
    //     } catch (err) {
    //         console.error("Login error:", err);
    //         setError('An error occurred. Please try again later.');
    //     }
    // };
    

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        console.log("Sending login data:", formData);

        const response = await fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // ✅ Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));

            // 🔄 Notify BaseComponent to update navbar
            window.dispatchEvent(new Event("userChanged"));

            setSuccess('Login successful! Redirecting...');

            setTimeout(() => {
                // 🔐 Check if user is admin
                if (
                    formData.email === 'admin@shoptherecipe.com' &&
                    formData.password === 'admin123'
                ) {
                    navigate('/adminportal');
                } else {
                    navigate('/');
                }
            }, 1500);
        } else {
            if (result.message === 'Email not found') {
                setError('Email not found. Redirecting to signup...');
                setTimeout(() => {
                    navigate('/signup');
                }, 2000);
            } else {
                setError(result.message || 'Incorrect email or password.');
            }
        }
    } catch (err) {
        console.error("Login error:", err);
        setError('An error occurred. Please try again later.');
    }
};



    return (
        <div className='loginsec-container'>
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    <button className="login-button" type="submit">Login</button>
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    {error && <p className="error-text">{error}</p>}
                    {success && <p className="success-text">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default Loginsec;

