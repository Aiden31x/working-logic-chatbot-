// ChatStep.jsx - Updated with Feedback
import React from 'react';
import FeedbackButtons from './FeedBackButton';

const ChatStep = ({ message, options, onOptionClick, messageId, onFeedback, showFeedback = true }) => {
  const handleFeedback = (msgId, feedbackType) => {
    console.log(`Feedback for message ${msgId}: ${feedbackType}`);
    // You can handle feedback logging here
    if (onFeedback) {
      onFeedback(msgId, feedbackType);
    }
  };

  return (
    <div className="chat-step">
      <div className="bot-message-container">
        <p className="chat-message">{message}</p>
        {showFeedback && (
          <FeedbackButtons 
            messageId={messageId || Date.now()} 
            onFeedback={handleFeedback}
          />
        )}
      </div>
      
      {options && options.length > 0 && (
        <div className="chat-options">
          {options.map((option, index) => (
            <button
              key={index}
              className="chat-option-button"
              data-option={option}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatStep;