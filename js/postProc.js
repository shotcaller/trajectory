function postProcCanvas(){
    this.p5 = canvas._pInst;
    this.fovs = [];
    this.pointsInFovs = [];
}

postProcCanvas.prototype.plotPoints = function(){
    this.p5.stroke(1)
    this.pointsCoords.forEach(element => {
        this.p5.ellipse(element.x, element.y, 2, 2);
    });
}

postProcCanvas.prototype.drawHull = function(){
    this.p5.stroke(1)

    this.p5.fill(255, 20, 200, 40);
    this.p5.beginShape();

    this.hullCoords.forEach(element => {
        this.p5.vertex(element.x, element.y);
    });

    this.p5.endShape(this.p5.CLOSE);
}

postProcCanvas.prototype.drawRect = function(){
    this.p5.stroke(1)

    this.p5.rectMode(this.p5.CORNERS)
    this.p5.noFill()
    this.p5.rect(this.rectCoords[0], this.rectCoords[1],this.rectCoords[2], this.rectCoords[3])
}

postProcCanvas.prototype.updateCanvas = function (){
    this.pointsCoords = nPts.p5Coords;
    this.hullCoords = nPts.hullCoords;
    this.rectCoords = nPts.rectCoords;
    this.sideOffset = nPts.sideOffset;

    this.p5.clear();
    // this.drawHull();
    this.drawRect();
    // this.plotPoints();
    this.drawPath();
    this.plotFoVs();
}

postProcCanvas.prototype.showExportButton = function () {
    // exportButton = this.p5.createButton('Export');
    // exportButton.position(800, canvas.height+30);
    // exportButton.style('background-color', '#3a3a3a')
    exportButton = document.querySelector('#export')

    exportButton.onclick  = () => {
        console.log('EXpORT')

        this.updateCanvas();
    };
}

postProcCanvas.prototype.drawPath = function(){
    let p = new paths();
    p.drawZigZag(this.rectCoords[0], this.rectCoords[1], 400, 10, 100, 0);
}

postProcCanvas.prototype.generateFovs = function(){
    this.pointsInFovs = [];
    this.fovs = [];

    for(startX = this.rectCoords[0], i = 0; startX < this.rectCoords[2]; startX += this.sideOffset){
        for(startY = this.rectCoords[1]; startY < this.rectCoords[3]; startY += this.sideOffset){
            let x1 = startX, y1 = startY, x2 = startX+this.sideOffset, y2 = startY+this.sideOffset;
            this.pointsInFovs.push(0);

            this.pointsCoords.forEach(element => {
                if(element.x <= x2 && element.x >= x1)
                    if(element.y <= y2 && element.y >= y1)
                        this.pointsInFovs[this.pointsInFovs.length - 1]++;
            })

            this.fovs.push(new FoV(startX,startY, this.sideOffset, 0 ))
        }
    }
}

postProcCanvas.prototype.plotFoVs = function(){
    this.generateFovs();
    maxPoints = {
        index : 0,
        value : 0
    }

    this.pointsInFovs.forEach((element, index) => {
        if(element > maxPoints.value ){
            maxPoints.value = element
             maxPoints.index = index
        }
    });

    this.pointsInFovs.forEach((element, index) => {
        this.fovs[index].probability = this.p5.map(element, 0, maxPoints.value, 0, 1);
    });

    this.fovs.forEach((element, index) => {
        element.draw();
    });

    this.p5.point(this.fovs[maxPoints.index].squareX + this.sideOffset/2, this.fovs[maxPoints.index].squareY + this.sideOffset/2)
}