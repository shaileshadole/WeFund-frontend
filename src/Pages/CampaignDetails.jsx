import React, { useContext, useEffect, useState } from "react";
import styles from "./CampaignDetails.module.css";
import axios from "axios";
import { server } from "../config";
import { useParams } from "react-router-dom";
import { Context } from "../context";
import Loader from "../Components/Loader";
import { ImUser } from "react-icons/im";
import DonationCard from "../Components/DonationCard";
import { LuArrowBigDown } from "react-icons/lu";
import DonationBox from "../Components/DonationBox";
import DonationBox2 from "../Components/DonationBox2";
import { format } from "date-fns";



const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donors, setDonors] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const [creator, setCreator] = useState({});

  const fetchData = async () => {
    setLoading(true);

    //Gettting the campaigns
    try {
      const res = await axios.get(`${server}/campaign/${campaignId}`, {
        withCredentials: true,
      });
      setCampaign(res.data.campaign);
      setCreator(res.data.campaign.user);
    } catch (error) {
      console.log(error);
    }

    //Getting the donations
    try {
      const res = await axios.get(`${server}/donation/${campaignId}/donors`, {
        withCredentials: true,
      });
      setDonors(res.data.donors);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [campaignId]);

  if (loading || !campaign) return <Loader />;

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24))
  );

  const progressPercentage = Math.min(
    100,
    (campaign.donatedTillNow / campaign.target) * 100
  ).toFixed(2);

  return (
    <div className={styles.campaignDetailsContainer}>
      {/* Section 1: Image and Stats */}
      <div className={styles.section1}>
        <img
          src={campaign.imageLink}
          alt={campaign.title}
          className={styles.campaignImage}
        />

        <div className={styles.statsBox}>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <h3>₹{campaign.donatedTillNow}</h3>
              <p>Raised of ₹{campaign.target}</p>
            </div>
            <div className={styles.stat}>
              <h3>{daysLeft}</h3>
              <p>Days Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Details */}
      <div className={styles.section2}>
        <div className={styles.creatorInfo}>
          <strong>
            <ImUser /> Creator:
          </strong>{" "}
          {campaign.userName}
        </div>
        <h2 className={styles.title}>{campaign.title}</h2>
        <p className={styles.story}>{campaign.story}</p>
        {/* You can add a donate button here */}
      </div>

      {/* Section 3: Donors */}
      <hr />
      <h3>Donations({donors.length})</h3>
      <div className={styles.myDonations}>
        {(donors || []).map((data) => (
          <DonationCard
            key={data._id}
            title1={"Name"}
            title={data.donorName}
            date={data.createdAt}
            amount={data.amount}
          />
        ))}
      </div>

      {/* Section 4: Donation Box */}
      <hr />
      <h3>
        Donate Here <LuArrowBigDown />
      </h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <DonationBox2 campaign={campaign} creator={creator}/>
      </div>

    </div>
  );
};

export default CampaignDetails;
