let symbol;
let streams = [];
let totalStreams = 100

p5.disableFriendlyErrors = true
function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < totalStreams; i++) {
        let stream = new Stream();
        stream.generateSymbols(random(width), random(-1000, 0));
		streams.push(stream)
    }

    const totalSymbols = streams.reduce((acc, stream) => acc + stream.totalSymbols, 0)
    console.log('totalSymbols: ', totalSymbols)
    background(10);
}

function draw() {
    background(0, 10);
    for(stream of streams){
        stream.render()
    }

    if(frameCount % 300 == 0)
        print(frameRate())
}
