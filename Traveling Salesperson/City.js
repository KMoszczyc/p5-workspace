class City {
  constructor(x, y) {
  if(x == null || y ==null)
    this.pos=createVector(random(width-100)+50,random(height-100)+50)
  else this.pos=createVector(x,y)
  this.visited=false;
  this.r=3
}
print() {
  ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2)
}
}

class Road {
  constructor(city1,city2) {
    this.cities=[city1,city2]
  }
  print() {
    line(this.cities[0].pos.x,this.cities[0].pos.y,this.cities[1].pos.x,this.cities[1].pos.y)
  }
}
