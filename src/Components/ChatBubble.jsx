import React from "react";

const ChatBubble = ({ avatar, text, sender, handleRemove, messageId }) => {
  return (
    <div
      className={`gap-1 items-center ${
        sender ? "flex flex-row-reverse" : "flex"
      }`}
    >
      <div
        className={` ${!sender && "hidden"}`}
        onClick={() => handleRemove(messageId)}
      >
        X
      </div>
      <div className="avatar h-8 w-8">
        <div className="ring-offset-base-100 ring-primary w-8 rounded-full ring ring-offset-2">
          <img src={avatar} />
        </div>
      </div>
      <div className={`chat ${sender ? "chat-end" : "chat-start"}`}>
        <div
          className={`chat-bubble  ${
            sender ? "chat-bubble" : "chat-bubble bg-gray-200 text-black"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
