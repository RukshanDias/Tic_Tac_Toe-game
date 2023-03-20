
function startGame(){
    running=true;
    tiles.forEach(tile => tile.addEventListener("click",userTileClicked));
    resetBtn.addEventListener("click",reset);

}
function userTileClicked(){
    console.log("clicked");
    let index=this.getAttribute("cellIndex");
    console.log(index);
    if (running==true && enterdValues[index]==""){
        updateTile(index);
        statusText.innerHTML="Computer's turn";
        checkWinner();
        setTimeout(computerTileSelect,2000);
    }else{
        console.log(index+" is already filled or game stopped")
    }
    
}
function updateTile(index){
    if(running==true){
        tiles[index].innerHTML="X";
        enterdValues[index]="X";
    }
    
}

function checkWinner(){
    let gameWon=false;
    let letter;
    for(let i=0;i<Conditions.length;i++){
        let cond= Conditions[i];
        let tile_A=enterdValues[cond[0]];
        let tile_B=enterdValues[cond[1]];
        let tile_C=enterdValues[cond[2]];
        letter=tile_A;
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
        //currentPlayer=(currentPlayer=="X")? "O" : "X";
        statusText.innerHTML=letter+" Won the game..";
        statusText.innerHTML=(letter=="X") ? "You won the game.." : "Computer won the game..";
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
    statusText.innerHTML="Your turn"
}
//-------computer section----------
function computerTileSelect(){
    if(running==true){
        running=false;
        while(true){
            computerInputIndex=Math.floor(Math.random()*9);
            if(enterdValues[computerInputIndex]==""){
                break;
            }
        }
        //setTimeout(waiting,2000);
        tiles[computerInputIndex].innerHTML="O";
        enterdValues[computerInputIndex]="O";

        console.log(computerInputIndex)

        running=true;
        statusText.innerHTML="Your turn";
        checkWinner();        
    }
    //changePlayer();
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
let enterdValues=["", "", "", "", "", "", "", "", ""];
let running=false;

startGame();