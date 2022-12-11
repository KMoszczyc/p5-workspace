class Ball {
  constructor() {
    this.pos = createVector(random(width),random(height))
    this.vel = createVector(random(-10,10),random(-10,10));
    this.acc = createVector();
    this.gravity=0.65;
    this.r=1;
    this.friction=0.8;
  }
  update() {
    this.acc.y+=this.gravity
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.borders()
    this.acc.mult(0)
  }

  print() {
     fill(100)
     stroke(255)
     ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)

  }
  borders() {
    if(this.pos.x>=width-this.r) {
      this.vel.x=-this.vel.x
      this.vel.mult(this.friction)
      this.pos.x=width-this.r
    }
    if(this.pos.x<=this.r) {
      this.vel.x=-this.vel.x
      this.vel.mult(this.friction)
      this.pos.x=this.r
    }
    if(this.pos.y>=height-this.r) {
      this.vel.y=-this.vel.y
      this.vel.mult(this.friction)
      this.pos.y=height-this.r
      }
    if(this.pos.y<=this.r) {
        this.vel.y=-this.vel.y
        this.vel.mult(this.friction)
        this.pos.y=this.r
        }
}

}
