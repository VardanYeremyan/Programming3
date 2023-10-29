let LivingCreature = require("./livingCreature")
let random = require("./random")
module.exports = class Ban extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 10;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
       this.getNewCoordinates()
       return super.chooseCell(character)
    }




    mul() {
        var newCell = random(this.chooseCell(3));
        if (newCell) {
            var eater = new Ban(newCell[0], newCell[1], this.index);
            grassEaterArr.push(eater);
            matrix[newCell[1]][newCell[0]] = 6;
        }
    }




    eat() {
        let foods = this.chooseCell(3)
        let food = random(foods)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
            console.log("eat", newX, newY);
            for (var i in banArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }



    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
            console.log("move", newX, newY);
        }

        if (this.energy <= 0) {
            this.die()
        }
    }


    die() { 
        console.log("die", this.x, this.y);
        matrix[this.y][this.x] = 0;
        for (var i in banArr) {
            if (this.x == banArr[i].x && this.y == banArr[i].y) {
                banArr.splice(i, 1);
                break;
            }
        }
    }
}