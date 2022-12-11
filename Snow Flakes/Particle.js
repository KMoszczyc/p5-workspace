class Particle {
  constructor(x1,y1) {
   this.pos = createVector(x1,y1);
    this.r=2
  }
  update() {
    this.pos.x-=1
    this.pos.y+=random(-2,2);

    let angle = this.pos.heading()
    angle = constrain(angle,0,PI/6)
    let mag = this.pos.mag();
    this.pos  = p5.Vector.fromAngle(angle)
    this.pos.setMag(mag)
  }
  print() {
    fill(255)
    stroke(255)
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)
  }
  hits() {
    let result=false
    for(let p of snowflake) {
      if(dist(p.pos.x,p.pos.y,this.pos.x,this.pos.y)<this.r*2){
      result  = true;
      break;
    }
    }
    return result
  }
  finished() {
    return this.pos.x<1
  }
}
