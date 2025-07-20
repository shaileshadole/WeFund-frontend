import React, { useContext, useEffect, useState } from "react";
import "./CreateCampaign.css";
import axios from "axios";
import { Context } from "../context";
import { server } from "../config";
import toast from "react-hot-toast";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Navbar2 from "../Components/Navbar2";
import { useNavigate, useParams } from "react-router-dom";

const EditCampaign = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState({});

  const [title, setTitle] = useState(campaign.title);
  const [story, setStory] = useState(campaign.story);
  const [target, setTarget] = useState(campaign.target);
  const [endDate, setEndDate] = useState(campaign.endDate);
  const [imageLink, setImageLink] = useState(campaign.imageLink);
  const { loading, setLoading } = useContext(Context);

  const navigate = useNavigate();

  const fetchCampaign = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/campaign/${campaignId}`);
      setCampaign(res.data.campaign);

      //Setting the states
      setTitle(res.data.campaign.title);
      setStory(res.data.campaign.story);
      setTarget(res.data.campaign.target);
      setEndDate(res.data.campaign.endDate?.substring(0, 10)); // Format date to YYYY-MM-DD
      setImageLink(res.data.campaign.imageLink);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete campaign."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${server}/campaign/${campaignId}`,
        {
          title,
          story,
          target,
          endDate,
          imageLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      console.log(res.data);
      navigate(`/campaign/${campaignId}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createCampaign-container-0">
      <Navbar2 />
      <div className="createCampaign-container">
        {loading ? <Loader /> : null}
        {/* <Header /> */}
        <div className="createCampaign-topButton">
          <div>Edit The Campaign 🚀</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a Title"
            />
          </div>
          <label htmlFor="story">Story</label>
          <div className="inputWrapper">
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write your Story"
            />
          </div>
          <label htmlFor="target">Target</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Goal"
            />
          </div>
          <label htmlFor="endDate">End Date</label>
          <div className="inputWrapper">
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <label htmlFor="imageLink">Campaign Image</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter the URL of the image"
            />
          </div>
          <button type="submit" className="submit-btn">
            Update Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
