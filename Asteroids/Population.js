let deadShips=[];
let fitnessSum=0;
let bestShip;
function nextGeneration() {
calculateFitness()
findBestShip();
sumFitness();
for(let i =1;i<deadShips.length;i++) {
let parent = pickOne();
let child = new Spaceship();
child.nn = parent.nn.copy();
spaceships.push(child)
}
mutate();
deadShips=[]
console.log('next generation')
}


function calculateFitness() {
  let sumTime=0;
  let sumScore=0
  for(let i =0;i<deadShips.length;i++) {
    sumScore+=deadShips[i].score;
    sumTime+=deadShips[i].timeAlive;
  }
  for(let i =0;i<deadShips.length;i++) {

    if(sumScore==0)
    sumScore=1;
    if(deadShips[i].shootCount==0)
    deadShips[i].shootCount=1;
    deadShips[i].fitness= deadShips[i].timeAlive/sumTime + deadShips[i].score/sumScore/deadShips[i].shootCount;
      // if(deadShips[i].shootCount==1)
      // deadShips[i].fitness*=0.1;
      if(deadShips[i].pos.x==width/2 && deadShips[i].pos.y==height/2) {
        deadShips[i].fitness*=0.1;
      }
}
}
function sumFitness() {
  for(let i =0;i<deadShips.length;i++) {
  fitnessSum+=deadShips[i].fitness;
  }
}
function pickOne() {
  fitnessSum=0;
  let tempSum=0;
  for(let i =0;i<deadShips.length;i++) {
    let rand = random(fitnessSum)
    tempSum+=deadShips[i].fitness;
    if(tempSum>rand) {
      return deadShips[i];
    }
  }
}
function mutate() {
  for(let i =1;i<spaceships.length;i++) {
   spaceships[i].nn.mutate(0.1)
  }
}
function findBestShip() {
  let biggestFit=0;
  let bestIndex=-1;
  for(let i=0;i<deadShips.length;i++) {
  if(deadShips[i].fitness>biggestFit) {
    biggestFit=deadShips[i].fitness;
    bestIndex=i;
  }
  }
  let bestBrain = deadShips[bestIndex].nn;
  bestShip=new Spaceship();
  bestShip.nn=bestBrain.copy();
  spaceships.push(bestShip);
}
