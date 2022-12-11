class Symbol {
    constructor(x, y, framesPerMove) {
        this.x = x;
        this.y = y;
        this.framesPerMove = framesPerMove;
        this.value;
        this.switchInterval = round(random(10, 30));
        this.randomAlpha = round(random(50, 255))
        this.first = false;
    }

    setRandomSymbol() {
        if (frameCount % this.switchInterval == 0) this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
    }
}
