import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import GroupByFeed from "./GroupByFeed";

const GroupBy = () => {
  return (
    <div className="GroupBy">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <GroupByFeed />
      </Stack>
    </div>
  );
};

export default GroupBy;
