let balls=[];

let quantity=2000;
function setup() {
createCanvas(1000,800);
for(let i =0;i<quantity;i++) {
balls[i] = new Ball()
}
}

function draw() {
background(20);
if(mouseIsPressed) {
  for(let i =0;i<balls.length;i++) {
  let v1 = createVector(balls[i].pos.x-mouseX, balls[i].pos.y-mouseY)
  v1.normalize();
  balls[i].acc.add(v1)
}
}
for(let i =0;i<balls.length;i++) {
balls[i].update();
balls[i].print();
}

}
