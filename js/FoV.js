function FoV(squareX, squareY, side, probability){
    this.p5 = canvas._pInst;
    this.squareX = squareX
    this.squareY = squareY
    this.side = side
    this.probability = probability
}

FoV.prototype.draw = function(){
    this.p5.strokeWeight(1)
    this.p5.stroke(0, 60)
    // noStroke()
    this.p5.colorMode(this.p5.HSB, 100)
    this.p5.fill((1-this.probability)*70, 100, 100);
    this.p5.rectMode(this.p5.CORNER)
    this.p5.square(this.squareX, this.squareY, this.side)
    this.p5.colorMode(this.p5.RGB)
}
