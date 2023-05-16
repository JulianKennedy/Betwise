import Button from "@mui/material/Button";
import betwise_logo from './betwise_logo-transformed.svg'
import React from 'react'
import { Box, Typography } from "@mui/material";

function LandingPage() {
  return (
    <Box bgcolor={"skyblue"} height={"100vw"} width={"100vw"}>
      <a href="http://localhost:3001/" target="_blank">
          <img src={betwise_logo} alt="BetWise Logo" />
      </a>
      <h2>
        Sports betting application built using a comprehensive database that includes detailed statistics on
        teams and players to provide accurate and reliable betting odds for users to place their bets.
      </h2>
      <div>
        <Button sx={{ marginX: "1rem" }} variant="contained" size="medium" href="/login">
          Login
        </Button>
        <Button sx={{ marginX: "1rem" }} variant="contained" size="medium" href="/signup">
          Sign Up
        </Button>
      </div>
    </Box>
  )
}

export default LandingPage