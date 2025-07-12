import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { server } from "../main.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Loader from "../Components/Loader.jsx";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();

  const { setIsAuthenticated, loading, setLoading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      console.log(res.data);

      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      navigate("/");
	  
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="l-container">
         {loading ? <Loader /> : null}
        <form className="login-container" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              aria-label="Email"
            />
            <FaEnvelope className="input-icon-right" />
          </div>
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
              aria-label="Password"
            />
            <span
              className="input-icon-right"
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/login")}> Register</span>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
