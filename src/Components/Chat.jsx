import React from "react";
import SideNav from "./SideNav";
import Conversations from "./Conversations";

const Chat = () => {
  return (
    <div>
      <SideNav />

      <div className="flex flex-col items-center h-screen bg-gray-300">
        <Conversations />
      </div>
    </div>
  );
};

export default Chat;
