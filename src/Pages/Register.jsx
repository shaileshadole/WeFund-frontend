import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Context } from "../context";
import { server } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Loader from "../Components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const { setIsAuthenticated, loading, setLoading, setCUser } =
    useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    if (password != confirmPassword) {
      return toast.error("Password Doesn't match");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${server}/user/register`,
        {
          name,
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

      // 👇 Immediately fetch user data
      try {
        const userRes = await axios.get(`${server}/user/meprofile`, {
          withCredentials: true,
        });
        setCUser(userRes.data.user);
        console.log(cuser);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }

      // Reset Form
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
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
          <h3>Create Account</h3>
          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              aria-label="name"
            />
            <FaUser className="input-icon-right" />
          </div>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type={showPassword2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Your Password"
              required
              aria-label="Password"
            />
            <span
              className="input-icon-right"
              onClick={() => setShowPassword2((prev) => !prev)}
            >
              {showPassword2 ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}> Log in</span>
          </p>
        </form>
      </div>
    </>
  );
};
export default Register;
