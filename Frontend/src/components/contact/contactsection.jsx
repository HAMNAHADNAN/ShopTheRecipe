import React, { useState } from 'react';
//import 'C:/Projects/website_3/src/scss/contactsec.scss';
import '../../scss/contactsec.scss'


const ContactSec = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8081/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setSubmitMessage(result.message);
        setIsError(false);
        setFormData({ name: '', email: '', category: '', message: '' });
      } else {
        setSubmitMessage(result.message || 'Submission failed');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('An error occurred. Please try again later.');
      setIsError(true);
    }
  };
  
  

  return (
    <div className="contact-container">
      <h1>Contact Us:</h1>
        <div className='sub-contact-container'>
      <h2>Get in touch</h2>
      <p>Have a question, suggestion, or just want to say hello? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
        {submitMessage && (
  <p className={`submit-message ${isError ? 'error' : 'success'}`}>
    {submitMessage}
  </p>
)}
      </form>
      </div>
    </div>
  );
};

export default ContactSec;
