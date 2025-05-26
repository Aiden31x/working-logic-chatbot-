// ChatStep.jsx - Updated with new FeedbackButtons component
import React from 'react';
import FeedbackButtons from './FeedBackButton';
import ChatInput from './ChatInput';

const ChatStep = ({ 
  message, 
  options, 
  onOptionClick, 
  messageId, 
  onFeedback, 
  showFeedback = true, 
  messages, 
  userName, 
  isNameSet, 
  onNameSubmit,
  onShowDefault // Add this prop to handle default case from thumbs down
}) => {
  const handleFeedback = (msgId, feedbackType) => {
    console.log(`Feedback for message ${msgId}: ${feedbackType}`);
    if (onFeedback) {
      onFeedback(msgId, feedbackType);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isNameSet ? (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  StudyIndia<span className="text-orange-400">Bot</span>
                </h1>
                <p className="text-blue-100 text-sm">Your Study in India Assistant</p>
              </div>
            </div>
            <button className="text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-6 min-h-80">
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-gray-800 text-base leading-relaxed">
                Hi there! I am Study in India Assistant.<br />
                What is your name?
              </p>
              
              {/* New Feedback buttons */}
              {showFeedback && (
                <div className="flex justify-end mt-4">
                  <FeedbackButtons
                    messageId="initial-message"
                    onFeedback={handleFeedback}
                    onShowDefault={onShowDefault}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Input Section */}
          <div className="px-6 pb-6">
            <div className="flex space-x-3">
              <div className="flex-1">
                <ChatInput
                  onSendMessage={onNameSubmit}
                  placeholder="Enter your name.."
                />
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Chat ⚡ by <span className="text-blue-500 font-semibold">StudyIndia</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  StudyIndia<span className="text-orange-400">Bot</span>
                </h1>
                <p className="text-blue-100 text-sm">Hello, {userName}!</p>
              </div>
            </div>
            <button className="text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>

          {/* Scrollable Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-800 text-base leading-relaxed">
  {message.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ))}
</p>

                {showFeedback && index === messages.length - 1 && (
                  <div className="flex justify-end mt-4">
                    <FeedbackButtons
                      messageId={`message-${index}`}
                      onFeedback={handleFeedback}
                      onShowDefault={onShowDefault}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky Options Section */}
          {options && options.length > 0 && (
            <div className="bg-white border-t border-gray-200 p-4 flex flex-wrap gap-2 flex-shrink-0">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition-colors duration-200"
                  onClick={() => onOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-3 bg-gray-50 flex-shrink-0">
            <p className="text-gray-500 text-sm">
              Chat ⚡ by <span className="text-blue-500 font-semibold">StudyIndia</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatStep;