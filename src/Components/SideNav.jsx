import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import UserInfo from "./UserInfo";

const SideNav = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login"); // Navigera till inloggningssidan
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg">
      <button onClick={handleLogout} className="btn btn-primary md:px-8">
        Log Out
      </button>
      <UserInfo />
    </div>
  );
};

export default SideNav;
