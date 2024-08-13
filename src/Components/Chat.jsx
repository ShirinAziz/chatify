import React from "react";
import SideNav from "./SideNav";
import Conversations from "./Conversations";

const Chat = () => {
  return (
    <div>
      <SideNav />

      <div className="">
        <Conversations />
      </div>
    </div>
  );
};

export default Chat;
