// src/components/FloatingChatBot.jsx
import React, { useState } from 'react';
import GeminiChatbot from './chatbot';

const FloatingChatBot = () => {


  const [open, setOpen] = useState(false);
 
  return (
    <>
      {open && <GeminiChatbot />}
      <button 
       onClick={() => {
          setOpen(!open);
          console.log("Chatbot toggled:", !open); // Logs the new state of 'open'
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          backgroundColor: '#2b72d6',
          color: '#fff',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        💬
      </button>
    </>
  );
};

export default FloatingChatBot;
