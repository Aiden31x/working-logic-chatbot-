// ChatStep.jsx - Updated with Tailwind only, no custom CSS classes

import FeedbackButtons from './FeedBackButton';

const ChatStep = ({ message, options, onOptionClick, messageId, onFeedback, showFeedback = true, messages }) => {
  const handleFeedback = (msgId, feedbackType) => {
    console.log(`Feedback for message ${msgId}: ${feedbackType}`);
    // You can handle feedback logging here
    if (onFeedback) {
      onFeedback(msgId, feedbackType);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Scrollable chat messages section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg border-l-4 border-blue-500">
            {message}
          </div>
        ))}
        {showFeedback && (
          <FeedbackButtons 
            messageId={messageId || Date.now()} 
            onFeedback={handleFeedback}
          />
        )}
      </div>
      
      {/* Sticky options section */}
      {options && options.length > 0 && (
        <div className="sticky bottom-0 bg-gray-800 text-white p-4 border-t border-gray-600 shadow-lg">
          <div className="flex flex-wrap gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 cursor-pointer"
                data-option={option}
                onClick={() => onOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatStep;