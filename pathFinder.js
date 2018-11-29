var startPathFinder = function(){

    this.calculatedData = [];
    this.doneCalculationData = false;
    this.currOpen = -1;
    this.neightbour = [];
    //
    this.getHeuristicValue = function(_currCell){
        var endCell = grid.gridData[grid.endPointData.endPoint];
        // sqrt ( (current_cell.x – goal.x)2 + 
        //     (current_cell.y – goal.y)2 ) 
        if(_currCell.visited || _currCell.block){
            return 19999;
        }
        return Math.sqrt(  (_currCell.cellX - endCell.cellX) * (_currCell.cellX - endCell.cellX) 
                            +  ((_currCell.cellY - endCell.cellY) * (_currCell.cellY - endCell.cellY)));  
        // return Math.max(Math.abs(_currCell.cellX - endCell.cellX),Math.abs(_currCell.cellY - endCell.cellY));

    }


    this.cellNeighbour = function(){

        this.neightbour.push(grid.gridData[this.currOpen-1-grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen-1-grid.matrix.rows]);
        this.neightbour.push(grid.gridData[this.currOpen-grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen-grid.matrix.rows]);
        this.neightbour.push(grid.gridData[this.currOpen+1-grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen+1-grid.matrix.rows]);

        this.neightbour.push(grid.gridData[this.currOpen+1] == undefined ? -1 : grid.gridData[this.currOpen+1]);
        this.neightbour.push(grid.gridData[this.currOpen+1+grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen+1+grid.matrix.rows]);
        this.neightbour.push(grid.gridData[this.currOpen+grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen+grid.matrix.rows]);
        this.neightbour.push(grid.gridData[this.currOpen-1+grid.matrix.rows] == undefined ? -1 : grid.gridData[this.currOpen-1+grid.matrix.rows]);

        this.neightbour.push(grid.gridData[this.currOpen-1] == undefined ? -1 : grid.gridData[this.currOpen-1]);


    };
    this.calculateCost = function(){

        for(var i = 0 ; i < 8 ; i++){
            if(this.neightbour[i] == -1){

                this.calculatedData.push({
                    pos : 'top_left',
                    cellX :  0,
                    cellY :  0,
                    cellHeight : 0,
                    cellID : this.neightbour[i].cellID,
                    block : this.neightbour[i].block,
                    visited : this.neightbour[i].visited,
                    travel : this.neightbour[i].travel,
                    value : -1
                }); // top_left
            
            }else{
                if(i % 2 == 0){
                    this.calculatedData.push({
                        pos : 'top_left',
                        cellX :  this.neightbour[i].cellX,
                        cellY :  this.neightbour[i].cellY,
                        cellHeight : this.neightbour[i].cellHeight,
                        cellID : this.neightbour[i].cellID,
                        block : this.neightbour[i].block,
                        visited : this.neightbour[i].visited,
                        travel : this.neightbour[i].travel,
                        value : (10 + this.getHeuristicValue(this.neightbour[i])).toFixed(2)
                    }); // top_left
                }else{
                    this.calculatedData.push({
                        pos : 'top_left',
                        cellX :  this.neightbour[i].cellX,
                        cellY :  this.neightbour[i].cellY,
                        cellHeight : this.neightbour[i].cellHeight,
                        cellID : this.neightbour[i].cellID,
                        block : this.neightbour[i].block,
                        visited : this.neightbour[i].visited,
                        travel : this.neightbour[i].travel,
                        value : (14 + this.getHeuristicValue(this.neightbour[i])).toFixed(2)
                    }); // top_left
                }
                
            
            }
        }
        
        console.log(this.calculatedData)
        this.doneCalculationData = true; 
    }

    this.printData = function(){

        for(var p = 0 ; p < this.calculatedData.length ; p++){
            if(this.calculateCost[p] != -1){
                text(this.calculatedData[p].value,this.calculatedData[p].cellX + (this.calculatedData[p].cellHeight/4),this.calculatedData[p].cellY + (this.calculatedData[p].cellHeight/4))
            }
            
        }

    }

}