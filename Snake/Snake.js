let size=15;
let food;
class Piece{
  constructor(x,y) {
    this.pos=createVector(x,y);
    this.lastPos=createVector(0,0)
    this.dir=createVector(0,0)
    this.eaten=false;
  }
}

class Snake {
constructor() {
  this.pieces=[]

  this.pieces.push(new Piece(width/2,height/2))

food = new Piece(floor(random(width/size))*size,floor(random(height/size))*size)
}

update() {
  //updating snek
  for(let i=this.pieces.length-1;i>=1;i--) {
    this.pieces[i].lastPos=this.pieces[i].pos.copy();
    let temp = this.pieces[i-1].pos.copy()
    this.pieces[i].pos=temp;
}
  this.pieces[0].pos.add(this.pieces[0].dir)

  //checking food
if(food.pos.x ==this.pieces[0].pos.x
  && food.pos.y ==this.pieces[0].pos.y) {
    food.pos = this.pieces[this.pieces.length-1].lastPos.copy()
    this.pieces.push(food)
    food = new Piece(floor(random(width/size))*size,floor(random(height/size))*size)
  }
  this.borders()
  this.hittingTail()
}
hittingTail() {
    for(let i=1;i<this.pieces.length;i++) {
      if(this.pieces[0].pos.x==this.pieces[i].pos.x
      && this.pieces[0].pos.y==this.pieces[i].pos.y) {
        snake = new Snake();
      }
    }
}
print() {
  fill(255)
  stroke(0)
  strokeWeight(2)
  for(let i=0;i<this.pieces.length;i++) {
  rect(this.pieces[i].pos.x,this.pieces[i].pos.y,size,size)
}
fill(255,0,0)
rect(food.pos.x,food.pos.y,size,size)
}

borders() {
  if(this.pieces[0].pos.x>width || this.pieces[0].pos.x<0
  || this.pieces[0].pos.y>height || this.pieces[0].pos.y<0) {
    snake = new Snake();
  }
}
}
