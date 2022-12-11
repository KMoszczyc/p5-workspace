let lines=[];
let quadTree;
let video
function setup() {
createCanvas(1300,830);
for(let i=0;i<200;i++) {
lines[i] = new Line();
}
  background(0);
video = createCapture(VIDEO)
}

function draw() {


//  fill(250,200,5,20);
//  ellipse(this.lastPos.x,this.lastPos.y,this.r,this.r);
  //background(0,40);

  for(let i=0;i<lines.length;i++) {
  lines[i].update();
    lines[i].print();
  }
    flocking();

}

function flocking() {
  let tempX=0;
  let tempY=0;
  let count=0;
  let avg;
    for(let i=0;i<lines.length;i++) {
      tempX=lines[i].vel.x;
      tempY=lines[i].vel.y;
      count=0;
          for(let j=0;j<lines.length;j++) {
            if(i!=j && lines[i].pos.dist(lines[j].pos)<lines[i].view
        &&  lines[i].pos.dist(lines[j].pos)>lines[i].view/4) {
              tempX+=lines[j].vel.x;
              tempY+=lines[j].vel.y;
              count++;
          }
        }
        if(count>0) {
        avg = createVector(tempX/count,tempY/count);
        lines[i].acc.add(avg.sub(lines[i].vel).mult(0.1))
        lines[i].vel.add(lines[i].acc);
        //lines[i].borders()
      }
    }
  }
