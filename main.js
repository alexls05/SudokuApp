var numSelected = null;
var tileSelected = null;

var board;
var sol;
var ansFlag;

async function newBoard(){
    try {
    const API = await fetch('https://sudoku-api.vercel.app/api/dosuku');

    if(!API.ok) {
        throw new Error(`API Error! status: ${API.status}`);
    }

    const data = await API.json();

    board = (data.newboard.grids)[0].value;
    sol = data.solution;

    fillBoard(board);

    } catch (error) {
        console.error("Fetching error:", error)
        throw error;
    }

    return board;
}

window.onload = function() {
    setGame();
    document.addEventListener("keydown", function(event){
        if(numSelected != null){
            numSelected.classList.remove("number-selected");
        }
        if(isFinite(event.key)){
            numSelected = document.getElementById(parseInt(event.key));
        }
    });
    board = newBoard();
}

function setGame(){

    // Set Digits Below Board
    for (let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", function(){
            if(tileSelected.classList.contains("edit-tile"))
                tileSelected.innerText = this.id;
        });
        document.getElementById("digits").appendChild(number);
    }

    // Create 9x9 Board
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("sudoku-board").append(tile);
            tile.innerText = "";
            if (r == 2 || r == 5)
                tile.classList.add("bottom-border-darkgray");
            if (c == 2 || c == 5)
                tile.classList.add("right-border-darkgray");
            if (r == 0)
                tile.classList.add("top-border-black");
            if (r == 8)
                tile.classList.add("bottom-border-black");
            if (c == 0)
                tile.classList.add("left-border-black");
            if (c == 8)
                tile.classList.add("right-border-black");

            tile.addEventListener("click", selectTile);
            document.addEventListener("keydown", function(event){
                if(tile.classList.contains("given-tile"))
                    return;
                if(isFinite(event.key) & event.key != 0){
                    if(tile.classList.contains("tile-selected")){
                        tile.innerText = (event.key).toString();
                    }
                } else if (event.key == "Backspace" || event.key == "Delete"){
                    if(tile.classList.contains("tile-selected")){
                        tile.innerText = "";
                    }
                }
            });
        }
    }
}

function selectTile(){
    if(tileSelected != null)
        tileSelected.classList.remove("tile-selected");
    tileSelected = this;
    tileSelected.classList.add("tile-selected");
    curBoard = getBoard();
}

function fillBoard(boardInfo){
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            // console.log(boardInfo[r][c])
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = (boardInfo[r][c]).toString();
            if (boardInfo[r][c] == 0){
                tile.innerText = "";
                tile.classList.add("edit-tile");
            } else {
                tile.classList.add("given-tile");
            }
        }
    }
}

function getBoard() {
    let currentBoard = [];
    for(let r = 0; r < 9; r++){
        currentBoard[r] = [];
        for (let c = 0; c < 9; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            currentBoard[r][c] = parseInt(tile.innerText);
            if (tile.innerText == "")
                currentBoard[r][c] = 0;
        }
    }
    return currentBoard;
}

function checkBoard() {
    var curBoard = getBoard();

    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            if(curBoard[r][c] != sol[r][c])
                return false;
        }
    }

    return true;
}
