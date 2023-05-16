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
import { GetBettors, ProjectionTable, getJoin } from "../Service";
import { useEffect, useState, useRef, Component } from "react";
import ReactDom from "react-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
  
 function ProjectionFeed() {


    let columns = [];
    let table="";

    const [bettors, setBettors] = useState(false);
    const [bets, setBets] = useState(false);
    const [teams, setTeams] = useState(false);

    const handleBettor = () => {
        setBettors(true);
        setBets(false);
        setTeams(false);
    }

    const handleBets = () => {
        setBettors(false);
        setBets(true);
        setTeams(false);
    }

    const handleTeam = () => {
        setBettors(false);
        setBets(false);
        setTeams(true);
    }

    const [accountIDChecked, setAccountIDChecked] = React.useState(false);
    const [nameChecked, setNameChecked] = React.useState(false);
    const [addressChecked, setAddressChecked] = React.useState(false);
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [statusChecked, setStatusChecked] = React.useState(false);

    const [betIDChecked, setBetIDChecked] = React.useState(false);
    const [paymentTypeChecked, setPaymentTypeChecked] = React.useState(false);
    const [betAmountChecked, setBetAmountChecked] = React.useState(false);
    const [TeamIDChecked, setTeamIDChecked] = React.useState(false);
    const [betDateChecked, setBetDateChecked] = React.useState(false);

    const [teamNameChecked, setTeamNameChecked] = React.useState(false);
    const [teamCountryChecked, setTeamCountryChecked] = React.useState(false);
    const [teamCityChecked, setTeamCityChecked] = React.useState(false);
    const [teamPlayerRosterChecked, setTeamPlayerRosertChecked] = React.useState(false);
    const [teamNumberOfPlayersChecked, setTeamNumberOfPlayersChecked] = React.useState(false);


    const [bettorTable, setBettorTable] = useState(false);
    const [betsTable, setBetsTable] = useState(false);
    const [teamTable, setTeamTable] = useState(false);

    const [selectedBettorTable, setSelectedBettorTable] = useState();
    const [selectedBetsTable, setSelectedBetsTable] = useState();
    const [selectedTeamTable, setSelectedTeamTable] = useState();

    const [bettorColumns, setBettorColumns] = useState([]);
    const [betsColumns, setBetsColumns] = useState([]);
    const [teamColumns, setTeamColumns] = useState([]);

    const handleAccountIDChange = (event) => {
        setAccountIDChecked(event.target.checked);
    };
    
    const handleNameChange = (event) => {
        setNameChecked(event.target.checked);
    };

    const handleAddressChange = (event) => {
        setAddressChecked(event.target.checked);
    };

    const handleEmailChange = (event) => {
        setEmailChecked(event.target.checked);
    };

    const handleStatusChange = (event) => {
        setStatusChecked(event.target.checked);
    };

    const handleBetIDChange = (event) => {
        setBetIDChecked(event.target.checked);
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentTypeChecked(event.target.checked);
    };

    const handleBetAmountChange = (event) => {
        setBetAmountChecked(event.target.checked);
    };

    const handleTeamIDChange = (event) => {
        setTeamIDChecked(event.target.checked);
    };

    const handleBetDateChange = (event) => {
        setBetDateChecked(event.target.checked);
    };

    const handleTeamNameChange = (event) => {
        setTeamNameChecked(event.target.checked);
    };

    const handleTeamCountryChange = (event) => {
        setTeamCountryChecked(event.target.checked);
    };

    const handleTeamCityChange = (event) => {
        setTeamCityChecked(event.target.checked);
    };

    const handleTeamPlayerRosterChange = (event) => {
        setTeamPlayerRosertChecked(event.target.checked);
    };

    const handleTeamNumberOfPlayersChange = (event) => {
        setTeamNumberOfPlayersChecked(event.target.checked);
    };

    const handleBettorSubmit = async (event) => {
        event.preventDefault();
        table="Bettor";
        if(accountIDChecked){
            columns.push(['Account_ID']);
        }
        if(nameChecked){
            columns.push(['Bettor_Name']);
        }
        if(addressChecked){
            columns.push(['Bettor_Address']);
        }
        if(emailChecked){
            columns.push(['Email']);
        }
        if(statusChecked){
            columns.push(['Bettor_Status']);
        }
        console.log(columns);
        setBettorColumns(columns);
        setNameChecked(false);
        setAddressChecked(false);
        setEmailChecked(false);
        setStatusChecked(false);
        setAccountIDChecked(false);
        setBettorTable(true);
        let res=await ProjectionTable(columns, table);
        setSelectedBettorTable(res);
        console.log(res);
        return res;
    }

    const handleBetsSubmit = async (event) => {
        event.preventDefault();
        table="Bets";
        if(accountIDChecked){
            columns.push(['Account_ID']);
        }
        if(betIDChecked){
            columns.push(['Bet_ID']);
        }
        if(paymentTypeChecked){
            columns.push(['Payment_Type']);
        }
        if(betAmountChecked){
            columns.push(['Bet_Amount']);
        }
        if(TeamIDChecked){
            columns.push(['Which_Team']);
        }
        if(betDateChecked){
            columns.push(['Bet_Date']);
        }

        console.log(columns);
        setBetsColumns(columns);
        setAccountIDChecked(false);
        setBetIDChecked(false);
        setPaymentTypeChecked(false);
        setBetAmountChecked(false);
        setTeamIDChecked(false);
        setBetDateChecked(false);
        setBettorTable(false);
        setTeamTable(false);
        setBetsTable(true);
        let res=await ProjectionTable(columns, table);
        setSelectedBetsTable(res);
        console.log(res);
        return res;
    }

    const handleTeamSubmit = async (event) => {
        event.preventDefault();
        table="Team";
        if(TeamIDChecked){
            columns.push(['Team_ID']);
        }
        if(teamNameChecked){
            columns.push(['Team_Name']);
        }
        if(teamCountryChecked){
            columns.push(['Country']);
        }
        if(teamCityChecked){
            columns.push(['City']);
        }
        if(teamPlayerRosterChecked){
            columns.push(['Player_Roster']);
        }
        if(teamNumberOfPlayersChecked){
            columns.push(['Number_Of_Players']);
        }

        console.log(columns);
        setTeamColumns(columns);
        setTeamColumns(columns);
        setTeamIDChecked(false);
        setTeamNameChecked(false);
        setTeamCountryChecked(false);
        setTeamCityChecked(false);
        setTeamPlayerRosertChecked(false);
        setTeamNumberOfPlayersChecked(false);
        setBettorTable(false);
        setBetsTable(false);
        setTeamTable(true);
        let res=await ProjectionTable(columns, table);
        setSelectedTeamTable(res);
        console.log(res);
        return res;
    }

    console.log(selectedBettorTable);


    if(bettors){
        if(!bettorTable){
        return (
            <Box bgcolor="skyblue" flex={4} p={2}>
                <Typography variant="h2" gutterBottom>
                    Bettor Table Columns
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                color="secondary" 
                                checked={accountIDChecked}
                                onChange={handleAccountIDChange}
                            />
                        } 
                        label="Account ID"
                    />
                </FormGroup>
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
                <Button variant="contained" onClick={handleBettorSubmit}>Submit</Button>
            </Box> 
        );
        }
        else{
            return selectedBettorTable && (
                <Box bgcolor="skyblue" flex={4} p={2}>
                <Typography variant="h2" gutterBottom>
                    Projected Bettor Table
                </Typography>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {bettorColumns.map((column) => (
                                <StyledTableCell align="center">{column}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedBettorTable.map((rows_Bettor) => (
                            <StyledTableRow>
                                {bettorColumns.map((column) => (
                                <StyledTableCell component="th" scope="row" align="center"> 
                                    {rows_Bettor[column]}
                                </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Box> 
            );
        }

    }
    else if(bets){
        if(!betsTable){
        return(
            <Box bgcolor="skyblue" flex={4} p={2}>
                <Typography variant="h2" gutterBottom>
                    Bets Table Columns 
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={accountIDChecked}
                                onChange={handleAccountIDChange}
                            />
                        }
                        label="Account ID"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={betIDChecked}
                                onChange={handleBetIDChange}
                            />
                        }
                        label="Bet ID"
                    />
                </FormGroup>
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
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={TeamIDChecked}
                                onChange={handleTeamIDChange}
                            />
                        }
                        label="Team ID"
                    />
                </FormGroup>
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
                <Button variant="contained" onClick={handleBetsSubmit}>Submit</Button>
            </Box>

        );
        }
        else{
                if(selectedBetsTable){
                    selectedBetsTable.map((row) => {
                        if(row['Bet_Date']){
                            row['Bet_Date']=row['Bet_Date'].substring(0,10);
                    }
                    });
                }
            return selectedBetsTable && (
                <Box bgcolor="skyblue" flex={4} p={2}>
            <Typography variant="h2" gutterBottom>
                Projected Bets Table
            </Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {betsColumns.map((column) => (
                            <StyledTableCell align="center">{column}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedBetsTable.map((rows_Bettor) => (
                        <StyledTableRow>
                            {betsColumns.map((column) => (
                            <StyledTableCell component="th" scope="row" align="center"> 
                                {rows_Bettor[column]}
                            </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Box> 
            );
        }
    }
    else if(teams){
        table="Team";
        if(!teamTable){
            return (
                <Box bgcolor="skyblue" flex={4} p={2}>
                    <Typography variant="h2" gutterBottom>
                        Team Table Columns
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={TeamIDChecked}
                                    onChange={handleTeamIDChange}
                                />
                            }
                            label="Team ID"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={teamNameChecked}
                                    onChange={handleTeamNameChange}
                                />
                            }
                            label="Team Name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox   
                                    color="secondary"
                                    checked={teamCountryChecked}
                                    onChange={handleTeamCountryChange}
                                />
                            }
                            label="Team Country"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox   
                                    color="secondary"
                                    checked={teamCityChecked}
                                    onChange={handleTeamCityChange}
                                />
                            }
                            label="Team City"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={teamPlayerRosterChecked}
                                    onChange={handleTeamPlayerRosterChange}
                                />
                            }
                            label="Team Player Roster"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={teamNumberOfPlayersChecked}
                                    onChange={handleTeamNumberOfPlayersChange}
                                />
                            }
                            label="Team Number of Players"
                        />
                    </FormGroup>
                     <Button variant="contained" onClick={handleTeamSubmit}>Submit</Button>
                </Box>
            );
        }
        else{
            return selectedTeamTable && (
                <Box bgcolor="skyblue" flex={4} p={2}>
                <Typography variant="h2" gutterBottom>
                    Projected Team Table
                </Typography>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {teamColumns.map((column) => (
                                <StyledTableCell align="center">{column}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedTeamTable.map((rows_Bettor) => (
                            <StyledTableRow>
                                {teamColumns.map((column) => (
                                <StyledTableCell component="th" scope="row" align="center"> 
                                    {rows_Bettor[column]}
                                </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Box> 
            );
        }
    }
    else{
    return (
      <Box bgcolor="skyblue" flex={4} p={2}>
        <Typography variant="h2" gutterBottom>
            Project Columns From a Table
        </Typography>
        <Button variant="contained" color="success" onClick={handleBettor} >
            Bettor Table
        </Button>
        <br />
        <br />
        <Button variant="contained" color="success" onClick={handleBets} >
            Bets Table
        </Button>
        <br />
        <br />
        <Button variant="contained" color="success" onClick={handleTeam} >
            Team Table
        </Button>
      </Box>
    );
    }
  }
  export default ProjectionFeed;
  