var matrix = [
];

let num1 = 140;
let num2 = 140;

function createMatrix(num1, num2) {
for( let i = 0 ; i < num1; i++){
matrix.push([])
for(let j = 0; j< num2 ; j++) {
matrix[i].push(0)
}
}
}


function character(index, count) {
for (let a = 0; a < count; a++) {
var x = Math.floor(random(0, num1))
var y = Math.floor(random(0, num2))
if( matrix[x][y] == 0){
matrix[x][y] = index
}
}
}



var side = 14;
var grassArr = [];
var grassEaterArr = []
var predatorArr = []
var bombArr = []
var doctorArr = []



function setup() {
    createMatrix(num1, num2)
    character(1,200)
    character(2,400)
    character(3,250)
    character(4,45)
    character(5,50)
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 0) {

            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y, 2);
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y, 3);
                predatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                var gr = new Bomb(x, y, 4);
                bombArr.push(gr)
            }
            else if (matrix[y][x] == 5) {
                var gr = new Doctor(x, y, 5);
                doctorArr.push(gr)
            }
        }
    }

}

function draw() {
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
            else {
                fill("yellow")
            }

            rect(x * side, y * side, side, side);

        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in bombArr) {
        bombArr[i].eat();
    }
    for (var i in doctorArr) {
        doctorArr[i].cure();
    }

}

