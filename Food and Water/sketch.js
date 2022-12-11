let johny;
let food=[]
let poison=[]
let water=[]
let animals=[]
let population;
// let foodNumber=50;
// let poisonNumber=20;
// let waterNumber=5;
function setup() {
createCanvas(1200,800);
population = new Population()

}

function draw() {
background(50);
population.update();
population.print();
population.printStats();
population.printView();
population.printForce();
for(let i=0;i<food.length;i++) {
  food[i].print()
}
for(let i=0;i<poison.length;i++) {
  poison[i].print()
}
for(let i=0;i<water.length;i++) {
  water[i].vaporize();
  water[i].print()
}
if(random(1)<0.01)
food.push(new Food())
if(random(1)<0.005)
poison.push(new Poison())
if(random(1)<0.001)
water.push(new Water())

}
