import React, { useState } from "react";
import "./CreateCampaign.css";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const CreateCampaign = () => {
  const [title, setTitle] = useState();
  const [story, setStory] = useState();
  const [target, setTarget] = useState();
  const [endDate, setEndDate] = useState();
  const [imageLink, setImageLink] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/campaign/new`,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createCampaign-container">
      <div className="createCampaign-topButton">
        <div>Start a Campaign 🚀</div>
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
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
