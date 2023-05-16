var mysql = require('mysql');
const fs = require("fs");
const { get } = require('express/lib/response');


var con = mysql.createConnection({
  host: "34.123.170.73",
  user: "root",
  //password: "qwertyuiop",
  database: "betwise"
});


function sql304Script(){
  con.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      throw error;
    }
    console.log('Connection established sucessfully');
  });
}

sql304Script.prototype.dropBettor = function() {
var sql = "DROP TABLE IF EXISTS Bettor";
con.query(sql, function (err, result) {
	if (err) throw err;
});
}
sql304Script.prototype.dropBets = function() {
var sql = "DROP TABLE IF EXISTS Bets";
con.query(sql, function (err, result) {
	if (err) throw err;
});
}

sql304Script.prototype.dropTeam = function() {
var sql = "DROP TABLE IF EXISTS Team";
con.query(sql, function (err, result) {
	if (err) throw err;
});
}

sql304Script.prototype.createBettor = function() {
var sql = "CREATE TABLE IF NOT EXISTS Bettor (Account_ID INT NOT NULL AUTO_INCREMENT, Bettor_Name VARCHAR(255), Bettor_Address VARCHAR(200), Email VARCHAR(50) UNIQUE, Bettor_Status INT, PRIMARY KEY (Account_ID))";
con.query(sql, function (err,result) {
	if (err) throw err;
});
}

sql304Script.prototype.createBets = function() {
var sql = "CREATE TABLE IF NOT EXISTS Bets (Account_ID INT NOT NULL, Bet_ID INT NOT NULL AUTO_INCREMENT, Payment_Type VARCHAR(20), Bet_Amount DOUBLE, Which_Team INT NOT NULL, Bet_Date DATE, PRIMARY KEY (Bet_ID, Account_ID), FOREIGN KEY (Account_ID) REFERENCES Bettor(Account_ID) ON DELETE CASCADE, FOREIGN KEY (Which_Team) REFERENCES Team(Team_ID) ON DELETE CASCADE)";
con.query(sql, function (err,result) {
	if (err) throw err;
});
}

sql304Script.prototype.createTeam = function() {
var sql = "CREATE TABLE IF NOT EXISTS Team (Team_ID INT NOT NULL AUTO_INCREMENT, Team_Name VARCHAR(50) NOT NULL, Country VARCHAR(20), City VARCHAR(20), Player_Roster VARCHAR(700) NOT NULL UNIQUE, Number_Of_Players INT, PRIMARY KEY (Team_ID), UNIQUE (Team_Name, Player_Roster))";
con.query(sql, function (err,result) {
	if (err) throw err;
});
}

sql304Script.prototype.addBettor = function(name, address, email, status) {
  name.replace(/\W/g, '');
  address.replace(/\W/g, '');
  email.replace(/\W/g, '');
  var sql = "INSERT INTO Bettor (Bettor_Name, Bettor_Address, Email, Bettor_Status) VALUES ('"+name+"', '"+address+"', '"+email+"', "+status+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql304Script.prototype.addBet = function(name, paymentType, betAmount, teamName, betDate) {
  name.replace(/\W/g, '');
  paymentType.replace(/\W/g, '');
  teamName.replace(/\W/g, '');
  var sql = "INSERT INTO Bets (Account_ID, Payment_Type, Bet_Amount, Which_Team, Bet_Date) VALUES ((SELECT Account_ID FROM Bettor WHERE Bettor_Name='"+name+"'), '"+paymentType+"', "+betAmount+", (SELECT Team_ID FROM Team WHERE Team_Name='"+teamName+"'), '"+betDate+"')";
  con.query(sql, function (err, result) {
    return {name: name, paymentType: paymentType, betAmount: betAmount, teamName: teamName, betDate: betDate}
  });
}
sql304Script.prototype.addTeam = function(teamName, country, city, playerRoster, numberOfPlayers) {
  teamName.replace(/\W/g, '');
  country.replace(/\W/g, '');
  city.replace(/\W/g, '');
  playerRoster.replace(/\W/g, '');
  var sql = "INSERT INTO Team (Team_Name, Country, City, Player_Roster, Number_Of_Players) VALUES ('"+teamName+"', '"+country+"', '"+city+"', '"+playerRoster+"', "+numberOfPlayers+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

var db = new sql304Script();
db.dropBets();
db.dropBettor();
db.dropTeam();
db.createBettor();
db.createTeam();
db.createBets();
db.addBettor("John", "123 Main St", "John@gmail.com", 1);
db.addBettor("Jane", "124 Main St", "Jane@gmail.com", 1);
db.addBettor("Joe", "125 Main St", "Joe@gmail.com", 1);
db.addBettor("Bob", "126 Main St", "Bob@gmail.com", 0);
db.addBettor("Christine", "127 Main St", "Christine@gmail.com", 1);
db.addTeam("Owls", "USA", "Miami", "Players", 11);
db.addTeam("Bears", "USA", "Chicago", "BearsPlayers", 11);
db.addTeam("Bulls", "USA", "Chicago", "BullsPlayers", 11);
db.addTeam("Cubs", "USA", "Chicago", "CubsPlayers", 11);
db.addTeam("White Sox", "USA", "Chicago", "WhiteSoxPlayers", 11);
db.addTeam("Black Hawks", "USA", "Chicago", "BlackHawksPlayers", 11);
db.addBet("John","Credit Card", 102, "Owls", "2021-04-01");
db.addBet("Jane","Credit Card", 340, "Bears", "2021-04-01");
db.addBet("Christine","Credit Card", 1, "Bulls", "2021-04-01");
db.addBet("Bob","Credit Card", 95340, "Cubs", "2021-04-01");
db.addBet("Jane","Credit Card", 5601, "White Sox", "2021-04-01");
db.addBet("Joe","Credit Card", 86, "Black Hawks", "2021-04-01");
db.addBet("Christine","Credit Card", 684, "White Sox", "2021-04-01");
db.addBet("John","Credit Card", 311, "Black Hawks", "2021-04-01");
db.addBet("John","Credit Card", 102, "Owls", "2021-04-01");
db.addBet("John","Credit Card", 900, "Bears", "2021-04-01");
db.addBet("John","Credit Card", 7700, "Bulls", "2021-04-01");
db.addBet("John","Credit Card", 800, "Cubs", "2021-04-01");
db.addBet("John","Credit Card", 400, "White Sox", "2021-04-01");
db.addBet("John","Credit Card", 600, "Black Hawks", "2021-04-01");
db.addBet("Christine","Credit Card", 102, "Owls", "2021-04-01");
db.addBet("Christine","Credit Card", 900, "Bears", "2021-04-01");
db.addBet("Christine","Credit Card", 7700, "Bulls", "2021-04-01");
db.addBet("Christine","Credit Card", 800, "Cubs", "2021-04-01");
db.addBet("Christine","Credit Card", 400, "White Sox", "2021-04-01");
db.addBet("Christine","Credit Card", 600, "Black Hawks", "2021-04-01");
db.addBet("Joe","Credit Card", 2, "Bulls", "2021-04-01");

module.exports=sql304Script;