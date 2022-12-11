
class Population {
constructor(size) {
this.minstep=1000;
this.bestDot=0;
this.fitnessSum=0;
this.gen=1;
this.dots = [];
for(let i =0;i<size;i++) {
  this.dots[i]=new Dot();
}
}

show() {
  for(let i=0;i<this.dots.length;i++) {
    this.dots[i].show();
  }
}
update() {
  for(let i=0;i<this.dots.length;i++) {
    if(this.dots[i].brain.step>1000)
    this.dots[i].dead=true;
    else
    this.dots[i].update()
  }
}
calculateFitness() {
  for(let i=0;i<this.dots.length;i++) {
    this.dots[i].calculateFitness()
  }
}
allDotsDead() {
  for(let i=0;i<this.dots.length;i++) {
    if(!this.dots[i].dead && !this.dots[i].reachedGoal) {
      return false;
    }
  }
  return true;
}

sumFitness(){
  this.fitnessSum=0;
  for(let i =0;i<this.dots.length;i++) {
  this.fitnessSum+=this.dots[i].fitness;
  }
}
naturalSelection(crossoverRate) {
  let newDots = []
  this.setbestDot();
  this.sumFitness();

  newDots[0]=this.dots[this.bestDot].gimmeBaby();
  newDots[0].isBest = true;
  for(let i =1;i<this.dots.length;i++) {
  let parent1 = this.selectParent();
  newDots[i]=parent1.gimmeBaby()
  }
  this.dots = newDots;
  this.gen++;
  console.log('new generation')
}
selectParent() {
  let rand = random(this.fitnessSum);
  let runningSum=0;
  for(let i =0;i<this.dots.length;i++) {
    runningSum+=this.dots[i].fitness;
    if(runningSum>rand){
      return this.dots[i]
    }
}
return null;
}

mutateDemBabies(mutationRate,populationMutRate) {
  for(let i =1;i<this.dots.length;i++) {
    if(random(1)<populationMutRate)
    this.dots[i].brain.mutate(mutationRate);
  }
}
setbestDot() {
  let max=0;
  let maxIndex=0;
  for(let i =0;i<this.dots.length;i++) {
    if(this.dots[i].fitness>max) {
      max = this.dots[i].fitness;
      maxIndex=i;
    }
  }
this.bestDot=maxIndex;
if(this.dots[this.bestDot].reachedGoal) {
  this.minstep = this.dots[this.bestDot].brain.step;
}
}
}
