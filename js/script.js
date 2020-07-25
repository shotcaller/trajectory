
let lup = false;
let canvWidth = 900
let canvHeight = 850

function setup(){
    canvas = createCanvas(canvWidth, canvHeight);
    // background(200)

    // area1 = new searchArea(320, 320, 300, 10)
    // area1.generateFoVs()


    initMap(canvas);

    nPts = new newPoints(canvas, myMap)
    nPts.showTimeSelection();
    nPts.showInputBox();
    nPts.showAnimateButton();

    myMap.onChange(()=>{
        nPts.plotPoints()
    });


    frameRate(120);
    fill(200, 100, 100);
    // noLoop();
}

function draw(){
    // // clear()
    // area1.FoVs.forEach(x=>{x.forEach(y=>{y.draw()})});
    // area1.draw();
    // area1.drawBoundary();
}

function initMap(canvas){
    myMap = new Mappa('Leaflet').tileMap({
        lat : jsonData.lat[0],
        lng : jsonData.lon[0],
        zoom : 9,
        style : "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    });

    myMap.overlay(canvas);
}

function mousePressed(){
    // lup = !lup
    // if(lup)
    // loop()
    // else noLoop()
    // area1.updateProbabilities(mouseX, mouseY, 1, 0.05)

}