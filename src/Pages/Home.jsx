import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import CampaignCard from "../Components/CampaignCard";
import axios from "axios";
import { Context } from "../context";
import { server } from "../config";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Footer from "../Components/Footer";

const Home = () => {
  const [array, setArray] = useState([]);
  const [filteredCampaign, setFilteredCampaign] = useState([]);
  const [lhsearch, setlhsearch] = useState("");
  const { loading, setLoading, cuser } = useContext(Context);
  const navigate = useNavigate();

  const fetchCampaign = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/campaign/all`, {
        withCredentials: true,
      });
      setArray(res.data.allCampaigns);
      setFilteredCampaign(res.data.allCampaigns);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [cuser]);

  //Search Logic
  useEffect(() => {
    const filtered = array.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(lhsearch.toLowerCase()) ||
        campaign.story.toLowerCase().includes(lhsearch.toLowerCase()) ||
        campaign.userName.toLowerCase().includes(lhsearch.toLowerCase())
    );
    setFilteredCampaign(filtered);
  }, [lhsearch, array]);

  
  // {/* Remove expired campaigns here */}
  // const validCampaigns = filteredCampaign.filter(
  //   (c) => new Date(c.endDate) >= new Date()
  // );

  const aboutRef = useRef(null);

  const handleScroll = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {loading && <Loader />}
      <Header setlhsearch={setlhsearch} />
      <Hero onLearnMoreClick={handleScroll} />
      <HowItWorks />

      <section ref={aboutRef} className="homeCampaignHeading">
        <h4>Campaigns ({filteredCampaign.length})</h4>
      </section>
      {/* 
      <>We Fund, we belive in beggin</>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={() => navigate("/create-campaign")}>CreateCampaign</button> */}
      <div className="allCampaign">
        {(filteredCampaign || []).map((data) => (
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
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
