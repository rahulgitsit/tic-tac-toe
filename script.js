let player=0
let turns=0
let table = document.querySelector("table")
let reset = document.querySelector(".btn")
let cells = document.querySelectorAll("td")
let matrix = [ [1,2,3],[5,6,7],[8,9,10] ];
let lastcell=[-1,-1]
let rowInd=-1
let colInd=-1
// cells.addEventListener("click",mark)
reset.addEventListener("click", restart)
table.addEventListener("click",mark)
// table.addEventListener("dblclick",clearMark)
// console.log(matrix[0][0])


function mark(e){
   let cell = e.target.closest('td')
   let row = cell.parentElement;
   if(!cell) {
       return;
    }
    rowInd = row.rowIndex;
    colInd = cell.cellIndex;
    console.log(e.detail)
    if(e.detail === 2 && cell.textContent!=" " && lastcell[0]==rowInd && lastcell[1]==colInd){
        // console.log('HIIII')
        cell.textContent=" "
        matrix[rowInd][colInd]=rowInd+colInd
        player=!player
        return;
    }
   if (!player && cell.textContent!="O" && cell.textContent!="X"){
       cell.textContent='X'
       document.querySelector(".player-turn").textContent="Player 2's turn"
       player=!player
       matrix[rowInd][colInd] = cell.textContent; 
       lastcell=[rowInd,colInd];
   }
   else if(player && cell.textContent!="X" && cell.textContent!="O"){
       cell.textContent="O"
       document.querySelector(".player-turn").textContent="Player 1's turn"
       player=!player
       matrix[rowInd][colInd] = cell.textContent; 
       lastcell=[rowInd,colInd];
   }
//    console.log(cell.cellIndex,row.rowIndex);
   
   if (turns >3){
       checkWinner()
   }
   
   turns+=1
}

function restart(){
    for(let i=0; i<9;i++){
        cells[i].textContent=" "
    }
    matrix = [ [1,2,3],[5,6,7],[8,9,10] ];
    player=0
    turns=0
    
    document.querySelector(".player-turn").textContent="Player 1's turn"
    document.querySelector("h2").textContent=""
    table.style = "pointer-events: default;"
    document.querySelector("body").style = "background: white;"

}

function checkWinner(){
    let col=0
    let row=0
    let win=false
    // console.log(matrix)

    for(row=0;row<3;row++){
            if(matrix[row][col]==matrix[row][col+1] && matrix[row][col+1] == matrix[row][col+2]){
                win=true

            }
    }
    row=0;  
    for(col=0;col<3;col++){
        if(matrix[row][col]==matrix[row+1][col] && matrix[row+1][col] == matrix[row+2][col]){
            win=true

        }
    if(matrix[0][0]==matrix[1][1] && matrix[1][1]==matrix[2][2]){
        win=true
    }
    if(matrix[0][2]==matrix[1][1] && matrix[1][1]==matrix[2][0]){
        win=true
    }

    if(win){
        if(player){
            document.querySelector("h2").textContent="Player 1 Won!"
        }
        else{
            document.querySelector("h2").textContent="Player 2 Won!"
        }
        document.querySelector(".player-turn").textContent="Game Over"
        table.style = "pointer-events: none;"
        document.querySelector("body").style = "background: linear-gradient(0deg, #56c563 0%, #53ff7b 100%);"

    }
}
}