class Game{
    playingField = [];
    #witdh = 8;
    #height = 16;
    
    constructor(nameOfContainer){
        this.nameOfContainer = nameOfContainer;
        this.makeGameArray();
        this.renderPlayingField();
        let end = false;
        this.newPair();
    }

    makeGameArray(){
        for(let i = 0; i < this.#height; i++){
            this.playingField[i]=[];
            for(let j = 0; j < this.#witdh; j++){
                this.playingField[i][j] = null;
            }
        }
    }

    renderPlayingField(){
        let cont = document.getElementById(this.nameOfContainer)
        for(let i = 0; i < this.#height; i++){
            let box = document.createElement("div");
            box.classList.add("box");
            for(let j = 0; j < this.#witdh; j++){
                let el = document.createElement("div");
                el.classList.add("piece");
                box.append(el)
                
            }
            cont.append(box)
        }
    }

    newPair(){
        let x = 4;
        let y = 1;
        let falling = true;
        let color1 = Math.floor(Math.random() * 3);
        color1 == 0 ? color1 = "red" : color1 == 1 ? color1 = "cyan" : color1 = "yellow";
        let color2 = Math.floor(Math.random() * 3);
        color2 == 0 ? color2 = "red" : color2 == 1 ? color2 = "cyan" : color2 = "yellow";
        let rotation = 0;
        let rotationx = -1;
        let rotationy = 0
        let oldrotationx = rotationx;
        let oldrotationy = rotationy;
        let oldy = y;
        let oldx = x;
        document.addEventListener('keypress', (event) => {
            if(falling){
                if(event.key == "d") { //prawo
                    if (x != 7 && 
                        x + rotationx != 7 && 
                        this.playingField[y][x + 1] == null && 
                        this.playingField[y][x + rotationx + 1] == null){
                            x += 1;
                        // console.log("prawo")
                    } 
                }
                else if(event.key == "a") { //lewo
                    if (x != 0 &&
                        x + rotationx != 0 && 
                        this.playingField[y][x-1] == 
                        null && this.playingField[y][x + rotationx - 1] == null){
                            x -= 1;
                        // console.log("lewo")
                    }   
                }
                else if(event.key == "f") {
                    switch(rotation){
                        case 0: // do góry
                            rotation = 1;
                            rotationx = 0;
                            rotationy = -1;
                            break;
                        case 1: // na prawo
                            if(x != 7){
                                rotation = 2;
                                rotationx = 1;
                                rotationy = 0;
                            }
                            break;
                        case 2: //w dół
                            rotation = 3;
                            rotationx = 0;
                            rotationy = 1;
                            break;
                        case 3: // na lewo
                            if(x != 0){
                                rotation = 0;
                                rotationx = -1;
                                rotationy = 0;
                            }
                            break;
                    }

                }
            }})
        
        setInterval(() => {
            if(falling){
                if(y == 15 || 
                   y + rotationy == 15|| 
                   this.playingField[y + rotationy + 1][x + rotationx] != null || 
                   this.playingField[y+1][x] != null) {
                    falling = false;
                    if(y == 1) this.end = true;
                    this.erasePair(oldx, oldy, oldrotationx, oldrotationy)
                    // y += 1;
                    this.drawPair(x, y, rotationx, rotationy, color1, color2);
                    this.playingField[y][x] = color1;
                    this.playingField[y + rotationy][x + rotationx] = color2;
                    this.starDestroyer()
                    if(!this.end) this.newPair();
                    // console.log("koniec")
                    // console.log(this.playingField)
                }else{
                    this.erasePair(oldx, oldy, oldrotationx, oldrotationy);
                    y += 1;
                    this.drawPair(x, y, rotationx, rotationy, color1, color2);
                    oldx = x;
                    oldy = y;
                    oldrotationx = rotationx;
                    oldrotationy = rotationy;
                    // console.log("normalne spadanie")
                }  
            }            
        }, 200)
    }

    drawPair(x, y, rotationx, rotationy, color1, color2){
        let cont = document.getElementById(this.nameOfContainer);
        cont.children[y].children[x].style.backgroundColor = color1;
        cont.children[y + rotationy].children[x + rotationx].style.backgroundColor = color2;

        // console.log("draw")
    }

    erasePair(oldx, oldy, oldrotationx, oldrotationy){
        let cont = document.getElementById(this.nameOfContainer);
        // this.playingField[y][x] = null;
        // this.playingField[y + 1][x] = null;
        cont.children[oldy].children[oldx].style.backgroundColor = "transparent"; /*console.log("ereased" + oldx + "/" + oldy);*/
        cont.children[oldy + oldrotationy].children[oldx + oldrotationx].style.backgroundColor = "transparent"; /*console.log("erased" + (oldx + oldrotationx) + "/" + (oldy + oldrotationy))*/
        
        // console.log("erase")
    }
    
    starDestroyer(){
        console.log(this.playingField)
        let cont = document.getElementById(this.nameOfContainer);
        for(let i = 0; i < this.#height; i++){
            let last = null;
            let counter = 0;
            for(let j = 0; j < this.#witdh; j++){

                if(this.playingField[i][j] != null){
                    if(this.playingField[i][j] == last) counter++;
                    else{
                        last = this.playingField[i][j];
                        counter = 0;
                    } 
                    if (counter >= 3){
                        for (let k = 0; k <= counter; k++){
                            this.playingField[i][j - k - 1] = null;
                            cont.children[i].children[j - k - 1].style.backgroundColor = "transparent";
                        }
                    }
                }else counter = 0;
            }
        }
        for(let j = 0; j < this.#witdh; j++){
            let last = null;
            let counter = 0;
            for(let i = 0; i < this.#height; i++){
                if(this.playingField[i][j] != null){
                    if(this.playingField[i][j] == last) counter++;
                    else{
                        last = this.playingField[i][j];
                        counter = 0;
                    }
                    if(counter >= 3){
                        console.log("chat this is real")
                        for (let k = 0; k <= counter; k++){
                            this.playingField[i - k][j] = null;
                            cont.children[i - k].children[j].style.backgroundColor = "transparent";
                        }
                    }
                }else counter = 0;
            }
        }
            
        }
        
    }