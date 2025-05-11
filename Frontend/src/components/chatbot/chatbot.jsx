// import { useEffect, useRef, useState } from "react";
// import Message from "./Message";
// import PromptForm from "./PromptForm";
// import Sidebar from "./Sidebar";
// import { Menu } from "lucide-react";
// import '../../scss/chatbot.css'

// const GeminiChatbot = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const typingInterval = useRef(null);
//   const messagesContainerRef = useRef(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) return savedTheme;
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     return prefersDark ? "dark" : "light";
//   });

//   const [conversations, setConversations] = useState(() => {
//     try {
//       const saved = localStorage.getItem("conversations");
//       return saved ? JSON.parse(saved) : [{ id: "default", title: "New Chat", messages: [] }];
//     } catch {
//       return [{ id: "default", title: "New Chat", messages: [] }];
//     }
//   });

//   const [activeConversation, setActiveConversation] = useState(() => {
//     return localStorage.getItem("activeConversation") || "default";
//   });

//   useEffect(() => {
//     localStorage.setItem("activeConversation", activeConversation);
//   }, [activeConversation]);

//   useEffect(() => {
//     localStorage.setItem("conversations", JSON.stringify(conversations));
//   }, [conversations]);

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   const currentConversation = conversations.find((c) => c.id === activeConversation) || conversations[0];

//   const scrollToBottom = () => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTo({
//         top: messagesContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [conversations, activeConversation]);

//   const typingEffect = (text, messageId) => {
//     let textElement = document.querySelector(`#${messageId} .text`);
//     if (!textElement) return;

//     setConversations((prev) =>
//       prev.map((conv) =>
//         conv.id === activeConversation
//           ? {
//               ...conv,
//               messages: conv.messages.map((msg) => (msg.id === messageId ? { ...msg, content: "", loading: true } : msg)),
//             }
//           : conv
//       )
//     );

//     textElement.textContent = "";
//     const words = text.split(" ");
//     let wordIndex = 0;
//     let currentText = "";
//     clearInterval(typingInterval.current);
//     typingInterval.current = setInterval(() => {
//       if (wordIndex < words.length) {
//         currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
//         textElement.textContent = currentText;
//         setConversations((prev) =>
//           prev.map((conv) =>
//             conv.id === activeConversation
//               ? {
//                   ...conv,
//                   messages: conv.messages.map((msg) =>
//                     msg.id === messageId ? { ...msg, content: currentText, loading: true } : msg
//                   ),
//                 }
//               : conv
//           )
//         );
//         scrollToBottom();
//       } else {
//         clearInterval(typingInterval.current);
//         setConversations((prev) =>
//           prev.map((conv) =>
//             conv.id === activeConversation
//               ? {
//                   ...conv,
//                   messages: conv.messages.map((msg) =>
//                     msg.id === messageId ? { ...msg, content: currentText, loading: false } : msg
//                   ),
//                 }
//               : conv
//           )
//         );
//         setIsLoading(false);
//       }
//     }, 40);
//   };

//   // const generateResponse = async (conversation, botMessageId) => {
//   //   const formattedMessages = conversation.messages?.map((msg) => ({
//   //     role: msg.role === "bot" ? "model" : msg.role,
//   //     parts: [{ text: msg.content }],
//   //   }));
//   //   try {
//   //     const res = await fetch(import.meta.env.VITE_API_URL, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ contents: formattedMessages }),
//   //     });
//   //     const data = await res.json();
//   //     if (!res.ok) throw new Error(data.error.message);

//   //     const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
//   //     typingEffect(responseText, botMessageId);
//   //   } catch (error) {
//   //     setIsLoading(false);
//   //     updateBotMessage(botMessageId, error.message, true);
//   //   }
//   // };

// const generateResponse = async (conversation, botMessageId) => {
//   const formattedMessages = conversation.messages?.map((msg) => ({
//     role: msg.role === "bot" ? "model" : msg.role,
//     parts: [{ text: msg.content }],
//   }));

//   setIsLoading(true);  // Set loading state before the API call.

//   try {
//     const res = await fetch(process.env.REACT_APP_API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ contents: formattedMessages }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error?.message || "Unknown error");

//     const responseText = data.candidates[0].content.parts[0].text
//       .replace(/\*\*([^*]+)\*\*/g, "$1")
//       .trim();

//     typingEffect(responseText, botMessageId);
//   } catch (error) {
//     setIsLoading(false);  // Stop loading on error.
//     updateBotMessage(botMessageId, error.message, true);
//   }
// };



