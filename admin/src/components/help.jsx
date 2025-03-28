import React, { useState } from "react";
import axios from "axios";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message immediately
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages);
      setUserInput("");

      const response = await axios.post("http://localhost:9090/generate", { 
        userPrompt: userInput,
      });

      setMessages([
        ...newMessages,
        { 
          text: response.data.response || "No response received", 
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to get response. Please try again.");
      setMessages([...messages, { text: userInput, sender: "user" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Floating Button */}
      <button 
        className="chat-toggle-btn"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
        {!isOpen && messages.length > 0 && (
          <span className="message-indicator"></span>
        )}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="chat-wrapper">
          <div className="chat-overlay" onClick={toggleChat}></div>
          <div className="chat-box">
            <div className="chat-header">
              <h3>Support Chat</h3>
              <div className="chat-actions">
                <button 
                  className="clear-btn"
                  onClick={() => setMessages([])}
                  disabled={messages.length === 0}
                >
                  Clear
                </button>
                <button 
                  className="close-btn"
                  onClick={toggleChat}
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="chat-body">
              {messages.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">💬</div>
                  <p>How can I help you today?</p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender}`}
                >
                  <div className="message-content">
                    {msg.text}
                  </div>
                  {msg.timestamp && (
                    <div className="message-time">{msg.timestamp}</div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot">
                  <div className="message-content loading">
                    <div className="loading-spinner"></div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="chat-error">
                {error}
              </div>
            )}

            <div className="chat-footer">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !userInput.trim()}
              >
                {isLoading ? (
                  <div className="send-spinner"></div>
                ) : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .chat-container {
          position: relative;
          z-index: 1000;
        }
        
        .chat-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          z-index: 1001;
        }
        
        .chat-toggle-btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }
        
        .message-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }
        
        .chat-wrapper {
          position: fixed;
          inset: 0;
          z-index: 1000;
        }
        
        .chat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        
        .chat-box {
          position: fixed;
          bottom: 80px;
          right: 24px;
          width: 100%;
          max-width: 400px;
          height: 500px;
          max-height: 80vh;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: chatOpen 0.2s ease-out;
        }
        
        @keyframes chatOpen {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #3b82f6;
          color: white;
        }
        
        .chat-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .chat-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .clear-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        
        .clear-btn:hover {
          opacity: 1;
        }
        
        .clear-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .close-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: #f9fafb;
        }
        
        .empty-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          text-align: center;
          padding: 24px;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.5;
        }
        
        .message {
          margin-bottom: 12px;
          max-width: 80%;
        }
        
        .message.user {
          margin-left: auto;
        }
        
        .message.bot {
          margin-right: auto;
        }
        
        .message-content {
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
          word-break: break-word;
        }
        
        .message.user .message-content {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .message.bot .message-content {
          background: #e5e7eb;
          color: #111827;
          border-bottom-left-radius: 4px;
        }
        
        .message-time {
          font-size: 10px;
          color: #6b7280;
          margin-top: 4px;
          text-align: right;
        }
        
        .message.user .message-time {
          text-align: right;
        }
        
        .message.bot .message-time {
          text-align: left;
        }
        
        .loading-spinner,
        .send-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        .send-spinner {
          margin: 0 auto;
          border-top-color: #3b82f6;
        }
        
        .message.bot .loading-spinner {
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top-color: #3b82f6;
        }
        
        .chat-error {
          padding: 8px 16px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 12px;
          text-align: center;
        }
        
        .chat-footer {
          display: flex;
          padding: 12px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }
        
        .chat-footer input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          outline: none;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        
        .chat-footer input:focus {
          border-color: #3b82f6;
        }
        
        .chat-footer button {
          margin-left: 8px;
          min-width: 60px;
          padding: 10px 14px;
          border: none;
          border-radius: 20px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chat-footer button:hover {
          background: #2563eb;
        }
        
        .chat-footer button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatButton;