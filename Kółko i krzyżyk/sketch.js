let count=0;
let tab=[];
let button;
function setup() {
  createCanvas(800,600);
tab = [
  [-1,-1,-1],
  [-1,-1,-1],
  [-1,-1,-1],
]
button = createButton('reset')
button.position(20,height+20);
button.mousePressed(reset)
}

function draw() {
  background(50)
drawTable()
drawLines()
}

function reset() {
  count=0
  for(let i=0;i<tab.length;i++) {
    for(let j=0;j<tab[i].length;j++) {
      tab[i][j]=-1;
    }
  }
}

function drawTable() {
  for(let i=0;i<tab.length;i++) {
    for(let j=0;j<tab[i].length;j++) {
      if(tab[i][j]==0)
      drawEllipse(j,i)
      if(tab[i][j]==1)
      drawCross(j,i)
  }
}
}
function drawCross(x,y) {
  let x1 = x*200+100;
  let y1 = y*200+100;
  stroke(255)
  strokeWeight(20)
  line(x1,y1,x1+50,y1+50)
  line(x1,y1,x1-50,y1+50)
  line(x1,y1,x1+50,y1-50)
  line(x1,y1,x1-50,y1-50)
}
function drawEllipse(x,y) {
  let x1 = x*200+100;
  let y1 = y*200+100;
  stroke(255)
  strokeWeight(20)
  noFill()
  ellipse(x1,y1,100,100)
}
function drawLines() {
  stroke(255)
  strokeWeight(20)
  line(200,0,200,600)
  line(400,0,400,600)
  line(0,200,600,200)
  line(0,400,600,400)
}
function mousePressed() {
  //parzysty - kólko, nieprzarzysty - krzyżyk
  let temp=-1;
  if(count%2==0)
  temp=0
  else temp=1

if(mouseX<200) {
  if(mouseY<200)
    tab[0][0]=temp
    else if(mouseY<400)
      tab[1][0]=temp
      else if(mouseY<600)
        tab[2][0]=temp
}
else if(mouseX<400) {
  if(mouseY<200)
    tab[0][1]=temp
    else if(mouseY<400)
      tab[1][1]=temp
      else if(mouseY<600)
        tab[2][1]=temp
}
else if(mouseX<600) {
  if(mouseY<200)
    tab[0][2]=temp
    else if(mouseY<400)
      tab[1][2]=temp
      else if(mouseY<600)
        tab[2][2]=temp
}
count++;
}
