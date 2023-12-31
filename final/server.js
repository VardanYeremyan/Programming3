
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});

let random = require("./random")

matrix = [];
grassArr = [];
grassEaterArr = []
predatorArr = []
bombArr = []
doctorArr = []
banArr = []
hrdehArr = []
let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./Predator")
let Bomb = require("./bomb")
let Doctor = require("./doctor")
let Ban = require("./ban")
let Hrdeh = require("./hrdeh")

let num1 = 140;
let num2 = 140;


function createMatrix(num1, num2) {
   for (let i = 0; i < num1; i++) {
      matrix.push([])
      for (let j = 0; j < num2; j++) {
         matrix[i].push(0)
      }
   }
}



function character(index, count) {
   for (let a = 0; a < count; a++) {
      var x = Math.floor(random(num1))
      var y = Math.floor(random(num2))
      if (matrix[x][y] == 0) {
         matrix[x][y] = index
      }
   }
}


var weather = false;
var krak;


io.on('connection', function (socket) {
   socket.emit('update matrix', matrix)
   socket.on('weather', function (arjeq) {
      weather = arjeq
   })
   socket.on('krak', function (value) {
      krak = value
   })
   

   socket.on('Total statistics', (data) => {
      fs.writeFileSync('data.json', JSON.stringify(data))
      socket.emit('display statistics', data)
   })
})



function createGame() {
   createMatrix(num1, num2)
   character(1, 400)
   character(2, 440)
   character(3, 250)
   character(4, 45)
   character(5, 40)
   character(6, 40)
   character(7,300)

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
         else if (matrix[y][x] == 6) {
            var gr = new Ban(x, y, 6);
            banArr.push(gr)
         }
         else if (matrix[y][x] == 7) {
            if(krak){
            var gr = new Hrdeh(x, y, 7);
            hrdehArr.push(gr)
            }
         }
      }
   }
}
createGame()



function playGame() {
   for (var i in grassArr) {
      grassArr[i].mul();
   }
   for (var i in hrdehArr) {
      hrdehArr[i].mul();
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
   for (var i in banArr) {
      banArr[i].eat();
   }
   io.emit('update matrix', matrix)
}

setInterval(() => playGame(), 1000);





var t;
var id;
var func = () => {
   clearTimeout(id)
   playGame();
   if (weather) {
      t = 5000
   }
   else {
      t = 500
   }
   id = setTimeout(func, t);
}

id = setTimeout(func, t);



server.listen(3002, () => console.log("server running"))