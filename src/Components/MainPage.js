import { Stack } from "@mui/material";
import React from "react";
import Feed from "./Feed";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";

const MainPage = () => {
  return (
    <div className="MainPage">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <Feed />
      </Stack>
    </div>
  );
};

export default MainPage;
