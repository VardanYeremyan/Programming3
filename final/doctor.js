class Doctor {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 50;
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
        var found = [];
        this.getNewCoordinates()
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
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