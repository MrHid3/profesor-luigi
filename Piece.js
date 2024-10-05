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
        let cont = document.getElementById(this.nameOfContainer);
        cont.children[this.y].children[this.x].style.backgroundColor = this.color1;
        cont.children[this.y + this.rotationy].children[this.x + this.rotationx].style.backgroundColor = this.color2;

        // console.log("draw")
    }

    erasePiece(){
        let cont = document.getElementById(this.nameOfContainer);
        // this.playingField[y][x] = null;
        // this.playingField[y + 1][x] = null;
        cont.children[this.oldy].children[this.oldx].style.backgroundColor = "transparent"; /*console.log("ereased" + oldx + "/" + oldy);*/
        cont.children[this.oldy + this.oldrotationy].children[this.oldx + this.oldrotationx].style.backgroundColor = "transparent"; /*console.log("erased" + (oldx + oldrotationx) + "/" + (oldy + oldrotationy))*/

        // console.log("erase")
    }

    ltg(){
        let falling = true;
        document.addEventListener('keypress', (event) => {
            if(falling){
                if(event.key == "d") { //prawo
                    if (this.x != 7 &&
                        this.x + this.rotationx != 7 &&
                        this.game.playingField[this.y][this.x + 1] == null &&
                        this.game.playingField[this.y][this.x + this.rotationx + 1] == null){
                        this.x += 1;
                        // console.log("prawo")
                    }
                }
                else if(event.key == "a") { //lewo
                    if (this.x != 0 &&
                        this.x + this.rotationx != 0 &&
                        this.game.playingField[this.y][this.x-1] == null
                        && this.game.playingField[this.y][this.x + this.rotationx - 1] == null){
                        this.x -= 1;
                        // console.log("lewo")
                    }
                }
                else if(event.key == "f") {
                    switch(this.rotation){
                        case 0: // do góry
                            this.rotation = 1;
                            this.rotationx = 0;
                            this.rotationy = -1;
                            break;
                        case 1: // na lewo
                            if(this.x != 0){
                                this.rotation = 2;
                                this.rotationx = -1;
                                this.rotationy = 0;
                                this.x += 1;
                            }
                            break;
                        case 2: //w dół
                            if(this.y != 15 &&
                                this.game.playingField[this.y + 1][this.x] == null){
                                this.rotation = 3;
                                this.rotationx = 0;
                                this.rotationy = 1;
                                this.x -= 1;
                            }
                            break;
                        case 3: // na prawo
                            if(this.x != 0){
                                this.rotation = 0;
                                this.rotationx = 1;
                                this.rotationy = 0;
                            }
                            break;
                    }

                }
            }})
        return new Promise((resolve) => {
            setInterval(() => {
                if(falling){
                    if(this.y == 15 ||
                        this.y + this.rotationy == 15||
                        this.game.playingField[this.y + this.rotationy + 1][this.x + this.rotationx] != null ||
                        this.game.playingField[this.y+1][this.x] != null) {
                        falling = false;
                        // if(this.y == 1) this.end = true;                                                     NIGGA FAIL STATE
                        this.erasePiece()
                        // y += 1;
                        this.drawPiece();
                        this.game.playingField[this.y][this.x] = this.color1;
                        this.game.playingField[this.y + this.rotationy][this.x + this.rotationx] = this.color2;
                        // this.starDestroyer()                                                                 NIGGA STAR DESTROYER
                        // console.log("koniec")
                        resolve(1)
                    }else{
                        this.erasePiece();
                        this.y += 1;
                        this.drawPiece();
                        this.oldx = this.x;
                        this.oldy = this.y;
                        this.oldrotationx = this.rotationx;
                        this.oldrotationy = this.rotationy;
                        // console.log("normalne spadanie")
                    }
                }
            }, 200)
        })

    }
}