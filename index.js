let win_count;
let lose_count;
let player_move;
let balance = 50000;
let bet = 1000;

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
