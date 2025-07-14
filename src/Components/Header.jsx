import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Context } from "../context";
import { FiSearch } from "react-icons/fi";
import { ImUser } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Header = ({ setlhsearch }) => {
  const [hsearch, setHSearch] = useState("");
  const [ cuserName, setcuserName ] = useState("User");
  const navigate = useNavigate();
  const { isAuthenticated, cuser } = useContext(Context);

  const handleSubmit = () => {
    setlhsearch(hsearch);
  }

  //For .split error
  useEffect(() => {
  if (cuser?.name) {
    setcuserName(cuser.name.split(" ")[0]);
  }
}, [cuser]);

  return (
    <div className="header-container">
      <div className="search-wrapper">
        <input
          value={hsearch}
          onChange={(e) => setHSearch(e.target.value)}
          placeholder="Search for campaigns"
        />
        <div onClick={handleSubmit} className="search-button">
          <FiSearch className="search-icon" />
        </div>
      </div>

      <div>
        {isAuthenticated ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <ImUser onClick={() => navigate("/myprofile")} className="user-icon" />
              <span onClick={() => navigate("/myprofile")}>{cuserName}</span>
              <button onClick={() => navigate("/create-campaign")} >CreateCampaign</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
