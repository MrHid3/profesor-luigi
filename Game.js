import {Piece} from "./Piece.js";

export class Game{
    playingField = [];
    #width = 8;
    #height = 16;

    constructor(nameOfContainer){
        this.nameOfContainer = nameOfContainer;
        this.makeGameArray();
        this.renderPlayingField();
        // let end = false;
        async () => {
        let id = 1;
            for(let i = 0; i < 2; i++) {
                console.log(i);
                let piece = new Piece(id, "red", "blue", this.nameOfContainer, this);
                id++;
                i -= await piece.ltg;
            }}
    }



    makeGameArray(){
        for(let i = 0; i < this.#height; i++){
            this.playingField[i]=[];
            for(let j = 0; j < this.#width; j++){
                this.playingField[i][j] = null;
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

    // starDestroyer(){
    //     console.log(this.playingField)
    //     let cont = document.getElementById(this.nameOfContainer);
    //     for(let i = 0; i < this.#height; i++){
    //         let last = null;
    //         let counter = 0;
    //         for(let j = 0; j < this.#witdh; j++){
    //
    //             if(this.playingField[i][j] != null){
    //                 if(this.playingField[i][j] == last) counter++;
    //                 else{
    //                     last = this.playingField[i][j];
    //                     counter = 0;
    //                 }
    //                 if (counter >= 3){
    //                     for (let k = 0; k <= counter; k++){
    //                         this.playingField[i][j - k] = null;
    //                         cont.children[i].children[j - k].style.backgroundColor = "transparent";
    //                     }
    //                 }
    //             }else counter = 0;
    //         }
    //     }
    //     for(let j = 0; j < this.#witdh; j++){
    //         let last = null;
    //         let counter = 0;
    //         for(let i = 0; i < this.#height; i++){
    //             if(this.playingField[i][j] != null){
    //                 if(this.playingField[i][j] == last) counter++;
    //                 else{
    //                     last = this.playingField[i][j];
    //                     counter = 0;
    //                 }
    //                 if(counter >= 3){
    //                     console.log("chat this is real")
    //                     for (let k = 0; k <= counter; k++){
    //                         this.playingField[i - k][j] = null;
    //                         cont.children[i - k].children[j].style.backgroundColor = "transparent";
    //                     }
    //                 }
    //             }else counter = 0;
    //         }
    //     }
    // }
}
