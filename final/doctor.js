let LivingCreature = require("./livingCreature")
let random = require("./random")
module.exports = class Doctor extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
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


    cure(){
        let cures = this.chooseCell(2)
        let cures1 = this.chooseCell(3)
        let cure1 = random(cures1)
        let cure = random(cures)
        if(cure){ 
               
            this.energy-=15;
        }
        else if(cure1){  
          
            this.energy-=10
        }
        else if (this.energy <= 9) { 
             
            this.die()
        }
        else if(grassEaterArr.length==0){
            for (var i in doctorArr) {
                doctorArr[i].die();
            }
        }
    }

    

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in doctorArr) {
            if (this.x == doctorArr[i].x && this.y == doctorArr[i].y) {
                doctorArr.splice(i, 1);
                break;
            }
        }
    }

    
}