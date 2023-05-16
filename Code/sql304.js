var mysql = require('mysql');
const fs = require("fs");
const { get } = require('express/lib/response');


var con = mysql.createConnection({
  host: "34.123.170.73",
  user: "root",
  //password: "qwertyuiop",
  database: "betwise"
});


function sql304(){
  con.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      // throw error;
    }
    console.log('Connection established sucessfully');
  });
}

//Create Bettor, Bets, and Team tables
sql304.prototype.createBettor = function() {
  var sql = "CREATE TABLE IF NOT EXISTS Bettor (Account_ID INT NOT NULL AUTO_INCREMENT, Bettor_Name VARCHAR(255), Bettor_Address VARCHAR(200), Email VARCHAR(50) UNIQUE, Bettor_Status INT, PRIMARY KEY (Account_ID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql304.prototype.createBets = function() {
  var sql = "CREATE TABLE IF NOT EXISTS Bets (Account_ID INT NOT NULL, Bet_ID INT NOT NULL AUTO_INCREMENT, Payment_Type VARCHAR(20), Bet_Amount DOUBLE, Which_Team INT NOT NULL, Bet_Date DATE, PRIMARY KEY (Bet_ID, Account_ID), FOREIGN KEY (Account_ID) REFERENCES Bettor(Account_ID) ON DELETE CASCADE, FOREIGN KEY (Which_Team) REFERENCES Team(Team_ID) ON DELETE CASCADE)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql304.prototype.createTeam = function() {
  var sql = "CREATE TABLE IF NOT EXISTS Team (Team_ID INT NOT NULL AUTO_INCREMENT, Team_Name VARCHAR(50) NOT NULL, Country VARCHAR(20), City VARCHAR(20), Player_Roster VARCHAR(700) NOT NULL UNIQUE, Number_Of_Players INT, PRIMARY KEY (Team_ID), UNIQUE (Team_Name, Player_Roster))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}


//Insert into Bettor, Bets, and Team tables (INSERTION)
sql304.prototype.addBettor = function(name, address, email, status) {
  var sql = "INSERT INTO Bettor (Bettor_Name, Bettor_Address, Email, Bettor_Status) VALUES ('"+name+"', '"+address+"', '"+email+"', "+status+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql304.prototype.addBet = function(name, paymentType, betAmount, teamName, betDate) {
  var sql = "INSERT INTO Bets (Account_ID, Payment_Type, Bet_Amount, Which_Team, Bet_Date) VALUES ((SELECT Account_ID FROM Bettor WHERE Bettor_Name='"+name+"'), '"+paymentType+"', "+betAmount+", (SELECT Team_ID FROM Team WHERE Team_Name='"+teamName+"'), '"+betDate+"')";
  con.query(sql, function (err, result) {
    return {name: name, paymentType: paymentType, betAmount: betAmount, teamName: teamName, betDate: betDate}
  });
}

sql304.prototype.addTeam = function(teamName, country, city, playerRoster, numberOfPlayers) {
  var sql = "INSERT INTO Team (Team_Name, Country, City, Player_Roster, Number_Of_Players) VALUES ('"+teamName+"', '"+country+"', '"+city+"', '"+playerRoster+"', "+numberOfPlayers+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql304.prototype.getAllBettors = function() {
  var sql = "SELECT * FROM Bettor";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}

sql304.prototype.getAllBets = function() {
  var sql = "SELECT * FROM Bets";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}

sql304.prototype.getAllTeams = function() {
  var sql = "SELECT * FROM Team";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}


// SELECT from Bettor Table (SELECTION)
sql304.prototype.getBettor = function(column) {
  var sql = "SELECT * FROM Bettor";
  if(column.length > 0){
    sql += " WHERE ";
  }
  {column.map((rows_Bettor) => (
    sql += rows_Bettor[0] + " = " + rows_Bettor[1] + " AND "
  ))}
  if(column.length > 0){
    sql = sql.slice(0, -5);
  }
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}

// Delete from Bettor Table (DELETE)
sql304.prototype.deleteBettor = function(column) {
  var sql = "DELETE FROM Bettor";
  if(column.length > 0){
    sql += " WHERE ";
  }
  {column.map((rows_Bettor) => (
    sql += rows_Bettor[0] + " = " + rows_Bettor[1] + " AND "
  ))}
  if(column.length > 0){
    sql = sql.slice(0, -5);
  }
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

// Update Bettor Table (UPDATE)
sql304.prototype.updateBettor = function(column, whereColumn) {
  var sql = "UPDATE Bettor SET ";
  {column.map((rows_Bettor) => (
    sql += rows_Bettor[0] + " = " + rows_Bettor[1] + ", "
  ))}
  sql = sql.slice(0, -2);
  if(whereColumn.length > 0){
    sql += " WHERE ";
  }
  {whereColumn.map((rows_Bettor) => (
    sql += rows_Bettor[0] + " = " + rows_Bettor[1] + " AND "
  ))}
  if(whereColumn.length > 0){
    sql = sql.slice(0, -5);
  }
  con.query(sql, function (err, result) {
    return err;
  });
}

// Projection of a table specified by user (PROJECTION)
sql304.prototype.projectTable = function(column, table) {
  var sql = "SELECT";
  if(column.length== 0){
    sql += " * ";
  }
  else{
    {column.map((rows_Bettor) => (
      sql += " " + rows_Bettor + ","
    ))}
    sql = sql.slice(0, -1);
  }
  sql += " FROM " + table;
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}


// Join of Bettor and Bets on Account_ID based on a user criterion (JOIN)
sql304.prototype.joinTables = function(table) {
  var sql = "SELECT * FROM Bettor INNER JOIN Bets WHERE Bettor.Account_ID = Bets.Account_ID";
  if(table.length > 0){
    sql += " AND ";
  }
  {table.map((rows_Bettor) => (
    sql += rows_Bettor[0] + "." + rows_Bettor[1] + " " + rows_Bettor[2] + " " + rows_Bettor[3] + " AND "
  ))}
  if(table.length > 0){
    sql = sql.slice(0, -5);
  }
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) return err;
        resolve(rows.map(row => row));
      });
    })
}

