function searchArea(circleX, circleY, radius, FoVRange){
    this.circleX = circleX
    this.circleY = circleY
    this.radius = radius
    this.range = FoVRange
    this.FoVs = []
    // this.smartFoVs = []
}

searchArea.prototype.draw = function(){
    noFill()
    strokeWeight(2)
    stroke(0,0,255)
    circle(this.circleX, this.circleY, this.radius*2)
}

searchArea.prototype.drawBoundary = function(){
    noFill()
    strokeWeight(2)
    stroke(0,0,255)
    square(this.circleX-this.radius, this.circleY-this.radius , this.radius*2)
}

searchArea.prototype.generateFoVs = function(){
    MAX = this.radius*2
    maxDivs = MAX/this.range
    startX = this.circleX - this.radius
    startY = this.circleY - this.radius

    for(x = 0; x < maxDivs; x++){
        this.FoVs[x] = []
        for(y = 0; y < maxDivs; y++){
            squareX = startX+(x*this.range)
            squareY = startY+(y*this.range)

            // if(this.isInsideCircle(squareX, squareY/* , 'corner' */))
            this.FoVs[x].push(new FoV(squareX, squareY, this.range, 0))
        }
    }
}

searchArea.prototype.isInsideCircle = function(squareX, squareY/*, mode */){ //checks if given FoV is in circle
    centerOffset = this.range/2

    // if(mode == 'corner'){
        centerX = squareX+centerOffset
        centerY = squareY+centerOffset
    /* }else{
        centerX = squareX
        centerY = squareY
        squareX -= centerOffset
        squareY -= centerOffset
    } */

    ang = atan2(centerY-this.circleY, centerX-this.circleX)*(180/PI)
    cosAng=(ang<0?ang+360:ang)

    for(t = cosAng, quadrant = -1; t > 0; t-=90, quadrant++);
    cornerAdditionXY = [0, 2, 3, 1]
    cornerX = squareX+this.range*(Boolean(cornerAdditionXY[quadrant]&2))
    cornerY = squareY+this.range*(Boolean(cornerAdditionXY[quadrant]&1))

    if(cosAng > 180) cosAng-=180

    if(cosAng>45 && cosAng<90)
        cosAng=90-cosAng
    else if(cosAng>90 && cosAng<135)
        cosAng=cosAng-90
    else if(cosAng>135 && cosAng<180)
        cosAng=180-cosAng

    squareLine = (cosAng == 90) ? centerOffset : centerOffset/cos(cosAng*(PI/180))

    centerDist = Math.hypot(centerY-this.circleY, centerX-this.circleX)
    cornerDist = Math.hypot(cornerY - this.circleY, cornerX - this.circleX)
    permissibleLength = squareLine+this.radius


    return centerDist <= permissibleLength || cornerDist <= this.radius ? 1 : 0
}

searchArea.prototype.updateProbabilities = function(x, y, startProb, desc){
    startX = this.circleX - this.radius
    startY = this.circleY - this.radius

    i = 0;
    j = 0;

    if(dist(this.circleX, this.circleY, x, y) <= this.radius){
        maxI = this.FoVs.length
        maxJ = this.FoVs[i].length

        for(i=0;startX+i*this.range < x;++i);
        for(j=0;startY+j*this.range < y;++j);

        this.ripple(i-1, j-1, startProb, desc)
        redraw()
    }

}

searchArea.prototype.ripple = function(i, j, startProb, desc){
    this.FoVs[i][j].probability = startProb;

    for(p = 1; p < 100; p++){
        startProb-=startProb*desc;
        console.log(startProb)

        for(x = i - p; x <= i + p; ++x)
            if(x >= 0 && x < this.FoVs.length && j-p>=0)
                this.FoVs[x][j-p].probability=startProb

        for(x = i - p; x <= i + p;++x)
            if(x >= 0 && x < this.FoVs.length && j+p < this.FoVs.length)
                this.FoVs[x][j+p].probability=startProb

        for(y = j - p; y <= j + p; ++y)
            if(y >= 0 && y < this.FoVs.length && i-p >= 0)
                this.FoVs[i-p][y].probability=startProb

        for(y = j - p; y <= j + p; ++y)
            if(y >= 0 && y < this.FoVs.length && i+p < this.FoVs.length)
                this.FoVs[i+p][y].probability=startProb
    }

}
/* searchArea.prototype.generateSmartFoVs = function(this.range, X=this.circleX, Y=this.circleY){
    found = area1.smartFoVs.find(({squareX, squareY})=> (squareX == X && squareY == Y))
    // if(found == undefined)
    // console.log(found)
    if(this.isInsideCircle(X, Y, this.range, 'center') && found == undefined){
        this.smartFoVs.push(new FoV(X, Y, this.range, 1))
        this.generateSmartFoVs(this.range, X-this.range, Y)
        this.generateSmartFoVs(this.range, X+this.range, Y)
        this.generateSmartFoVs(this.range, X, Y+this.range)
        this.generateSmartFoVs(this.range, X, Y-this.range)
    }
} */