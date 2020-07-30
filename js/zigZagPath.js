function zigZagPath(startX, startY, length, width, loops, angle){
    this.p5 = canvas._pInst;

    this.startX=startX;
    this.startY=startY;
    this.length=length;
    this.width=width;
    this.loops=loops;
    this.angle=angle;
}

zigZagPath.prototype.draw = function(){
    this.p5.strokeWeight(1);
    this.p5.stroke('rgba(0,255,0,0.25)');
    ang = this.angle*(this.p5.PI/180)

    this.p5.translate(this.startX, this.startY)

    if(ang)   this.p5.rotate(ang);

    for (x=y=i=0; i<this.loops; i++, x+=this.width*2){
        this.p5.line(x, y, x, y+this.length)
        this.p5.line(x, y+this.length, x+this.width, y+this.length)
        this.p5.line(x+this.width, y+this.length, x+this.width, y)
        this.p5.line(x+this.width, y, x+this.width*2, y)
    }

    if(ang) this.p5.rotate(-ang);

    this.p5.translate(-this.startX,-this.startY)
    this.p5.strokeWeight(1);
}
