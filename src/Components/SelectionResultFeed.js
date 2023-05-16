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
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { on } from "ws";

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

function SelectionResultFeed({selectRes}) {

console.log(selectRes);


  return selectRes.data && selectRes.status>=0 && (
    <Box bgcolor="skyblue" flex={4} p={2}>
      <Typography variant="h2" gutterBottom>
        Bettor Data Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>AccountID</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectRes.data.map((rows_Bettor) => (
                <StyledTableRow key={rows_Bettor.Account_ID}>
                    <StyledTableCell component="th" scope="row">
                    {rows_Bettor.Account_ID}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    {rows_Bettor.Bettor_Address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    {rows_Bettor.Bettor_Name}
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
    </Box>
  );
}
export default SelectionResultFeed;
