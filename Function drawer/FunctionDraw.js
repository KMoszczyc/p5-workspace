class FunctionDraw {
  constructor(count1,count2,func,textY) {
    this.function=func;
    this.textY=textY
    this.count=-count1
    this.maxcount=count1;
    this.scaleX=width/count1/2
    this.scaleY=width/count2/2
    this.positions=[]
    this.positions.push(createVector(0,-this.function(this.count)*this.scaleY+height/2))
    this.stroke=createVector(random(255),random(255),random(255))
  }
  update(func) {
    if(this.positions[this.positions.length-1].x<width) {
      push();
      translate(width/2,height/2)
     this.positions.push(createVector(this.count*this.scaleX+width/2,-this.function(this.count)*this.scaleY+height/2))
     pop()
   }

   for(let i =0;i<this.positions.length;i++) {
     this.positions[i].y=-func((this.positions[i].x-width/2)/this.scaleX)*this.scaleY +height/2
   }

    this.count+=this.maxcount/width*2
  }
  printFun() {
    let smallestDist=Infinity
    let index=-1;
    for(let i =0;i<this.positions.length-1;i++) {
      strokeWeight(2)
      stroke(this.stroke.x,this.stroke.y,this.stroke.z)
      line(this.positions[i].x,this.positions[i].y,this.positions[i+1].x,this.positions[i+1].y)
      if(abs(this.positions[i].x-mouseX)<smallestDist) {
        smallestDist=abs(this.positions[i].x-mouseX)
        index=i
      }
    }
    fill(255,0,0)
    stroke(255,0,0)
    ellipse(this.positions[index].x,this.positions[index].y,5,5)
    stroke(this.stroke.x,this.stroke.y,this.stroke.z)
    noFill()
    strokeWeight(1)
    let num = -(this.positions[index].y-height/2)/this.scaleY
    text(num-num%0.001,20,this.textY)
  }

  printCartesian() {
    if(floor(width/this.scaleX)*10<width/4) {
    for(let i =0;i<floor(width/this.scaleX)*10;i++) {
      strokeWeight(1)
      stroke(10)
      if(i%10==0)
      stroke(50)
      line(i*this.scaleX/10,0,i*this.scaleX/10,height)
    }
    for(let i =0;i<floor(height/this.scaleY)*10;i++) {
      strokeWeight(1)
      stroke(10)
      if(i%10==0)
      stroke(50)
      line(0,i*this.scaleY/10,width,i*this.scaleY/10)
    }
  }

    fill(255)
    noStroke()
    let numX=floor(width/this.scaleX)
    for(let i=0;i<numX;i++) {
      if(i%(numX/20)==0 || numX<20) {
      text(-numX/2 +i,i*this.scaleX-10,height/2+20)
      stroke(50)
      line(i*this.scaleX,0,i*this.scaleX,height)
    }
    }
    let numY=floor(height/this.scaleY)
    for(let i=0;i<numY;i++) {
      if(i%(numY/20)==0 || numY<20) {
      text(numY/2 -i,width/2-20,i*this.scaleY+10)
      stroke(50)
        line(0,i*this.scaleY,width,i*this.scaleY)
      }
    }
    stroke(255)
    line(width/2,height,width/2,0)
    line(0,height/2,width,height/2)
  }
}
