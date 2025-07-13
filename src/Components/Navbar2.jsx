import React from 'react';
import styles from "./Navbar2.module.css";
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.navbar2Container}>
      <h3>WeFund</h3>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/myprofile")}>My Profile</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  )
}

export default Navbar2
