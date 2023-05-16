const express = require('express');
const cors = require('cors');
const sql304 = require('./sql304.js');
const fs = require("fs");

// Set up server
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

var db = new sql304();

db.createBettor();
db.createBets();
db.createTeam();

app.get('/mainpage', async (req, res) => {
    const promises = [
        db.getAllBets(),
        db.getAllBettors(),
        db.getAllTeams()
    ]
    
    Promise.all(promises).then((data) => {
        res.send(data);
    });
});

app.get('/group_bettor', async (req, res) => {
    let data=await db.groupByMaxBet();
    res.send(data);
});

app.get('/having', async (req, res) => {
    let data=await db.havingMaxBetOver100();
    res.send(data);
});

app.get('/group_avg', async (req, res) => {
    let data=await db.avgNumBets();
    res.send(data);
});

app.get('/division', async (req, res) => {
    let data=await db.bettorsOnAllTeams();
    res.send(data);
});

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

app.post('/insert', async (req, res) => {
    req.body.name=req.body.name.replace(/[^0-9A-Za-z ]/g,"");
    req.body.paymentType=req.body.paymentType.replace(/[^0-9A-Za-z ]/g,"");
    req.body.teamName=req.body.teamName.replace(/[^0-9A-Za-z ]/g,"");
    console.log(req.body.name);
    let isbetnumber=true;
    if(containsOnlyNumbers(req.body.betAmount)==false){
        isbetnumber=false;
    }
    let isdate=true;

    if(Number.isNaN(Date.parse(req.body.betDate))){
        isdate=false;
    }
    db.addBet(req.body.name, req.body.paymentType, req.body.betAmount, req.body.teamName, req.body.betDate);
    let joined=await db.joinAllTables([['Bettor','Bettor_Name','=',"'"+req.body.name+"'"], ['Team','Team_Name','=',"'"+req.body.teamName+"'"]]);
    //console.log(joined);
    let ready=false;
    joined.map((item) => {
        if(item.Bettor_Name==req.body.name && item.Team_Name==req.body.teamName){
            ready=true;
        }
    });
    if(isbetnumber==false){
        res.send({name: req.body.name, paymentType: req.body.paymentType, betAmount: -1, teamName: req.body.teamName, betDate: req.body.betDate});
    }
    else if(isdate==false){
        res.send({name: req.body.name, paymentType: req.body.paymentType, betAmount: req.body.betAmount, teamName: req.body.teamName, betDate: -1});
    }
    else{
        if(!ready)
            res.send({name: "", paymentType: "", betAmount: 0, teamName: "", betDate: ""});
        else
            res.send({name: req.body.name, paymentType: req.body.paymentType, betAmount: req.body.betAmount, teamName: req.body.teamName, betDate: req.body.betDate});
    }

});

app.patch('/update', async (req, res) => {
    console.log(req.body);
    req.body.column.map((item) => {
        if(item[0]!='Bettor_Status'){
            [item[0],item[1]]=[item[0],"'"+item[1].replace(/[^0-9A-Za-z @.]/g,"")+"'"];
        }
    });
    req.body.whereColumn.map((item) => {
        if(item[0]!='Bettor_Status'){
            [item[0],item[1]]=[item[0],"'"+item[1].replace(/[^0-9A-Za-z @.]/g,"")+"'"];
        }
    });
    let isStatus=true;
    req.body.column.map((item) => {
        if(item[0]=='Bettor_Status' && (!containsOnlyNumbers(item[1]) || (!(item[1]==0 || item[1]==1)))){
            isStatus=false;
        }
    });

    req.body.whereColumn.map((item) => {
        if(item[0]=='Bettor_Status' && (!containsOnlyNumbers(item[1]) || (!(item[1]==0 || item[1]==1)))){
            isStatus=false;
        }
    });
    let getter=await db.getAllBettors();
    console.log(getter);
    let isEmail=false;
    getter.map((item) => {
        req.body.column.map((item2) => {
            if(item2[0]=='Email' && item2[1]=="'"+item.Email+"'"){
                isEmail=true;
            }
        });
    });

    req.body.column.map((item) => {
        if(item[0]=='Email' && req.body.whereColumn.length==0){
            isEmail=true;
        }
    });

    let data=db.updateBettor(req.body.column, req.body.whereColumn);
    console.log(data);
    if(isEmail==true){
        res.send({status: -2});
    }
    else if(isStatus==false){
        res.send({status: -1});
    }
    else{
        res.send({status: 0});
    }
});

app.delete('/delete', async (req, res) => {
    console.log(req.body.column);
    req.body.column.map((item) => {
        if(item[0]!='Bettor_Status'){
            [item[0],item[1]]=[item[0],"'"+item[1].replace(/[^0-9A-Za-z @.]/g,"")+"'"];
        }
    });
    let isStatus=true;
    req.body.column.map((item) => {
        if(item[0]=='Bettor_Status' && (!containsOnlyNumbers(item[1]) || (!(item[1]==0 || item[1]==1)))){
            isStatus=false;
        }
    });

    let getter=await db.getAllBettors();
    let bettorexists=true;
    if(req.body.column.length==0){
        bettorexists=false;
    }
    let data=await db.deleteBettor(req.body.column);
    let getterlater=await db.getAllBettors();
    if(getter.length==getterlater.length){
        bettorexists=false;
    }


    if(isStatus==false){
        res.send({status: -1});
    }
    else if(bettorexists==true){
        res.send({status: 0});
    }
});

app.post('/join', async (req, res) => {
    req.body.table.map((item) => {
        if(item[1]!='Bettor_Status' && item[1]!='Bet_Date' && item[1]!='Bet_Amount'){
            [item[0],item[1],item[2],item[3]]=[item[0],item[1],item[2],"'"+item[3].replace(/[^0-9A-Za-z @.]/g,"")+"'"];
        }
    });
    let isbetnumber=true;
    let isdate=true;
    let isstatus=true;
    req.body.table.map((item) => {
        if(item[1]=='Bet_Amount' && !containsOnlyNumbers(item[3])){
            isbetnumber=false;
        }
        else if(item[1]=='Bet_Date' && Number.isNaN(Date.parse(item[3]))){
            isdate=false;
        }
        else if(item[1]=='Bettor_Status' && (!containsOnlyNumbers(item[3]) || (!(item[3]==0 || item[3]==1)))){
            isstatus=false;
        }
    });
    if(isbetnumber==false){
        res.send({result: -1});
    }
    else if(isdate==false){
        res.send({result: -2});
    }
    else if(isstatus==false){
        res.send({result: -3});
    }
    else{
        let data=await db.joinTables(req.body.table);
        res.send({data,result: 0});
    }
});

app.post('/select', async (req, res) => {
    console.log(req.body.columns);
    req.body.columns.map((item) => {
        if(item[0]!='Bettor_Status'){
            [item[0],item[1]]=[item[0],"'"+item[1].replace(/[^0-9A-Za-z @.]/g,"")+"'"];
        }
    });
    let isStatus=true;
    req.body.columns.map((item) => {
        if(item[0]=='Bettor_Status' && (!containsOnlyNumbers(item[1]) || (!(item[1]==0 || item[1]==1)))){
            isStatus=false;
        }
    });

    if(isStatus==false){
        res.send({status: -1});
    }
    else{
        let data=await db.getBettor(req.body.columns);
        res.send({data, status: 0});
    }
});

app.post('/projection', async (req, res) => {
    console.log(req.body);
    let data=await db.projectTable(req.body.columns, req.body.table);
    console.log(data);
    res.send(data);
});