const apiCallUrl= "http://localhost:3000/";
export async function GetBettorsBetsTeams() {
    try {
        const response = await fetch(apiCallUrl + 'mainpage', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function GroupMaxBet() {
    try {
        const response = await fetch(apiCallUrl + 'group_bettor', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function HavingMaxBet() {
    try {
        const response = await fetch(apiCallUrl + 'having', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function MoreThanAvg() {
    try {
        const response = await fetch(apiCallUrl + 'group_avg', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function Division() {
    try {
        const response = await fetch(apiCallUrl + 'division', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function InsertBet(name, paymentType, betAmount, teamName, betDate) {
    try {
        const response = await fetch(apiCallUrl + 'insert', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, paymentType: paymentType, betAmount: betAmount, teamName: teamName, betDate: betDate})
        });
        const yes=await response.json();
        //console.log(yes);
        if(yes.betAmount===-1){
            alert("Bet amount must be a number.");
        }
        else if(yes.betDate===-1){
            alert("Bet date must be a valid date.");
        }
        else if(yes.name==="" && yes.teamName===""){
            alert("Bettor or team does not exist. Please make sure the bettor and team names exist in the database first.");
        } else {
            alert("Success");
        }
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function updateBettor(column, whereColumn) {
    try {
        const response = await fetch(apiCallUrl + 'update', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({column: column, whereColumn: whereColumn})
        });
        const yes=await response.json();
        if(yes.status===-2){
            alert("Invalid email. That email would be duplicated in the database.");
        }
        else if(yes.status===-1){
            alert("Invalid status. Please enter a valid status that is either 0 or 1.");
        } else {
            alert("Success");
        }
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function deleteBettor(column) {
    try {
        const response = await fetch(apiCallUrl + 'delete', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({column: column})
        });
        
        const yes=await response.json();
        if(yes.status===-1){
            alert("Invalid status. Please enter a valid status that is either 0 or 1.");
        } else {
            alert("Success");
        }

        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function TablesJoined(table) {
    try {
        const response = await fetch(apiCallUrl + 'join', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({table: table})
        });
        const yes=await response.json();
        console.log(yes);
        if(yes.result===-1){
            alert("Bet amount must be a number.");
        }
        else if(yes.result===-2){
            alert("Bet date must be a valid date.");
        }
        else if(yes.result===-3){
            alert("Invalid status. Please enter a valid status that is either 0 or 1.");
        }
        return yes;
    } catch (error) {
        return error;
    }
}

export async function GetBettors(columns) {
    try {
        const response = await fetch(apiCallUrl + 'select', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({columns: columns})
        });
        const yes=await response.json();
        if(yes.status===-1){
            alert("Invalid status. Please enter a valid status that is either 0 or 1.");
        }
        return yes;
    } catch (error) {
        return error;
    }
}

export async function ProjectionTable(columns, table){
    try {
        const response = await fetch(apiCallUrl + 'projection', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({columns: columns, table: table})
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}