let lines = [];
let count = 0;
class Line {
    constructor() {
        this.pos1 = createVector(width / 2, height / 2);
        this.pos2 = createVector(width / 2, height / 2);
        this.vel = 0.5;
        this.angle = 0.0001;
    }
    update() {
        this.vel *= 1.02;
        this.angle+=0.01;
        this.pos1.add(this.vel, (-height / width) * this.vel);
        this.pos2.add(this.vel, (height / width) * this.vel);
    }
    show() {
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        line(width - this.pos1.x, this.pos1.y, width - this.pos2.x, this.pos2.y);
        line(width - this.pos1.x, this.pos1.y, this.pos1.x, this.pos1.y);
        line(width - this.pos2.x, this.pos2.y, this.pos2.x, this.pos2.y);
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", () => resizeCanvas(window.innerWidth, window.innerHeight), false);
}

function draw() {
    background(0);
    fill(20);
    triangle(0, height, width / 2, height / 2, width, height);
    mainCorridor();
    if (count % 5 == 0) lines.push(new Line());
    for (let i = lines.length - 1; i >= 0; i--) {
        lines[i].update();
        lines[i].show();
        if (lines[i].pos1.x > width) lines.splice(i, 1);
    }
    count++;
}

function mainCorridor() {
    stroke(255);
    line(0, 0, width / 2, height / 2);
    line(0, height, width / 2, height / 2);
    line(width, 0, width / 2, height / 2);
    line(width, height, width / 2, height / 2);
}
