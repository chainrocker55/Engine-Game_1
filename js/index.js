

var zombies = 3
var gamePieces = new Array(zombies)
var gameObstacle, gameObstacle2, gameObstacle4, question, equal, gameObstacle5, button, gameOver, gameOvertext, again, againbutton
var bullet = 20
var HP = 100
var miss = true
var canvasWidth = 790
var canvasHeight = 960
var difficulty = location.search.split('level=')[1]
var spawnrate
var random = Math.round(Math.random())
var num1 = Math.floor((Math.random() * 100) + 1), num2 = Math.floor((Math.random() * 100) + 1)
var answer, realAnswer

function startGame() {

    for (i = 0; i < gamePieces.length; i++) {
        gamePieces[i] = new component(30, 30, "./img/zombie.png", Math.random() * 233 + 262, Math.random() * 30 + 334, "image")
    }

    myScore = new component("30px", "Consolas", "yellow", 10, 30, "text");
    myHP = new component("30px", "Consolas", "yellow", 10, 60, "text");
    question = new component("50px", "Consolas", "black", 45, 890, "text")
    equal = new component("50px", "Consolas", "black", 394, 890, "text")
    answer = new component("50px", "Consolas", "black", 471, 890, "text")
    gameObstacle = new obastacle(789, 10, "brown", 0, 790)
    gameObstacle2 = new obastacle(350, 120, "white", 20, 818)
    gameObstacle4 = new obastacle(150, 120, "white", 460, 818)
    gameObstacle5 = new component("50px", "Consolas", "black", 470, 890, "text")
    gameOver = new component(canvasWidth, canvasHeight, "black", 1, 1)
    gameOvertext = new component("50px", "Consolas", "yellow", 240, 305, "text")
    againbutton = new component(230, 230, "./img/tryagainbutton.png", 271, 355, "image")
    button = new component(150, 120, "./img/button.png", 637, 818, "image")

    myGameArea.start()

}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = canvasWidth
        this.canvas.height = canvasHeight
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])

        if (difficulty == "easy") {
            spawnrate = 5000
        } else if (difficulty == "normal") {
            spawnrate = 3500
        } else{
            spawnrate = 2500
        }

        this.interval = setInterval(updateGameArea, 50);
        this.interval2 = setInterval(spawn, spawnrate);

        ///////////////////////// SHOOT //////////////////////////////
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX - ctx.canvas.offsetLeft
            myGameArea.y = e.pageY - ctx.canvas.offsetTop
            console.log("X = " + myGameArea.x)
            console.log("Y = " + myGameArea.y)
            if (bullet > 0) {
                for (i = 0; i < gamePieces.length; i++) {
                    if (gamePieces[i].clicked()) {
                        gamePieces.splice(i, 1)
                        bullet -= 1
                        miss = false
                        
                    }
                }
                if (miss) {
                    bullet -= 1
                }
                miss = true
            }

            if (button.clicked()) {
                if (answer.value == realAnswer) {
                    bullet = 20
                    myScore.update()
                    document.getElementById("input").value = null
                    random = Math.round(Math.random())
                    num1 = Math.floor((Math.random() * 100) + 1)
                    num2 = Math.floor((Math.random() * 100) + 1)
                    answer.value = null
                    answer.text = ""
                    updateQuestion()
                }
            }

            if (HP <= 0) {
                if (againbutton.clicked()) {
                    location.reload()
                }
            }


        })


        ///////////////////// ENDED SHOOT ////////////////////////////
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        clearInterval(this.interval2);
    },

}

function component(width, height, color, x, y, type) {
    this.type = type
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.text = ""
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 1
    this.color = color
    this.x = x
    this.y = y
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.clicked = function () {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function obastacle(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.color = color
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function gamePieceUpdate() {
    for (i = 0; i < gamePieces.length; i++) {
        gamePieces[i].newPos()
        gamePieces[i].update()
    }
}

function hit() {
    for (i = 0; i < gamePieces.length; i++) {
        if (gamePieces[i].crashWith(gameObstacle)) {
            gamePieces.splice(i, 1)
            HP -= 5
        }
    }
}

function spawn() {
    gamePieces.push(new component(30, 30, "./img/zombie.png", Math.random() * 233 + 262, Math.random() * 30 + 334, "image"))
    gamePieces.push(new component(30, 30, "./img/zombie2.png", Math.random() * 233 + 262, Math.random() * 30 + 334, "image"))
}

function checkHP() {
    if (HP <= 0) {

        myGameArea.stop()

        var queryString = "?level=" + difficulty+"?game=gcdLcm.html"
        window.open("lose.html"+queryString, "_self");
    }
}

function updateGameArea() {
    hit()
    gamePieceUpdate()
    myGameArea.clear()
    gamePieceUpdate()
    gameObstacle.update()
    gameObstacle2.update()
    gameObstacle4.update()
    gameObstacle5.update()
    button.update()
    equal.text = "="
    equal.update()
    answer.update()
    updateQuestion()
    myScore.text = "BULLET: " + bullet;
    myScore.update()
    myHP.text = "HP: " + HP;
    myHP.update()
    checkHP()
}

function answerOnchange() {
    answer.text = document.getElementById("input").value
    answer.value = document.getElementById("input").value
}

function updateQuestion() {
    if (random == 1) {
        question.text = "หรม(" + Math.floor(num1) + "," + Math.floor(num2) + ")"
        realAnswer = gcd_two_numbers(num1, num2)
        console.log(realAnswer)
        question.update()
    } else {
        question.text = "ครน(" + Math.floor(num1) + "," + Math.floor(num2) + ")"
        realAnswer = lcm_two_numbers(num1, num2)
        console.log(realAnswer)
        question.update()
    }
}



function lcm_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}
function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}



