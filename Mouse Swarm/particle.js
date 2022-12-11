const FORCE_FACTOR = 0.005;
const TRAIL_LENGTH = 15;

class Particle {
    constructor() {
        this.pos = createVector(random(windowWidth), random(windowHeight));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.history = [];
    }

    update(mousePos, mouseWasPressed) {
        let dir = p5.Vector.sub(mousePos, this.pos).normalize();
        let dist = mousePos.dist(this.pos);
        let force = dir.copy();
        let velLimit = 20;

        if (mouseWasPressed) {
            force.mult(-1000 / dist);
            velLimit = 100000;
        } else if (dist > 100) force = p5.Vector.mult(dir, dist * FORCE_FACTOR);

        // force.add(random(-0.1, 0.1), random(-0.1, 0.1))

        this.vel.add(force);
        this.vel.limit(velLimit);
        this.pos.add(this.vel);

        // console.log(this.pos)
        this.history.push(this.pos.copy());
        if (this.history.length > TRAIL_LENGTH) {
            this.history.splice(0, 1);
        }
    }

    show() {
        noFill();

        const strokeInc = 100 / TRAIL_LENGTH;

        beginShape(); // TRIANGLE_STRIP for fading line
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            stroke(255, 255, 255, i * strokeInc);
            // console.log(i * strokeInc)
            vertex(pos.x, pos.y);
        }
        endShape();

        ellipse(this.pos.x, this.pos.y, 1, 1);
    }
}
