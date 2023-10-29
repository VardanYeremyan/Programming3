const socket = io()
let side = 15
let sideX = 110
let sideY = 70
let summer = document.getElementById('pElement')
let winter = document.getElementById('ppElement')
let fire = document.getElementById('pppElement')





var data = {}

var p = document.createElement('p')
document.body.appendChild(p)

function countAllChar(initialMatrix) {
    var allGrassCount = 0;
    var allGrassEaterCount = 0;
console.log(initialMatrix.length)
    for (var y = 0; y < initialMatrix.length; y++) {
        for (var x = 0; x < initialMatrix[y].length; x++) {
            if (initialMatrix[y][x] == 1) {
                allGrassCount++;
                data.allGrass = allGrassCount
            }
            if (initialMatrix[y][x] == 2) {
                allGrassEaterCount++;
                data.allGrassEater = allGrassEaterCount
            }
        }
    }

    return data
}



socket.on('update matrix', (data) => {
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
                if (arjeq == true) {
                    fill("white")
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            }
            else if (matrix[y][x] == 5) {
                fill("purple")
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 6) {
                fill("#00EFED")
            }
            else if (matrix[y][x] == 7) {
                fill("orange")
            }


            rect(x * side, y * side, side, side);

        }
    }

    socket.emit('Total statistics', countAllChar())
    socket.on('display statistics', (data) => {
        let statistics = data

        var updatedText = '';
        for (var key in statistics) {
            updatedText += '\n' + key + ' ' + statistics[key];
        }
        p.innerText = updatedText;


    })

}

var arjeq = false
var value = false
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

 function click2(evt) {
     value = true
     socket.emit('krak', value)
 }
 fire.addEventListener("click", click2);







