let particle;
snowflake=[]
function setup() {
createCanvas(600,600);
//fullScreen()
particle = new Particle(width/2,random(30))

}

function draw() {
  translate(width/2,height/2)
background(0);
rotate(PI/6)

while(!particle.finished() && !particle.hits()) {
particle.update()
}

  snowflake.push(particle)
  particle = new Particle(width/2,0)


for(let i=0;i<6;i++) {
  rotate(PI/3)
  particle.print()
  for(let p of snowflake)
  p.print()

  push()
  scale(1,-1)
  particle.print();
  for(let p of snowflake)
  p.print()
  pop()
}
}
