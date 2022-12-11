let cities=[]
let roads=[]
let bestPath=[];
let distance=0;
let bestDistance=Infinity
let slider;
let count=0
let swaps=0;
let graphExists=false;
let distanceError=3;
let img;
let avgX=0;
let avgY=0
let table;
let newcities=[];
function preload() {
  table = loadTable('worldcities.csv','csv','header')
  // img = loadImage('obraz.jpg');
  // img = loadImage('europa.png');
}
function setup() {
  createCanvas(1500, 800);
  slider=createSlider(1,300,1);

  // print(table.getRowCount() + ' total rows in table');
  // print(table.getColumnCount() + ' total columns in table');
  // populations = table.getColumn('population')
  // latitudes= table.getColumn('lat')
  // longitudes=table.getColumn('lng')
  // countries=table.getColumn('country')
  // citynames = table.getColumn('city')
  // count=0
  // xTab=[]
  // yTab=[]
  // for(let i=0;i<table.getRowCount();i++){
  //   if(longitudes[i]>-10 && longitudes[i]<30 &&
  //     latitudes[i]>40 && latitudes[i]<70 && populations[i]>200000){
  //
  //     xTab[count]=float(longitudes[i])
  //     yTab[count]=90-float(latitudes[i])
  //     cities[count]=new City(longitudes[i],90-latitudes[i])
  //     print(citynames[i] + " " + xTab[count]+" "+yTab[count])
  //     count++
  //   }
  // }
  // maxX= max(xTab)
  // maxY= max(yTab)
  // minX= min(xTab)
  // minY= min(yTab)
  // avgX= average(xTab)
  // avgY =average(yTab)

  // for(let i=0;i<cities.length;i++){
  //   cities.pos.y+=(cities.pos.y-avgY)*2
  // }

  for(let i=0;i<300;i++) {
    cities[i]=new City()
  }

print(cities)
  randomAlg()
//greedyAlg()
}

function draw() {
  background(0);
  // push()
  // translate(width/2,height/2)
  // scale(1.5)
  // translate(-width/2,-height/2)
  // image(img,width/2-250,height/2-300)
  // pop()

//    greedyAlg()
 for(let i =0;i<slider.value();i++)
 swapOpt()

if(count%10==0 && distanceError>0)
distanceError-=0.005

count++

distance=0
  for(let i=0;i<roads.length;i++) {
    distance+=roads[i].cities[0].pos.dist(roads[i].cities[1].pos)
  }

  if(distance<bestDistance) {
    bestDistance=distance
    bestPath=roads
  }

  for(let i=0;i<roads.length;i++) {
    stroke(100)
    strokeWeight(2)
    roads[i].print();
    strokeWeight(0.05)
    stroke(50)
    bestPath[i].print();
  }
  for(let i=0;i<cities.length;i++) {
    noStroke()
    fill(255,0,0)
    cities[i].print();
  }

  noStroke()
  fill(255)
  textSize(16)
  text('distance: '+floor(bestDistance)+ " km",20,20)
  text('swaps: '+swaps,20,40)
  text('error margin: '+distanceError+ " km",20,60)
}

//connecting cities randomly
function randomAlg() {
  roads=[]
  distance=0;
  let firstIndex= (int)(random(0,cities.length))
  let lastIndex=firstIndex;
  cities[lastIndex].visited=true;
while(roads.length<cities.length) {
  let index1 = (int)(random(0,cities.length))
  while(cities[index1].visited==true && roads.length<cities.length-1)
  index1 = (int)(random(0,cities.length))
  if(cities[index1].visited==true) index1=firstIndex
  roads.push(new Road(cities[lastIndex],cities[index1]))
  distance+=cities[lastIndex].pos.dist(cities[index1].pos)
  lastIndex=index1
  cities[index1].visited=true;
}
for(let i=0;i<cities.length;i++)
cities[i].visited=false
if(distance<bestDistance) {
  bestDistance=distance
  bestPath=roads
}
}

//simply choosing one city, looking for the closest and connecting it with a road
//, till all cities are visited and we connect it to the first city
function greedyAlg() {
  roads=[]
  distance=0;
  let firstIndex= (int)(random(0,cities.length))
  let lastIndex=firstIndex
  cities[lastIndex].visited=true;
  while(roads.length<cities.length) {
    let closestDist=Infinity;
    let closestIndex=-1;
    for(let i=0;i<cities.length;i++) {
      if(cities[i].visited==false && cities[lastIndex].pos.dist(cities[i].pos)<closestDist) {
        closestIndex=i;
        closestDist=cities[lastIndex].pos.dist(cities[i].pos)
      }
    }
    if(closestIndex==-1) closestIndex=firstIndex
    roads.push(new Road(cities[lastIndex],cities[closestIndex]))
    distance+=cities[lastIndex].pos.dist(cities[closestIndex].pos)
    lastIndex=closestIndex
    cities[closestIndex].visited=true;
  }
  for(let i=0;i<cities.length;i++)
  cities[i].visited=false
}

function swapOpt() {
  //choosing random road and random city to swap
let indexRoad1=(int)(random(0,roads.length));
let indexCity=(int)(random(0,cities.length));
//if city is contained in that road look for another one
while(cities[indexCity]==roads[indexRoad1].cities[0] || cities[indexCity]==roads[indexRoad1].cities[1])
indexCity=(int)(random(0,roads.length));
//looking for the correct road containing indexCity to swap
let indexRoad2=-1;
for(let i=0;i<roads.length;i++) {
  if(i!=indexRoad1 && roads[i].cities[0]==cities[indexCity] )
  indexRoad2=i
}

//looking for the roads between those 2 roads we are gonna swap, so later we can sustain correct directions of the graph
let roadIndexes=[]
let actualCity=roads[indexRoad1].cities[1]
while(actualCity!=cities[indexCity]) {
  let index=-1;
  for(let i=0;i<roads.length;i++) {
    if(roads[i].cities[0]==actualCity) {
      roadIndexes.push(i)
      index=i
    }
  }
  actualCity=roads[index].cities[1];
}

//swapping those 2 roads
let temp1=roads[indexRoad1].cities[1];
let temp2=roads[indexRoad2].cities[0];
roads[indexRoad1].cities[1]=roads[indexRoad2].cities[0]
roads[indexRoad2].cities[0]=temp1;

//calculating the distance of the new path after the swap, if its better then keep it
  distance=0
for(let i=0;i<roads.length;i++) {
  distance+=roads[i].cities[0].pos.dist(roads[i].cities[1].pos)
}
// I add <0,50> - (slider value) here so that if one swap is worse by a little bit it still can be done, so to sort of
//avoid local minimum, we want more bad swaps at the begining, and less at the end
if(distance<bestDistance+distanceError) {
  swaps++
  bestDistance=distance
  bestPath=roads
  //repearing the directions of roads between those swaped roads, so that all roads head in one direction
  //(swaping the cities in one each road)
  for(let i=0;i<roadIndexes.length;i++) {
    let city1 = roads[roadIndexes[i]].cities[1]
    roads[roadIndexes[i]].cities[1] = roads[roadIndexes[i]].cities[0]
    roads[roadIndexes[i]].cities[0] = city1
  }
} else {
  //if no improvment then swap back to the starting position
  let temp=roads[indexRoad1].cities[1];
  roads[indexRoad1].cities[1]=roads[indexRoad2].cities[0]
  roads[indexRoad2].cities[0]=temp;
}
}

function average(arr) {
  let sum = 0;

  for (let i=0;i<arr.length;i++){
    sum= sum + float(arr[i])
  }

  return sum/arr.length
}
