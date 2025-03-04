var numSelected = null;
var tileSelected = null;

var board;
var sol;

async function newBoard(){
    try {
    const API = await fetch('https://sudoku-api.vercel.app/api/dosuku');

    if(!API.ok) {
        throw new Error(`API Error! status: ${API.status}`);
    }

    const data = await API.json();

    board = data.grid;
    sol = data.solution;

    } catch (error) {
        console.error("Fetching error:", error)
        throw error;
    }
}

window.onload = function() {
    // newBoard();
    setGame();
    document.addEventListener('keydown', selectNum(event));
}

function setGame(){

    // Set Digits Below Board
    for (let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNum);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Create 9x9 Board
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("sudoku-board").append(tile);
        }
    }
}

function selectNum(){
    if(arguments.length === 1){
            if(numSelected != null){
                numSelected.classList.remove("number-selected");
            }
            if(arguements[0].key.isInteger()){
                numSelected = document.getElementById(parseInt(event.key));
            }
            numSelected.classList.add("number-selected");
    }

    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
} 




