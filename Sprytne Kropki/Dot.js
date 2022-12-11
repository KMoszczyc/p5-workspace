class Dot {
constructor() {
this.pos = createVector(width/2,height-50);
this.vel = createVector(0,0);
this.acc = createVector(0,0);
this.brain = new Brain();
this.dead=false;
this.reachedGoal=false;
this.dist=Infinity;
this.fitness=0;
this.isBest=false;
}

show() {

  if(this.isBest) {
    push()
    //fill(0,255,0);
    ellipse(this.pos.x,this.pos.y,8,8)
    pop()
  }else {
  noStroke();
  ellipse(this.pos.x,this.pos.y,4,4)
}
}

move() {
  if(this.brain.directions.length>this.brain.step) {
  this.acc=this.brain.directions[this.brain.step];
  this.brain.step++;
} else {
  this.dead = true;
}
  this.vel.add(this.acc);
  this.vel.limit(5)
  this.pos.add(this.vel);
}

update() {
  if(!this.dead && !this.reachedGoal) {
    this.move();
    this.dist = target.dist(this.pos);
    if(this.pos.x<2 || this.pos.y<2 || this.pos.x>width-2 || this.pos.y>height-2) {
      this.dead = true;
    } else if(this.dist<5) {
      this.reachedGoal=true;
    }
  }
}

calculateFitness(){
if(this.reachedGoal) {
    this.fitness=1/16 + 10000/(this.brain.step*this.brain.step)
  }else {
    this.fitness = 1/(this.dist*this.dist)
  }
}
// crossover(parent) {
//   let child = new Dot();
//   for(let i=0;i<this.brain.directions.length;i++) {
//     if(random(1)>0.5)
//     child.brain.directions.push(this.brain.directions[i]);
//     else   child.brain.directions.push(parent.brain.directions[i]);
//   }
//   return child;
// }
gimmeBaby() {
  let baby = new Dot();
  baby.brain = this.brain.clone();
  return baby;
}
}
