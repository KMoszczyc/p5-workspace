function nextGeneration() {
console.log('new generation')
  calculateFitness();
 birds[0]=new Bird(savedBirds[TOTAL-1].brain);
 //birds[0]=savedBirds[499];
  for(let i=1;i<TOTAL;i++) {
    if(random(1)<0.2) {
      let index1 = pickOne();
      let index2=index1;
      while(index1==index2) {
        index2=pickOne()
      }
   birds[i]=  crossover(savedBirds[index1],savedBirds[index2])
 }
    else birds[i]=new Bird(savedBirds[pickOne()].brain);
    birds[i].mutate(0.1,0.7);
  }
  savedBirds=[];
}
function pickOne() {
  var index =0;
  var r = random(1);
  while(r>0) {
    r = r - savedBirds[index].fitness;
    index++
  }
  index--;
  return index;
}
function crossover(bird1, bird2) {
  let newbird = new Bird();
  for(let i=0;i<newbird.brain.weights_ih.rows;i++) {
    for(let j=0;j<newbird.brain.weights_ih.cols;j++) {
      if(random(1)>0.5)
      newbird.brain.weights_ih.data[i][j]=bird1.brain.weights_ih.data[i][j]
      else
      newbird.brain.weights_ih.data[i][j]=bird2.brain.weights_ih.data[i][j]
    }
  }
  for(let i=0;i<newbird.brain.weights_ho.rows;i++) {
    for(let j=0;j<newbird.brain.weights_ho.cols;j++) {
      if(random(1)>0.5)
      newbird.brain.weights_ho.data[i][j]=bird1.brain.weights_ho.data[i][j]
      else
      newbird.brain.weights_ho.data[i][j]=bird2.brain.weights_ho.data[i][j]
    }
  }
  for(let i=0;i<newbird.brain.bias_h.rows;i++) {
    for(let j=0;j<newbird.brain.bias_h.cols;j++) {
      if(random(1)>0.5)
      newbird.brain.bias_h.data[i][j]=bird1.brain.bias_h.data[i][j]
      else
      newbird.brain.bias_h.data[i][j]=bird2.brain.bias_h.data[i][j]
    }
  }
  for(let i=0;i<newbird.brain.bias_o.rows;i++) {
    for(let j=0;j<newbird.brain.bias_o.cols;j++) {
      if(random(1)>0.5)
      newbird.brain.bias_o.data[i][j]=bird1.brain.bias_o.data[i][j]
      else
      newbird.brain.bias_o.data[i][j]=bird2.brain.bias_o.data[i][j]
    }
  }
  return newbird;
}


function calculateFitness() {
  let sum=0;
  for(let bird of savedBirds) {
    sum+=bird.score;
  }
  for(let bird of savedBirds) {
    bird.fitness=bird.score/sum;
  }
}
