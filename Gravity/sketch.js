const MAX_SPEED = 5
const G_CONSTANT = 0.001;

let PLANETS_COUNT = 5;
let ASTEROIDS_COUNT = 200;
let PARTICLE_COUNT = PLANETS_COUNT + ASTEROIDS_COUNT;

let particles = [];
let particlesPivotIndex = ASTEROIDS_COUNT;

let ASTEROID_MASS_PER_PX = 1;
let PLANET_MASS_PER_PX = 5;

const asteroidsSlider = document.getElementById("asteroids-slider");
const asteroidsSliderValue = document.getElementById("asteroids-value");

const planetsSlider = document.getElementById("planets-slider");
const planetsSliderValue = document.getElementById("planets-value");

const asteroidGravitySlider = document.getElementById("asteroid-gravity-slider");
const asteroidGravitySliderValue = document.getElementById("asteroid-gravity-value");

const planetGravitySlider = document.getElementById("planet-gravity-slider");
const planetGravitySliderValue = document.getElementById("planet-gravity-value");

asteroidsSliderValue.innerHTML = ASTEROIDS_COUNT;
asteroidsSlider.value = ASTEROIDS_COUNT;

planetsSliderValue.innerHTML = PLANETS_COUNT;
planetsSlider.value = PLANETS_COUNT;

asteroidGravitySliderValue.innerHTML = ASTEROID_MASS_PER_PX;
asteroidGravitySlider.value = ASTEROID_MASS_PER_PX;

planetGravitySliderValue.innerHTML = PLANET_MASS_PER_PX;
planetGravitySlider.value = PLANET_MASS_PER_PX;

asteroidsSlider.oninput = function () {
    asteroidsSliderValue.innerHTML = this.value;
    ASTEROIDS_COUNT = parseInt(this.value);
    PARTICLE_COUNT = ASTEROIDS_COUNT + PLANETS_COUNT;
    updateAsteroidCount();
};

planetsSlider.oninput = function () {
    planetsSliderValue.innerHTML = this.value;
    PLANETS_COUNT = parseInt(this.value);
    PARTICLE_COUNT = ASTEROIDS_COUNT + PLANETS_COUNT;
    updatePlanetCount();
};

asteroidGravitySlider.oninput = function () {
    asteroidGravitySliderValue.innerHTML = this.value;
    ASTEROID_MASS_PER_PX = parseInt(this.value);

    console.log(ASTEROID_MASS_PER_PX, PLANET_MASS_PER_PX);
    updateMass();
};

planetGravitySlider.oninput = function () {
    planetGravitySliderValue.innerHTML = this.value;
    PLANET_MASS_PER_PX = parseInt(this.value);

    console.log(ASTEROID_MASS_PER_PX, PLANET_MASS_PER_PX);
    updateMass();
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", () => resizeCanvas(window.innerWidth, window.innerHeight), false);

    for (let i = 0; i < ASTEROIDS_COUNT; i++) {
        particles.push(createAsteroid());
    }

    for (let i = 0; i < PLANETS_COUNT; i++) {
        particles.push(createPlanet());
    }

    console.log(ASTEROIDS_COUNT, PLANETS_COUNT, PARTICLE_COUNT);
    console.log(particles);
    console.log(ASTEROID_MASS_PER_PX, PLANET_MASS_PER_PX);
}

function draw() {
    // background(0, 0, 0, 10);
    background("rgba(0, 0, 0, 0.05)");

    let particlesToBeRemovedIndexes = []
    // update forces
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (i != j) {
                // Calculate force
                particles[i].calculateForce(particles[j])

                let particleToBeRemovedIndex = collide(i, j)
                if (particleToBeRemovedIndex != -1 && particlesToBeRemovedIndexes.includes(particleToBeRemovedIndex))
                    particlesToBeRemovedIndexes.push(particleToBeRemovedIndex)
            }
        }
    }
    console.log(particlesToBeRemovedIndexes)
    // Removed merged particles
    for (let i = 0; i < particlesToBeRemovedIndexes.length; i++) {
        particles.splice(i, 1)
    }

    // move and show
    for (let i = 0; i < particles.length; i++) {
        particles[i].move();
    }

    noStroke();
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
    }
}

function collide(i, j) {
    const radiusSum = particles[i].radius + particles[j].radius;
    const dist = p5.Vector.dist(particles[i].pos, particles[j].pos);
    let particleToBeRemovedIndex = -1

    if (dist > radiusSum/2)
        return

    const velocitySum = abs(particles[i].vel - particles[j].vel)

    const bigParticleIndex = particles[i].radius > particles[j].radius ? i : j
    const smallParticleIndex = particles[i].radius < particles[j].radius ? i : j

    // Merge
    if (particles[bigParticleIndex].radius/particles[smallParticleIndex].radius < 8){
        newRadius = nthRoot(Math.pow(particles[bigParticleIndex].radius, 3) + Math.pow(particles[smallParticleIndex].radius, 3), 3)
        console.log(particles[bigParticleIndex].radius, particles[smallParticleIndex].radius, newRadius)
        particles[bigParticleIndex].radius = newRadius
        particles[bigParticleIndex].mass = calculateMass(newRadius)
        
        particleToBeRemovedIndex = smallParticleIndex;
    } // Eject particles
    // else if (velocitySum < MAX_SPEED/2) {

    // }

    return
}


function updateAsteroidCount() {
    if (PARTICLE_COUNT > particles.length) {
        for (let i = 0; i < PARTICLE_COUNT - particles.length; i++) {
            if (particles.length == 0) particles.push(createAsteroid());
            else particles = insert(createAsteroid(), i, particles);
        }
    } else if (PARTICLE_COUNT < particles.length) {
        for (let i = particles.length - 1 - PLANETS_COUNT; i >= ASTEROIDS_COUNT; i--) {
            particles.splice(0, 1);
        }
    }
}

function updatePlanetCount() {
    if (PARTICLE_COUNT > particles.length) {
        for (let i = 0; i < PARTICLE_COUNT - particles.length; i++) {
            particles.push(createPlanet());
        }
    } else if (PARTICLE_COUNT < particles.length) {
        for (let i = particles.length - 1; i >= PARTICLE_COUNT; i--) {
            particles.pop();
        }
    }
}

function createAsteroid() {
    let radius = random(0, 1);
    let mass = calculateMass(radius);
    return new Particle(random(width), random(height), mass, radius);
}

function createPlanet() {
    let radius = random(8, 16);
    let mass = calculateMass(radius);
    return new Particle(random(width), random(height), mass, radius);
}

function insert(element, index, arr) {
    return arr.reduce((s, a, j) => (j - index ? s.push(a) : s.push(element, a), s), []);
}

function calculateMass(radius) {
    if (radius < 1)
        return radius * radius * radius * ASTEROID_MASS_PER_PX;
    else 
        return radius * radius * radius * PLANET_MASS_PER_PX;
}


function updateMass(){
    for (let i = 0; i < particles.length; i++) {
        particles[i].mass = calculateMass(particles[i].radius)
    }
}

function nthRoot(value, n){
    return Math.pow(value, 1/n)
}