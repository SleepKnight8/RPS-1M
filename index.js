let win_count= 0;
let lose_count = 0;
let player_move;
let computer_move;
let balance = 50000;
let bet = 1000;

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

    if (balance <= 0) {
        alert("You Lost the Game!");
        return;
    }

    const moves = ["R", "P", "S"];
    const computer_move_random = moves[Math.floor(Math.random() * 3)];

    document.getElementById("ComputerMoveDisplay").innerHTML = computer_move_random;

    if (computer_move_random === player_move) {
        document.getElementById("result").innerHTML = "Tie";
        document.getElementById("BetResult").innerHTML = "0";
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
        win_count++;
    } else {
        document.getElementById("result").innerHTML = "You Lose!";
        document.getElementById("BetResult").innerHTML = "-" + bet;
        balance -= bet;
        lose_count++;
    }

    document.getElementById("MoneyDisplay").innerHTML = balance;
    document.getElementById("WinStatus").innerHTML = "Wins: " + win_count;
    document.getElementById("LoseStatus").innerHTML = "Loses: " + lose_count;

    if (balance >= 1000000) {
        alert("You Win the Game!");
    }

    if (balance <= 0) {
        alert("You Lost the Game!");
    }

    saveGame();
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

function resetGame() {
    localStorage.clear();
    location.reload();
}