sql304.prototype.joinAllTables = function(table) {
  var sql = "SELECT * FROM Bettor INNER JOIN Bets INNER JOIN Team WHERE Bettor.Account_ID = Bets.Account_ID AND Bets.Which_Team = Team.Team_ID";
  if(table.length > 0){
    sql += " AND ";
  }
  {table.map((rows_Bettor) => (
    sql += rows_Bettor[0] + "." + rows_Bettor[1] + " " + rows_Bettor[2] + " " + rows_Bettor[3] + " AND "
  ))}
  if(table.length > 0){
    sql = sql.slice(0, -5);
  }
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows);
      });
    })
}

// Find the maximum bet of each bettor (GROUP BY AGGREGATION)
sql304.prototype.groupByMaxBet = function(){
  var sql="SELECT Bettor.Account_ID, Email, Bettor_Address, Bettor_Name AS name, MAX(Bet_Amount) AS amt FROM Bettor, Bets WHERE Bettor.Account_ID = Bets.Account_ID GROUP BY Bettor.Account_ID";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}

// Find the bettors that have a maximum bet over 100 (HAVING AGGREGATION)
sql304.prototype.havingMaxBetOver100 = function(){
  var sql="SELECT Bettor.Account_ID, Email, Bettor_Address, Bettor_Name, MAX(Bet_Amount) AS amt FROM Bettor, Bets WHERE Bettor.Account_ID = Bets.Account_ID GROUP BY Bettor.Account_ID HAVING MAX(Bet_Amount) > 100";

  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    })
}

// Find the bettors with more bets than the average number of bets per person (NESTED GROUP BY AGGREGATION)
sql304.prototype.avgNumBets = function() {
  var sql="SELECT Bettor.Account_ID, Email, Bettor_Address, Bettor_Name, COUNT(*) AS num_bets FROM Bettor, Bets WHERE Bettor.Account_ID = Bets.Account_ID GROUP BY Bettor.Account_ID HAVING COUNT(*) > (SELECT AVG(num_bets_per_person) FROM (SELECT COUNT(*) AS num_bets_per_person FROM Bets GROUP BY Account_ID) subquery)";

  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows);
      });
    })
}

// Find the bettors that have bets on all teams (DIVISION)
sql304.prototype.bettorsOnAllTeams = function() {
  var sql="SELECT Account_ID, Email, Bettor_Address, Bettor_Name FROM Bettor WHERE Account_ID IN (SELECT Account_ID FROM Bets GROUP BY Account_ID HAVING COUNT(DISTINCT Bets.Which_Team) = (SELECT COUNT(*) FROM Team))";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows);
      });
    })
}

module.exports=sql304;