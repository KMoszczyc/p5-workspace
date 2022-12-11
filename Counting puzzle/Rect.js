class Rect {
  constructor(x,y,mass,velx) {
    this.pos=createVector(x,y)
    this.mass=mass
    this.w=map(this.mass,1,1000,50,100)
    this.vel=createVector(velx,0)
  }
  update() {
    this.pos.add(this.vel)
  }
  show() {
    rect(this.pos.x,this.pos.y,this.w,-this.w)
  }
  borders() {
    if(this.pos.x<10) {
    this.vel.x*=-1
    this.pos.x=10
  }
  if(this.pos.x>width-10-this.w) {
    this.vel.x*=-1
    this.pos.x=width-10-this.w
  }
  }
}
