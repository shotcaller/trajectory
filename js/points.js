function newPoints() {
    this.p5 = canvas._pInst

    this.p5Coords = [];
    this.hullCoords = [];

    this.currentTime = 0;
    this.timeSelect;

    this.currentTraj = 'all';
    this.trajInput;


    this.animeButt;
    this.animeI = 0;
    this.animeInterval;

    this.rectCoords = [];
}

newPoints.prototype.plotPoints = function () {
    this.p5.clear();
    this.p5Coords = [];

    if (this.currentTraj == 'all') {
        for (i = k = 0; i < jsonData.trajectory.length; i++, k += jsonData.time.length) {

            this.p5Coords.push(myMap.latLngToPixel(jsonData.lat[k + this.timeSelect.elt.selectedIndex], jsonData.lon[k + this.timeSelect.elt.selectedIndex]));
            // fill(k * 3, k * 5, k * 2)
            this.p5.noFill();
            this.p5.ellipse(this.p5Coords[i].x, this.p5Coords[i].y, 2, 2)
        }
        this.drawRect();
        this.findHull();
        postProc.updateCanvas();
        // this.drawSquares();

    } else {
        for (i = 0; i < jsonData.time.length; i++) {
            this.p5Coords.push(myMap.latLngToPixel(jsonData.lat[i + (this.currentTraj*jsonData.time.length)], jsonData.lon[i + (this.currentTraj*jsonData.time.length)]));
            ellipse(this.p5Coords[i].x, this.p5Coords[i].y, 5, 5)
        }
    }

}

newPoints.prototype.findHull = function(){
        this.p5Coords.sort((a, b) => {
            return a.x == b.x ? a.y - b.y : a.x - b.x;
        });

        var L = [];
        for (var i = 0; i < this.p5Coords.length; i++) {
            while (L.length >= 2 && this.cross(L[L.length - 2], L[L.length - 1], this.p5Coords[i]) <= 0) {
                L.pop();
            }
            L.push(this.p5Coords[i]);
        }
        var U = [];
        for (var i = this.p5Coords.length - 1; i >= 0; i--) {
            while (U.length >= 2 && this.cross(U[U.length - 2], U[U.length - 1], this.p5Coords[i]) <= 0) {
                U.pop();
            }
            U.push(this.p5Coords[i]);
        }
        L.pop();
        U.pop();

        this.hullCoords = [];
        this.hullCoords = L.concat(U);

        this.p5.fill(255, 20, 200, 40);
        this.p5.beginShape();

        for (i = 0; i < this.hullCoords.length; i++)
        this.p5.vertex(this.hullCoords[i].x, this.hullCoords[i].y);

        this.p5.endShape(this.p5.CLOSE);
}

newPoints.prototype.cross = function (a, b, o) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

newPoints.prototype.showTimeSelection = function () {

    this.timeSelect = this.p5.createSelect()
    this.timeSelect.position(300, canvas.height+30)

    jsonData.time.forEach(element => {
        this.timeSelect.option(new Date(element * 1000).toUTCString().slice(5))
    });

    // this.timeSelect.selected('all')

    this.timeSelect.changed(
        () => {
            this.currentTime = this.timeSelect.elt.selectedIndex;
            this.plotPoints();
        }
    );
}

newPoints.prototype.showInputBox = function (){
    this.trajInput = this.p5.createInput()
    this.trajInput.position(10, canvas.height+30);

    trajInputButton = this.p5.createButton('Show');
    trajInputButton.position(this.trajInput.x+this.trajInput.width, canvas.height+30);
    trajInputButton.mousePressed(() => {
        if(this.trajInput.value() != 'all')
            this.currentTraj = int(this.trajInput.value());
        else
            this.currentTraj = 'all';
        this.plotPoints();
    })
}

newPoints.prototype.showAnimateButton = function () {
    this.animeButt = this.p5.createButton('All Traj Animate');
    this.animeButt.position(500, canvas.height+30);
    this.animeButt.mousePressed(() => {
        this.animeInterval = setInterval(() => {
            this.showAnimation(0);
        }, 100);
    });
}

newPoints.prototype.showAnimation = function () {
    this.p5.clear();

    this.p5Coords = [];

    for (j = k = 0; j < jsonData.trajectory.length; j++, k += jsonData.time.length) {

        this.p5Coords.push(myMap.latLngToPixel(jsonData.lat[k + this.animeI], jsonData.lon[k + this.animeI]));
        this.p5.ellipse(this.p5Coords[j].x, this.p5Coords[j].y, 1, 1);
    }
    this.findHull();
    postProc.updateCanvas();
    // this.drawRect();
    // this.drawSquares();

    this.animeI++;

    if (this.animeI >= jsonData.time.length) {
        this.currentTime = jsonData.time.length - 1;
        this.timeSelect.selected(this.timeSelect.elt.options[jsonData.time.length - 1].value)
        this.animeI = 0;
        clearInterval(this.animeInterval)
    }
}

newPoints.prototype.drawRect = function(){

    let xMin = yMin = 99999999, xMax = yMax = 0;

    this.p5Coords.forEach(element => {
        xMin = (element.x < xMin ) ? element.x : xMin
        xMax = (element.x > xMax) ? element.x : xMax
        yMin = (element.y < yMin) ? element.y : yMin
        yMax = (element.y > yMax) ? element.y : yMax
    })

    tempLl = myMap.pixelToLatLng(xMin, yMin);
    tempLl.lat += 0.1;
    tempLl.lng -= 0.1;
    tempPlMin = myMap.latLngToPixel(tempLl.lat, tempLl.lng)

    tempLl = myMap.pixelToLatLng(xMax, yMax);
    tempLl.lat -= 0.1;
    tempLl.lng += 0.1;
    tempPlMax = myMap.latLngToPixel(tempLl.lat, tempLl.lng)

    this.rectCoords = [tempPlMin.x, tempPlMin.y, tempPlMax.x, tempPlMax.y]

    this.p5.rectMode(this.p5.CORNERS)
    this.p5.noFill()
    this.p5.rect(this.rectCoords[0], this.rectCoords[1],this.rectCoords[2], this.rectCoords[3])
}