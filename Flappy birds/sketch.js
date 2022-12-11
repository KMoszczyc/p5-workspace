const TOTAL = 500;
let ptak;
let checkbox;

let walls=[];
let birds = [];
let bestBird;
let savedBirds=[];
let score=0;
let best=0;
let slider;
function preload() {
  ptak = loadImage('ptaszek2.png')
}

function setup() {
checkbox = createCheckbox('dont print');
createCanvas(1200,800);
slider = createSlider(1,500,1);
walls[0]= new Wall();

for(let i=0;i<TOTAL;i++) {
birds[i] = new Bird();
}
//bird = new Bird();
for(let i=1;i<4;i++) {
walls[i]=null;
}


}

function draw() {
background(50);
fill(255);
for(let n=0;n<slider.value();n++) {
for(let i=0;i<walls.length;i++) {
if(walls[i]!=null) {
if(walls[i].pos1.x==width/2) {
  if(i+1<walls.length) walls[i+1] = new Wall(width,height);
  else walls[0] = new Wall(width,height);
}
  for(let j=birds.length-1;j>=0;j--) {
    if(walls[i].hits(birds[j]) || birds[j].pos.y>height || birds[j].pos.y<0) {

    savedBirds.push(birds.splice(j,1)[0]);
  }
  }

if(walls[i].pos1.x==width/4-63) score++;
walls[i].update();
}
}
if(score>best) best=score
textSize(24)
text('SCORE: '+score,30,30);
text('BEST: '+best,30,60);
fill(150);
for (let bird of birds) {
bird.update();
bird.think(walls);
}
if(birds.length==0) {
  nextGeneration();
  score=0;
  walls[0]=new Wall();
  for(let i=1;i<4;i++) {
  walls[i]=null;
  }
}
}
//all the drawing
if(!checkbox.checked()) {
for(let wall of walls) {
  if(wall!=null) wall.show();
}
for(let bird of birds) {
bird.show();
}
}
}
//  function keyPressed() {
//      console.log('hgm')
//    if(key  === ' ') {
//    for (var i = 0; i < birds.length; i++) {
//      birds[i].up();
//   }
// }
//  }
 function keyPressed() {
   if(key === 'S') {
   let birdBrain = birds[0].brain.serialize();
   save(birdBrain,"bird.json");
   console.log(birdBrain);
   }
 }
