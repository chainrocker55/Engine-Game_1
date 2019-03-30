/*
1.เกมส์นับเวลาถอยหลังระเบิด
2.ใส่คำตอบแล้วกด dispose จะได้ตัวปลดชนวนระเบิด
3.ลากตัวปลดชนวนระเบิดไปใส่เครื่องหมายคำถาม
4.ตอบถูก Bomb resolve +1 เวลาเพิ่ม 5 วินาที
5.ตอบผิด Bomb Explode +1 และเวลาของระเบิดลดลงเร็วขึ้น
6.ใช้ Pass เพื่อข้ามข้อได้ โดยเพิ่มทุกๆการปลดระเบิดสำเร็จ5ครั้ง
7.ใช้ Fix เพื่อทำให้เวลาลดลงเป็นปกติ โดยเพิ่มทุกๆการปลดระเบิดสำเร็จ10ครั้ง

*/
/* 
เหลือ:
1.เปลี่ยนจากวินาทีเป็นนาที
2.ทำระดับความยาก ไปปรับเอาในฟังก์ชั่น ทำแยกไว้ 3 อัน

*/
var level = location.search.split('level=')[1]
var countpass = 0
var countreset = 0
var timeleft = 83
var ex1
var ex2
var setdrag = document.getElementById('disposal')
var setdrop = document.getElementById('result')
var countbomb = 9
var countexplode = 0
var result
var key
var disposerstatus = false
var interval = 1000

var timecount = setTimeout(timer,interval)
function timer(){
  if(timeleft >0){
    timeleft -=1
    document.getElementById("timelabel").innerHTML=timeleft ;
    timecount = setTimeout(timer,interval)
  }else{
    var queryString = "?level=" + level+"?game=bomb.html"
    window.open("lose.html"+queryString, "_self");
  }
    
}

function getLevel(){
  if(level=='easy'){
    randomeasy()
  }else if(level=='normal'){
    randomnormal()
  }else if(level=='hard'){
    randomhard()
  }
}

function increasepass(){
  if(countbomb % 5 == 0){
    countpass+=1
    updatelabel()
  }
  updatelabel()
  

}
function increasereset(){
  if(countbomb % 10 == 0){
    countreset+=1
    updatelabel()
  }
  updatelabel()
  

}


function getdisposer(){
  key = document.getElementById('inputdisposal').value
    setdrag = document.getElementById('disposal')
    setdrag.setAttribute('draggable',true)
    document.getElementById('disposal').innerHTML = key;
    document.getElementById('disposal').classList.add('divBoxClick')
    checkinput(key)
    disposerstatus = true
    
}
function updatelabel(){
  document.getElementById('disposal').classList.add('is-hidden')
  document.getElementById('disposal').classList.remove('divBoxClick')
  document.getElementById('countb').innerHTML = "Bomb Resolve :" +countbomb
  document.getElementById('countex').innerHTML = "Bomb Exploded :" +countexplode
  document.getElementById('countp').innerHTML = "Pass Avaliable :" +countpass
  document.getElementById('countre').innerHTML = "Reset Avaliable :" +countreset
  document.getElementById('a1').innerHTML = ex1
    document.getElementById('ax').innerHTML = ex2
  }
function onenum (e) { 
  if(e == 1||e == 2||e == 3||e == 4||e == 5||e == 6||e == 7||e == 8||e == 9){
    document.getElementById('haa1').style.left = '31%'
  }else{
    document.getElementById('haa1').style.left = '29.6%'
  }
 }





function randomeasy(){
     ex1 = Math.floor((Math.random() * 10) + 1);
     ex2 = Math.floor((Math.random() * 5) + 1);
     result = Math.pow(ex1,ex2)
    document.getElementById('a1').innerHTML = ex1
    document.getElementById('ax').innerHTML = ex2
    document.getElementById('countb').innerHTML = "Bomb Resolve :" +countbomb
    document.getElementById('countex').innerHTML = "Bomb Exploded :" +countexplode
    document.getElementById('countp').innerHTML = "Pass Avaliable :" +countpass
    document.getElementById('countre').innerHTML = "Reset Avaliable :" +countreset
    document.getElementById('circle').style.backgroundColor = 'rgb(243, 6, 6)';
    document.getElementById('disposal').innerHTML = " "
    setdrag.setAttribute('draggable',false)
    updatelabel()
}

