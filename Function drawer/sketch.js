
let f1
let f2
let f3
let mi=2
let sigma=0.5
let slider;
let count=0;
function setup() {
createCanvas(800,800);
slider=createSlider(1,10,1)
f1 = new FunctionDraw(10,10,fun1,20)

}

function draw() {
background(0)

f1.printCartesian()
for(let i=0;i<slider.value();i++)
f1.update(fun1)
f1.printFun()
count+=0.1
}
function fun1(x) {
   mi=2
   sigma=2
  return sin(cos(count)+x + count) + cos(count*x)/5 + exp(-x*x+cos(count))*2 + cos(2*x + count - sin(count))/2 +sin(x + PI/6+ count)/2

}
