var w=20;
let rows;
let cols;
var grid=[];
let savedGrid=[];
let current;
let stack =[];
let slider;
function setup() {
createCanvas(1200,800);
cols = floor(width/w);
rows = floor(height/w);

for(let i=0;i<rows;i++) {
  for(let j=0;j<cols;j++) {
    let cell = new Cell(j,i);
    grid.push(cell)
}
}
current = grid[0];
slider = createSlider(1,100,1)
//generateMaze();

//saveJSON(grid,'maze.json')

}

function draw() {
background(50);
for(let s=0;s<slider.value();s++) {
generateMaze();
}
for(let i=0;i<grid.length;i++) {
  grid[i].show();
}

}


function generateMaze() {
//  for(let i=0;i<15000;i++) {
  current.visited=true;
  current.highlight();
  let next = current.checkNeighbors();
  if(next) {
    next.visited=true;
    stack.push(current);
    removeWalls(current,next);
    current = next;
  } else if(stack.length>0) {
    current = stack.pop();
  }
//}
}

function removeWalls(a,b) {
  var x = a.i - b.i;
  var y = a.j - b.j
  if(x==1) {
    a.walls[3]=false;
    b.walls[1]=false;
  } else if(x==-1) {
    a.walls[1]=false;
    b.walls[3]=false;
  }
  if(y==1) {
    a.walls[0]=false;
    b.walls[2]=false;
  } else if(y==-1) {
    a.walls[2]=false;
    b.walls[0]=false;
  }
}
