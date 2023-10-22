let LivingCreature = require("./livingCreature");
let random = require("./random")
module.exports = class Bomb extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
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


    eat() {
        let food5 = this.chooseCell(6)
        let food3 = this.chooseCell(3)
        let foods = this.chooseCell(2)
        let food4 = this.chooseCell(1)
        let food = random(foods)
        let food2 = random(food3)
        let foody = random(food4)
        let foood = random(food5)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (food2) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food2[0]
            let newY = food2[1]
            matrix[food2[1]][food2[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foody) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = foody[0]
            let newY = foody[1]
            matrix[foody[1]][foody[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foood) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = foood[0]
            let newY = foood[1]
            matrix[foood[1]][foood[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in banArr) {
                if (newX == banArr[i].x && newY == banArr[i].y) {
                    banArr.splice(i, 1);
                    break;
                }
            }
        }


        else {

            this.energy--
            if (this.energy <= 0) {
                this.die()
            }
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
}