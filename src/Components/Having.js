import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import HavingFeed from "./HavingFeed";

const Having = () => {
  return (
    <div className="Having">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <HavingFeed />
      </Stack>
    </div>
  );
};

export default Having;
