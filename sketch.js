var grid;
var pathFinder;

var endCell = -1;
function setup() {
  
  createCanvas(window.innerWidth-10,window.innerHeight-10);
  background("#fff");
  
  grid = new createGrid(25,25);
  grid.assignCellPoints();

  pathFinder = new startPathFinder();
}

function draw() {

  grid.drawCells();
  grid.markEndPoint();
  pathFinder.printData();
  
  if(pathFinder.currOpen != -1 && !pathFinder.doneCalculationData){
    pathFinder.cellNeighbour();
    pathFinder.calculateCost();
    grid.selectNextCell();
  
  }


}

function mousePressed(){

    for(var i = 0 ; i < grid.gridData.length ; i++){

      if(grid.clicked(i)){
        
        grid.startPointData.availableStartPoint = true;
        grid.startPointData.startPoint = i;

        pathFinder.currOpen = i;
        pathFinder.doneCalculationData = false;
        pathFinder.calculatedData = [];
        pathFinder.neightbour = [];
       
        break;
      }

    }
  
}