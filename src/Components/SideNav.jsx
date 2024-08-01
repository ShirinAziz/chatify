import React from "react";
import { useNavigate } from "react-router";

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    navigate("/login"); // Navigera till inloggningssidan
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn btn-primary md:px-8">
        LogOut
      </button>
    </div>
  );
};

export default SideNav;
