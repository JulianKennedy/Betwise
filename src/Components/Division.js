import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import DivisionFeed from "./DivisionFeed";

const Division = () => {
  return (
    <div className="Division">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <DivisionFeed />
      </Stack>
    </div>
  );
};

export default Division;
