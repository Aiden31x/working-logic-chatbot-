import React, { useState, useEffect } from "react";
import ChatStep from "./ChatStep";
import ChatInput from "./ChatInput";
import chatbotData from "../data/chatbotData.json";

const ChatFlow = () => {
  const [navStack, setNavStack] = useState(["main"]);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [messages, setMessages] = useState([]);

  const currentKey = navStack[navStack.length - 1];
  const currentStep = chatbotData[currentKey];

  const processedMessage = currentStep?.message?.replace("{{userName}}", userName) || "";

  useEffect(() => {
    if (isNameSet && processedMessage) {
      setMessages(prev => [...prev, processedMessage]);
    }
  }, [currentKey, isNameSet]);

  const handleOptionClick = (option) => {
    if (option === "Back to Main Menu") {
      setNavStack(["main"]);
    } else if (option.startsWith("Back to")) {
      const backTo = option.replace("Back to ", "").trim();
      const newStack = navStack.slice(0, navStack.lastIndexOf(backTo) + 1);
      setNavStack(newStack.length > 0 ? newStack : ["main"]);
    } else if (chatbotData[option]) {
      setNavStack([...navStack, option]);
    }
  };

  const handleNameSubmit = (enteredName) => {
    setUserName(enteredName);
    setIsNameSet(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {!isNameSet ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome!</h1>
              <p className="text-blue-100">Let's get started with your chat experience</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Hi there!</h2>
                <p className="text-gray-600">What should I call you?</p>
              </div>
              
              <ChatInput
                onSendMessage={handleNameSubmit}
                placeholder="Enter your name..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Chat Assistant</h1>
                  <p className="text-blue-100 text-sm">Hello, {userName}!</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-blue-100">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <ChatStep
              message={processedMessage}
              options={currentStep.options}
              onOptionClick={handleOptionClick}
              messages={messages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFlow;