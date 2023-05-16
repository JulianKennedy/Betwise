import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import InsertFeed from "./InsertFeed";

const Insert = () => {
  return (
    <div className="Insert">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <InsertFeed />
      </Stack>
    </div>
  );
};

export default Insert;
