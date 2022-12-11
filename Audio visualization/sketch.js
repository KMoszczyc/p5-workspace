let song;
let fft;
let w;
let mic;
let button;
let hasStarted = false;

let height, width;

function preload() {
    //  song = loadSound('mrbrightside.mp3');
    //    song = loadSound('experience.mp3');
    //    song = loadSound('leave.mp3');
    // song = loadSound('drifting.mp3');
    //     song = loadSound('time.mp3');
    //     song = loadSound('seven.mp3');
    //    song = loadSound('kisnou.mp3');
    //  song = loadSound('flight.mp3');
    //     song = loadSound('home.mp3');
    //      song = loadSound('bonjr.mp3');
    //     song = loadSound('10000.mp3');
    // song = loadSound("tongues.mp3");
    // song = loadSound("1.flac");
    // song = loadSound("2.flac");
    // song = loadSound("km1.flac");
    // song = loadSound("km2.flac");
    song = loadSound("kamil-46.flac");
    // song = loadSound("kamil-46-no-noise.flac");
}

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else song.play();
}

function setup() {
    height = window.innerHeight- 100
    width = window.innerWidth - 200

    createCanvas(width, height);

    w = (width + 512) / 512;
    textAlign(CENTER)

    noFill();

    button = createButton("click me");
    button.mousePressed(startMic);
}

function draw() {
    background(5);
    console.log(height)
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
      }

    if(hasStarted){
        let spectrum = fft.analyze();
        // strokeWeight(1);
        // stroke(255)
        // for (let i = 0; i < 20; i++) {
            
        //     text(1000 * i, 85 * i, 30);
        //     line(85 * i, 50, 85 * i, height)
        // }
        
        for (let i = 0; i < spectrum.length; i++) {
            noFill();
            let num = map(i, 0, spectrum.length, 0, 255);
            stroke((255 / num) * 50, num * 5, num * 2);
            strokeWeight(2);
            let val = map(pow(spectrum[i], 3), 0, pow(255, 3), 0, height)/2;
            // val = (val * val) / 300;
            line(w + i * w, height/2 - val/2, i * w + w, height/2 + val/2);
        }

    }
        
}

function startMic() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.7);

    if (song.isPlaying()) {
        song.pause();
    } else song.play();

    fft.setInput(song);

    // fft.setInput(mic);
    hasStarted=true
}

