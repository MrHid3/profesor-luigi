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
        this.canplay = true;
        this.points = 0;
        this.playing = true;
        let id = 1;
        let piece
        let color1 = Math.floor(Math.random() * 3);
        let color2 = Math.floor(Math.random() * 3);
        document.getElementById("top").textContent = (localStorage.getItem("top") === null ? "TOP: 0": `TOP: ${localStorage.getItem("top")}`);
        piece = new Piece(id,
            color1 === 0? "brown" :  color1 === 1? "yellow" : "blue",
            color2 === 0? "brown" :  color2 === 1? "yellow" : "blue",
            this);
        piece.ltg()
    }

    image(yy, xx, ry, rx){
        for(let y = this.#height - 1; y > 0; y--){
            for(let x = 0; x < this.#width; x++) {
                if((yy === y && xx === x) || (yy + ry === y && xx + rx === x)) return;
                let tile = this.playingField[y][x];
                let field = this.cont.children[y].children[x];
                if (tile[1] === -1) {
                    if (tile[0] === "blue") field.style.backgroundImage = 'url("imges/bl_o.png")'
                    else if (tile[0] === "yellow") field.style.backgroundImage = 'url("imges/yl_o.png")'
                    else if (tile[0] === "brown") field.style.backgroundImage = 'url("imges/br_o.png")'
                    setTimeout(() => {
                        field.style.backgroundImage = "none";
                        tile[0] = null;
                        tile[1] = null;
                        }, 100)
                }else if(tile[1] === -2){
                    if (tile[0] === "blue") field.style.backgroundImage = 'url("imges/bl_x.png")'
                    else if (tile[0] === "yellow") field.style.backgroundImage = 'url("imges/yl_x.png")'
                    else if (tile[0] === "brown") field.style.backgroundImage = 'url("imges/br_x.png")'
                    tile[1] = null;
                    tile[0] = null;
                    this.points += 100;
                    this.numberOfViruses--;
                    setTimeout(() => {
                        field.style.backgroundImage = "none";
                    }, 100)
                } else {
                    if (tile[0] === "blue") {
                        if (tile[1] === 0) field.style.backgroundImage = 'url("imges/covid_blue.png")'
                        else if (x !== 7 && this.playingField[y][x + 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/bl_left.png")'
                        else if (x !== 0 && this.playingField[y][x - 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/bl_right.png")'
                        else if (y !== 15 && this.playingField[y + 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/bl_up.png")'
                        else if (y !== 7 && this.playingField[y - 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/bl_down.png")'
                        else field.style.backgroundImage = 'url("imges/bl_dot.png")'
                    } else if (tile[0] === "brown") {
                        if (tile[1] === 0) field.style.backgroundImage = 'url("imges/covid_brown.png")'
                        else if (x !== 7 && this.playingField[y][x + 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/br_left.png")'
                        else if (x !== 0 && this.playingField[y][x - 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/br_right.png")'
                        else if (y !== 15 && this.playingField[y + 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/br_up.png")'
                        else if (y !== 0 && this.playingField[y - 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/br_down.png")'
                        else field.style.backgroundImage = 'url("imges/br_dot.png")'
                    } else if (tile[0] === "yellow") {
                        if (tile[1] === 0) field.style.backgroundImage = 'url("imges/covid_yellow.png")'
                        else if (x !== 7 && this.playingField[y][x + 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/yl_left.png")'
                        else if (x !== 0 && this.playingField[y][x - 1][1] === tile[1]) field.style.backgroundImage = 'url("imges/yl_right.png")'
                        else if (y !== 15 && this.playingField[y + 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/yl_up.png")'
                        else if (y !== 7 && this.playingField[y - 1][x][1] === tile[1]) field.style.backgroundImage = 'url("imges/yl_down.png")'
                        else field.style.backgroundImage = 'url("imges/yl_dot.png")'
                    } else {
                        field.style.backgroundImage = "none";
                    }
                }
            }
        }
        if(!this.playing) document.getElementById("gameover").style.opacity = "100";
        this.fajnieSiedze()
    }

    makeGameArray(){
        for(let i = 0; i < this.#height; i++){
            this.playingField[i]=[];
            for(let j = 0; j < this.#width; j++){
                this.playingField[i][j] = [null, null];
            }
        }
        for(let i = 0; i < this.numberOfViruses; i++){
            let x = Math.floor(Math.random() * 8);
            let y = Math.floor(Math.random() * 8) + 8;
            while(this.playingField[y][x][0] !== null){
                x = Math.floor(Math.random() * 8);
                y = Math.floor(Math.random() * 8) + 8;
            }
            this.playingField[y][x][0] = (i % 3 === 0? "brown": i % 3 === 1? "yellow": "blue");
            this.playingField[y][x][1] = 0;
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
                if(copy[i][j][0] !== null && copy[i][j][0] === copy[i][j - 1][0] && copy[i][j][1] !== -1 && copy2[i][j][1] !== -2){
                    counter++;
                } else if(counter >= 4) {
                    for (let k = 0; k < counter; k++) {
                        if(copy[i][j - k - 1][1] === 0) {
                            copy[i][j - k - 1][1] = -2;
                        }else
                            copy[i][j - k - 1][1] = -1;
                    }
                    hasDestroyed = true;
                    counter = 1;
                } else counter = 1;
            }
            if(counter >= 4){
                for(let k = 0; k < counter; k++){
                    if(copy[i][7 - k - 1][1] === 0 && copy[i][7 - k - 1][1] !== -1 && copy2[i][7 - k - 1][1] !== -2) {
                        copy[i][7 - k][1] = -2;
                    }else
                        copy[i][7 - k][1] = -1;
                }
                hasDestroyed = true;}
        }

        for(let j = 0; j < this.#width; j++) {
            let counter2 = 1;
            for (let i = 0; i < this.#height; i++) {
                if (copy2[i][j][0] !== null && copy2[i][j][0] === copy2[i - 1][j][0] && copy2[i][j][1] !== -1 && copy2[i][j][1] !== -2){
                        counter2++;
                    } else if (counter2 >= 4) {
                        for (let k = 0; k < counter2; k++) {
                            if(copy2[i - k - 1][j][1] === 0){
                                copy2[i - k - 1][j][1] = -2;
                            }else
                                copy2[i - k - 1][j][1] = -1;
                        }
                        counter2 = 1;
                        hasDestroyed = true;
                } else counter2 = 1;
            } if (counter2 >= 4) {
                for (let k = 0; k < counter2; k++) {
                    if(copy2[15 - k - 1][j][1] === 0 && copy2[15 - k - 1][j][1] !== -1 && copy2[15 - k - 1][j][1] !== -2) {
                        copy2[15 - k][j][1] = -2;
                    }else
                        copy2[15 - k][j][1] = -1;
                }
                hasDestroyed = true
            }
        }

        for(let i = 0; i < this.#height; i++){
            for(let j = 0; j < this.#width; j++) {
                if(this.playingField[i][j][0] !== null && (copy[i][j][0] === null || copy2[i][j][0] === null))this.playingField[i][j][0] = null;
                if(this.playingField[i][j][1] !== -1 && (copy[i][j][1] === -1 || copy2[i][j][1] === -1))this.playingField[i][j][1] = -1;
                if(this.playingField[i][j][1] !== -2 && (copy[i][j][1] === -2 || copy2[i][j][0] === -2))this.playingField[i][j][1] = -2;
            }
        }

        if(hasDestroyed) this.fajnieSiedze();
    }

    fajnieSiedze(){
        let hasfallen = false;
        for(let i = this.#height - 1; i > 0; i--){
            for(let j = 0; j < this.#width; j++){
                if(i < this.#height - 1){
                    if(this.playingField[i][j][0] !== null){
                        if(this.playingField[i + 1][j][0] === null
                            && this.playingField[i][j][1] !== -1
                            && this.playingField[i][j][1] !== -2
                            && this.playingField[i][j][1] !== 0
                            && ((j !== 7 && !(this.playingField[i][j][1] === this.playingField[i][j + 1][1] && this.playingField[i + 1][j + 1][0] !== null)) || (j === 7))
                            && ((j !== 0 && !(this.playingField[i][j][1] === this.playingField[i][j - 1][1] && this.playingField[i + 1][j - 1][0] !== null)) || (j === 0))){
                            this.cont.children[i + 1].children[j].style.backgroundImage = this.cont.children[i].children[j].style.backgroundImage
                            this.cont.children[i].children[j].style.backgroundImage = "none";
                            this.playingField[i + 1][j] = [...this.playingField[i][j]];
                            this.playingField[i][j] = [null, null]
                            hasfallen = true;
                        }
                    }
                }
            }
        }
        if(hasfallen) this.starDestroyer();
        this.canplay = !hasfallen;
    }
}