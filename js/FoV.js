function FoV(squareX, squareY, side, probability){
    this.squareX = squareX
    this.squareY = squareY
    this.side = side
    this.probability = probability
}

FoV.prototype.draw = function(){
    strokeWeight(1)
    stroke(0, 60)
    // noStroke()
    colorMode(HSB, 100)
    fill((1-this.probability)*70, 100, 100, 8);
    square(this.squareX, this.squareY, this.side)
    colorMode(RGB)
}
