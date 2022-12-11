const PARTICLE_COUNT = 500;
let particles = [];

let mouseWasPressed = false

function setup() {
    createCanvas(windowWidth, windowHeight, P2D);

    for(let i=0; i <PARTICLE_COUNT; i++){
        particles.push(new Particle())
    }

    background(0)
}

function draw() {
    background(0, 0, 0);
    fill(255)
    stroke(255)
    for (let particle of particles) {
        const mousePos = createVector(mouseX, mouseY)
        particle.update(mousePos, mouseWasPressed)
        particle.show()
        // ellipse(particle.pos.x, particle.pos.y, 1, 1)

    }

    mouseWasPressed = false
}


function mousePressed(){
    mouseWasPressed = true
}