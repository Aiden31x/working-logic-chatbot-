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
    <ChatStep
      message={processedMessage}
      options={currentStep?.options}
      onOptionClick={handleOptionClick}
      messages={messages}
      userName={userName}
      isNameSet={isNameSet}
      onNameSubmit={handleNameSubmit}
      showFeedback={true}
    />
  );
};

export default ChatFlow;