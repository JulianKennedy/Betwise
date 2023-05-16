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
import { TablesJoined, getJoin } from "../Service";
import { useEffect, useState, useRef, Component } from "react";
import ReactDom from "react-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import JoinResultFeed from "./JoinResultFeed";


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
  
 function JoinFeed() {


    const date=new Date().toISOString().slice(0, 10).replace('T', ' ');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(1);
    const [paymentType, setPaymentType] = useState('');
    const [betAmount, setBetAmount] = useState('');
    const [betDate, setBetDate] = useState(date);
    
    const [joinResult, setJoin] = useState();

    let columns = [];

    const handleSubmit = async () => {
        console.log("Name: "+name+" Address: "+address+" Email: "+email+" Status: "+status);
        if(nameChecked){
            columns.push(['Bettor','Bettor_Name','=',"'"+name+"'"]);
        }
        if(addressChecked){
            columns.push(['Bettor','Bettor_Address','=',"'"+address+"'"]);
        }
        if(emailChecked){
            columns.push(['Bettor','Email', '=',"'"+email+"'"]);
        }
        if(statusChecked){
            columns.push(['Bettor','Bettor_Status','=', status]);
        }
        if(paymentTypeChecked){
            columns.push(['Bets','Payment_Type','=', "'"+paymentType+"'"]);
        }
        if(betAmountChecked){
            if(startBetAmount){
                columns.push(['Bets','Bet_Amount',startBetAmount, betAmount]);
            }
            else{
                columns.push(['Bets','Bet_Amount', '=',betAmount]);
            }
        }
        if(betDateChecked){
            if(startDate){
                columns.push(['Bets','Bet_Date',startDate, betDate]);
            }
            else{
                columns.push(['Bets','Bet_Date', '=',betDate]);
            }
        }
        console.log(columns);
        setName('');
        setAddress('');
        setEmail('');
        setStatus(1);
        setNameChecked(false);
        setAddressChecked(false);
        setEmailChecked(false);
        setStatusChecked(false);
        setPaymentType('');
        setBetAmount('');
        setBetDate(date);
        setPaymentTypeChecked(false);
        setBetAmountChecked(false);
        setBetDateChecked(false);
        setStartDate('');
        setStartBetAmount('');

        let res=await TablesJoined(columns);
        setJoin(res);
        console.log(res);
        //await getJoin(columns);   
        return res;

        //await deleteBettor(columns);
        //await InsertBet(name, paymentType, betAmount, teamName, betDate);
        //console.log(await TablesJoined(columns));
    }

    const [nameChecked, setNameChecked] = React.useState(false);
    const [addressChecked, setAddressChecked] = React.useState(false);
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [statusChecked, setStatusChecked] = React.useState(false);
    const [paymentTypeChecked, setPaymentTypeChecked] = React.useState(false);
    const [betAmountChecked, setBetAmountChecked] = React.useState(false);
    const [betDateChecked, setBetDateChecked] = React.useState(false);

    const handleNameChange = (event) => {
        setNameChecked(event.target.checked);
        if(nameChecked){
            setName('');
        }
      };
    
        const handleAddressChange = (event) => {
            setAddressChecked(event.target.checked);
            if(addressChecked){
                setAddress('');
            }
        };
    
        const handleEmailChange = (event) => {
            setEmailChecked(event.target.checked);
            if(emailChecked){
                setEmail('');
            }
        };
    
        const handleStatusChange = (event) => {
            setStatusChecked(event.target.checked);
            if(statusChecked){
                setStatus(1);
            }
        };

        const handlePaymentTypeChange = (event) => {
            setPaymentTypeChecked(event.target.checked);
            if(paymentTypeChecked){
                setPaymentType('');
            }
        };

        const handleBetAmountChange = (event) => {
            setBetAmountChecked(event.target.checked);
            if(betAmountChecked){
                setBetAmount('');
            }
            if(startBetAmount){
                setStartBetAmount('');
            }
        };

        const handleBetDateChange = (event) => {
            setBetDateChecked(event.target.checked);
            if(betDateChecked){
                setBetDate(date);
            }
            if(startDate){
                setStartDate('');
            }
        };
    

    const modalRef = useRef();

    const [startDate, setStartDate] = React.useState('');
    const [startBetAmount, setStartBetAmount] = React.useState('');

    // useEffect(() => {
    //     const getData = async () => {
    //       const awaitingTables = await TablesJoined(columns);
    //       setJoin(awaitingTables);
    //     }
    //     getData();
    //   }, []);

      console.log(joinResult);


    if(joinResult && joinResult.result>=0){
        return (
            <Box bgcolor="skyblue" flex={4} p={2}>
            <JoinResultFeed  joinRes={joinResult}/>
            </Box> 
        ); 
    } 
    return (
      <Box bgcolor="skyblue" flex={4} p={2}>
        <Typography variant="h2" gutterBottom>
          Join Bettors Table and Bets Table
        </Typography>
        <Typography variant="h4" gutterBottom>
            Where
        </Typography>
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox 
                        color="secondary" 
                        checked={nameChecked}
                        onChange={handleNameChange}
                    />
                } 
                label="Name"
            />
        </FormGroup>
        <TextField
            disabled={!nameChecked}
            label="Name"
            type="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox 
                        color="secondary" 
                        checked={addressChecked}
                        onChange={handleAddressChange} 
                    />
                } 
                label="Address"
            />
        </FormGroup>
        <TextField
            disabled={!addressChecked}
            label="Address"
            type="input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox 
                        color="secondary" 
                        checked={emailChecked}
                        onChange={handleEmailChange} 
                    />
                } 
                label="Email"
            />
        </FormGroup>
        <TextField
            disabled={!emailChecked}
            label="Email"
            type="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox 
                        color="secondary" 
                        checked={statusChecked}
                        onChange={handleStatusChange} 
                    />
                } 
                label="Status"
            />
        </FormGroup>
        <TextField
            disabled={!statusChecked}
            label="Status"
            type="input"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        color="secondary"
                        checked={paymentTypeChecked}
                        onChange={handlePaymentTypeChange}
                    />
                }
                label="Payment Type"
            />
        </FormGroup>
        <TextField
            disabled={!paymentTypeChecked}
            label="Payment Type"
            type="input"
            value={paymentType}
            onChange={(event) => setPaymentType(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        color="secondary"
                        checked={betAmountChecked}
                        onChange={handleBetAmountChange}
                    />
                }
                label="Bet Amount"
            />
        </FormGroup>
        <FormControl sx={{ marginRight: 5, minWidth: 80 }}>
            <Select
                disabled={!betAmountChecked}
                value={startBetAmount}
                onChange={(event) => setStartBetAmount(event.target.value)}
            >
                <MenuItem value={"<"}>&lt;</MenuItem>
                <MenuItem value={"<="}>&le;</MenuItem>
                <MenuItem value={"="}>=</MenuItem>
                <MenuItem value={">="}>&ge;</MenuItem>
                <MenuItem value={">"}>&gt;</MenuItem>
            </Select>
        </FormControl>
        <TextField
            disabled={!betAmountChecked}
            label="Bet Amount"
            type="input"
            value={betAmount}
            onChange={(event) => setBetAmount(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        color="secondary"
                        checked={betDateChecked}
                        onChange={handleBetDateChange}
                    />
                }
                label="Bet Date"
            />
        </FormGroup>
        <FormControl sx={{ marginRight: 5, minWidth: 80 }}>
            <Select
                disabled={!betDateChecked}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
            >
                <MenuItem value={">"}>&lt;</MenuItem>
                <MenuItem value={">="}>&le;</MenuItem>
                <MenuItem value={"="}>=</MenuItem>
                <MenuItem value={"<="}>&ge;</MenuItem>
                <MenuItem value={"<"}>&gt;</MenuItem>
            </Select>
        </FormControl>
        <TextField
            disabled={!betDateChecked}
            label="Bet Date"
            type="input"
            value={betDate}
            onChange={(event) => setBetDate(event.target.value)}
            variant="filled"
            color="secondary"
        />
        <br />
        <br />
        <Button variant="contained" color="success" onClick={handleSubmit} >
            Submit
        </Button>
      </Box>
    );
  }
  export default JoinFeed;
  