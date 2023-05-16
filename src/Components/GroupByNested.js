import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import GroupByNestedFeed from "./GroupByNestedFeed";

const GroupByNested = () => {
  return (
    <div className="GroupByNested">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <GroupByNestedFeed />
      </Stack>
    </div>
  );
};

export default GroupByNested;