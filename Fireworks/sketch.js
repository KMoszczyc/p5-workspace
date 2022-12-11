
let fireworks=[];
function setup() {
createCanvas(1000,800);
fireworks.push(new Firework)
}

function draw() {
background(0,30)
if(random(1)<0.1)
fireworks.push(new Firework)
for(let i=fireworks.length-1;i>=0;i--) {
fireworks[i].update()
fireworks[i].show()
if(fireworks[i].dead())
fireworks.splice(i,1)
}
}
