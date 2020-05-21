//TODO - Automate the game.
// Build a bot, that will play the game on its own
// Idea - as soon  as the ball hits the brick, calculate the location of the ball or the wall, its direction of projection and 
// move the paddle accordingly.



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 10, paddleWidth = 950;
var paddleX = (canvas.width-paddleWidth) / 2;

var rightPressed = false, leftPressed = false;

var x = canvas.width / 2,  y = canvas.height - 30; //position of balls throughout the game
var dx = 1, dy = -1;

var radiusOfBall = 11, score = 0;

var brickRowCount = 4, brickColumnCount = 10, brickWidth = 60, brickHeight = 30, brickColumnOffset = 30, brickRowOffset = 40; 

var bricks = [];
for(var c=0; c<brickRowCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickColumnCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
var interval = setInterval(draw, 5);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScoreBoard();

    if (x == canvas.width - radiusOfBall || x == radiusOfBall) {
        dx = (-1) * dx;
    }

    if(x >= paddleX && x <=paddleX+paddleWidth && y >= canvas.height-paddleHeight-radiusOfBall && y <= canvas.height){
        dy = (-1) * dy;
    } 
    
    if(y-radiusOfBall>canvas.height){
      //  alert('GAME.... OVER');
      // alert('Loser Nigga');
       // document.location.reload();
        clearInterval(interval);
    }

    if (y == radiusOfBall) {
        dy = (-1) * dy;
    }


    if(rightPressed && !(paddleX>canvas.width-paddleWidth)) {
        paddleX += 2;
    }
    if(leftPressed && !(paddleX<0)) {
        paddleX -= 2;
    }

    collisionDetection();

    x += dx;
    y += dy;
}

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight" ){
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight" ){
        rightPressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, radiusOfBall, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    let y = brickRowOffset;
    for (let i = 0; i < brickRowCount; i++) {
        let x = brickColumnOffset + brickColumnOffset/2;

        for (let j = 0; j < brickColumnCount; j++) {
           
            if(bricks[i][j].status){
                bricks[i][j].x = x;
                bricks[i][j].y = y;
                ctx.beginPath();
                ctx.rect(x, y, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            x += brickColumnOffset + brickWidth;
        }
        y += brickRowOffset+brickHeight;
    }
}

function collisionDetection(){
    for(var c = 0; c<brickRowCount;c++){
        for(var r=0; r<brickColumnCount;r++){
            var b = bricks[c][r];
            if(b.status && x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                dy *= -1;
                b.status = 0;
                score++;
                if(score == brickColumnCount*brickRowCount){
                    alert('YOU WIN, NIGGA');
                    document.location.reload();
                    clearInterval(interval);
                }
            }
        }
    }
}

function drawScoreBoard(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20)
}


//#region comment
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "black";
// ctx.stroke();
// ctx.closePath();
//#endregion 
