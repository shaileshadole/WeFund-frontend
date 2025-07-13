import React, { useContext, useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import { ImUser } from "react-icons/im";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../context";
import { server } from "../config";
import CampaignCard from "../Components/CampaignCard";
import CreateCampaign from "./CreateCampaign";
import DonationCard from "../Components/DonationCard";

const MyProfile = () => {
  const { cuser } = useContext(Context);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);

  const fetchData = async () => {
    //Getting my Campaigns
    try {
      const res = await axios.get(`${server}/campaign/my`, {
        withCredentials: true,
      });
      setMyCampaigns(res.data.myCampaigns);
      console.log("My Campaigns:", res.data.myCampaigns);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch campaigns");
    }

    //Get my Donations
    try {
      const res = await axios.get(`${server}/donation/mydonations`, {
        withCredentials: true,
      });
      setMyDonations(res.data.history);
      console.log("My Donations:", res.data.history);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch donations");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <ImUser className={styles.userIcon} />
          <div>
            <h2>{cuser.name}</h2>
            <p>{cuser.email}</p>
          </div>
        </div>

        <RiMoneyRupeeCircleFill className={styles.rupeeIcon} />
      </div>

      <h3>Your Campaigns({myCampaigns.length})</h3>
      <div className={styles.allCampaign}>
        {(myCampaigns || []).map((data) => (
          <CampaignCard
            key={data._id}
            title={data.title}
            story={data.story}
            target={data.target}
            endDate={data.endDate}
            imageLink={data.imageLink}
            userName={data.userName}
            donatedTillNow={data.donatedTillNow}
          />
        ))}
      </div>

      <hr />
      <h3>Your Donations({myDonations.length})</h3>
      <div className={styles.myDonations}>
        {(myDonations || []).map((data) => (
          <DonationCard
            key={data._id}
            title1={"title"}
            title={data.title}
            date={data.endDate}
            amount={data.amount}
          />
        ))}
      </div>

    </div>
  );
};

export default MyProfile;
