
function Cell(i, j) {
  this.i=i;
  this.j=j;
  this.walls=[true,true,true,true];
  this.visited=false;
  this.vis = false;
  function index(i,j) {
    if(i<0 || j<0 || i>cols-1 || j>rows-1){
      return -1;
    }
    return i+j*cols;
  }

  this.checkNeighbors = function() {
    let neighbors = [];
    var top = grid[index(i,j-1)]
    var right = grid[index(i+1,j)]
    var bottom = grid[index(i,j+1)]
    var left = grid[index(i-1,j)]
    if(top && !top.visited)
      neighbors.push(top)
    if(right && !right.visited)
      neighbors.push(right)
    if(bottom && !bottom.visited)
      neighbors.push(bottom)
    if(left && !left.visited)
      neighbors.push(left)

    if(neighbors.length>0) {
      let r = floor(random(0,neighbors.length));
      return neighbors[r];
    } else return undefined;
}
    this.highlight = function() {
      var x = this.i*w;
      var y = this.j*w;
      noStroke()
      fill(255,0,0)
      rect(x,y,w,w)

  }

  this.show = function() {
    let x=this.i*w;
    let y=this.j*w;
    stroke(255);
    strokeWeight(2);
    noFill();
    //rect(x,y,w,w)
      if(this.walls[0])
        line(x  ,y  ,x+w,y)  //top
      if(this.walls[1])
        line(x+w,y  ,x+w,y+w) //right
      if(this.walls[2])
        line(x  ,y+w,x+w,y+w) //bot
      if(this.walls[3])
        line(x  ,y  ,x  ,y+w) //left
        if(this.visited) {
          noStroke()
          fill(55,130,255,80)
          rect(x,y,w,w)
       }

  }
}
