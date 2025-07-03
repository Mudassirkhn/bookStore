// src/website/Layout/WebsiteLayout.jsx

import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const WebsiteLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default WebsiteLayout;
