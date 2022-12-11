class Stream {
    constructor() {
        this.symbols = []; 
        this.totalSymbols = round(random(2, 10));
        this.framesPerMove = round(random(2, 5));
    }

    move() {
        if (frameCount % this.framesPerMove != 0)
            return

        let symbol = this.getSymbolCopy(this.symbols[0])
        symbol.setRandomSymbol()
        symbol.y += symbolSize;

        if (symbol.y > height + symbolSize / 2) 
            symbol.y = -symbolSize / 2;
        
        this.symbols.unshift(symbol)
        this.symbols.pop()
        this.symbols[1].first = false
    }

    generateSymbols(x, y) {
        for (let i = 0; i < this.totalSymbols; i++) {
            let symbol = new Symbol(x, y, this.framesPerMove);
            symbol.setRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }

        this.symbols[0].first = round(random(0, 4)) == 1 ? true : false;
    }

    render() {
        this.move()

        for(symbol of this.symbols){
            if (symbol.first) {
                fill(180, 255, 180);
                textStyle(BOLD);
            }
            else {
                fill(0, 255, 70, symbol.randomAlpha);
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
}
