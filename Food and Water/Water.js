class Water{
  constructor() {
  this.pos=createVector(random(width),random(height))
  this.r=random(30,50);
  }
  print() {
    noStroke()
    fill(50,100,205,100)
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)
  }
  vaporize() {
    this.r-=0.005
  }
}
class Food {
  constructor() {
  this.pos=createVector(random(width),random(height))
  this.r=10
  }
  print() {
    noStroke()
    fill(0,255,0)
    ellipse(this.pos.x,this.pos.y,this.r,this.r)
  }
}
class Poison {
  constructor() {
  this.pos=createVector(random(width),random(height))
  this.r=10
  }
  print() {
    noStroke()
    fill(255,0,0)
    ellipse(this.pos.x,this.pos.y,this.r,this.r)
  }
}
