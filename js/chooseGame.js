var level = location.search.split('level=')[1]
console.log(level)
function sentParameter(game) {
    var queryString = "?level=" + level
    window.open(game + queryString, "_self");
  }
  
