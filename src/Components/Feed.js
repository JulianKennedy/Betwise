import { Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GetBettorsBetsTeams } from "../Service";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let rows_Bettor=[];

function Feed() {
  const [betsbettorsteams, setBetsBettorsTeams] = useState();

useEffect(() => {
  const getData = async () => {
    const data = await GetBettorsBetsTeams();
    setBetsBettorsTeams(data);
  };

  getData();
}, []);

console.log(betsbettorsteams);


  return betsbettorsteams && (
    <Box bgcolor="skyblue" flex={4} p={2}>
      <Typography variant="h2" gutterBottom>
        Bettor Data Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>AccountID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betsbettorsteams[1].map((rows_Bettor) => (
              <StyledTableRow key={rows_Bettor.Account_ID}>
                <StyledTableCell component="th" scope="row">
                  {rows_Bettor.Account_ID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bettor.Bettor_Name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bettor.Bettor_Address}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bettor.Bettor_Status}
                </StyledTableCell>
                <StyledTableCell align="right">{rows_Bettor.Email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" gutterBottom paddingTop={4}>
        Teams Data Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>TeamID</StyledTableCell>
              <StyledTableCell align="right">Team Name</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Team Roster</StyledTableCell>
              <StyledTableCell align="right">Number of Players</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betsbettorsteams[2].map((rows_Teams) => (
              <StyledTableRow key={rows_Bettor.Team_ID}>
                <StyledTableCell component="th" scope="row">
                  {rows_Teams.Team_ID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Teams.Team_Name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Teams.Country}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Teams.City}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Teams.Player_Roster}
                </StyledTableCell>
                <StyledTableCell align="right">{rows_Teams.Number_Of_Players}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" gutterBottom paddingTop={4}>
        Bets Data Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>BetID</StyledTableCell>
              <StyledTableCell align="right">AccountID</StyledTableCell>
              <StyledTableCell align="right">PaymentType</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Team Name</StyledTableCell>
              <StyledTableCell align="right">Transaction Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betsbettorsteams[0].map((rows_Bets) => (
              <StyledTableRow key={[rows_Bets.Bet_Id, rows_Bets.Account_ID]}>
                <StyledTableCell component="th" scope="row">
                  {rows_Bets.Bet_ID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bets.Account_ID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bets.Payment_Type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {"$"+rows_Bets.Bet_Amount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {rows_Bets.Which_Team}
                </StyledTableCell>
                <StyledTableCell align="right">{rows_Bets.Bet_Date.substring(0,10)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Feed;
