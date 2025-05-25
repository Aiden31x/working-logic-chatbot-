import React, { useState } from "react";
import ChatStep from "./ChatStep";
import chatbotData from "../data/chatbotData.json";

const ChatFlow = () => {
  const [navStack, setNavStack] = useState(["main"]);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const currentKey = navStack[navStack.length - 1];
  const currentStep = chatbotData[currentKey];

  // Replace {{userName}} in messages
  const getProcessedMessage = (message) => {
    return message.replace("{{userName}}", userName);
  };

  const handleOptionClick = (option) => {
    if (option === "Back to Main Menu") {
      setNavStack(["main"]); //sets state back to main menu
    } else if (option.startsWith("Back to")) {
      const backTo = option.replace("Back to ", "").trim(); //trims back to and makes option same as it needs
      const newStack = navStack.slice(0, navStack.lastIndexOf(backTo) + 1);
      if (newStack.length > 0) {
        setNavStack(newStack);
      } else {
        setNavStack(["main"]);
      }
    } else if (chatbotData[option]) {
      setNavStack([...navStack, option]);
    }
  };

  const handleNameSubmit = () => {
    setUserName(nameInput);
    setIsNameSet(true);
  };

  return (
    <div className="chat-container">
      {!isNameSet ? (
        <div className="name-prompt">
          <p>Hi! What’s your name?</p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleNameSubmit}>Start</button>
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
