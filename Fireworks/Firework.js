
class Particle {
  constructor(x,y,firework,velx,vely) {
    this.firework=firework
    this.pos=createVector(x,y)
    if(firework)
    this.vel=createVector(0,random(-17,-10))
    else {
    //  this.vel=createVector(velx,vely)
    this.vel=p5.Vector.random2D()
    this.vel.mult(random(1,8))
  }
    this.acc=createVector()
    this.gravity=createVector(0,0.2)
    this.r=5

  }
  update () {
    if(!this.firework) {
    this.vel.mult(0.96)
    this.r-=0.05
    if(this.r<=0) this.r=0
  }

    this.acc.add(this.gravity)
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }
  applyForce(force) {
    acc.add(force)
  }
  dead() {
    if(this.r<=0) return true
    else return false;
  }
  show(red,green,blue) {
    fill(red,green,blue)
    ellipse(this.pos.x,this.pos.y,this.r,this.r)
  }
}
class Firework {
  constructor() {
    this.red=random(255)
    this.green=random(255)
    this.blue=random(255)
    this.firework=new Particle(random(width),height,true)
    this.exploded=false
    this.particles=[]
  }
  update() {
    if(!this.exploded) {
    this.firework.update()
    if(this.firework.vel.y>=0) {
    this.exploded=true
    this.explode()
  }
  }
  for(let i=this.particles.length-1;i>=0;i--) {
    this.particles[i].update();
  }
  }
  show() {
    if(!this.exploded)
    this.firework.show(200,150,50)
    for(let i =0;i<this.particles.length;i++) {
      this.particles[i].show(this.red,this.green,this.blue);
      if(this.particles[i].dead())
        this.particles.splice(i,1)
    }
  }
  explode() {
    for(let i =0;i<100;i++) {
    //  var x = 16 * pow(sin(i), 3);
    //  var y = 13 * cos(i) - 5 * cos(2 * i) - 2 * cos(3 * i) - cos(4 * i);
    var x,y=0
      this.particles.push(new Particle(this.firework.pos.x,this.firework.pos.y,false,x/3,-y/3))
    }
  }
  dead() {
    if(this.exploded && this.particles.length==0) return true
    else return false;
  }
}
