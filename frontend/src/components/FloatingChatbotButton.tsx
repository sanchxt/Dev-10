// import React from "react";
// import "./FloatingChatbot.css"; // We'll create this CSS file next

// const FloatingChatbot: React.FC = () => {
//   return (
//     <div className="floating-chatbot">
//       <iframe
//         src="https://dev10chatbot.streamlit.app/?embedded=true"
//         title="Streamlit Chatbot"
//         frameBorder="0"
//         className="chatbot-iframe"
//       ></iframe>
//     </div>
//   );
// };

// export default FloatingChatbot;

// FloatingChatbotButton.tsx
import React, { useState } from "react";
import "./FloatingChatbotButton.css";

const FloatingChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`floating-chatbot ${isOpen ? "open" : ""}`}>
        <iframe
          src="https://dev10chatbot.streamlit.app/?embedded=true"
          title="Streamlit Chatbot"
          frameBorder="0"
          className="chatbot-iframe"
        ></iframe>
      </div>
      <button className="chatbot-button" onClick={toggleChatbot}>
        <img src="frontend\public\dev10-logo.webp" alt="Chatbot" className="chatbot-icon" />
      </button>
    </>
  );
};

export default FloatingChatbotButton;

