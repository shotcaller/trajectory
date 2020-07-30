function postProcCanvas(pC, hC, rC){
    this.p5 = canvas._pInst;
    this.hullCoords = hC;
    this.pointsCoords = pC;
    this.rectCoords = rC;
}

postProcCanvas.prototype.initCanv = function(){
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

    this.p5.clear();
    this.drawHull();
    this.drawRect();
    this.plotPoints();
    this.drawPath();
}

postProcCanvas.prototype.showExportButton = function () {
    exportButton = this.p5.createButton('Export');
    exportButton.position(800, canvas.height+30);

    exportButton.mousePressed(() => {
        this.updateCanvas();
    });
}

postProcCanvas.prototype.drawPath = function(){
    let p = new zigZagPath(this.rectCoords[0], this.rectCoords[1], 400, 10, 100, 0);
    p.draw();
}
