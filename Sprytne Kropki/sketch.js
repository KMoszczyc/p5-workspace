let test;
let populations=[]
let target
let deadCount=0;
let obstacles=[];
let circles=[]
let box;
let slider;
let obstacle;
let mutationRate;
let count=0;

function setup() {
createCanvas(1000,800);
//test = new Population(500);
for(let i=0;i<5;i++) {
  populations[i]= new Population(100);
}
console.log(populations)
target = createVector(width/2,10)
slider = createSlider(1,50,1);
mutationRate = createSlider(1,50,1);
box = createCheckbox('start')
box.checked(false)

}

function draw() {

background(0);
fill(255,0,0)
ellipse(target.x,target.y,10,10)

for(let i=0;i<slider.value();i++) {
  for(let i=0;i<populations.length;i++) {
if(populations[i].allDotsDead()) {

  populations[i].calculateFitness();
  populations[i].naturalSelection(0.2);
  populations[i].mutateDemBabies(mutationRate.value()/200,1)

}else {

  for(let obs of obstacles) {
    obs.hits();
    obs.show()
  }
  for(let c of circles) {
    c.hits();
    c.show()
  }
  if(box.checked())
populations[i].update();
}
}
}
for(let i=0;i<populations.length;i++) {
if(i==0) {
fill(255)
text(populations[0].minstep,20,20)
}
if(i==1){
fill(100,100,0)
text(populations[1].minstep,20,40)
}
if(i==2) {
fill(0,100,200)
text(populations[2].minstep,20,60)
}
if(i==3) {
fill(150,50,100)
text(populations[3].minstep,20,80)
}
if(i==4){
fill(200,100,50)
text(populations[4].minstep,20,100)
}
populations[i].show();
}


if(obstacle!=null) {
  let v = createVector(obstacle.x1,obstacle.y1)
  let m = createVector(mouseX,mouseY)
  let angle = -m.sub(v).heading()
  obstacle.angle=angle;
  obstacle.x2=dist(mouseX,mouseY,obstacle.x1,obstacle.y1)
  obstacle.show();
}

}

function keyTyped() {
  if(count==1 && key===  ' ') {
  obstacles.push(obstacle)
  count=-1;
  obstacle=null;
}
  if(count==0  && key=== ' ') {
  obstacle = new Obstacle(mouseX,mouseY,200,20,0,populations)
}
count++;
}
