import {Piece} from "./Piece.js";

export class Game{
    playingField = [];
    #width = 8;
    #height = 16;
    numberOfViruses = 4;

    constructor(nameOfContainer){
        this.cont = document.getElementById(nameOfContainer)
        this.renderPlayingField();
        this.makeGameArray();
        let id = 1;
        let piece
        let color1 = Math.floor(Math.random() * 3);
        let color2 = Math.floor(Math.random() * 3);
        piece = new Piece(id,
            color1 === 0? "brown" :  color1 === 1? "yellow" : "blue",
            color2 === 0? "brown" :  color2 === 1? "yellow" : "blue",
            this);
        piece.ltg()
    }

    makeGameArray(){
        for(let i = 0; i < this.#height; i++){
            this.playingField[i]=[];
            for(let j = 0; j < this.#width; j++){
                this.playingField[i][j] = [null, null, null];
            }
        }
        for(let i = 0; i < this.numberOfViruses; i++){
            let x = Math.floor(Math.random() * 8);
            let y = Math.floor(Math.random() * 8) + 7;
            this.playingField[y][x][0] = (i % 3 === 0? "brown": i % 3 === 1? "yellow": "blue");
            this.playingField[y][x][1] = 0;
            this.cont.children[y].children[x].style.backgroundColor = this.playingField[y][x][0];
            this.cont.children[y].children[x].style.border = "2px solid black"
        }
    }

    renderPlayingField(){
        for(let i = 0; i < this.#height; i++){
            let box = document.createElement("div");
            box.classList.add("box");
            for(let j = 0; j < this.#width; j++){
                let el = document.createElement("div");
                el.classList.add("piece");
                box.append(el);
            }
            this.cont.append(box);
        }
    }

    starDestroyer(){
        let hasDestroyed = false;
        let copy = [...this.playingField];
        let copy2 = [...this.playingField];
        for(let i = 1; i < this.#height; i++){
            let counter = 1;
            for(let j = 1; j < this.#width; j++){
                if(copy[i][j][0] !== null){
                    if(copy[i][j][0] === copy[i][j - 1][0]) {
                        counter++;
                    } else {
                        if(counter >= 4) {
                            for (let k = 0; k < counter; k++) {
                                this.playingField[i][j - k - 1] = [null, null, null]
                            }
                            hasDestroyed = true;
                            counter = 1;
                        }else {
                            counter = 1;
                        }
                    }
                } else if(counter >= 4){
                    for(let k = 0; k < counter; k++){
                        this.playingField[i][j - k - 1] = [null, null, null]
                    }
                    hasDestroyed = true;
                    counter = 1;
                }
            }
            if(counter >= 4){
                for(let k = 0; k < counter; k++){
                    this.playingField[i][7 - k] = [null, null, null]
                }
                hasDestroyed = true;
            }
        }
        for(let j = 0; j < this.#width; j++) {
            let counter2 = 1;
            for (let i = 0; i < this.#height; i++) {
                if (copy2[i][j][0] !== null){
                    if(copy2[i][j][0] === copy2[i - 1][j][0]){
                        counter2++;
                    } else {
                        if (counter2 >= 4) {
                            for (let k = 0; k < counter2; k++) {
                                this.playingField[i - k - 1][j] = [null, null, null]
                            }
                            counter2 = 1;
                            hasDestroyed = true;
                        }else {
                            counter2 = 1;
                        }
                    }
                } else if (counter2 >= 4) {
                    for (let k = 0; k < counter2; k++) {
                        this.playingField[i - k - 1][j] = [null, null, null]
                    }
                    counter2 = 1;
                    hasDestroyed = true;
                }
            } if (counter2 >= 4) {
                for (let k = 0; k < counter2; k++) {
                    this.playingField[15 - k][j] = [null, null, null]
                }
                hasDestroyed = true
            }
        }
        for(let i = 0; i < this.#height; i++){
            for(let j = 0; j < this.#width; j++){
                if(this.playingField[i][j][0] === null){
                    this.cont.children[i].children[j].style.backgroundColor = "transparent";
                }
            }
        }
        if(hasDestroyed) this.fajnieSiedze();
    }

    fajnieSiedze(){
        let hasfallen = false;
        for(let i = this.#height - 2; i > 0; i--){
            for(let j = 0; j < this.#width; j++){
                if(this.playingField[i][j][0] !== null){
                    if(this.playingField[i + 1][j][0] === null
                    && this.playingField[i][j][1] !== 0
                    && ((j !== 7 && !(this.playingField[i][j][1] === this.playingField[i][j + 1][1] && this.playingField[i + 1][j + 1][0] !== null)) || (j === 7))
                    && ((j !== 0 && !(this.playingField[i][j][1] === this.playingField[i][j - 1][1] && this.playingField[i + 1][j - 1][0] !== null)) || (j === 0))){
                        this.cont.children[i].children[j].style.backgroundColor = "transparent";
                        this.cont.children[i + 1].children[j].style.backgroundColor = this.playingField[i][j][0];
                        this.playingField[i + 1][j] = [...this.playingField[i][j]];
                        this.playingField[i][j] = [null, null, null];
                        hasfallen = true;
                    }
                }
            }
        }
        if(hasfallen) this.starDestroyer()
    }
}