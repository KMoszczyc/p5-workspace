class Asteroid {
  constructor() {
    this.diamater=random(15,150);
    this.pos=createVector(random(width),random(height));
    while(this.pos.x>width/2-100 && this.pos.x<width/2+100 || this.pos.y>height/2-100 && this.pos.y<height/2+100)
        this.pos=createVector(random(width),random(height));
        
    let angle = random()*2*PI
    let randomSpeed=random()+1;
    this.vel=p5.Vector.fromAngle(angle)
    this.vel.mult(randomSpeed)
    this.dead=false;
  }

  update() {
    this.pos.add(this.vel);
    this.borders();
    //this.print();
  }

  borders() {
    if(this.pos.x>width+this.diamater)
        this.pos.x=-this.diamater;
    if(this.pos.x<-this.diamater)
        this.pos.x = width+this.diamater
    if(this.pos.y>height+this.diamater)
        this.pos.y=-this.diamater;
    if(this.pos.y<-this.diamater)
        this.pos.y = height+this.diamater
  }

  print() {
    noFill()
    stroke(255)
  ellipse(this.pos.x,this.pos.y,this.diamater,this.diamater);
  }
}
