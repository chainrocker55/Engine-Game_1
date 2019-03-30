/// แก้ไขข้อความที่ต้องการด้านล่างนี้ครับ
var tickercontents = new Array()
tickercontents[0] = 'ยินดีต้อนรับทุกท่านครับ'
tickercontents[1] = 'เกมส์ให้ความหลายหลายในการเล่น'
tickercontents[2] = 'บวก ลบ คูณ หาร หรม. ครณ. ยกกำลัง'

var tickdelay = 3000 //delay btw messages
var highlightspeed = 10 //10 pixels at a time.

////Do not edit pass this line////////////////

var currentmessage = 0
var clipwidth = 0

function changetickercontent() {
    crosstick.style.clip = "rect(0px 0px auto 0px)"
    crosstick.innerHTML = tickercontents[currentmessage]
    highlightmsg()
}

function highlightmsg() {
    var msgwidth = crosstick.offsetWidth
    if (clipwidth < msgwidth) {
        clipwidth += highlightspeed
        crosstick.style.clip = "rect(0px " + clipwidth + "px auto 0px)"
        beginclip = setTimeout("highlightmsg()", 100)
    } else {
        clipwidth = 0
        clearTimeout(beginclip)
        if (currentmessage == tickercontents.length - 1) currentmessage = 0
        else currentmessage++
        setTimeout("changetickercontent()", tickdelay)
    }
}

function start_ticking() {
    crosstick = document.getElementById ? document.getElementById("welcome") : document.all.highlighter
    crosstickParent = crosstick.parentNode ? crosstick.parentNode : crosstick.parentElement
    if (parseInt(crosstick.offsetHeight) > 0)
        crosstickParent.style.height = crosstick.offsetHeight + 'px'
    else
        setTimeout("crosstickParent.style.height=crosstick.offsetHeight+'px'", 100) //delay for Mozilla's sake
    changetickercontent()
}