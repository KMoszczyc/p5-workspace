const scl = 50
let cols, rows;
let terrain;
let xVertexScales;
let time = 0;
const STARS_COUNT=500;
let stars = []
let bg;

function preload(){
    // bg = loadImage('http://127.0.0.1:5500/bg.png');
    // console.log(bg)
    // bg = loadImage("https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/background.jpg")
}

function setup(){
    let mycanvas = createCanvas(window.windowWidth, window.windowHeight, WEBGL);
    window.addEventListener('resize', () => resizeCanvas(window.innerWidth, window.innerHeight) , false);
    // mycanvas.position(0, 0, 'fixed');
    translate(width/2, height/2); 

    const w = 2200
    const h = 2200
    cols = int(w / scl)
    rows = int(h / scl)
    terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0))
    xVertexScales = new Array(cols).fill(0).map(() => new Array(rows).fill(0))

    let yoff=0
    for(let y=0;y<rows;y++){
        let xoff=0
        let xoff2 = map(noise(yoff*2+10), 0, 1, scl/2, scl)
        for(let x=0;x<cols;x++){
            xVertexScales[x][y] = map(noise(xoff, yoff), 0, 1, scl/2, scl) + xoff2
            xoff-=0.03
        }
        yoff+=0.03
    }
    generateStars()

    cam = createCamera();
}

function draw() {
    background(0);

    
    drawStars()
    // drawBackground()
    updateWaves()
    drawWaves()


    console.log(frameRate());
    // camera(0, 20 + sin(frameCount * 0.01) * 10, 0, 0, 0, 0, 0, 1, 0);
    // camera(0, 0, 0, width/2, height/2, 0, 0, 1, 0);

    time+=0.007
  }

function updateWaves() {
    let yoff=time
    for(let y=0;y<rows;y++){
        let xoff=0
        for(let x=0;x<cols;x++){
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -300, 350)
            xoff-=0.03
        }
        yoff+=0.03
    }
}

function generateStars() {
    for(let i=0;i<STARS_COUNT; i++){
        stars.push(new Star(random(-width/2, width/2), random(-height/2, -100), random(0.1, 4)))
    }
}

function drawStars() {
    fill(98, 179, 216)

    for(let i=0;i<STARS_COUNT; i++){
        ellipse(stars[i].x, stars[i].y, stars[i].r, stars[i].r)
    }
}


function drawWaves() {
    stroke(98, 179, 216)
    noFill()
    // // translate(-width/2, -height/2); 

    // cam.move(0, sin(frameCount * 0.02)*0.5, 0)
    push()
    rotateX(2*PI/5)
    rotateZ(-PI/4)
    translate(-width/2, -height*1.2); 
    smooth();

    for(let y=0;y<rows -1; y++){
        beginShape()
        for(let x=0;x<cols;x++){
            vertex(x*xVertexScales[x][y], y*scl, terrain[x][y])
            // vertex(x*scl, (y+1)*scl, terrain[x][y+1])
        } 
        endShape()
    }

    for(let x=0;x<cols;x++){
        beginShape()
            for(let y=0;y<rows -1; y++){
            vertex(x*xVertexScales[x][y], y*scl, terrain[x][y])
        } 
        endShape()
    }

    pop()
}

function drawBackground() { 
    c1 = color(0);
    const scaleColor = 0.4
    c2 = color(98*scaleColor, 179*scaleColor, 216*scaleColor);
    for(let y=0; y<height*2; y++){
      n = map(y,0,height*2,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(-width*1.3, y - 1000, -1000, width*3, y, -1600);
    }
}