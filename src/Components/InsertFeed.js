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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InsertBet } from "../Service";
import { useEffect, useState, useRef, Component } from "react";
import ReactDom from "react-dom";


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
  
 function InsertFeed() {
    const date=new Date().toISOString().slice(0, 10).replace('T', ' ');
    const [name, setName] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [betAmount, setBetAmount] = useState('');
    const [teamName, setTeamName] = useState('');
    const [betDate, setBetDate] = useState(date);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log( 'Name: ' + name + ' Payment Type: ' + paymentType + ' Bet Amount: ' + betAmount + ' Team Name: ' + teamName + ' Bet Date: ' + betDate); 
        setName('');
        setPaymentType('');
        setBetAmount('');
        setTeamName('');
        setBetDate(date);
        await InsertBet(name, paymentType, betAmount, teamName, betDate);
    }

    const modalRef = useRef();
  
    return (
      <Box bgcolor="skyblue" flex={4} p={2}>
        <Typography variant="h2" gutterBottom>
          Insert Into Bets Table
        </Typography>
        <TextField
            variant="filled" 
            label="Name" 
            color="secondary" 
            required={true}
            type="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
        <br />
        <br />
        <TextField 
            variant="filled" 
            label="Payment Type" 
            color="secondary" 
            required={true}
            type="input"
            value={paymentType}
            onChange={(event) => setPaymentType(event.target.value)}
        />
        <br />
        <br />
        <TextField 
            variant="filled" 
            label="Bet Amount" 
            color="secondary" 
            required={true}
            type="input"
            value={betAmount}
            onChange={(event) => setBetAmount(event.target.value)}
        />
        <br />
        <br />
        <TextField 
            variant="filled" 
            label="Team Name" 
            color="secondary" 
            required={true}
            type="input"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
        />
        <br />
        <br />
        <TextField 
            variant="filled" 
            label="Bet Date" 
            color="secondary" 
            required={true}
            type="input"
            value={betDate}
            onChange={(event) => setBetDate(event.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
        </Button>
      </Box>
    );
  }
  export default InsertFeed;
  