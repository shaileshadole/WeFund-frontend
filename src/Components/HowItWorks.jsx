import React from "react";
import styles from "./HowItWorks.module.css";
import { FaLightbulb, FaDonate, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h2>How <span>WeFund</span> Works</h2>
      <p className={styles.subtitle}>
        Whether you're launching a dream or supporting one — WeFund makes it simple.
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <FaLightbulb className={styles.icon} />
          <h3>1. Create a Campaign</h3>
          <p>
            Share your story, set a goal, and launch your campaign in minutes.
          </p>
        </div>

        <div className={styles.step}>
          <FaDonate className={styles.icon} />
          <h3>2. Receive Support</h3>
          <p>
            Share your campaign with friends, family, and our community to get support.
          </p>
        </div>

        <div className={styles.step}>
          <FaRocket className={styles.icon} />
          <h3>3. Make It Happen</h3>
          <p>
            Withdraw funds securely and bring your vision to life with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
