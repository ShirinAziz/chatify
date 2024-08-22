import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }

  return (
    <div className="user-info flex gap-2 items-center">
      <img src={user.avatar} className="rounded-full h-[40px] w-[40px]" />
      <p>Welcome {user.user}</p>
    </div>
  );
};

export default UserInfo;
