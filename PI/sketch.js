let points=[]
let pi;
let number=0;
let countCircle=0;
function setup() {
createCanvas(600,600);

}

function draw() {
background(0);
translate(width/2,height/2)
fill(0,255,0);
for(let j=0;j<200;j++) {
 points[number]=new Point();
 number++;
}
for(let i=0;i<points.length;i++) {
  if(Math.sqrt(points[i].x*points[i].x + points[i].y*points[i].y)>width/2) {
   fill(255,0,0)
 }
   else {
     fill(0,255,0)
     countCircle++;
   }
  ellipse(points[i].x,points[i].y,2,2);
}

pi=4*countCircle/number;
console.log(pi);
countCircle=0;
}
