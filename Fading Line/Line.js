

class Line {
  constructor() {
    this.pos=createVector(random(width),random(height));
    this.vel=createVector(random(-3,3),random(-3,3));
    this.acc=createVector();
    this.view=50;
    this.r=8;
    this.lastPos=this.pos.copy()
    this.col=color(random(255),random(255),random(255))
  }
  update(){
    this.lastPos=this.pos.copy()
    //this.acc=p5.Vector.random2D()
    this.vel.rotate(random(-0.2,0.2))
    this.vel.mult(1-random(-0.01,0.01))
    if(this.vel.mag()<3)
    this.vel.mult(1.1)
    this.borders();;
    this.vel.add(this.acc);
    this.vel.limit(4)
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  print() {
    noStroke();

    fill(0)
    ellipse(this.lastPos.x,this.lastPos.y,this.r+1,this.r+1);
    fill(this.col.levels[0],this.col.levels[1],this.col.levels[2],30);
    ellipse(this.lastPos.x,this.lastPos.y,this.r+1,this.r+1);
    fill(this.col);
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }
  borders() {

    if(this.pos.x>width)
    this.pos.x=0;
    if(this.pos.x<0)
    this.pos.x=width;
    if(this.pos.y>height)
    this.pos.y=0;
    if(this.pos.y<0)
    this.pos.y=height;

    let mousePos = createVector(mouseX,mouseY);
    if(mousePos.dist(this.pos)<100) {
      let force = (1-mousePos.dist(this.pos))/100;
      this.acc.add(mousePos.sub(this.pos).mult(force/200));
    }
  }
  }
