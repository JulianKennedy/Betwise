import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import JoinFeed from "./JoinFeed";
import MainPage from "./MainPage";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="Join">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <JoinFeed />
      </Stack>
    </div>
  );
};

export default Join;
