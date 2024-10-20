export class Piece {
    constructor(id, color1, color2, game){
        this.game = game;
        this.id = id;
        this.x = 3;
        this.y = 0;
        this.color1 = color1;
        this.color2 = color2;
        this.rotation = 0;
        this.rotationx = 1;
        this.rotationy = 0
        this.oldrotationx = this.rotationx;
        this.oldrotationy = this.rotationy;
        this.oldy = this.y;
        this.oldx = this.x;
        let random = Math.floor(Math.random() * 3);
        this.nextcolor1 = random === 0? "brown" : random === 1? "yellow" : "blue";
        random = Math.floor(Math.random() * 3);
        this.nextcolor2 = random === 0? "brown" : random === 1? "yellow" : "blue";
        document.getElementById("onepiece").style.backgroundImage = this.nextcolor1 === "brown" ? 'url("imges/br_left.png")': this.nextcolor1 === "yellow" ? 'url("imges/yl_left.png")' : 'url("imges/bl_left.png")';
        document.getElementById("twopiece").style.backgroundImage = this.nextcolor2 === "brown" ? 'url("imges/br_right.png")': this.nextcolor2 === "yellow" ? 'url("imges/yl_right.png")' : 'url("imges/bl_right.png")';
    }

    drawPiece(){
        if(this.color1 === "blue"){
            if(this.rotation === 0) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/bl_left.png")';
            else if(this.rotation === 2) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/bl_right.png")';
            else if(this.rotation === 3) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/bl_up.png")';
            else if(this.rotation === 1) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/bl_down.png")';
        }else if(this.color1 === "brown"){
            if(this.rotation === 0) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/br_left.png")';
            else if(this.rotation === 2) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/br_right.png")';
            else if(this.rotation === 3) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/br_up.png")';
            else if(this.rotation === 1) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/br_down.png")';
        }else if(this.color1 === "yellow"){
            if(this.rotation === 0) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/yl_left.png")';
            else if(this.rotation === 2) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/yl_right.png")';
            else if(this.rotation === 3) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/yl_up.png")';
            else if(this.rotation === 1) this.game.cont.children[this.y].children[this.x].style.backgroundImage = 'url("imges/yl_down.png")';
        }
        if(this.rotation === 0){
            if(this.x !== 7 && this.color2 === "blue") this.game.cont.children[this.y].children[this.x + 1].style.backgroundImage = 'url("imges/bl_right.png")';
            else if(this.x !== 7 && this.color2 === "brown") this.game.cont.children[this.y].children[this.x + 1].style.backgroundImage = 'url("imges/br_right.png")';
            else if(this.x !== 7) this.game.cont.children[this.y].children[this.x + 1].style.backgroundImage = 'url("imges/yl_right.png")';
        }else if(this.rotation === 2) {
            if(this.x !== 0 && this.color2 === "blue") this.game.cont.children[this.y].children[this.x - 1].style.backgroundImage = 'url("imges/bl_left.png")';
            else if(this.x !== 0 && this.color2 === "brown") this.game.cont.children[this.y].children[this.x - 1].style.backgroundImage = 'url("imges/br_left.png")';
            else if(this.x !== 0) this.game.cont.children[this.y].children[this.x - 1].style.backgroundImage = 'url("imges/yl_left.png")';
        }else if(this.rotation === 3) {
            if(this.y !== 15 && this.color2 === "blue") this.game.cont.children[this.y + 1].children[this.x].style.backgroundImage = 'url("imges/bl_down.png")';
            else if(this.y !== 15 &&this.color2 === "brown") this.game.cont.children[this.y + 1].children[this.x].style.backgroundImage = 'url("imges/br_down.png")';
            else if(this.y !== 15)this.game.cont.children[this.y + 1].children[this.x].style.backgroundImage = 'url("imges/yl_down.png")';
        }else if(this.rotation === 1) {
            if(this.y !== 0 && this.color2 === "blue") this.game.cont.children[this.y - 1].children[this.x].style.backgroundImage = 'url("imges/bl_up.png")';
            else if(this.y !== 0 && this.color2 === "brown") this.game.cont.children[this.y - 1].children[this.x].style.backgroundImage = 'url("imges/br_up.png")';
            else if(this.y !== 0) this.game.cont.children[this.y - 1].children[this.x].style.backgroundImage = 'url("imges/yl_up.png")';
        }
    }

    erasePiece(){
        this.game.cont.children[this.oldy].children[this.oldx].style.backgroundImage = "none"; /*console.log("ereased" + oldx + "/" + oldy);*/
        this.game.cont.children[this.oldy + this.oldrotationy].children[this.oldx + this.oldrotationx].style.backgroundImage = "none" /*console.log("erased" + (oldx + oldrotationx) + "/" + (oldy + oldrotationy))*/
    }

    ltg(){
        let falling = true;
        let yes = 0
        let started = false;
        this.drawPiece();
        document.addEventListener('keydown', (event) => {
            if(falling && started && this.game.canplay){
                if(event.key === "s" || event.key === "ArrowRight"){
                    if(!(this.y === 15
                        || this.y + this.rotationy === 15
                        || this.game.playingField[this.y + this.rotationy + 1][this.x + this.rotationx][0] !== null
                        || this.game.playingField[this.y+1][this.x][0] !== null
                        || yes % 5 === 0
                    )){
                        this.y += 1;
                    }
                } else if(event.key === "d" || event.key === "ArrowRight") { //prawo
                    if (this.x !== 7
                        && this.x + this.rotationx !== 7 &&
                        this.game.playingField[this.y][this.x + 1][0] === null &&
                        this.game.playingField[this.y][this.x + this.rotationx + 1][0] === null){
                        this.x += 1;
                    }
                } else if(event.key === "a" || event.key === "ArrowLeft") { //lewo
                    if (this.x !== 0
                        && this.x + this.rotationx !== 0
                        && this.game.playingField[this.y][this.x-1][0] === null
                        && this.game.playingField[this.y][this.x + this.rotationx - 1][0] === null){
                        this.x -= 1;
                    }
                } else if(event.key === "w" || event.key === "ArrowUp") {
                    switch(this.rotation){
                        case 0: // do góry
                            if(this.y !== 0){
                                this.rotation = 1;
                                this.rotationx = 0;
                                this.rotationy = -1;
                            }
                            break;
                        case 1: // na prawo
                            if((this.x !== 7 && this.game.playingField[this.y][this.x + 1][0] === null) || this.x === 7){
                                if(this.x === 7 && this.game.playingField[this.y][this.x - 1][0] === null) this.x--;
                                this.rotation = 2;
                                this.rotationx = -1;
                                this.rotationy = 0;
                                this.x += 1;
                            }
                            break;
                        case 2: //w dół
                            if(this.y !== 15
                                && this.game.playingField[this.y + 1][this.x - 1][0] === null
                            ){
                                this.rotation = 3;
                                this.rotationx = 0;
                                this.rotationy = 1;
                                this.x -= 1;
                            }
                            break;
                        case 3: // na lewo
                            if((this.x !== 0 && this.game.playingField[this.y][this.x - 1][0] === null) || this.x === 0){
                                if(this.x === 0 && this.game.playingField[this.y][this.x + 1][0] === null) this.x++;
                                this.rotation = 0;
                                this.rotationx = 1;
                                this.rotationy = 0;
                            }
                            break;
                    }
                } else if(event.key === "Shift"){
                    switch(this.rotation){
                        case 0:
                            if(this.y !== 15
                                && this.game.playingField[this.y + 1][this.x][0] === null
                            ){
                                this.rotation = 3;
                                this.rotationx = 0;
                                this.rotationy = 1;
                            }
                            break;
                        case 1:
                            if((this.x !== 0 && this.game.playingField[this.y][this.x - 1][0] === null) || this.x === 0){
                                if(this.x === 0 && this.game.playingField[this.y][this.x + 1][0] === null) this.x++;
                                this.rotation = 0;
                                this.rotationx = 1;
                                this.rotationy = 0;
                            }
                            break;
                        case 2:
                            if(this.y !== 0){
                                this.rotation = 1;
                                this.rotationx = 0;
                                this.rotationy = -1;
                                this.x -= 1;
                            }
                            break;
                        case 3:
                            if((this.x !== 7 && this.game.playingField[this.y][this.x + 1][0] === null) || this.x === 7){
                                if(this.x === 7 && this.game.playingField[this.y][this.x - 1][0] === null) this.x--;
                                this.rotation = 2;
                                this.rotationx = -1;
                                this.rotationy = 0;
                                this.x += 1;

                            }
                            break;
                    }
                }
            }})

        setInterval(() => {
            yes++
            document.getElementById("current").textContent = `CURRENT: ${this.game.points}`;
            if(this.game.points > localStorage.getItem("top")) {
                document.getElementById("top").textContent = `TOP: ${this.game.points}`;
                localStorage.setItem("top", this.game.points);
            }
            if(this.game.numberOfViruses === 0) {
                this.game.playing = false;
                document.getElementById("gameover").style.opacity = "100";
            }
            if(falling && this.game.playing){
                if(yes % 2 === 0) {
                    started = true;
                }
                if(yes % 3 === 0 && this.game.canplay){
                    yes++;
                    if(this.y === 15
                        || this.y + this.rotationy === 15
                        || this.game.playingField[this.y + this.rotationy + 1][this.x + this.rotationx][0] !== null
                        || this.game.playingField[this.y+1][this.x][0] !== null) {
                        if(this.y === 0) {
                            this.game.playing = false
                        } else {
                            falling = false;
                            this.erasePiece()
                            this.drawPiece();
                            this.game.playingField[this.y][this.x] = [this.color1, this.id];
                            this.game.playingField[this.y + this.rotationy][this.x + this.rotationx] = [this.color2, this.id];
                            this.game.starDestroyer();
                            // this.game.image(this.y, this.x, this.rotationy, this.rotationx);
                            let nowy = new Piece(this.id + 1, this.nextcolor1, this.nextcolor2, this.game);
                            nowy.ltg();
                        }
                    }else{
                        this.erasePiece();
                        this.y += 1;
                        this.drawPiece();
                        this.oldx = this.x;
                        this.oldy = this.y;
                        this.oldrotationx = this.rotationx;
                        this.oldrotationy = this.rotationy;
                    }
                    this.game.image(this.y, this.x, this.rotationy, this.rotationx);
                } else {
                    this.erasePiece();
                    this.drawPiece();
                    this.game.image(this.y, this.x, this.rotationy, this.rotationx);
                    this.oldx = this.x;
                    this.oldy = this.y;
                    this.oldrotationx = this.rotationx;
                    this.oldrotationy = this.rotationy;
                }
            }
        }, 100)

    }
}