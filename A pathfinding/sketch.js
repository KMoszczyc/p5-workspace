let w=40;
let openset=[]
let closedset=[]
let start;
let end
function setup() {
  createCanvas(1200, 800);
  for(let i =0;i<width/w;i++) {
    openset[i]=[]
    for(let j =0;j<height/w;j++) {
      openset[i][j]=new Node(i,j)
      if(i==0 || i==width/w-1 || j==0 || j==height/w-1)
      openset[i][j].wall=true;
}
}
start = new Node(2,2)
end= new Node(23,15)
openset[start.x][start.y].start=true;
openset[end.x][end.y].end=true;

}

function draw() {
  background(0);
  show()
  pathfinding()
}

function show() {
  for(let i =0;i<width/w;i++) {
    for(let j =0;j<height/w;j++) {
      let inside =  mouseX>i*w && mouseX<(i+1)*w && mouseY>j*w && mouseY<(j+1)*w
      if(mouseIsPressed){
      if(mouseButton=== LEFT &&inside)
      openset[i][j].wall=true
      if(mouseButton=== RIGHT && inside)
      openset[i][j].wall=false
    }
      openset[i][j].print()
}
}
}

function pathfinding() {
let gScore=0;
  while(openset!=[]) {
  let x=new Node(start.x,start.y);
  let lowestFscore=Infinity
  for(let i =0;i<width/w;i++) {
    for(let j =0;j<height/w;j++) {
      if(openset[i][j].wall==false && openset[i][j].fScore<lowestFscore){
        x=openset[i][j];
        lowestFscore=openset[i][j].fScore
      }
    }
  }
  if(x.x==end.x && x.y == end.y)
   drawPath()
openset[x.x][x.y].visited=true;

}
}
