var height = 6; //number of guesses
var width = 5; //word length

var row = 0; //attempt #
var col = 0; //current letter for that attempt

var gameOver = false;

words = ["SQUID", "MODEL", "LAYER","GRAPH","CRAZY", "FALSE", "WALTZ", "GRIPS", "SHARP","EXIST","SPACE","SOLID"];

window.onload = function(){
    start();
}

mysteryWord = words[Math.floor(Math.random()*words.length)];
function start(){

    //Create board
    for(let r = 0; r<height; r++){
        for (let c = 0; c<width; c++){
           let tile = document.createElement("span");
           tile.id = r.toString() + "-" + c.toString();
           tile.classList.add("tile");
           tile.innerText = "";
           document.getElementById("board").appendChild(tile);
        }
    }
}

document.addEventListener("keyup", (e) => {
    if(gameOver){
        return;
    } 

    //alert(e.code);
    if("KeyA" <=e.code && e.code <= "KeyZ"){
        if (col <width){
            let currTile = document.getElementById(row.toString() +"-"+ col.toString());
            if (currTile.innerText == ""){
                currTile.innerText = e.code[3];
                col+=1;
            }
        }
    }
    else if (e.code == "Backspace"){
        if (0<col && col<=width){
         col-=1;
        }
        let currTile = document.getElementById(row.toString() +"-"+ col.toString());
        currTile.innerText = "";
    }
    else if (e.code == "Enter"){
        update();
        row+=1;
        col = 0;
    }

    if(!gameOver && row == height){
        gameOver = true;
        alert("Oops! The correct word is"+mysteryWord+".")
        
    }
})

function update(){
    let correct= 0;
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() +"-"+ c.toString());
        let letter = currTile.innerText;
        let repeat = [];

        if(mysteryWord[c]==letter){
            currTile.classList.add("correct");
            correct+=1;
        }
        else if(mysteryWord.includes(letter)&&!repeat.includes(letter)){
            currTile.classList.add("present");
            repeat.push(letter);
        }
        
        else{
            currTile.classList.add("absent");
        }
    }
    if(correct == width){
        gameOver = true;
        alert("Congratulations! You guessed correctly.")
    }
}
