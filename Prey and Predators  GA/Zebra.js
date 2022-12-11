class Zebra {
  constructor() {
    this.pos=createVector(random(width),random(height))
    this.vel=createVector();
    this.acc=createVector();
    this.closestLion=null;
    this.energy=100;
    this.escapeR=random(100,200);
    this.maxVel=5
    this.dead=false;
  }
  update() {
    if(this.pos.dist(this.closestLion.pos)<this.escapeR &&this.energy>1 && this.dead==false) {
      let temp = this.pos.copy()
      this.acc =  temp.sub(this.closestLion.pos).normalize();
      this.acc.mult(0.1)
    } else this.vel.mult(0.95)

    this.vel.add(this.acc)
    this.acc.mult(0)
    this.vel.limit(this.maxVel)
    this.pos.add(this.vel)

    if(this.vel.mag()>0.7 && this.energy>0)
    this.energy-=this.vel.mag()/20
    else if(this.energy<100) this.energy+=0.1
    this.borders()
    this.print()
  }
  print() {
    image(konik,this.pos.x-15,this.pos.y-20)
    stroke(0,255,0)
    strokeWeight(2)
    if(this.energy>0)
    line(this.pos.x-15,this.pos.y-20,this.pos.x-15+this.energy/3.3,this.pos.y-20)
    // noFill()
    // ellipse(this.pos.x,this.pos.y,this.escapeR*2,this.escapeR*2)
  }
  borders() {
    if(this.pos.x<0)
    this.pos.x = width
    if(this.pos.y<0)
    this.pos.y = height
    if(this.pos.x>width)
    this.pos.x = 0
    if(this.pos.y>height)
    this.pos.y = 0
  }
}
