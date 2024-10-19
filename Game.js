import {Piece} from "./Piece.js";

export class Game{
    playingField = [];
    #width = 8;
    #height = 16;

    constructor(nameOfContainer){
        this.nameOfContainer = nameOfContainer;
        this.makeGameArray();
        this.renderPlayingField();
        let id = 1;
        let piece
        piece = new Piece(id, "red", "blue", this.nameOfContainer, this);
        piece.ltg()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    makeGameArray(){
        for(let i = 0; i < this.#height; i++){
            this.playingField[i]=[];
            for(let j = 0; j < this.#width; j++){
                this.playingField[i][j] = [null, null];
            }
        }
    }

    renderPlayingField(){
        let cont = document.getElementById(this.nameOfContainer)
        for(let i = 0; i < this.#height; i++){
            let box = document.createElement("div");
            box.classList.add("box");
            for(let j = 0; j < this.#width; j++){
                let el = document.createElement("div");
                el.classList.add("piece");
                box.append(el)

            }
            cont.append(box)
        }
    }

    starDestroyer(){
        let copy = [...this.playingField];
        let copy2 = [...this.playingField];
        for(let i = 0; i < this.#height; i++){
            let counter = 1;
            for(let j = 1; j < this.#width; j++){
                if(copy[i][j][0] !== null && copy[i][j][0] === copy[i][j - 1][0]){
                    counter++;
                } else if(counter >= 4){
                    for(let k = 0; k < counter; k++){
                        this.playingField[i][j - k - 1] = [null, null]
                    }
                    counter = 0;
                }
            }
            if(counter >= 4){
                for(let k = 0; k < counter; k++){
                    this.playingField[i][7 - k] = [null, null]
                }
            }
        }
        for(let j = 0; j < this.#width; j++) {
            let counter2 = 1;
            for (let i = 0; i < this.#height; i++) {
                if (copy2[i][j][0] !== null && copy2[i][j][0] === copy2[i - 1][j][0]) {
                    counter2++;
                } else if (counter2 >= 4) {
                    for (let k = 0; k < counter2; k++) {
                        this.playingField[i - k - 1][j] = [null, null]
                    }
                    counter2 = 0;
                }
            } if (counter2 >= 4) {
                for (let k = 0; k < counter2; k++) {
                    this.playingField[15 - k][j] = [null, null]
                }
            }
        }
        for(let i = 0; i < this.#height; i++){
            let cont = document.getElementById(this.nameOfContainer);
            for(let j = 0; j < this.#width; j++){
                if(this.playingField[i][j][0] === null){
                    cont.children[i].children[j].style.backgroundColor = "transparent"
                }
            }
        }
    }

    fajnieSiedze(){
        let cont = document.getElementById(this.nameOfContainer);
        for(let i = this.#height - 2; i > 0; i--){
            for(let j = 0; j < this.#width; j++){
                if(this.playingField[i][j][0] !== null){
                    if(this.playingField[i + 1][j][0] === null
                    && (j !== 7 && !(this.playingField[i][j][1] === this.playingField[i][j + 1][1] && this.playingField[i + 1][j + 1][0] !== null))
                    && (j !== 0 && !(this.playingField[i][j][1] === this.playingField[i][j - 1][1] && this.playingField[i + 1][j - 1][0] !== null))){
                        cont.children[i].children[j].style.backgroundColor = "transparent";
                        cont.children[i + 1].children[j].style.backgroundColor = this.playingField[i][j][0]
                        this.playingField[i + 1][j] = [...this.playingField[i][j]];
                        this.playingField[i][j] = [null, null]
                    }
                }
            }
        }
    }
}