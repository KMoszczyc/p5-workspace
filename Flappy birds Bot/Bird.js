class Bird {
  constructor(brain) {
this.pos = createVector(width/4,height/2);
this.vel = createVector();
this.brain = new NeuralNetwork(5,8,2);
this.gravity=0.4;
this.score=0;
this.fitness=0;
//this.maxVel=10;
if(brain instanceof NeuralNetwork) {
  this.brain=brain.copy();

} else {
  this.brain = new NeuralNetwork(5,8,2);
}
}


show() {
  stroke(255)
  fill(255,100);
  ellipse(this.pos.x,this.pos.y,40,40);
}

think(walls) {
  //find closest pipe
  let closest = null
  let closestD = Infinity;
  for(let i=0;i<walls.length;i++) {
    if(walls[i]!=null) {
    let d = walls[i].pos1.x - this.pos.x+80;
    if(d<closestD && d>0) {
      closest=walls[i];
      closestD = d;
    }
  }
  }

  let inputs = [];
  inputs[0]=this.pos.y/height;
  inputs[1]=closest.pos1.y/height;
  inputs[2]=closest.pos2.y/height;
  inputs[3]=closest.pos1.x/width;
  inputs[4]=this.vel.y/10;

  let output = this.brain.feedforward(inputs);
  if(output[1]>output[0]) this.up();
}

up() {
  this.vel.add(0,-18)
}
mutate(score) {
  this.brain.mutate(0.1,score)
}
update() {
  this.score++
this.vel.add(0,this.gravity);
this.pos.add(this.vel);


}
}
