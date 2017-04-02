var avatarEles = document.querySelectorAll("#sender img");
var contentEle = document.querySelector("textarea");
var lessOrMoreEle = document.getElementsByClassName("maxText")[0];
var textNumEle = document.getElementsByClassName("maxNum")[0];
var submitEle = document.getElementById("broadcast");
var nameEle = document.getElementById("name");
var cellsEle = document.getElementById("cells");
var avatarIndex = 0;

//set avatar click
for(var i = 0; i < avatarEles.length; i++){
  var currAvatar = avatarEles[i];
  currAvatar.index = i;
  currAvatar.onclick = function(){
    for(var i = 0; i < avatarEles.length; i++){
      avatarEles[i].className = "";
    }
    this.className = "onImg";
    avatarIndex = this.index;
  }
}
avatarEles[0].dispatchEvent(new Event("click"));

//check letter num
contentEle.onkeyup = function(){
  var content = contentEle.value;
  var currLength = content.length;
  console.log(currLength);
  if(currLength > 140){
    lessOrMoreEle.innerHTML = "已经超出";
    textNumEle.className.indexOf("outRange") == -1 && (textNumEle.className += " outRange");
  } else{
    lessOrMoreEle.innerHTML = "还能输入";
    textNumEle.className = "maxNum";
  }
  textNumEle.innerHTML = Math.abs(currLength - 140)
};

//model
var MsgModel = function(name, avatarIndex, content){
  this.name = name;
  this.avatarIndex = avatarIndex;
  this.content = content;
}

//add a data
submitEle.addEventListener("click", function(){
  var name = nameEle.value;
  var content = contentEle.value;
  var newMsg = MsgModel(name, avatarIndex, content);
  addNewMsg(newMsg);
}, false)

//add date animation
function addNewMsg(model){
  var liEle = document.createElement("li");
  liEle.className = "cell";
  //get date
  var date = new Date();
  var dateStr = format(date.getMonth() + 1) + "月" + format(date.getDate()) + "日" + date.getHours() + ":" + date.getMinutes();
  liEle.innerHTML = "<img src=\"" + "http://fgm.cc/learn/lesson6/img/face" + (avatarIndex + 1) + ".gif" + "\"/><div class=\"msg\"><a href=\"javascript:;\" class=\"userName\">" + nameEle.value + "</a><span class=\"content\">" + contentEle.value + "</span><p class=\"date\">" + dateStr + "</p></div>"
  cellsEle.insertBefore(liEle, cellsEle.firstChild);
}

//format date
function format(date){
  return date.toString().replace(/^(\d)$/,"0$1");
}
