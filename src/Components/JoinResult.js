import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import JoinFeed from "./JoinFeed";
import JoinResultFeed from "./JoinResultFeed";

const JoinResult = () => {
  return (
    <div className="JoinResult">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <JoinResultFeed />
      </Stack>
    </div>
  );
};

export default JoinResult;
