class Population {
  constructor() {
    for(let i=0;i<50;i++) {
    animals[i]=new Animal()
    }
    for(let i=0;i<100;i++) {
      food[i]=new Food()
    }
    for(let i=0;i<50;i++) {
      poison[i]=new Poison()
    }
    for(let i=0;i<5;i++) {
      water[i]=new Water()
    }
}
update() {
  for(let i=0;i<animals.length;i++) {
  animals[i].update()
  }
  for(let i=0;i<animals.length;i++) {
  if(animals[i].dead==true) {
    let f = new Food()
    f.pos=animals[i].pos.copy()
    food.push(f)
    animals.splice(i,1)
  }
  }
  if(animals.length==0)
  population=new Population()
}

print() {
  for(let i=0;i<animals.length;i++) {
  animals[i].print()
  }
}
printStats() {
  for(let i=0;i<animals.length;i++) {
  animals[i].printStats()
  }
}
printView() {
  for(let i=0;i<animals.length;i++) {
  animals[i].printView()
  }
}

printForce() {
  for(let i=0;i<animals.length;i++) {
  animals[i].printForce()
  }
}

}
