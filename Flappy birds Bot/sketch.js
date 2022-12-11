
let walls=[];

let bird;
let score=0;
let best=0;
let slider;
let brainJSON;
let birdBrain;
function preload() {
//  brainJSON = loadJSON("bestBird.json");
  brainJSON = loadJSON("ptak.json");
  console.log(brainJSON)
}

function setup() {
createCanvas(1200,800);
slider = createSlider(1,300,1);
walls[0]= new Wall();
console.log('alalal')
 birdBrain = NeuralNetwork.deserialize(brainJSON);
console.log('jejej')

bird = new Bird(birdBrain);
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

  //   if(walls[i].hits(bird) || bird.pos.y>height || bird.pos.y<0) {
  //  bird= null;
  // }
  // }
if(walls[i].hits(bird)) {
score=0
  console.log('collision')
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

if(bird==null) {
  score=0;
  walls[0]=new Wall();
  for(let i=1;i<4;i++) {
  walls[i]=null;
  }
}

bird.update();
bird.think(walls);

//all the drawing
for(let wall of walls) {
  if(wall!=null) wall.show();
}
bird.show();

}
}
// function keyPressed() {
//   if(key  === ' ')
//   for (var i = 0; i < birds.length; i++) {
//     birds[i].up();
//   }
// }
