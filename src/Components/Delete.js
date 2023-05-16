import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import DeleteFeed from "./DeleteFeed";

const Delete = () => {
  return (
    <div className="Delete">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <DeleteFeed />
      </Stack>
    </div>
  );
};

export default Delete;