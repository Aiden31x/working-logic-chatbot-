// ChatInput.jsx
import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({
  onSendMessage,
  placeholder = "Enter your name...",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Auto-focus on mount
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && !disabled) {
      console.log("Sending:", trimmed); // debug log
      onSendMessage(trimmed);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e)=>{
                handleKeyDown(e);
            }}
            placeholder={placeholder}
            className="chat-input-field"
            disabled={disabled}
          />

          <button
            type="submit"
            className="chat-send-button"
            disabled={!inputValue.trim() || disabled}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L2 8.667l9.583 3.75L22 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m11.583 12.417 3.75 9.583L22 2l-10.417 10.417z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="chat-footer">
        <span className="chat-footer-text">
          Chat <span className="lightning-emoji">⚡</span> by <span className="brand-name">StudyIndia</span>
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
