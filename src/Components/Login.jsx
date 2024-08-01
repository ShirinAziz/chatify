import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => setError("Failed to fetch CSRF token"));
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
        // Spara token i localStorage eller en cookie
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true); // Uppdatera tillståndet för att visa att användaren är inloggad
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
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
