import { Stack } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectionFeed from "./ProjectionFeed";

const Projection = () => {
  return (
    <div className="Projection">
      <ResponsiveAppBar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <ProjectionFeed />
      </Stack>
    </div>
  );
};

export default Projection;
