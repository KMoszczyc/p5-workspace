class Spaceship {
constructor() {
  this.pos=createVector(width/2,height/2);
  this.vel=createVector(0,0)
  this.r=10;
  this.heading=-PI/2;
  this.boostOn=false;
  this.timeAlive=0;
  this.score=0;
  this.shootCount=0;
  this.fitness=0;
  this.bullets=[]
  this.reloadTimeLeft=0;
}

boost() {
  let force = p5.Vector.fromAngle(this.heading);
  force.mult(0.1)
  this.vel.add(force);
  this.boostOn=true;
}
update(){
  this.pos.add(this.vel);
  this.borders();
  //this.print();
  this.timeAlive++;
  if(this.reloadTimeLeft>0)
  this.reloadTimeLeft--;
}

print() {
    push()
    stroke(0,150,255)
    noFill()
    translate(this.pos.x,this.pos.y)
    rotate(this.heading+PI/2)
    triangle(-this.r,this.r,this.r,this.r,0,-this.r*5/4)
    stroke(255,255,0)
    fill(255,255,0)
    if(this.boostOn) {
        triangle(-this.r/2,this.r,this.r/2,this.r,0,this.r*2)
        this.boostOn=false;
    }
    pop()
}

borders() {
  if(this.pos.x>width+this.r*2)
  this.pos.x=-this.r*2;
  if(this.pos.x<-this.r*2)
  this.pos.x = width+this.r*2
  if(this.pos.y>height+this.r*2)
  this.pos.y=-this.r*2;
  if(this.pos.y<-this.r*2)
  this.pos.y = height+this.r*2
}
turn(angle) {
  this.heading+=angle;
}
hits(asteroid) {
  if(this.pos.dist(asteroid.pos)<asteroid.diamater/2+asteroid.diamater/10) {
  return true
} else return false;
}
}
