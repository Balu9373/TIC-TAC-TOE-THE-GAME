let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX is true, playerO is false
let count = 0; // To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if the box is not already occupied
            if (turnO) {
                box.innerText = "O"; // Player O's turn
            } else {
                box.innerText = "X"; // Player X's turn
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();

            if (isWinner) {
                showWinner(turnO ? "O" : "X");
            } else if (count === 9) {
                gameDraw();
            }

            turnO = !turnO; // Switch turn
        }
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            return true;
        }
    }
    return false;
};

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


    
