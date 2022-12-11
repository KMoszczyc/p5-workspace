let zebras=[];
let lions=[]
let konik;
let lew;
let bg;
function setup() {
createCanvas(1200,800);
for(let i=0;i<50;i++) {
zebras[i] = new Zebra();
}
for(let i=0;i<10;i++) {
lions[i] = new Lion();
}
}
function preload() {
  konik = loadImage('koniczek.png')
  lew = loadImage('leww.png')
}

function draw() {
background(50);
 updatePopulation()
}

function updatePopulation() {

  //calculating closest lion for zebra
  for(let i=0;i<zebras.length;i++) {
    let smallestDist=Infinity;
    let closestLionIndex=-1;
    for(let j=0;j<lions.length;j++) {
      if(zebras[i].pos.dist(lions[j].pos)<smallestDist) {
        smallestDist = zebras[i].pos.dist(lions[j].pos);
        closestLionIndex=j;
      }
    }
    let lion = lions[closestLionIndex];
    zebras[i].closestLion=lion;
  }


  //calculating closest zebra for lion

  for(let i=0;i<lions.length;i++) {
    let smallestDist=Infinity;
      let closestZebraIndex=-1;
    for(let j=0;j<zebras.length;j++) {
      if(lions[i].pos.dist(zebras[j].pos)<smallestDist) {
        smallestDist = lions[i].pos.dist(zebras[j].pos)
        closestZebraIndex=j;
      }
    }
    lions[i].closestZebraIndex=closestZebraIndex;
  }

    for(let i=0;i<lions.length;i++) {
      lions[i].update();
    }
    for(let i=zebras.length-1;i>=0;i--) {
      if(zebras[i].dead==false)
      zebras[i].update();
      else zebras.splice(i,1)
    }
}
