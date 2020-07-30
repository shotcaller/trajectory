function paths(){
    this.p5 = canvas._pInst;
}

paths.prototype.drawZigZag = function(startX, startY, length, width, loops, angle){
    this.p5.strokeWeight(1);
    this.p5.stroke('rgba(0,255,0,0.25)');
    ang = angle*(this.p5.PI/180)

    this.p5.translate(startX, startY)

    if(ang)   this.p5.rotate(ang);

    for (x=y=i=0; i<loops; i++, x+=width*2){
        this.p5.line(x, y, x, y+length)
        this.p5.line(x, y+length, x+width, y+length)
        this.p5.line(x+width, y+length, x+width, y)
        this.p5.line(x+width, y, x+width*2, y)
    }

    if(ang) this.p5.rotate(-ang);

    this.p5.translate(-startX,-startY)
    this.p5.strokeWeight(1);
}
