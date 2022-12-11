class Player {
  constructor() {
    this.pos=createVector(width/2,height/2)
    this.vel=createVector()
    this.r=5;
    this.view=PI/4
  }
  update() {
    this.pos.add(this.vel)
    this.vel.mult(0.95)
  }
  print() {
    stroke(255)
    line(this.pos.x,this.pos.y,mouseX,mouseY)
    //line(this.pos.x,this.pos.y,mouseX+10,mouseY+10)
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)
    fill(200,200,30)
    let v = createVector(mouseX-this.pos.x,mouseY-this.pos.y)
    let angle = v.heading()
    let d = dist(this.pos.x,this.pos.y,mouseX,mouseY)
    console.log(d)
    triangle(this.pos.x,this.pos.y,this.pos.x+ d*cos(angle+this.view/2),this.pos.y+d*sin(angle+this.view/2)
  ,this.pos.x+ d*cos(angle-this.view/2),this.pos.y+d*sin(angle-this.view/2))

  }
}
