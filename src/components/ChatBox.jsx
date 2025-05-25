import React from 'react';
import Header from './Header';
import ChatFlow from './ChatFlow';

const ChatBox = () => {
  return (
    <div className="chat-box">
      <Header />
      <ChatFlow />
    </div>
  );
};

export default ChatBox;
