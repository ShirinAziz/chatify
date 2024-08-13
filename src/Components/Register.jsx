import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Skicka användardata till backend
      const response = await axios.post(
        "https://chatify-api.up.railway.app/auth/register",

        {
          email,
          username,
          password,
          csrfToken,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login"); // Redirect till inloggningssidan vid lyckad registrering
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error); // Visar felmeddelandet från API:et
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Menu />
      <div className="hero  h-[600px]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full  sm:w-[400px] shrink-0 shadow-2xl">
            <form className="card-body " onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Signup</button>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}
              {success && (
                <p className="text-green-500 mt-2">Registration successful!</p>
              )}
            </form>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Register;
