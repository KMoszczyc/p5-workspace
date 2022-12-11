class Symbol {
    constructor(x, y, framesPerMove) {
        this.x = x;
        this.y = y;
        this.framesPerMove = framesPerMove;
        this.value;
        this.first = false;
    }

    setRandomSymbol() {
        this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
    }
}
