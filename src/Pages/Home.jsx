import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      Home
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={() => navigate("/c")}>CreateCampaign</button>
    </div>
  );
};

export default Home;
