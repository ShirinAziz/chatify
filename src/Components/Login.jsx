import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Kontrollera om användaren redan är inloggad
    const token = localStorage.getItem("authToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      setIsLoggedIn(true);
      navigate("/chat"); // Om användaren redan är inloggad, omdirigera till chattsidan
    }
    setLoading(false);
  }, [setIsLoggedIn, setUser, navigate]);

  useEffect(() => {
    fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch(() => setError("Failed to fetch CSRF token"));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        " https://chatify-api.up.railway.app/auth/token",
        {
          username,
          password,
          csrfToken,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        console.log(response.data);
        // Spara token och användarinformation i localStorage eller en cookie
        const user = jwtDecode(token);
        console.log(user);
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        setIsLoggedIn(true); // Uppdatera tillståndet för att visa att användaren är inloggad
        setUser(user);
        navigate("/chat");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.error || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Menu />
      <div className="hero h-[500px]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full sm:w-[400px] shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6 gap-2">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <Link to="/register">
                  <button className="btn btn-primary btn-outline w-full">
                    Sign Up
                  </button>
                </Link>
              </div>
              {error && <p>{error}</p>}
            </form>
            {isLoggedIn && <p>Logged in successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
