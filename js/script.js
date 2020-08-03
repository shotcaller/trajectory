let nPts, postProc, leftCanvas, rightCanvas;

leftCanvas = new p5(
    (lCanvas) => {
        lCanvas.setup = function(){
            let canvWidth = innerWidth*0.5
            let canvHeight = innerHeight*0.8

            canvas = lCanvas.createCanvas(canvWidth, canvHeight);

            
            canvas.position(0, 0)
            initMap(canvas);
            //canvas.style('margin',48)
            canvas.style('border', '5px solid #3a3a3a')

            nPts = new newPoints()
            nPts.showTimeSelection();
            nPts.showInputBox();
            nPts.showAnimateButton();

            // nPts.showExportButton();

            myMap.onChange(()=>{
                nPts.plotPoints()
            });

            lCanvas.frameRate(120);
            lCanvas.fill('#3a3a3a');
        }

        lCanvas.draw = function(){

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
    }
);

rightCanvas = new p5(
    (rCanvas) => {
        let lup = false;

        rCanvas.setup = function(){
            let  canvWidth = innerWidth*0.5, canvHeight = innerHeight*0.8;
            canvas = rCanvas.createCanvas(canvWidth, canvHeight)
            canvas.position(innerWidth*0.5, 0)
            canvas.style('border', '5px solid #3a3a3a')

            // rCanvas.background('#3a3a3a')
            // area1 = new searchArea(320, 320, 300, 10)
            // area1.generateFoVs()
            // zz = new zigZagPath(100, 100, 200, 10, 40, 35);

            postProc = new postProcCanvas()
            postProc.showExportButton()

            rCanvas.noLoop();
        }

        rCanvas.draw = function(){
            // rCanvas.clear()
            // area1.FoVs.forEach(x=>{x.forEach(y=>{y.draw()})});
            // area1.draw();
            // area1.drawBoundary();
            // zz.draw();
        }

        function mousePressed(){
            // lup = !lup
            // if(lup)
            // loop()
            // else noLoop()
            // area1.updateProbabilities(mouseX, mouseY, 1, 0.05)
        }
    }
);