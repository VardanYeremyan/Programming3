const socket = io()
let side = 15
let sideX = 110
let sideY =  70




function setup() {
    createCanvas(sideX * side, sideY * side);
    background('#acacac');
}

function drawful(matrix) { 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } 
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if(matrix[y][x] == 4) {
                fill("black")
            }
            else if(matrix[y][x] == 5) {
                fill("purple")
            }
            else if(matrix[y][x] == 2){
                fill("yellow")
            }
            else if(matrix[y][x] == 6){
                fill("#00EFED")
            }
            

            rect(x * side, y * side, side, side);

        }
    }

}

var clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   var str = "Thanks for clicking " + clickCount;
   this.innerText = str;
}

var p = document.getElementById("pElement");
p.addEventListener("click", clickHandler);



socket.on('update matrix', drawful)