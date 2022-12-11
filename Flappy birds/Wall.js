class Wall {
  constructor() {
let hi = random(-300,300)+height/2;
this.gapHeight=80;
this.gapWidth=60;
this.pos1 = createVector(width,hi-this.gapHeight);
this.pos2 = createVector(width,hi+this.gapHeight);
}
hits(bird) {
  if(this.pos1.x<=width/4+20 && this.pos1.x>=width/4-this.gapWidth-20 &&
  (this.pos1.y>=bird.pos.y-20 || this.pos2.y<=bird.pos.y+20)) {
  return true;
  }
  return false;
}
show() {
  fill(255)
  rect(this.pos1.x,0,this.gapWidth,this.pos1.y);
  rect(this.pos2.x,this.pos2.y,this.gapWidth,height);
}
 update() {
this.pos1.add(-3,0);
this.pos2.add(-3,0);
}
}
