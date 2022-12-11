class Particle {
    constructor(x, y, mass, radius) {
        this.pos = createVector(x, y)
        this.mass = mass
        this.radius = radius;
        this.force = createVector(0,0);
        this.vel = createVector(random(-0.3, 0.3), random(-0.3, 0.3))
        // this.color = color(random(255), random(255), random(255), 100) // b is a random number between 0 - 100)
        this.color = color(random(255), random(255), random(255), 255) // b is a random number between 0 - 100)
    }

    move() {
        let acc = this.force.div(this.mass)
        this.vel.add(acc)
        this.vel.limit(MAX_SPEED)
        this.borders()
        this.pos.add(this.vel)
        
        // console.log(acc)
        this.force = createVector(0,0);
    }

    show() {
        fill(this.color)
        // stroke(this.color)
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2)
    }

    calculateForce(particle){
        const dist = p5.Vector.dist(this.pos, particle.pos);
        const dir = p5.Vector.sub(particle.pos, this.pos).normalize();
        const radiusSum = this.radius + particle.radius;
        const force = dir.mult((G_CONSTANT * this.mass * particle.mass) / (dist * dist + radiusSum * 2));

        this.force.add(force);
    }

    borders() {
        const MAX_OUT_SPEED = 2
        if(this.pos.x>width)
            this.vel.add(-0.01, 0).limit(MAX_OUT_SPEED)
        if(this.pos.x<0)
            this.vel.add(0.01, 0).limit(MAX_OUT_SPEED)

        if(this.pos.y>height)
            this.vel.add(0, -0.01).limit(MAX_OUT_SPEED)
        if(this.pos.y<0)
            this.vel.add(0, 0.01).limit(MAX_OUT_SPEED)
    }
}