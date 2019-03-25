var a;
var b;
var result;
var answer;
var c1, c2, c3, c4;
var level = location.search.split('level=')[1]
var time = 20;
var score = 0;
var heard = 100;
function Question() {
  var nation = Math.floor(Math.random() * 4 + 1);
  removeBoxMove();
  //1 is +, 2 is -, 3 is *, 4 is /
  if (nation == 1) {
    randomMath(100);
    result = a + b;
    render("+");
  } else if (nation == 2) {
    randomMath(100);
    result = a - b;
    render("-");
  } else if (nation == 3) {
    randomMath(10);
    result = a * b;
    render("*");
  } else {
    randomMath(10);
    result = (a / b).toFixed(2);
    render("/");
  }
}
function randomMath(number) {
  if (level === "easy") {
    setValue(number);
  } else if (level === "normal") {
    setValue(number * 3);
  } else if (level === "hard") {
    setValue(number * 9);
  }
}
function setValue(number) {
  a = Math.floor(Math.random() * number + 1);
  b = Math.floor(Math.random() * number + 1);
  c1 = Math.floor(Math.random() * number + 1);
  c2 = Math.floor(Math.random() * number + 1);
  c3 = Math.floor(Math.random() * number + 1);
  c4 = Math.floor(Math.random() * number + 1);
}
function checkRepeatAnswer(number) {
  if (c1 == answer) {
    c1 = Math.floor(Math.random() * number + 1);
  } else if (c2 == answer) {
    c2 = Math.floor(Math.random() * number + 1);
  } else if (c3 == answer) {
    c3 = Math.floor(Math.random() * number + 1);
  } else if (c4 == answer) {
    c4 = Math.floor(Math.random() * number + 1);
  }
}
function render(nation) {
  var position = Math.floor(Math.random() * 3 + 1);
  var text = "";
  if (position == 1) {
    text += "? " + nation + " " + b + " = " + result;
    answer = a;
  } else if (position == 2) {
    text += a + " " + nation + " ? = " + result;
    answer = b;
  } else {
    text += a + " " + nation + " " + b + " = ?";
    answer = result;
  }
  checkRepeatAnswer(answer);
  setChoice();
  document.getElementById("question").innerHTML = text;
  document.getElementById("c1").innerHTML = c1;
  document.getElementById("c2").innerHTML = c2;
  document.getElementById("c3").innerHTML = c3;
  document.getElementById("c4").innerHTML = c4;
  document.getElementById("score").innerHTML = "Score : " + score;
  document.getElementById("heard").value = heard;
  myTimer();
}
var Timer;
function myTimer() {
  Timer = setInterval(setTime, 1000);
}

function setTime() {
  time = time - 1;
  if (heard <= 0) {
    var queryString = "?level=" + level+"?game=BasicGame.html"
    window.open("lose.html"+queryString, "_self");
    return;
  }
  if (time <= 0) {
    showDamage("damage2");
    addBoxMove()
    clearInterval(Timer);
    Question();
    heard = heard - 20;
    document.getElementById("heard").value = heard;
    time = 20;
    document.getElementById("time").innerHTML = time;
  } else {
    document.getElementById("time").innerHTML = time;
  }
}
function setChoice() {
  var indexTrue = Math.floor(Math.random() * 4 + 1);
  if (indexTrue == 1) {
    c1 = answer;
  } else if (indexTrue == 2) {
    c2 = answer;
  } else if (indexTrue == 3) {
    c3 = answer;
  } else if (indexTrue == 4) {
    c4 = answer;
  }
}
function checkAnswer(value) {
  if (value == 1) {
    if (c1 == answer) {
      trueAnswer();
    } else {
      failAnswer();
    }
  } else if (value == 2) {
    if (c2 == answer) {
      trueAnswer();
    } else {
      failAnswer();
    }
  } else if (value == 3) {
    if (c3 == answer) {
      trueAnswer();
    } else {
      failAnswer();
    }
  } else if (value == 4) {
    if (c4 == answer) {
      trueAnswer();
    } else {
      failAnswer();
    }
  }
}
function failAnswer() {
  addBoxMove();
  time = 21;
  heard = heard - 20;
  document.getElementById("heard").value = heard;
  showDamage("damage2");
  clearInterval(Timer);
  Question();
}
function trueAnswer() {
  addBoxMove();
  time = 21;
  score = score + 1;
  document.getElementById("score").innerHTML = "Score : " + score;
  showDamage("damage1");
  clearInterval(Timer);
  Question();
}
function showDamage(damage) {
  var tempTime = 4;
  var tempBool = false;
  var pictureTime;
  TimePicture();
  function TimePicture() {
    pictureTime = setInterval(setTimePicture, 500);
  }

  function setTimePicture() {
    tempTime = tempTime - 1;
    if (tempTime <= 0) {
      clearInterval(pictureTime);
    }
    if (!tempBool) {
      tempBool = !tempBool;
      document.getElementById(damage).style.visibility = "visible";
    } else {
      tempBool = !tempBool;
      document.getElementById(damage).style.visibility = "hidden";
    }
  }
}
function removeBoxMove() {
  setTimeout(function() {
    document.getElementById("move1").classList.remove("boxMove");
    document.getElementById("move2").classList.remove("boxMove");
    document.getElementById("time").classList.remove("boxMove");
    document.getElementById("heard").classList.remove("boxMove");
  }, 1500);
}
function addBoxMove() {
  document.getElementById("move1").classList.add("boxMove");
  document.getElementById("move2").classList.add("boxMove");
  document.getElementById("time").classList.add("boxMove");
  document.getElementById("heard").classList.add("boxMove");
}
