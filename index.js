function chooseMove(button) {

    document.querySelectorAll(".PlayerMove").forEach(btn => {
        btn.style.backgroundColor = "";
    });

    button.style.backgroundColor = "lightblue";
}
