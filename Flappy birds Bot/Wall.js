class Wall {
  constructor() {
let hi = random(-200,200)+height/2;
this.pos1 = createVector(width,hi-80);
this.pos2 = createVector(width,hi+80);
}
hits(bird) {

  if(this.pos1.x<=width/4+20 && this.pos1.x>=width/4-80 &&
  (this.pos1.y>=bird.pos.y-20 || this.pos2.y<=bird.pos.y+20)) {
      // for(let i=1;i<4;i++) {
      // this[i]=null;
      // }
      // this[0]= new Wall(width,height);
      // score=0;
      // bird = new Bird();
  return true;
  }
  return false;
}
show() {
  fill(255)
  rect(this.pos1.x,0,60,this.pos1.y);
  rect(this.pos2.x,this.pos2.y,60,height);
}
 update() {
this.pos1.add(-3,0);
this.pos2.add(-3,0);
}
}
