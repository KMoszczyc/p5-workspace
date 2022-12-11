class Node {
  constructor(i,j) {
    this.x=i;
    this.y=j;
    this.gScore=0;
    this.hScore=Infinity;
    this.fScore= this.hScore+this.gScore
    this.parent=null;
    this.visited=false
    this.wall=false;
    this.start=false;
    this.end=false;
  }
  print() {
    fill(255)
    if(this.visited)
    fill(200,55,50,200)
    if(this.wall)
    fill(0)
    if(this.start)
    fill(0,255,0)
    if(this.end)
    fill(255,0,0)
    rect(this.x*w,this.y*w,w,w)
  }
}
