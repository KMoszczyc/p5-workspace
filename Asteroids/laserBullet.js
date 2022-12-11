class laserBullet {
  constructor(ship) {
    this.pos=createVector(ship.pos.x,ship.pos.y)
    this.vel=p5.Vector.fromAngle(ship.heading);
    this.vel.mult(10)
  }
  update() {
    this.pos.add(this.vel)
    //this.print();
  }
  print() {
    stroke(105,105,255)
    strokeWeight(3)
    line(this.pos.x,this.pos.y,this.pos.x+this.vel.x*2,this.pos.y+this.vel.y*2)
    strokeWeight(1)
  }
  hits(asteroid) {
    let temp=createVector(0,0)
    temp.add(this.pos)
    if(temp.dist(asteroid.pos)<asteroid.diamater/2) {
      score++;
    return true
  }
    temp.add(this.vel)
    if(temp.dist(asteroid.pos)<asteroid.diamater/2) {
      score++;
    return true
  }

    temp.add(this.vel)
    if(temp.dist(asteroid.pos)<asteroid.diamater/2) {
      score++;
    return true
  }
    else return false;
  }
}
