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
        <img src="/chatbot.png" alt="Chatbot" className="chatbot-icon" />
      </button>
    </>
  );
};

export default FloatingChatbotButton;
