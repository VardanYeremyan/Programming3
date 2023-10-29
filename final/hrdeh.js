let LivingCreature = require("./livingCreature")
let random = require("./random")
module.exports = class Hrdeh extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 20;
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
            var eater = new Hrdeh(newCell[0], newCell[1], this.index);
            hrdehArr.push(eater);
            matrix[newCell[1]][newCell[0]] = 7;
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
            matrix[newY][newX] = 7
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }
    }



    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hrdehArr) {
            if (this.x == hrdehArr[i].x && this.y == hrdehArr[i].y) {
                hrdehArr.splice(i, 1);
                break;
            }
        }
    }
}

