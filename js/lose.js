var level = location.search.split('level=')[1]
level = level.split('?game=')[0]
var game = location.search.split('game=')[1]

console.log(level)
console.log(game)
function sentParameter() {
    var queryString = "?level=" + level
    window.open(game + queryString, "_self");
  }
  
