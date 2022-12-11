const scl = 20;
let t = 0;

let cols = 0;
let rows = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cols = int(width / scl);
    rows = int(height / scl);

    terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0))
    createTerrain()


    noStroke()
    console.log(width, height)
}

function draw() {
    // createTerrain()
    drawTerrain()

    t+=0.005
}


function createTerrain(){
    for(let y=0;y<rows;y++){
        for(let x=0;x<cols;x++){
            terrain[x][y] = noise(x*0.2, y*0.2, t)
        }
    }
}

function drawTerrain(){
    for(let y=0;y<rows;y++){
        for(let x=0;x<cols;x++){
            let color = map(terrain[x][y], 0, 1, 0, 255)
            fill(color)
            rect(x*scl, y*scl, scl, scl)
        }
    }
}