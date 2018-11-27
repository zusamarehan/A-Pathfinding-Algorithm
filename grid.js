var createGrid = function(_gridX,_gridY){

    this.matrix = {
        rows : _gridX,
        cols : _gridY
    }
    
    this.endPointData = {
        availableEndPoint : false,
        endPoint : -1
    }
    
    this.startPointData = {
        availableStartPoint : false,
        startPoint : -1
    }

    this.gridData = [];
    this.cellWidth = (width-1)/this.matrix.cols;
    this.cellHeight = (height-1)/this.matrix.rows;

    //
    this.assignCellPoints = function(){

        var tempCellX = 0;
        var tempCellY = 0;
        var tempCount = 1;

        for(var i = 1 ; i <= (this.matrix.rows) ; i++){
            
            for(var z = 1 ; z <= this.matrix.cols ; z++){
   
                this.gridData.push({
                    row : i,
                    cols : z,
                    cellX : tempCellX,
                    cellY : tempCellY,
                    cellWidth : this.cellWidth,
                    cellHeight : this.cellHeight,
                    cellID : tempCount
                });
                tempCellX += this.cellWidth
                tempCount++;                 

            }

            tempCellY += this.cellHeight;
            tempCellX = 0;
        }

    }

    //
    this.drawCells = function(){

        for(var d = 0 ; d < this.gridData.length ; d++){

            push();
                // strokeWeight(2);
                // noStroke();
                if(this.gridData[d].endPoint){
                    fill(color(255,0,0));
                }
                
                if(this.gridData[d].startPoint){
                    fill(color(124,252,0));
                }
                if(this.gridData[d].travel){
                    fill(color(124,252,0));
                }
                if(this.gridData[d].visted){
                    fill(color(0,100,0));
                }
                rect(this.gridData[d].cellX,this.gridData[d].cellY,this.gridData[d].cellWidth,this.gridData[d].cellHeight);
                push()
                fill(0)
                textSize(8);
                text(d+1,this.gridData[d].cellX + (this.gridData[d].cellHeight/2),this.gridData[d].cellY + (this.gridData[d].cellHeight/2))
                pop();
            pop();

        }

    }

    //
    this.pickEndPoint = function(){

        return Math.round(random(0,this.gridData.length-1));
        
    }
    //
    this.markEndPoint = function(){
        
        if(this.endPointData.availableEndPoint == false){

            var endPoint = this.pickEndPoint();
        
            if(this.gridData[endPoint] != undefined){
                this.gridData[endPoint].endPoint = true;
            }
        
            this.endPointData.availableEndPoint = true;
            this.endPointData.endPoint = endPoint;
        
        }
        
    }

    //
    this.clicked = function(_i,_options){

        if(mouseX > (this.gridData[_i].cellX) && mouseX < (this.gridData[_i].cellX+this.gridData[_i].cellWidth)){

            if(mouseY > this.gridData[_i].cellY && mouseY < (this.gridData[_i].cellY+this.gridData[_i].cellWidth)){
                
                this.gridData[_i].openState = true;
                this.gridData[_i].startPoint = _i;
                return true;
    
            }
    
        }

    }

    this.selectNextCell = function(){
       
        var newLowest = -1;
        var newIndex = -1;
        var loopIndex = -1;
        var temp = false;
        for(var f = 0 ; f < pathFinder.calculatedData.length ; f++){

            console.log(+pathFinder.calculatedData[f].value);
            if(+pathFinder.calculatedData[f].value != -1){
                
                if(f == 0 || temp){
                    newLowest = +pathFinder.calculatedData[f].value;
                    newIndex = +pathFinder.calculatedData[f].cellID;
                    temp = false;
                    loopIndex = f;
                }
                else if(+pathFinder.calculatedData[f].value == 10 || +pathFinder.calculatedData[f].value == 14){
                    noLoop(); 
                }
                else if(+pathFinder.calculatedData[f].value < newLowest){
                    newLowest = +pathFinder.calculatedData[f].value;
                    newIndex = +pathFinder.calculatedData[f].cellID;
                    // console.log(newLowest,+pathFinder.calculatedData[f].cellID);
                    loopIndex = f;
                }
            }else{
                temp = true;
            }
            
        }
        
        for(var c = 0 ; c < pathFinder.calculatedData.length ; c++){
            if(pathFinder.calculatedData[c].cellID != newIndex){
                // console.log(pathFinder.calculatedData[c].cellID + '+++++++++++');
                if(grid.gridData[pathFinder.calculatedData[c].cellID] != undefined){
                    if(grid.gridData[pathFinder.calculatedData[c].cellID-1].travel != true){
                        grid.gridData[pathFinder.calculatedData[c].cellID-1].visted = true;
                    }
                }
                
                    
                
            }
            // console.log(pathFinder.calculatedData[c].cellID +"====="+ newIndex);
            
        }
            // grid.gridData[newIndex-1].visited = false;
        grid.gridData[newIndex-1].travel = true;

        pathFinder.currOpen = newIndex-1;
        pathFinder.doneCalculationData = false;
        pathFinder.calculatedData = [];
        pathFinder.neightbour = [];

    }

}