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
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import PaginationWrapper from "../Components/PaginationWrapper";

const MyProfile = () => {
  const { cuser, setCUser } = useContext(Context);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const { loading, setLoading, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure, you want to logout?");
    if (!confirmed) return;
    setLoading(true);

    try {
      const res = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setCUser({});
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Logout");
    } finally {
      setLoading(false);
    }
  };

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

    // 👇 Immediately fetch user data
    try {
      const userRes = await axios.get(`${server}/user/meprofile`, {
        withCredentials: true,
      });
      setCUser(userRes.data.user);
      console.log("User Bhetla re ba, C user madhe takla : " + cuser);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch User.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      {loading && <Loader />}
      <h1>Your Profile</h1>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <ImUser className={styles.userIcon} />
          <div>
            <h2>{cuser.name}</h2>
            <p>{cuser.email}</p>
          </div>
        </div>
        <button className={styles.rupeeIcon} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.balance}>
        <div>
          <p>Your Balance</p>
        </div>
        <div>
          <h3>₹{cuser.balance}</h3>
        </div>
      </div>
      <p style={{ color: "var(--color-text-p)", textAlign: "center" }}>
        ₹100 will be added to your balance per day
      </p>

      <hr />

      <h3>Your Campaigns({myCampaigns.length})</h3>
      <div className={styles.allCampaign}>
        {/* <PaginationWrapper
          data={myCampaigns}
          itemsPerPage={6}
          renderItem={(data) => (
            <CampaignCard
              campaignId={data._id}
              title={data.title}
              story={data.story}
              target={data.target}
              endDate={data.endDate}
              imageLink={data.imageLink}
              userName={data.userName}
              donatedTillNow={data.donatedTillNow}
            />
          )}
        /> */}

        {(myCampaigns || []).map((data) => (
          <CampaignCard
          key={data._id}
            campaignId={data._id}
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

      <PaginationWrapper
        data={myDonations}
        itemsPerPage={5}
        renderItem={(data) => (
          <DonationCard
            key={data._id}
            title1={"title"}
            title={data.title}
            date={data.createdAt}
            amount={data.amount}
          />
        )}
      />

      {/* <div className={styles.myDonations}>
        {(myDonations || []).map((data) => (
          <DonationCard
            key={data._id}
            title1={"title"}
            title={data.title}
            date={data.createdAt}
            amount={data.amount}
          />
        ))}
      </div> */}

      <Footer />
    </div>
  );
};

export default MyProfile;
