class Animal {
  constructor() {
    this.vel=createVector();
    this.pos=createVector(width/2,height/2);
    this.acc=createVector()
    this.r=7;
    this.fed=0.5;
    this.hydration=0.5;
    this.poisoning=0;
    this.dead=false;
    this.score=0
    //pole widzenia
    this.foodView=random(20,100)
    this.poisonView=random(20,100)
    this.waterView=random(20,100)
    //force
    this.foodForce=random(-0.1,0.1)
    this.poisonForce=random(-0.1,0.1)
    this.waterForce=random(-0.1,0.1)

    this.health=1;
    this.maxVel=3;
  }

update() {
  //steering
  //closest food
  let closestFoodDist=Infinity
  let closestFoodIndex=-1;
  for(let i=0;i<food.length;i++) {
    if(this.pos.dist(food[i].pos)<closestFoodDist) {
    closestFoodDist=this.pos.dist(food[i].pos)
    closestFoodIndex=i;
  }
  }
  //closest poison
  let closestPoisonDist=Infinity
  let closestPoisonIndex=-1;
  for(let i=0;i<poison.length;i++) {
    if(this.pos.dist(poison[i].pos)<closestPoisonDist) {
    closestPoisonDist=this.pos.dist(poison[i].pos)
    closestPoisonIndex=i;
  }
  }
  //closest water
  let closestWaterDist=Infinity
  let closestWaterIndex=-1;
  for(let i=0;i<water.length;i++) {
    if(this.pos.dist(water[i].pos)<closestWaterDist) {
    closestWaterDist=this.pos.dist(water[i].pos)
    closestWaterIndex=i;
  }
}
  if(closestPoisonDist<this.poisonView) {

    let a = poison[closestPoisonIndex].pos.copy()
    a.sub(this.pos)
    a.normalize()
    a.mult(this.poisonForce)
    this.acc.add(a);
  }
   if(closestFoodDist<this.foodView) {
    let b = food[closestFoodIndex].pos.copy()
    b.sub(this.pos)
    b.normalize()
    b.mult(this.foodForce)
    //this.acc.mult(0);
    this.acc.add(b);
  }
   if(closestWaterDist<this.waterView+water[closestWaterIndex].r) {
    let c = water[closestWaterIndex].pos.copy()
    c.sub(this.pos)
    c.normalize()
    c.mult(this.waterForce)
  //  this.acc.mult(0);
    this.acc.add(c);
  }

  this.vel.add(this.acc)
  this.vel.limit(this.maxVel)
  this.pos.add(this.vel)
  this.vel.mult(0.999)
  this.acc.mult(0)

  //boundries, food, poison, water
  if(this.fed<0)
  this.fed=0
  if(this.fed>1)
  this.fed=1;
  if(this.hydration<0)
  this.hydration=0
  if(this.hydration>1)
  this.hydration=1
  if(this.poisoning<0)
  this.poisoning=0;
  if(this.poisoning>1)
  this.poisoning=1;
  if(this.health>1)
  this.health=1

  if(this.fed==0 || this.hydration==0 || this.poisoning==1)
  this.health-=0.001
  if(this.health<0) {
  this.health=0
  this.dead=true;
}
  if(this.fed>0.7 && this.hydration>0.7) {
  this.poisoning-=0.001;
  this.health+=0.001
}
  if(this.score>5 && this.hydration>0.5 && this.fed>0.5 && this.poisoning<0.5) {
    this.reproduce();
    this.hydration=0.5
    this.fed=0.5;
  }
  this.fed-=0.0005
  this.hydration-=0.0005
  this.borders()
  this.eat()
  this.drink()
}

print() {
  push()
  translate(this.pos.x,this.pos.y)
  let heading = this.vel.heading()
  rotate(heading+PI/2)
  noStroke()
  let a = 1-this.health;
  fill(255*a,255*this.health,0)
  triangle(-this.r,this.r,this.r,this.r,0,-this.r*4/3)
  pop()
}
printStats() {
  strokeWeight(3)
  stroke(0,255,0)
  if(this.fed>0)
  line(this.pos.x-10,this.pos.y-20,this.pos.x-10+20*this.fed,this.pos.y-20)
  stroke(255,0,0)
  if(this.poisoning>0)
  line(this.pos.x-10,this.pos.y-15,this.pos.x-10+20*this.poisoning,this.pos.y-15)
  stroke(100,100,255)
  if(this.hydration>0)
  line(this.pos.x-10,this.pos.y-10,this.pos.x-10+20*this.hydration,this.pos.y-10)
}
printView() {
  noFill()
  strokeWeight(1)
  stroke(0,255,0)
  ellipse(this.pos.x,this.pos.y,this.foodView*2,this.foodView*2)
  stroke(255,0,0)
  ellipse(this.pos.x,this.pos.y,this.poisonView*2,this.poisonView*2)
  stroke(50,100,255)
  ellipse(this.pos.x,this.pos.y,this.waterView*2,this.waterView*2)
}
printForce() {
  let tempVel = this.vel.copy()
  tempVel.normalize();
  tempVel.mult(this.foodForce)
  tempVel.mult(100)
  let x = tempVel.x + this.pos.x;
  let y = tempVel.y + this.pos.y;

  noFill()
  strokeWeight(3)
  stroke(0,255,0)
  line(this.pos.x,this.pos.y,x,y)

  // strokeWeight(3)
  // stroke(255,0,0)
  // line(this.pos.x,this.pos.y,this.pos.x + tempVel.x,this.pos.y + tempVel.y)


}

borders() {
  if(this.pos.x>width+5)
  this.pos.x=-5;

  if(this.pos.x<-5)
  this.pos.x=width+5;

  if(this.pos.y<-5)
  this.pos.y=height+5;

  if(this.pos.y>height+5)
  this.pos.y=-5;
}

eat() {
  for(let i=0;i<food.length;i++) {
    if(this.pos.dist(food[i].pos)<food[i].r/2) {
      if(this.fed<1) {
      this.fed+=0.1
      this.score++;
      food.splice(i,1)
    }
  }
  }
  for(let i=0;i<poison.length;i++) {
    if(this.pos.dist(poison[i].pos)<poison[i].r*2/3) {
    this.poisoning+=0.3
    poison.splice(i,1)
  }
  }

}

drink() {
  for(let i=0;i<water.length;i++) {
  if(this.pos.dist(water[i].pos)<water[i].r) {
    if(this.hydration+0.1<1) {
      this.hydration+=0.1
      water[i].r-=0.5
}
}
}
}
reproduce() {
  let child = new Animal();
  child.pos = this.pos.copy();
  child.foodView =this.foodView +random(-20,20)
  child.poisonView = this.poisonView +random(-20,20)
  child.waterView=  this.waterView+random(-20,20)
  //force
  child.foodForce= this.foodForce+random(-0.05,0.05)
  child.poisonForce= this.poisonForce+random(-0.05,0.05)
  child.waterForce= this.waterForce+random(-0.05,0.05)
  animals.push(child)
}


}
