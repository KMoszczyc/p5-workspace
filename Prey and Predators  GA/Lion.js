class Lion {
  constructor() {
    this.pos=createVector(random(width),random(height))
    this.vel=createVector();
    this.acc=createVector();
    this.closestZebraIndex=-1;
    this.energy=100;
    this.restingTime=0;
    this.huntR=random(200,300);
    this.maxVel=5
  }
  eat() {
    if(zebras[this.closestZebraIndex].pos.dist(this.pos)<20
    && zebras[this.closestZebraIndex].dead==false) {
      zebras[this.closestZebraIndex].dead=true;
      fill(255,0,0,50)
      noStroke()
      ellipse(zebras[this.closestZebraIndex].pos.x,zebras[this.closestZebraIndex].pos.y,40,40)
    }
  }
  update() {

      if(this.closestZebraIndex!=-1 && this.pos.dist(zebras[this.closestZebraIndex].pos)<this.huntR && this.restingTime==0) {
      let temp = zebras[this.closestZebraIndex].pos.copy();
      this.acc =  temp.sub(this.pos).normalize();
      this.acc.mult(0.1)

    } else this.vel.mult(0.95)

    this.vel.add(this.acc)
    this.acc.mult(0)
    this.vel.limit(this.maxVel)
    this.pos.add(this.vel)

    if(this.vel.mag()>1 && this.energy>0)
    this.energy-=this.vel.mag()/20
    else if(this.energy<100) this.energy+=0.2

    if(this.energy<1)
    this.restingTime=500
    if(this.restingTime>0)
    this.restingTime--;
    this.borders()
    this.eat();
    this.print();
  }

  print() {
    image(lew,this.pos.x-17,this.pos.y-17)
    stroke(0,255,0)
    strokeWeight(2)
    if(this.energy>0)
    line(this.pos.x-15,this.pos.y-20,this.pos.x-15+this.energy/3.3,this.pos.y-20)
    noFill()
    // stroke(255,0,0)
    // ellipse(this.pos.x,this.pos.y,this.huntR*2,this.huntR*2)
  }
  borders() {
    if(this.pos.x<-5)
    this.pos.x = width+5
    if(this.pos.y<-5)
    this.pos.y = height+5
    if(this.pos.x>width+5)
    this.pos.x = -5
    if(this.pos.y>height+5)
    this.pos.y = -5
  }
}
