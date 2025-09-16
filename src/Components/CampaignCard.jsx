import { ImUser } from "react-icons/im";
import "./CampaignCard.css";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({
  campaignId,
  title,
  story,
  target,
  endDate,
  imageLink,
  userName,
  donatedTillNow,
}) => {
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  ); // convert to days

  const navigate = useNavigate();

  const isExpired = daysLeft < 0;

  return (
    <div className={`campaignCard-Container ${isExpired ? "expired" : ""}`} onClick={() => navigate(`/campaign/${campaignId}`)}>
      <img src={imageLink} alt={title} />

      <div className="div1">
        <h4>{title}</h4>
        <p>{story.length > 25 ? story.slice(0, 25) + "..." : story}</p>

        <div className="div2">
          <div>
            <div>₹{donatedTillNow}</div>
            <p>Raised of ₹{target}</p>
          </div>

          {/* {isExpired ? (
            <span className="expiredBadge">Expired</span>
          ) : (
            <p>Days Left: {daysLeft}</p>
          )} */}

          {isExpired ? (
            <div>
              <span className="expiredBadge">Expired</span>
            </div>
          ) : (
            <div>
              <div>{daysLeft}</div>
              <p>Days Left</p>
            </div>
          )}
          
          {/* <div>
            <div>{daysLeft}</div>
            <p>Days Left</p>
          </div> */}
        </div>

        <div className="user-icon-name">
          {" "}
          <ImUser className="user-icon" /> By {userName}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
