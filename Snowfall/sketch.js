let snow=[]
let gravity;
let textures=[]
let zOff=0

let spritesheet
function preload() {
  spritesheet=loadImage('flakes32.png')
}
function setup() {
createCanvas(1000,800);
gravity = createVector(0,0.01)


for(let i =0;i<spritesheet.width;i+=32) {
  for(let j =0;j<spritesheet.height;j+=32) {
    let img = spritesheet.get(i,j,32,32)
    image(img,i,j)
    textures.push(img)
  }
}
for(let i =0;i<700;i++) {
let design = random(textures);
snow.push(new Snowflake(random(width),random(height),design))
}
}

function draw() {
background(0)


zOff+=0.02
for(flake of snow) {
  let xOff=flake.pos.x/width
  let yOff=flake.pos.y/height
  let wAngle = noise(xOff,yOff,zOff)*2*PI
  let wind = p5.Vector.fromAngle(wAngle)
  wind.mult(0.01)


  flake.applyForce(gravity)
  flake.applyForce(wind)
  flake.update()
  flake.show();
  flake.borders()
}

}
