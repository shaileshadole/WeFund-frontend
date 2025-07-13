import React, { useContext, useEffect, useState } from "react";
import styles from "./DonationBox.module.css";
import { Context } from "../context";
import { server } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

const DonationBox = ({ campaign }) => {
  const [iamount, setiamount] = useState();
  const { loading, setLoading } = useContext(Context);

  const handleSubmit = async () => {
    setLoading(true);
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

      toast.success("Success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setiamount("");
  };

  return (
    <div className={styles.donationBoxContainer}>
      <input
        type="number"
        value={iamount}
        onChange={(e) => setiamount(e.target.value)}
      />
      <button onClick={handleSubmit}>Donate</button>
    </div>
  );
};

export default DonationBox;
