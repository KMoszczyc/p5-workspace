let symbol;
let streams = [];
const symbolSize = 20;

p5.disableFriendlyErrors = true
function setup() {
    createCanvas(windowWidth, windowHeight);

    let x = 0;
    for (let i = 0; i < width / symbolSize; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
		streams.push(stream)
		x += symbolSize
    }

    const totalSymbols = streams.reduce((acc, stream) => acc + stream.totalSymbols, 0)
    console.log('totalSymbols: ', totalSymbols)

    textSize(symbolSize);
}

function draw() {
    background(0, 30);
    for(stream of streams){
        stream.render()
    }

    if(frameCount % 300 == 0)
        print(frameRate())
}
