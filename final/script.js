const socket = io()
let side = 15
let sideX = 110
let sideY =  70
let summer = document.getElementById('pElement')
let winter = document.getElementById('ppElement')

socket.on('update matrix', (data)=>{
    drawful(data) 
})

function setup() {
    createCanvas(sideX * side, sideY * side);
    background('#acacac');
}

function drawful(matrix) { 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                if(arjeq==true){
                    fill("white")
                }
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

var arjeq = false

function click(evt) {
    arjeq = false
    socket.emit('weather', arjeq)
 }
 summer.addEventListener("click", click);


 function click1(evt) {
    arjeq = true
    socket.emit('weather', arjeq)
 }
 winter.addEventListener("click", click1);
 