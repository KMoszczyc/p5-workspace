let player;
function setup() {
createCanvas(600,600);
player = new Player()

}

function draw() {
background(0);
constrols();
player.update()
player.print()
}

function constrols() {
  if(keyIsDown(UP_ARROW))
  player.vel.add(0,-0.5)
  if(keyIsDown(DOWN_ARROW))
  player.vel.add(0,0.5)
  if(keyIsDown(LEFT_ARROW))
  player.vel.add(-0.5,0)
  if(keyIsDown(RIGHT_ARROW))
  player.vel.add(0.5,0)
}
