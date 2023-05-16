import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import UpdateFeed from "./UpdateFeed";

const Update = () => {
  return (
    <div className="Update">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <UpdateFeed />
      </Stack>
    </div>
  );
};

export default Update;
