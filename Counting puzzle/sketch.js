let square1;
let square2
function setup() {
createCanvas(1000,800);
square1 = new Rect(width/4,height-100,1,0)
square2 = new Rect(width/2,height-100,2,2)
}

function draw() {
background(0)
for(let i=0;i<100;i++) {
square1.borders()
square2.borders()
}
noStroke()
square1.update()

fill(50)
square1.show()
square2.update()
fill(10,10,250)
square2.show()
collision(square1,square2)
strokeWeight(2)
stroke(255)
line(10,0,10,height-100)
line(width-10,0,width-10,height-100)
line(10,height-100,width-10,height-100)
}

function collision(s1,s2) {
  let distance = s1.pos.dist(s2.pos)
  if(distance<s1.w || distance <s2.w) {
    console.log('collision!')
    let 
    if(s2.vel.x*s2.mass>)
    s1.vel.x=-s2.vel.x*s2.mass/s1.mass
    s2.vel.x=-s1.vel.x*s1.mass/s2.mass
  }

}
