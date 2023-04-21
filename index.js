let inputDir = {x:0, y:0};
let board = document.getElementById("snakeBoard")
let foodMusic = new Audio("./audio/food.m4r");
let gameOver = new Audio("./audio/Game_Over.m4r");
let snakeMusic = new Audio("./audio/Snake_Music.m4r");
let score = document.getElementById("score");
let highBox = document.getElementById("highScore")

let lastPaintTime = 0;
let speed = 4;
let snakearr = [{x:10,y:15}]
let food = {x:6,y:7};
let sc = 0;
// functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameFunction();
}

function isCollide(snakearr){
    // if the snake bump into itself 
    for(let i=1;i<snakearr.length;i++){
        if(snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) return true;
    }
    // if snake strikes with the wall 
    if(snakearr[0].x<0 || snakearr[0].y<0 || snakearr[0].x>18 || snakearr[0].y>18) return true;
    else return false;
}
function gameFunction(){

    // Updating the snakearr
    if(isCollide(snakearr)){
        console.log("Rahul")
        gameOver.play();
        snakeMusic.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again");
        snakearr = [{x:13,y:15}];
        snakeMusic.play();
        sc = 0;
    }

    // if you have eaten the food, increment the score 
    if(snakearr[0].x === food.x && snakearr[0].y === food.y) {
        foodMusic.play();
        sc+=1;
        if(sc>highScoreVal){
            highScoreVal = sc;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highBox.innerHTML = "Highest Score: "+highScoreVal;
        }
        score.innerHTML = "Score: "+sc;
        snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};

    }

    for(let i = snakearr.length-2;i>=0;i--){
        snakearr[i+1] = {...snakearr[i]};    
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    // Display the snake
    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeELement = document.createElement('div');
        snakeELement.style.gridRowStart = e.y;
        snakeELement.style.gridColumnStart = e.x;
        console.log(e.x+" "+e.y);
        if(index === 0){
        snakeELement.classList.add('head');
        }
        else{
            snakeELement.classList.add('snakeBody');
        }
        board.appendChild(snakeELement);
        // Display the food 
        foodELement = document.createElement('div');
        foodELement.style.gridRowStart = food.y;
        foodELement.style.gridColumnStart = food.x;
        foodELement.classList.add('food');
        board.appendChild(foodELement)
    })

}

// main logic
let hScore = localStorage.getItem("highScore");
if(hScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", highScoreVal);
}
else{
    highScoreVal = hScore;
    highBox.innerHTML = "Highest Score: "+highScoreVal;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    snakeMusic.play();
    inputDir = {x:0,y:1};
    switch(e.key){
        case "ArrowUp":
            inputDir = {x:0, y:-1};
            break;
        case "ArrowDown":
            inputDir = {x:0, y:1};
            break;
        case "ArrowLeft":
            inputDir = {x:-1, y:0};
            break;
        case "ArrowRight":
            inputDir = {x:1, y:0};
            break;
        default: break;
    }
})