//   const updateBotMessage = (botId, content, isError = false) => {
//     setConversations((prev) =>
//       prev.map((conv) =>
//         conv.id === activeConversation
//           ? {
//               ...conv,
//               messages: conv.messages.map((msg) =>
//                 msg.id === botId ? { ...msg, content, loading: false, error: isError } : msg
//               ),
//             }
//           : conv
//       )
//     );
//   };

// //   return (
// //     <div className="chatbot-container" style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 1000 }}>
// //     <div className={`app-container ${theme === "light" ? "light-theme" : "dark-theme"}`}>
// //       <div className={`overlay ${isSidebarOpen ? "show" : "hide"}`} onClick={() => setIsSidebarOpen(false)}></div>
// //       <Sidebar
// //         conversations={conversations}
// //         setConversations={setConversations}
// //         activeConversation={activeConversation}
// //         setActiveConversation={setActiveConversation}
// //         theme={theme}
// //         setTheme={setTheme}
// //         isSidebarOpen={isSidebarOpen}
// //         setIsSidebarOpen={setIsSidebarOpen}
// //       />
// //       <main className="main-container">
// //         <header className="main-header">
// //           <button onClick={() => setIsSidebarOpen(true)} className="sidebar-toggle">
// //             <Menu size={18} />
// //           </button>
// //         </header>

// //         {currentConversation.messages.length === 0 ? (
// //           <div className="welcome-container">
// //             <img className="welcome-logo" src="gemini.svg" alt="Gemini Logo" />
// //             <h1 className="welcome-heading">Message Gemini</h1>
// //             <p className="welcome-text">Ask me anything about any topic. I'm here to help!</p>
// //           </div>
// //         ) : (
// //           <div className="messages-container" ref={messagesContainerRef}>
// //             {currentConversation.messages.map((message) => (
// //               <Message key={message.id} message={message} />
// //             ))}
// //           </div>
// //         )}

// //         <div className="prompt-container">
// //           <div className="prompt-wrapper">
// //             <PromptForm
// //               conversations={conversations}
// //               setConversations={setConversations}
// //               activeConversation={activeConversation}
// //               generateResponse={generateResponse}
// //               isLoading={isLoading}
// //               setIsLoading={setIsLoading}
// //             />
// //           </div>
// //           <p className="disclaimer-text">Gemini can make mistakes, so double-check it.</p>
// //         </div>
// //       </main>
// //     </div>
// //     </div>
// //   );
// // };


// return (
//   <div className="chatbot-container" style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 1000 }}>
//     <div className={`app-container ${theme === "light" ? "light-theme" : "dark-theme"}`}>
//       <div className={`overlay ${isSidebarOpen ? "show" : "hide"}`} onClick={() => setIsSidebarOpen(false)}></div>
//       <Sidebar
//         conversations={conversations}
//         setConversations={setConversations}
//         activeConversation={activeConversation}
//         setActiveConversation={setActiveConversation}
//         theme={theme}
//         setTheme={setTheme}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
//       <main className="main-container">
//         <header className="main-header">
//           <button onClick={() => setIsSidebarOpen(true)} className="sidebar-toggle">
//             <Menu size={18} />
//           </button>
//         </header>

//         {currentConversation.messages.length === 0 ? (
//           <div className="welcome-container">
//             <img className="welcome-logo" src="gemini.svg" alt="Gemini Logo" />
//             <h1 className="welcome-heading">Message Gemini</h1>
//             <p className="welcome-text">Ask me anything about any topic. I'm here to help!</p>
//           </div>
//         ) : (
//           <div className="messages-container" ref={messagesContainerRef}>
//             {currentConversation.messages.map((message) => (
//               <Message key={message.id} message={message} />
//             ))}
//           </div>
//         )}

//         <div className="prompt-container">
//           <div className="prompt-wrapper">
//             <PromptForm
//               conversations={conversations}
//               setConversations={setConversations}
//               activeConversation={activeConversation}
//               generateResponse={generateResponse}
//               isLoading={isLoading}
//               setIsLoading={setIsLoading}
//             />
//           </div>
//           <p className="disclaimer-text">Gemini can make mistakes, so double-check it.</p>
//         </div>
//       </main>
//     </div>
//   </div>
// );
// };


// export default GeminiChatbot;



import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import PromptForm from "./PromptForm";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import '../../scss/chatbot.css';

const GeminiChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const typingInterval = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem("conversations");
      return saved ? JSON.parse(saved) : [{ id: "default", title: "New Chat", messages: [] }];
    } catch {
      return [{ id: "default", title: "New Chat", messages: [] }];
    }
  });
  const [activeConversation, setActiveConversation] = useState(() =>
    localStorage.getItem("activeConversation") || "default"
  );

  useEffect(() => {
    localStorage.setItem("activeConversation", activeConversation);
  }, [activeConversation]);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const currentConversation =
    conversations.find((c) => c.id === activeConversation) || conversations[0];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(scrollToBottom, [conversations, activeConversation]);

  const typingEffect = (text, messageId) => {
    let el = document.querySelector(`#${messageId} .text`);
    if (!el) return;

    // clear out and mark loading
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === messageId ? { ...m, content: "", loading: true } : m
              ),
            }
          : conv
      )
    );
    el.textContent = "";
    const words = text.split(" ");
    let idx = 0,
      cur = "";
    clearInterval(typingInterval.current);
    typingInterval.current = setInterval(() => {
      if (idx < words.length) {
        cur += (idx ? " " : "") + words[idx++];
        el.textContent = cur;
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: conv.messages.map((m) =>
                    m.id === messageId ? { ...m, content: cur, loading: true } : m
                  ),
                }
              : conv
          )
        );
        scrollToBottom();
      } else {
        clearInterval(typingInterval.current);
        // mark done
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: conv.messages.map((m) =>
                    m.id === messageId ? { ...m, content: cur, loading: false } : m
                  ),
                }
              : conv
          )
        );
        setIsLoading(false);
      }
    }, 40);
  };

  const updateBotMessage = (botId, content, isError = false) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === botId ? { ...m, content, loading: false, error: isError } : m
              ),
            }
          : conv
      )
    );
  };


const generateResponse = async (conversation, botMessageId) => {
  const formattedMessages = conversation.messages?.map((msg) => ({
    role: msg.role === "bot" ? "model" : msg.role,
    parts: [{ text: msg.content }],
  }));

  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:8081/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedMessages }),
    });

    const data = await res.json();

    // Log the response to inspect its structure
    console.log("API response data:", data);

    if (!res.ok) throw new Error(data.error?.message || "Unknown error");

    // Check if the 'candidates' array exists and is non-empty
    if (data.candidates && data.candidates.length > 0) {
      const responseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .trim();
      typingEffect(responseText, botMessageId);
    } else {
      throw new Error("No candidates found in response.");
    }
  } catch (error) {
    setIsLoading(false);
    updateBotMessage(botMessageId, error.message, true);
  }
};


//   const generateResponse = async (conversation, botMessageId) => {
//     setIsLoading(true);
//     const formatted = conversation.messages.map((msg) => ({
//       role: msg.role === "bot" ? "model" : msg.role,
//       parts: [{ text: msg.content }],
//     }));

//     try {
//       // const res = await fetch(process.env.REACT_APP_API_URL, {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ contents: formatted }),
//       // });

//       const res = await fetch("http://localhost:8081/api/gemini", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ contents: formatted }),
// });

//       console.log("API status:", res.status);
//       const text = await res.text();
//       console.log("API response body:", text);

//       const ct = res.headers.get("Content-Type") || "";
//       if (!ct.includes("application/json")) {
//         throw new Error(`Expected JSON, got ${ct}`);
//       }

//       const data = JSON.parse(text);
//       if (!res.ok) {
//         throw new Error(data.error?.message || `HTTP ${res.status}`);
//       }

//       const reply = data.candidates[0].content.parts[0].text
//         .replace(/\*\*([^*]+)\*\*/g, "$1")
//         .trim();

//       typingEffect(reply, botMessageId);
//     } catch (err) {
//       console.error(err);
//       setIsLoading(false);
//       updateBotMessage(botMessageId, err.message, true);
//     }
//   };

  return (
    <div className="chatbot-container" style={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000 }}>
      <div className={`app-container ${theme === "light" ? "light-theme" : "dark-theme"}`}>
        <div className={`overlay ${isSidebarOpen ? "show" : "hide"}`} onClick={() => setIsSidebarOpen(false)} />
        <Sidebar
          conversations={conversations}
          setConversations={setConversations}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          theme={theme}
          setTheme={setTheme}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="main-container">
         

          {currentConversation.messages.length === 0 ? (
            <div className="welcome-container">
              <img className="welcome-logo" src="gemini.svg" alt="Gemini Logo" />
              <h1 className="welcome-heading">Message Gemini</h1>
              <p className="welcome-text">Ask me anything about any topic. I'm here to help!</p>
            </div>
          ) : (
            <div className="messages-container" ref={messagesContainerRef}>
              {currentConversation.messages.map((m) => (
                <Message key={m.id} message={m} />
              ))}
            </div>
          )}

          <div className="prompt-container">
            <div className="prompt-wrapper">
              <PromptForm
                conversations={conversations}
                setConversations={setConversations}
                activeConversation={activeConversation}
                generateResponse={generateResponse}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
            <p className="disclaimer-text">Gemini can make mistakes, so double-check it.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeminiChatbot;
