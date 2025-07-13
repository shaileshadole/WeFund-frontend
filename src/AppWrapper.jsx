// src/AppWrapper.jsx
import React, { useState, useEffect } from "react";
import App from "./App";
import axios from "axios";
import { Context } from "./context";
import { server } from "./config";

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cuser, setCUser] = useState({});

  useEffect(() => {
    setLoading(true);
        // On initial load, check if user is already logged in
    axios
      .get(`${server}/user/meprofile`, { withCredentials: true })
      .then((res) => {
        setCUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setCUser({});
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        cuser,
        setCUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

export default AppWrapper;
