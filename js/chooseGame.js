var level = location.search.split('level=')[1]
console.log(level)
function sentParameter(howtoplay) {
    var queryString = "?level=" + level
    window.open(howtoplay + queryString, "_self");
  }
  