function randomnormal(){
  ex1 = Math.floor((Math.random() * 15) + 1);
     ex2 = Math.floor((Math.random() * 5) + 1);
     result = Math.pow(ex1,ex2)
    document.getElementById('a1').innerHTML = ex1
    document.getElementById('ax').innerHTML = ex2
    document.getElementById('countb').innerHTML = "Bomb Resolve :" +countbomb
    document.getElementById('countex').innerHTML = "Bomb Exploded :" +countexplode
    document.getElementById('countp').innerHTML = "Pass Avaliable :" +countpass
    document.getElementById('countre').innerHTML = "Reset Avaliable :" +countreset
    document.getElementById('circle').style.backgroundColor = 'rgb(243, 6, 6)';
    document.getElementById('disposal').innerHTML = " "
    setdrag.setAttribute('draggable',false)
    updatelabel()
}
function randomhard(){
  ex1 = Math.floor((Math.random() * 20) + 1);
     ex2 = Math.floor((Math.random() * 5) + 1);
     result = Math.pow(ex1,ex2)
    document.getElementById('a1').innerHTML = ex1
    document.getElementById('ax').innerHTML = ex2
    document.getElementById('countb').innerHTML = "Bomb Resolve :" +countbomb
    document.getElementById('countex').innerHTML = "Bomb Exploded :" +countexplode
    document.getElementById('countp').innerHTML = "Pass Avaliable :" +countpass
    document.getElementById('countre').innerHTML = "Reset Avaliable :" +countreset
    document.getElementById('circle').style.backgroundColor = 'rgb(243, 6, 6)';
    
    document.getElementById('disposal').innerHTML = " "
    setdrag.setAttribute('draggable',false)
    updatelabel()
}

function checkeasy(){
    if(key == result){
      timeleft +=6
      countbomb +=1
      increasepass()
      increasereset()
      checkpass()
      checkreset()
      randomeasy()      
      
      
    }else{
      timeleft -=5
      interval -=100
      countexplode +=1
      increasepass()
      increasereset()
      randomeasy()
      checkpass()
      checkreset()
      
    }
    
}

function oninnput(){
  key = document.getElementById('inputdisposal').value
  document.getElementById('disposal').classList.remove('is-hidden')
  document.getElementById('disposal').classList.add('divBox')
  document.getElementById('disposal').innerHTML = +key
  
}
function checkinput(k){
  if(k =="" ||k == null ||k == 0){
    document.getElementById('circle').style.backgroundColor = 'rgb(243, 6, 6)';
    nondrop()
    document.getElementById('disposal').innerHTML = +key
  }else{
    document.getElementById('circle').style.backgroundColor = 'rgb(0, 255, 55)';
  }
}

function typing(){
  document.getElementById('circle').style.backgroundColor = 'rgb(243, 6, 6)';
  
}

function allowDrop(event) {
  event.preventDefault();
}



function drop(event) {
  event.preventDefault();
  document.getElementById('inputdisposal').value = ""
  checkeasy()
  
}
function nondrop(event) {
  disposerstatus = false
  checkdisposerstatus()
}




function checkdisposerstatus(event){
  if(disposerstatus == true){
    allowDrop(event)
    drop(event)
  }else{
    disposerstatus = false
    nondrop
  }
}
function usepass() {
  countpass -=1
  randomeasy()
  checkpass()
  

  
}
function usereset() {
  countreset -=1
  interval = 1000
  updatelabel()
  checkreset()
  
  

  
}
function setenablebutton(){
  document.getElementById('buttpass').disabled = false
}
function setdisablebutton(){
  document.getElementById('buttpass').disabled = true
}
function setenablebutton2(){
  document.getElementById('buttresetspeed').disabled = false
}
function setdisablebutton2(){
  document.getElementById('buttresetspeed').disabled = true
}
function checkpass(){
  if(countpass > 0){
    setenablebutton()
  }else if(countpass < 0 || countpass == 0){
    countpass = 0
    setdisablebutton()
    checkdisposerstatus(false)
  }
}
function checkreset(){
  if(countreset > 0){
    setenablebutton2()
  }else if(countreset < 0 || countreset == 0){
    countreset = 0
    setdisablebutton2()
    checkdisposerstatus(false)
  }
}
updatelabel()

timer()










