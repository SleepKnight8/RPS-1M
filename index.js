let win_count= 0;
let lose_count = 0;
let player_move;
let computer_move;
let balance = 50000;
let bet = 1000;

let computer_move_icon = {
    "R": "👊",
    "P": "🖐️",
    "S": "✌️"
}
loadGame()

function chooseMove(button) {

    document.querySelectorAll(".PlayerMove").forEach(btn => {
        btn.style.backgroundColor = "";
    });

    button.style.backgroundColor = "lightblue";

    player_move = button.value;
    // console.log(player_move); debug OK
}

function BetFunc(button) {
    if (button.id === "Increase") {
        if (bet <= balance-1000) {
            bet += 1000;
        }
    }
    else if (button.id === "Decrease" && bet !== 1000) {
        bet -= 1000;
    }

    document.getElementById("BetDisplay").innerHTML = bet;
}

function play() {
    if (bet > balance) {
        if (balance <= 0) {
            alert("You Lost the Game!");
            return;
        }
    
        const moves = ["R", "P", "S"];
    
        const computer_move_random = moves[Math.floor(Math.random() * 3)];
    
        document.getElementById("ComputerMoveDisplay").innerHTML = computer_move_icon[computer_move_random];
    
        if (computer_move_random === player_move) {
            document.getElementById("result").innerHTML = "Tie";
            document.getElementById("BetResult").innerHTML = "0";
            document.getElementById("BetResult").style.color = "lightslategray";
            saveGame();
            return;
        }
    
        const BetWin =
            (player_move === "R" && computer_move_random === "S") ||
            (player_move === "P" && computer_move_random === "R") ||
            (player_move === "S" && computer_move_random === "P");
    
        if (BetWin) {
            document.getElementById("result").innerHTML = "You Win!";
            document.getElementById("BetResult").innerHTML = "+" + bet;
            balance += bet;
            document.getElementById("BetResult").style.color = "#06d6a0";
        } else {
            document.getElementById("result").innerHTML = "You Lose!";
            document.getElementById("BetResult").innerHTML = "-" + bet;
            balance -= bet;
            document.getElementById("BetResult").style.color = "#ef476f";
    
    
        }
    
        document.getElementById("MoneyDisplay").innerHTML = balance;
        document.getElementById("WinStatus").innerHTML = "Wins: " + win_count;
        document.getElementById("LoseStatus").innerHTML = "Loses: " + lose_count;
    
        if (balance >= 1000000) {
            alert("You Win the Game!");
            win_count += 1;
            NewGame();
        }
    
        else if (balance <= 0) {
            alert("You Lost the Game!");
            lose_count += 1;
            NewGame();
        }
        
    else{
        bet = balance;
        }    
    saveGame();
    }
}
function saveGame() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("win_count", win_count);
    localStorage.setItem("lose_count", lose_count);
    localStorage.setItem("bet", bet);
}

function loadGame() {
    balance = Number(localStorage.getItem("balance")) || 50000;
    win_count = Number(localStorage.getItem("win_count")) || 0;
    lose_count = Number(localStorage.getItem("lose_count")) || 0;
    bet = Number(localStorage.getItem("bet")) || 1000;

    document.getElementById("MoneyDisplay").innerHTML = balance;
    document.getElementById("WinStatus").innerHTML = "Wins: " + win_count;
    document.getElementById("LoseStatus").innerHTML = "Loses: " + lose_count;
    document.getElementById("BetDisplay").innerHTML = bet;
}

function NewGame() {
    balance = 50000;
    bet = 1000;

    // clear saved data OR reset it
    saveGame();

    // update UI immediately
    document.getElementById("MoneyDisplay").innerHTML = balance;
    document.getElementById("WinStatus").innerHTML = "Wins: " + win_count;
    document.getElementById("LoseStatus").innerHTML = "Loses: " + lose_count;
    document.getElementById("BetDisplay").innerHTML = bet;

    document.getElementById("result").innerHTML = "Result";
    document.getElementById("BetResult").innerHTML = "Bet Result";
}
