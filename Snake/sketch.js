let snake;
function setup() {
  createCanvas(900,600);
snake = new Snake();
}

function draw() {
  frameRate(20)
  background(0);
  snake.update();
  snake.print();


  textSize(24)
fill(255)
let score = snake.pieces.length-1
  text('SCORE: '+score,20,40)
}

function keyPressed() {
  if(keyCode===UP_ARROW && snake.pieces[0].dir.y!=size)
    snake.pieces[0].dir=createVector(0,-size);
    else if(keyCode===LEFT_ARROW && snake.pieces[0].dir.x!=size)
      snake.pieces[0].dir=createVector(-size,0);
    else if(keyCode===RIGHT_ARROW && snake.pieces[0].dir.x!=-size)
        snake.pieces[0].dir=createVector(size,0);
    else if(keyCode===DOWN_ARROW && snake.pieces[0].dir.y!=-size)
        snake.pieces[0].dir=createVector(0,size);
}
