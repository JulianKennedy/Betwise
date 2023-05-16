import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import SelectionFeed from "./SelectionFeed";

const Selection = () => {
  return (
    <div className="Selection">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <SelectionFeed />
      </Stack>
    </div>
  );
};

export default Selection;
