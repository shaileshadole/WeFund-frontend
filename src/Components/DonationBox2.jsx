import React, { useContext, useEffect, useState } from "react";
import styles from "./DonationBox2.module.css";
import { Context } from "../context";
import { server } from "../config";
import axios from "axios";
import toast from "react-hot-toast";
import SLogin from "../SubComponents/SLogin";
import SCant from "../SubComponents/SCant";
import { useNavigate } from "react-router-dom";

const DonationBox2 = ({ campaign, creator, fetchData }) => {
  const [iamount, setiamount] = useState();
  const { isAuthenticated, cuser, loading, setLoading } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);

    const amount = parseFloat(iamount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid Amount");
      return;
    }

    //Adding donation Transaction
    try {
      const res = await axios.post(
        `${server}/donation/new/${campaign._id}`,
        {
          amount: iamount,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      fetchData();
    }
    setiamount("");
  };

  // Early returns for auth or self-donation checks
  if (!isAuthenticated)
    return (
      <div className={styles.donationBoxContainer}>
        <h3>
          Please <button onClick={() => navigate("/login")}>Login</button> to
          donate.
        </h3>
      </div>
    );

  //Console Logging
  console.log("cuser:", cuser);
  console.log("creator:", creator);

  if (cuser && cuser._id === creator)
    return (
      <div className={styles.donationBoxContainer}>
        <h3>You cannot donate to your own campaign.</h3>
      </div>
    );

  return (
    <div className={styles.donationBoxContainer}>
      <h3>Support this cause 💖</h3>
      <input
        type="text"
        value={iamount}
        onChange={(e) => setiamount(e.target.value)}
      />
      <button onClick={handleSubmit}>Donate</button>
    </div>
  );
};

export default DonationBox2;
