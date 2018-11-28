# Implementation of A* Algorithm

My version of A* Algorithm has been implemented using JavaScript with the help of an animation library p5.js

# Usage
On screen loads, the code automatically selects the end-point which is identified by a red node. 
A start-point can be selected by left-clicking on any of the cell in the grid. When there is a start-point then the algorithm runs automatically and gives the shortest-path.

# Screenshots

![Imgur](https://i.imgur.com/FOQmknp.png)

# Heuristics Formula Used
```
h = sqrt ( (current_cell.x – goal.x)2 + 
            (current_cell.y – goal.y)2 )
```

# Color Identification
Red - End Node <br>
Green - Path <br>
Dark Green - Travelled Path (Closed)<br>
