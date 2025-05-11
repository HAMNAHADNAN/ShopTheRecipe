import { useEffect } from 'react';
import './App.scss';
import Navigation from "./navigation/navigation";
import FloatingChatBot from './components/chatbot/floatingchatbot';

function App() {
  return (
    <>
      <Navigation />
      <FloatingChatBot />
    </>
  );
}

export default App;
