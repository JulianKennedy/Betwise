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
import { updateBettor } from "../Service";
import { useEffect, useState, useRef, Component } from "react";
import ReactDom from "react-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';


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
  
 function UpdateFeed() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(1);

    const [whereName, setWhereName] = useState('');
    const [whereAddress, setWhereAddress] = useState('');
    const [whereEmail, setWhereEmail] = useState('');
    const [whereStatus, setWhereStatus] = useState(1);

    let columns=[];

    let whereColumns=[];
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log( 'Name: ' + name + ' Address: ' + address + ' Email: ' + email + ' Status: ' + status);
        if(nameChecked){
            columns.push(['Bettor_Name',"'"+name+"'"]);
        }
        if(addressChecked){
            columns.push(['Bettor_Address',"'"+address+"'"]);
        }
        if(emailChecked){
            columns.push(['Email', "'"+email+"'"]);
        }
        if(statusChecked){
            columns.push(['Bettor_Status', status]);
        }
        if(whereNameChecked){
            whereColumns.push(['Bettor_Name', "'"+whereName+"'"]);
        }
        if(whereAddressChecked){
            whereColumns.push(['Bettor_Address', "'"+whereAddress+"'"]);
        }
        if(whereEmailChecked){
            whereColumns.push(['Email', "'"+whereEmail+"'"]);
        }
        if(whereStatusChecked){
            whereColumns.push(['Bettor_Status', whereStatus]);
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
        setWhereNameChecked(false);
        setWhereAddressChecked(false);
        setWhereEmailChecked(false);
        setWhereStatusChecked(false);
        setWhereName('');
        setWhereAddress('');
        setWhereEmail('');
        setWhereStatus(1);

        await updateBettor(columns, whereColumns);
        
    }

    const modalRef = useRef();

    const [nameChecked, setNameChecked] = React.useState(false);
    const [addressChecked, setAddressChecked] = React.useState(false);
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [statusChecked, setStatusChecked] = React.useState(false);

    const [whereNameChecked, setWhereNameChecked] = React.useState(false);
    const [whereAddressChecked, setWhereAddressChecked] = React.useState(false);
    const [whereEmailChecked, setWhereEmailChecked] = React.useState(false);
    const [whereStatusChecked, setWhereStatusChecked] = React.useState(false);

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

    const handleWhereNameChange = (event) => {
        setWhereNameChecked(event.target.checked);
        if(whereNameChecked){
            setWhereName('');
        }
    };

    const handleWhereAddressChange = (event) => {
        setWhereAddressChecked(event.target.checked);
        if(whereAddressChecked){
            setWhereAddress('');
        }
    };

    const handleWhereEmailChange = (event) => {
        setWhereEmailChecked(event.target.checked);
        if(whereEmailChecked){
            setWhereEmail('');
        }
    };

    const handleWhereStatusChange = (event) => {
        setWhereStatusChecked(event.target.checked);
        if(whereStatusChecked){
            setWhereStatus(1);
        }
    };
  
    return (
      <Box bgcolor="skyblue" flex={4} p={2}>
        <Typography variant="h2" gutterBottom>
            Update Bettor Table
        </Typography>
        <Grid container spacing={60}>
            <Grid item xs={0} direction="column">
            <Typography variant="h4" gutterBottom>
                Set
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
            </Grid>
            <Grid item xs={0} direction="row">
                <Typography variant="h4" gutterBottom>
                    Where
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={whereNameChecked}
                                onChange={handleWhereNameChange}
                            />
                        }
                        label="Name is:"
                    />
                </FormGroup>
                <TextField
                    disabled={!whereNameChecked}
                    label="Where Name"
                    type="input"
                    value={whereName}
                    onChange={(event) => setWhereName(event.target.value)}
                    variant="filled"
                    color="secondary"
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={whereAddressChecked}
                                onChange={handleWhereAddressChange}
                            />
                        }
                        label="Address is:"
                    />
                </FormGroup>
                <TextField
                    disabled={!whereAddressChecked}
                    label="Where Address"
                    type="input"
                    value={whereAddress}
                    onChange={(event) => setWhereAddress(event.target.value)}
                    variant="filled"
                    color="secondary"
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={whereEmailChecked}
                                onChange={handleWhereEmailChange}
                            />
                        }
                        label="Email is:"
                    />
                </FormGroup>
                <TextField
                    disabled={!whereEmailChecked}
                    label="Where Email"
                    type="input"
                    value={whereEmail}
                    onChange={(event) => setWhereEmail(event.target.value)}
                    variant="filled"
                    color="secondary"
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={whereStatusChecked}
                                onChange={handleWhereStatusChange}
                            />
                        }
                        label="Status is:"
                    />
                </FormGroup>
                <TextField
                    disabled={!whereStatusChecked}
                    label="Where Status"
                    type="input"
                    value={whereStatus}
                    onChange={(event) => setWhereStatus(event.target.value)}
                    variant="filled"
                    color="secondary"
                />
        </Grid>
        </Grid>
        <br />
        <br />
        <Button variant="contained" color="success" onClick={handleSubmit} href="/UpdateFeedInputs">
        Submit
        </Button>
      </Box>
    );


  }
  export default UpdateFeed;
  