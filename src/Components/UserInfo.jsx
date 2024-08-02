import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }

  return (
    <div className="user-info">
      <img src={user.avatar} />
      <p>Welcome {user.user}</p>
    </div>
  );
};

export default UserInfo;
