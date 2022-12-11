class Obstacle {
  constructor(x1,y1,x2,y2,angle,pop) {
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.angle=angle;
    this.pop=pop;
  }
hits() {

for(let j=0;j<this.pop.length;j++) {
  for(let i=0;i<this.pop[j].dots.length;i++) {
  let x = cos(this.angle)*(this.pop[j].dots[i].pos.x - this.x1) - sin(this.angle)*(this.pop[j].dots[i].pos.y- this.y1) + this.x1
  let y = sin(this.angle)*(this.pop[j].dots[i].pos.x - this.x1) + cos(this.angle)*(this.pop[j].dots[i].pos.y- this.y1)+  this.y1
    if(x<this.x1 + this.x2 && x>this.x1 && y<this.y1 + this.y2 && y>this.y1) {
        this.pop[j].dots[i].dead=true;
      }
  }
}
}
  show() {
    push()
    translate(this.x1,this.y1 )
    rotate(-this.angle)
    fill(0,50,255,150)
    rect(0,0,this.x2,this.y2)
    pop()
  }
}

class Circle {
  constructor(x,y,r,pop) {
  this.pos=createVector(x,y);
  this.r=r;
  this.pop=pop;
}
hits() {
  for(let i=0;i<this.pop.dots.length;i++) {
    if(this.pop.dots[i].pos.dist(this.pos)<this.r/2) {
        this.pop.dots[i].dead=true;
      }
  }
}
  show() {
    fill(0,50,255,150)
  ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }
}
