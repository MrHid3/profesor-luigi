export class Piece {
    constructor(id, color1, color2, nameOfContainer, game){
        this.game = game;
        this.nameOfContainer = nameOfContainer;
        this.id = id;
        this.x = 3;
        this.y = 1;
        // let falling = true;
        this.color1 = color1;
        this.color2 = color2;
        this.rotation = 0;
        this.rotationx = 1;
        this.rotationy = 0
        this.oldrotationx = this.rotationx;
        this.oldrotationy = this.rotationy;
        this.oldy = this.y;
        this.oldx = this.x;
    }

    drawPiece(){
        this.game.playingField[this.y][this.x] = [this.color1, this.id];
        this.game.playingField[this.y + this.rotationy][this.x + this.rotationx] = [this.color2, this.id];

        // console.log("draw")
    }

    erasePiece(){
        this.game.playingField[this.oldy][this.oldx] = [null, null];
        this.game.playingField[this.oldy + this.oldrotationy][this.oldx + this.oldrotationx] = [null, null]

        // console.log("erase", this.oldy, this.oldx)
    }

    ltg(){
        let falling = true;
        let changed = false;
        document.addEventListener('keypress', (event) => {
            if(falling){
                if(event.key === "d") { //prawo
                    if (this.x !== 7
                        && this.x + this.rotationx !== 7
                        && this.game.playingField[this.y][this.x + (this.rotationx === 1? 2: 1)][0] === null
                    ){
                        this.x += 1;
                        // console.log("prawo")
                    }
                }
                else if(event.key === "a") { //lewo
                    if (this.x !== 0
                        && this.x + this.rotationx !== 0
                        && this.game.playingField[this.y][this.x - (this.rotationx === -1? 2: 1)][0] === null
                    ) {
                        this.x -= 1;
                        // console.log("lewo")
                    }
                }
                else if(event.key === "f"
                    && !changed) {
                    switch(this.rotation){
                        case 0: // do góry
                            this.rotation = 1;
                            this.rotationx = 0;
                            this.rotationy = -1;
                            break;
                        case 1: // na lewo
                            if(this.x !== 0
                                && this.game.playingField[this.y][this.x - 1][0] === null
                            ){
                                this.rotation = 2;
                                this.rotationx = -1;
                                this.rotationy = 0;
                                this.x += 1;
                            }
                            break;
                        case 2: //w dół
                            if(this.y !== 15
                                && this.game.playingField[this.y + 1 + (falling? 0: 1)][this.x][0] === null){
                                this.rotation = 3;
                                this.rotationx = 0;
                                this.rotationy = 1;
                                this.x -= 1;
                            }
                            break;
                        case 3: // na prawo
                            if(this.x !== 7
                                && this.game.playingField[this.y][this.x + 1][0] === null

                            ){
                                this.rotation = 0;
                                this.rotationx = 1;
                                this.rotationy = 0;
                            }
                            break;
                    }
                    changed = true;
                }
            }})
        setInterval(() => {
            changed = false;
            if(falling){
                if(this.y === 15
                    || this.y + this.rotationy === 15
                    || this.game.playingField[this.y + (this.rotationy === 1? 2: 1)][this.x][0] !== null
                    || this.game.playingField[this.y + (this.rotationy === 1? 2: 1)][this.x + this.rotationx][0] !== null
                ) {
                    falling = false;
                    this.erasePiece()
                    this.drawPiece();
                    this.game.render()
                    this.game.playingField[this.y][this.x] = [this.color1, this.id];
                    this.game.playingField[this.y + this.rotationy][this.x + this.rotationx] = [this.color2, this.id];
                    this.game.starDestroyer();
                    let nowy = new Piece(this.id + 1, "yellow", "red", this.nameOfContainer, this.game);
                    nowy.ltg();
                }else{
                    this.erasePiece();
                    this.y += 1;
                    this.drawPiece();
                    this.game.render()
                    this.oldx = this.x;
                    this.oldy = this.y;
                    this.oldrotationx = this.rotationx;
                    this.oldrotationy = this.rotationy;
                    console.log(this.rotation);
                    // console.log("normalne spadanie")
                }
            }
        }, 200)

    }
}