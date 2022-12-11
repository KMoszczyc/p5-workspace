function getRandomSize() {
  let r = pow(random(0.4,0.8),3)
  return constrain(r*32,2,32)

  // let r = randomGaussian()*2
  // return constrain(abs(r*r),1,15)

//   while(true) {
//   let r1=random(1)
//   let r2 = random(1)
//   if(r2>r1)
//   return r1*15
// }
}
class Snowflake {
  constructor(x,y,img) {
    this.img=img
    let x1 =x || random(width)
    let y1 =y || random(-20,-10)
    this.pos=createVector(x1,y1)
    this.vel=createVector(0,3)
    this.acc=createVector()
    this.r=getRandomSize()
    this.angle=random(0,2*PI)
    this.xOff=0
    this.dir=(random(1)>0.5) ? 1 :-1
  }
  applyForce(force) {
    let f = force.copy()
    f.mult(this.r)
    this.acc.add(f)
  }
  update() {
    this.xOff=sin(this.angle*2)*this.r*2
    this.vel.add(this.acc)
    this.vel.limit(this.r*0.3)

    if(this.vel.mag()<1)
    this.vel.normalize()

    this.pos.add(this.vel)
    this.acc.mult(0)

    this.angle+=this.dir*this.vel.mag()/200
  }
  show() {
      // stroke(255)
      // strokeWeight(this.r)
      // point(this.pos.x,this.pos.y)
      push()
      translate(this.pos.x + this.xOff,this.pos.y)
      rotate(this.angle)
      imageMode(CENTER)
      image(this.img,0,0,this.r,this.r)
    pop()
  }
  borders() {
    if(this.pos.x>width + this.r)
    this.pos.x=-this.r
    if(this.pos.x<-this.r)
    this.pos.x=width + this.r
    if(this.pos.y<-this.r)
    this.pos.y=height+this.r
    if(this.pos.y>height + this.r)
    this.pos.y=-this.r
  }
}
