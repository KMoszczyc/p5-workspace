const TOTAL = 1;
let song;
let count=0;
let spaceship
let asteroids=[];
let spacheship;
let astQuantity=30;
let score=0;
let best=0;
let frameCount=0;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0;i<astQuantity;i++) {
    asteroids[i]=new Asteroid();
  }
  spaceship = new Spaceship();
}

function draw() {
  background(10);

    //spaceship hitting asteroid
    for(let i=0;i<asteroids.length;i++){
        if(spaceship.hits(asteroids[i])){
            restart()
            break
        }
        asteroids[i].update();
    }


  for(let j=0;j<spaceship.bullets.length;j++) {
      spaceship.bullets[j].update();
      spaceship.bullets[j].print()
  }



  push();
  spaceship.update();
  pop();

    //bullet hitting asteroid
    for(let i=spaceship.bullets.length-1;i>=0;i--) {
        for(let j=asteroids.length-1;j>=0;j--) {
            if(spaceship.bullets[i]!=null && (spaceship.bullets[i].pos.x>width || spaceship.bullets[i].pos.x<0 ||
              spaceship.bullets[i].pos.y>height || spaceship.bullets[i].pos.y<0)) spaceship.bullets.splice(i,1)
            if(spaceship.bullets[i]!=null && spaceship.bullets[i].hits(asteroids[j]))  {
              spaceship.score++;
              spaceship.bullets.splice(i,1);
              let asteroid = asteroids[j];
              let angle = asteroid.vel.heading();
              let angle1 = angle+0.5;
              let angle2 = angle-0.5;
              //new asteroid 1
              let asteroid1 = new Asteroid();
             //setting vel and pos
              asteroid1.vel=p5.Vector.fromAngle(angle1)
              asteroid1.pos=asteroid.pos.copy();
              //lowering radius
              asteroid1.diamater=asteroid.diamater/2;
              if(asteroid1.diamater>=15)
              asteroids.push(asteroid1);
              //new asteroid 2
              let asteroid2 = new Asteroid();
              asteroid2.vel=p5.Vector.fromAngle(angle2)
              asteroid2.pos=asteroid.pos.copy();
              asteroid2.diamater=asteroid.diamater/2;
              if(asteroid2.diamater>=15)
              asteroids.push(asteroid2)
              asteroids.splice(j,1)

            }
        }
    }

    if(asteroids.length==0) {
      frameCount++;
      textSize(64)
      text('GG EASY',400,height/2)
    }


    textSize(24)
    fill(255)
    noStroke()
    if(score>best) best = score;
    text('SCORE: '+score,20,60)
    text('BEST: '+best,20,30)
    //print
    for(let i=0;i<asteroids.length;i++) {
      asteroids[i].print()
    }

    spaceship.print()
    steerSpaceship()
}

function steerSpaceship(){
    w_ascii = 77
    d_ascii = 64
    a_ascii = 61

    if(keyIsDown(UP_ARROW) || keyIsDown(w_ascii))
        spaceship.boost();
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(d_ascii))
        spaceship.turn(0.1);
    if(keyIsDown(LEFT_ARROW) || keyIsDown(a_ascii))
        spaceship.turn(-0.1);
}

function keyTyped() {
    if(key===' ')
        spaceship.bullets.push(new laserBullet(spaceship))
}



function restart(){
    asteroids = []
    for(let i=0;i<astQuantity;i++) {
      asteroids[i]=new Asteroid();
    }
    score = 0
    spaceship = new Spaceship();
}
