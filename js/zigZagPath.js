function zigZagPath(startX, startY, length, width, loops, angle){
    this.startX=startX;
    this.startY=startY;
    this.length=length;
    this.width=width;
    this.loops=loops;
    this.angle=angle;
}

zigZagPath.prototype.draw = function(){
    strokeWeight(2);
    ang = this.angle*(PI/180)
    translate(this.startX, this.startY)
    if(ang)   rotate(ang);
    for (x=y=i=0; i<this.loops; i++, x+=this.width*2){
        line(x, y, x, y+this.length)
        line(x, y+this.length, x+this.width, y+this.length)
        line(x+this.width, y+this.length, x+this.width, y)
        line(x+this.width, y, x+this.width*2, y)
    }
    if(ang) rotate(-ang);
    translate(-this.startX,-this.startY)
    strokeWeight(1);
}
