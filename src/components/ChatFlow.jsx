import React, { useState } from "react";
import ChatStep from "./ChatStep";
import ChatInput from "./ChatInput"; // ✅ Import it
import chatbotData from "../data/chatbotData.json";

const ChatFlow = () => {
  const [navStack, setNavStack] = useState(["main"]);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  const currentKey = navStack[navStack.length - 1];
  const currentStep = chatbotData[currentKey];

  const getProcessedMessage = (message) => {
    return message.replace("{{userName}}", userName);
  };

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
    <div className="chat-container">
      {!isNameSet ? (
        <div className="name-prompt">
          <p>Hi! What’s your name?</p>
          <ChatInput
            onSendMessage={handleNameSubmit}
            placeholder="Enter your name..."
          />
        </div>
      ) : (
        <ChatStep
          message={getProcessedMessage(currentStep.message)}
          options={currentStep.options}
          onOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};

export default ChatFlow;
