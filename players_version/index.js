
function startGame(){
    running=true;
    tiles.forEach(tile => tile.addEventListener("click",tileClicked));
    resetBtn.addEventListener("click",reset);

}
function tileClicked(){
    console.log("clicked");
    let index=this.getAttribute("cellIndex");
    console.log(index);
    if (running==true && enterdValues[index]==""){
        updateTile(index);
        checkWinner();
        changePlayer();
    }else{
        console.log(index+" is already filled or game stopped")
    }
    
}
function updateTile(index){
    if(running==true){
        tiles[index].innerHTML=currentPlayer;
        enterdValues[index]=currentPlayer;
    }
    
}
function changePlayer(){
    if(running==true){
        currentPlayer=(currentPlayer=="X")? "O" : "X";
        statusText.innerHTML=(currentPlayer=="X") ? (player1+"'s turn") : (player2+"'s turn");
    }
    
}
function checkWinner(){
    let gameWon=false;
    for(let i=0;i<Conditions.length;i++){
        let cond= Conditions[i];
        let tile_A=enterdValues[cond[0]];
        let tile_B=enterdValues[cond[1]];
        let tile_C=enterdValues[cond[2]];
        if(tile_A=="" || tile_B=="" || tile_C==""){
            continue;
        }
        else if(tile_A==tile_B && tile_B==tile_C){
            gameWon=true;
            tiles[cond[0]].classList.add("correct");
            tiles[cond[1]].classList.add("correct");
            tiles[cond[2]].classList.add("correct");
            console.log("won")
            break;
        }
    }

    if(gameWon){
        statusText.innerHTML=(currentPlayer=="X") ? (player1+" won the game..") : (player2+" won the game..");
        running=false;
    }else if(!enterdValues.includes("")){
        statusText.innerHTML="Draw !";
        running=false
    }
}
function reset(){
    console.log("reset");
    running=true;
    tiles.forEach(tile => tile.innerHTML="");
    tiles.forEach(tile => tile.classList.remove("correct"));
    enterdValues=["", "", "", "", "", "", "", "", ""];
    currentPlayer="X"
    statusText.innerHTML=player1+"'s turn"
}
//----------input form interactivity---------------
function clickPlayBtn(){
    getFieldValue();
    toggleDivHide();
}
function getFieldValue(){
    player1 = document.querySelector("#player1").value;
    player2 = document.querySelector("#player2").value;
    console.log(player1+player2)
}
function toggleDivHide(){
    document.querySelector(".tile_container").classList.toggle("hide");
    document.getElementById("restartBtn").classList.toggle("hide");

    document.querySelector(".players").classList.toggle("hide");
}
//----------main programme------------
const tiles=document.querySelectorAll(".tile");
const statusText=document.getElementById("statusText");
const resetBtn=document.getElementById("restartBtn");

/*
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

const Conditions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let player1 ="";
let player2 =""

let currentPlayer="X";
let enterdValues=["", "", "", "", "", "", "", "", ""];
let running=false;

startGame();