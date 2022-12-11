class Stream {
    constructor() {
        this.symbols = []; 
        this.totalSymbols = 2
        this.framesPerMove = round(random(2, 6));
        this.symbolSize = round(random(10, 25))
    }

    move() {
        if (frameCount % this.framesPerMove != 0)
            return

        let symbol = this.getSymbolCopy(this.symbols[0])
        symbol.setRandomSymbol()
        symbol.y += this.symbolSize
        
        // Reset if bottom is reached or randomly before that
        if (symbol.y > height + this.symbolSize / 2 || random(1) < this.symbolSize/height) {
            this.reset(symbol)
        }
        
        this.symbols.unshift(symbol)
        this.symbols.pop()
        this.symbols[1].first = false
    }

    generateSymbols(x, y) {
        for (let i = 0; i < this.totalSymbols; i++) {
            let symbol = new Symbol(x, y, this.framesPerMove);
            symbol.setRandomSymbol();
            this.symbols.push(symbol);
            y -= this.symbolSize;
        }

        this.symbols[0].first = round(random(0, 4)) == 1 ? true : false;
    }

    render() {
        this.move()
        textSize(this.symbolSize);

        for(symbol of this.symbols){
            if (symbol.first) {
                fill(180, 255, 180);
                textStyle(BOLD);
            }
            else {
                fill(0, 255, 70);
                textStyle(NORMAL);
            }
            text(symbol.value, symbol.x, symbol.y);
        }
    }

    getSymbolCopy(symbol) {
        let newSymbol = new Symbol(symbol.x, this.symbols[0].y, this.framesPerMove); 
        newSymbol.first = true

        return newSymbol
    }

    reset(symbol){
        symbol.y = -this.symbolSize / 2;
        symbol.x = random(width)
    }
}
