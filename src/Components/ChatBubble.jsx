import React from "react";

const ChatBubble = ({ avatar, text, sender }) => {
  return (
    <div
      className={`gap-1 items-center ${
        sender ? "flex" : "flex flex-row-reverse"
      }`}
    >
      <div className="avatar h-8 w-8">
        <div
          className={`ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ${
            sender ? "ring-primary" : "ring-secondary"
          }`}
        >
          <img src={avatar} />
        </div>
      </div>
      <div className={`chat ${sender ? "chat-start" : "chat-end"}`}>
        <div
          className={`chat-bubble  ${
            sender ? "chat-bubble-primary" : "chat-bubble-secondary"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
