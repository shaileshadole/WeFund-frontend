import React from "react";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero = ({ onLearnMoreClick }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1>
          Empower Dreams with <span>WeFund</span>
        </h1>
        <p>
          Join a community that's changing lives. Start your campaign or support
          one today.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/create-campaign" className={styles.primaryBtn}>
            Start a Campaign
          </Link>
          <Link onClick={onLearnMoreClick} className={styles.secondaryBtn}>
            Explore Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
