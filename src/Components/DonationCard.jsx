import React from "react";
import styles from "./Donation.module.css";
import { format } from "date-fns";

const DonationCard = ({ title1, title, date, amount }) => {
  return (
    <div className={styles.donationCardContainer}>
      <div>
        <h4>{title1}</h4>
        <p>{title}</p>
      </div>
      <div>
        <h4>Transaction Date</h4>
        <p>{date ? format(new Date(date), " hh:mm a, dd MMM yyyy") : "Invalid Date"}</p>
      </div>
      <div>
        <h4>Amount</h4>
        <p>{amount}</p>
      </div>
    </div>
  );
};

export default DonationCard;
