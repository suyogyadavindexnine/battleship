function Ship(length) {
    this.length = length;
    this.hitArray = createHitArray(this.length);
    this.sunk = false;

    function createHitArray(length) {
        let array = [];
        for (i = 0; i < length; i++) {
            array.push(false);
        }
        return array;
    }

    this.hit = function (spot) {
        this.hitArray[spot] = true;
        console.log(this.hitArray);
        this.sunk = this.hitArray.every((val) => val == true);
    }
}

function gameBoard() {
    this.ships = [];
    this.missedShot = [];

    this.plotShip = function () {
        for (let i = 0; i < 10; i++) {
            x = i;
            y = Math.floor((Math.random() * 10) % 6);

            this.ships.push({
                ship: new Ship(4),
                x,
                y,
            });

        }
    }

    this.receiveAttack = function (x, y) {
        let missed = true;
        this.ships.forEach(element => {
            if (element.x == x) {
                for (let i = 0; i < element.ship.length; i++) {
                    if (y == (element.y + i)) {
                        element.ship.hit(i);
                        missed = false;
                        console.log("Ship is Under Attack");
                        break;
                    }
                }
            }
        });
        if (missed) {
            this.missedShot.push({ x, y });
        }
    }

    this.allSunk = function () {
        return this.ships.every(element => {
            return element.ship.sunk;
        })
    }

    this.render = function (boardid) {
        console.log(boardid);
        let board = document.querySelector("#" + boardid);
        board.innerHTML = "";
        console.log(board);
        let table = document.createElement("table");
        table.style.tableLayout = "fixed";
        table.style.width = "100%";
        table.style.height = "100%";
        for (let i = 0; i < 10; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 10; j++) {
                let td = document.createElement("td");
                if (boardid == "computerboard") {
                    td.innerHTML = `<img src="./assets/texture.jpg" onmouseout=btnOut(this) onmouseover=btnOver(this) onclick=btnOnClick(${i},${j}) id="${boardid}img${i}${j}" style="display: block; height: auto; width: 100%;">`
                } else {
                    td.innerHTML = `<img src="./assets/texture.jpg" id="${boardid}img${i}${j}" style="display: block; height: auto; width: 100%;">`
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        board.appendChild(table);
        this.renderMissed(boardid);
        this.renderShips(boardid);
    }

    this.renderMissed = function (boardid) {
        this.missedShot.forEach(element => {
            let img = document.getElementById(boardid + "img" + element.x + element.y);
            if (img != null) {
                img.src = "./assets/miss.jpg";
                img.onclick = null;
                img.onmouseover = null;
                img.onmouseout = null;
            }
        })
    }

    this.renderShips = function (boardid) {
        this.ships.forEach(element => {
            let x = element.x;
            let y = element.y;
            let td = document.getElementById(boardid + "img" + element.x + element.y);
            if (td != null) {
                for (let i = 0; i < element.ship.hitArray.length; i++) {
                    if (element.ship.hitArray[i] == true) {
                        let img = document.getElementById(boardid + "img" + x + y);
                        img.src = "./assets/hit.jpg";
                        img.onclick = null;
                        img.onmouseover = null;
                        img.onmouseout = null;
                    }
                    // else{
                    //     let img = document.getElementById(boardid + "img" + x + y);
                    //     img.src = "./assets/ship.jpg";
                    //     img.onmouseover = null;
                    //     img.onmouseout = null;
                    // }
                    y++;
                }
            }
        })
    }
}

let haveIt = [];
function computerPlay() {
    let random =
    {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
    }
    if (!haveIt.includes(random)) {
        haveIt.push(random);
        return random;

    } else {
        computerPlay();
    }
}

playerBoard = new gameBoard();
playerBoard.plotShip();
playerBoard.render("playerboard");

computerBoard = new gameBoard();
computerBoard.plotShip();
computerBoard.render("computerboard");

function btnOnClick(x, y) {
    console.log(x + "" + y + "clicked");
    computerBoard.receiveAttack(x, y);
    computerBoard.render("computerboard");
    if (computerBoard.allSunk()) {
        console.log("player Won");
        alert("Player Won The Match");
        location.reload();
    } else {
        let computermove = computerPlay();
        playerBoard.receiveAttack(computermove.x, computermove.y);
        playerBoard.render("playerboard");
        if (playerBoard.allSunk()) {
            console.log("Computer Won");
            alert("Computer Won The Match");
            location.reload();
        }
    }
}

function btnOver(img) {
    img.src = "./assets/aim.jpg"
}
function btnOut(img) {
    img.src = "./assets/texture.jpg"
}

let myModal = new bootstrap.Modal(document.getElementById('myModal'));

window.onload = () => {
    myModal.show();
}