class Brain {
  constructor() {
    this.directions = []
    this.step=0;
    this.randomize();

  }

randomize() {
  for(let i=0;i<1000;i++) {
  let x=random(2)-1;
  let y=random(2)-1;
  this.directions[i]=createVector(x,y)
  }
}

clone() {
  let clone = new Brain();
   for(let i=0;i<this.directions.length;i++) {
     clone.directions[i]=this.directions[i].copy();
   }
   return clone;
}


mutate(mutationRate) {
   for(let i=0;i<this.directions.length;i++) {
   let num = random(1)
   if(num<mutationRate) {
     let x=random(2)-1;
     let y=random(2)-1;
     this.directions[i]=createVector(x,y)
   }
 }
 }
}
