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
        let piece = new Piece(id, "red", "blue", this.nameOfContainer, this);
        piece.ltg()
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
        for(let i = 0; i < this.#height; i++){
            let counter = 1;
            for(let j = 1; j < this.#width; j++){
                if(copy[i][j][0] !== null && copy[i][j][0] === copy[i][j - 1][0] ){
                    counter++;
                } else if(counter >= 4){
                    for(let k = 0; k < counter; k++){
                        copy[i][j - k - 1] = [null, null]
                    }
                }
            }

        }
        for(let i = 0; i < this.#height; i++){
            let cont = document.getElementById(this.nameOfContainer);
            for(let j = 0; j < this.#width; j++){
                if(copy[i][j][0] == null && this.playingField[i][j][0] != null){
                    cont.children[i].children[j].style.backgroundColor = "transparent";
                }
            }
        }
    }

    render(){
        let cont = document.getElementById(this.nameOfContainer)
        for(let i = 0; i < this.#height; i++){
            for(let j = 0; j < this.#width; j++){
                if(this.playingField[i][j][0] !== null){
                    cont.children[i].children[j].style.backgroundColor = this.playingField[i][j][0];
                }else{
                    cont.children[i].children[j].style.backgroundColor = "transparent";
                }
            }
        }
    }
}
