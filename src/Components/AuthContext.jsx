import { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  console.log("isLoggedin", isLoggedIn);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );
  console.log("user ", user);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
