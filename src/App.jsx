import React from 'react';
import "./App.css";
import './assets/theme.css';
import Register from './Pages/Register';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CreateCampaign from './Pages/CreateCampaign';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/c" element={<CreateCampaign />} />
      </Routes>
    <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App;
