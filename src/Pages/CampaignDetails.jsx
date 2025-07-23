import React, { useContext, useEffect, useState } from "react";
import styles from "./CampaignDetails.module.css";
import axios from "axios";
import { server } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context";
import Loader from "../Components/Loader";
import { ImUser } from "react-icons/im";
import DonationCard from "../Components/DonationCard";
import { LuArrowBigDown } from "react-icons/lu";
import DonationBox from "../Components/DonationBox";
import DonationBox2 from "../Components/DonationBox2";
import { GiHamburgerMenu } from "react-icons/gi";
import { format } from "date-fns";
import toast from "react-hot-toast";
import PaginationWrapper from "../Components/PaginationWrapper";

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donors, setDonors] = useState([]);
  const { loading, setLoading, cuser, setCUser } = useContext(Context);
  const [creator, setCreator] = useState({});
  const [showHamburger, setShowHamburger] = useState(false);
  const navigate = useNavigate();

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

    // 👇 Immediately fetch user data
    try {
      const userRes = await axios.get(`${server}/user/meprofile`, {
        withCredentials: true,
      });
      setCUser(userRes.data.user);
      console.log(cuser);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load profile.");
      console.log(error);
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
      <h2 className={styles.title}>{campaign.title}</h2>

      {/* hamburger */}

      {cuser._id === campaign.user ? (
        <div className={styles.menuWrapper}>
          <GiHamburgerMenu
            className={styles.hamburger}
            onClick={() => setShowHamburger((prev) => !prev)}
          />
          <div
            className={`${styles.hamburgerMenu} ${
              showHamburger ? styles.showMenu : ""
            }`}
          >
            <h4
              className={styles.edit}
              onClick={() => navigate(`/edit-campaign/${campaignId}`)}
            >
              Edit
            </h4>
            <h4
              className={styles.delete}
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this?"
                );
                if (confirmed) {
                  try {
                    const res = await axios.delete(
                      `${server}/campaign/${campaignId}`,
                      {
                        withCredentials: true,
                      }
                    );

                    toast.success(res.data.message);
                    console.log(res.data.message);
                    navigate("/");
                  } catch (error) {
                    toast.error(
                      error?.response?.data?.message ||
                        "Failed to delete campaign."
                    );
                  }
                }
              }}
            >
              Delete
            </h4>
          </div>
        </div>
      ) : null}

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
        <p className={styles.story}>{campaign.story}</p>
        {/* You can add a donate button here */}
      </div>

      {/* Section 3: Donors */}
      <hr />
      <h3>Donations({donors.length})</h3>
      {/* <div className={styles.myDonations}>
        {(donors || []).map((data) => (
          <DonationCard
            key={data._id}
            title1={"Name"}
            title={data.donorName}
            date={data.createdAt}
            amount={data.amount}
          />
        ))}
      </div> */}

      <PaginationWrapper
        data={donors}
        itemsPerPage={5}
        renderItem={(data) => (
          <DonationCard
            key={data._id}
            title1={"Name"}
            title={data.donorName}
            date={data.createdAt}
            amount={data.amount}
          />
        )}
      />

      {/* Section 4: Donation Box */}
      <hr />
      <h3>
        Donate Here <LuArrowBigDown />
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DonationBox2
          campaign={campaign}
          creator={creator}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default CampaignDetails;
