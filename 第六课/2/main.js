var avatarEles = document.querySelectorAll("#sender img");
var contentEle = document.querySelector("textarea");
var lessOrMoreEle = document.getElementsByClassName("maxText")[0];
var textNumEle = document.getElementsByClassName("maxNum")[0];
var submitEle = document.getElementById("broadcast");
var nameEle = document.getElementById("name");
var cellsEle = document.getElementById("cells");
var avatarIndex = 0;

//set avatar click
for (var i = 0; i < avatarEles.length; i++) {
  var currAvatar = avatarEles[i];
  currAvatar.index = i;
  currAvatar.onclick = function () {
    for (var i = 0; i < avatarEles.length; i++) {
      avatarEles[i].className = "";
    }
    this.className = "onImg";
    avatarIndex = this.index;
  }
}
avatarEles[0].dispatchEvent(new Event("click"));

//check letter num
contentEle.onkeyup = function () {
  var content = contentEle.value;
  var currLength = content.length;
  // console.log(currLength);
  if (currLength > 140) {
    lessOrMoreEle.innerHTML = "已经超出";
    textNumEle.className.indexOf("outRange") == -1 && (textNumEle.className += " outRange");
  } else {
    lessOrMoreEle.innerHTML = "还能输入";
    textNumEle.className = "maxNum";
  }
  textNumEle.innerHTML = Math.abs(currLength - 140)
};

//model
var MsgModel = function (name, avatarIndex, content) {
  this.name = name;
  this.avatarIndex = avatarIndex;
  this.content = content;
}

//add a data
submitEle.addEventListener("click", function () {
  var name = nameEle.value;
  var content = contentEle.value;
  //check validity
  var isValid = checkValid(name, 1) && checkValid(content, 2);
  if (!isValid) return false;
  var newMsg = MsgModel(name, avatarIndex, content);
  var liEle = createNewMsg(newMsg);
  //set add animation
  cellsEle.insertBefore(liEle, cellsEle.firstChild);
  addAnimation(liEle);
  setCellHover();
  clearInput();
  setDelClick();
}, false)

//get css
function getCSS(ele, style) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[style];
  }
}

//set add animation
function addAnimation(insertCell) {
  // console.log(insertCell.offsetHeight);
  var insertHeight = insertCell.offsetHeight;
  // console.log(insertHeight);
  insertCell.style.height = 0;
  var timer = setInterval(function () {
    insertCell.style.height = parseInt(insertCell.style.height) + 5 + "px";
    console.log(insertCell.offsetHeight);
    insertCell.offsetHeight >= insertHeight && clearInterval(timer);
  }, 30)
  // console.log(insertHeight);
}
//clear input
function clearInput() {
  nameEle.value = "";
  contentEle.value = "";
  textNumEle.innerHTML = "140";
}

//check single input
function checkValid(input, index) {
  var flag = true;
  switch (index) {
    case 1: //check name
      var reg = /^[u4e00-u9fa5\w$]{2,8}/;
      !reg.test(input) && (alert("名字不符合要求"), flag = false);
      break;
    case 2: //check content
      input.length > 140 && (alert("输入过长"), flag = false);
      input.length == 0 && (alert("输入为空"), flag = false);
      break;
  }
  return flag;

}

//add date animation
function createNewMsg(model) {
  var liEle = document.createElement("li");
  liEle.className = "cell";
  //get date
  var date = new Date();
  var dateStr = format(date.getMonth() + 1) + "月" + format(date.getDate()) + "日" + format(date.getHours()) + ":" + format(date.getMinutes());
  //set innerHTML
  liEle.innerHTML = "<img src=\"" + "http://fgm.cc/learn/lesson6/img/face" + (avatarIndex + 1) + ".gif" + "\"/><div class=\"msg\"><a href=\"javascript:;\" class=\"userName\">" + nameEle.value + ": </a><span class=\"content\">" + contentEle.value + "</span><p class=\"date\">" + dateStr + "<a class=\"del\">删除</a></p></div>"
  return liEle;
}

//set cell hover
function setCellHover() {
  var cellsArr = cellsEle.children;
  // console.log(cellsArr.length);
  for (var i = 0; i < cellsArr.length; i++) {
    // console.log(i);
    //over
    cellsArr[i].addEventListener("mouseover", function () {
      var currDel = this.getElementsByClassName("del")[0];
      // console.log(currDel.style.display);
      currDel.style.display != "block" && (currDel.style.display = "block");
    })
    //out
    cellsArr[i].addEventListener("mouseout", function () {
      var currDel = this.getElementsByClassName("del")[0];
      currDel.style.display == "block" && (currDel.style.display = "none");
    })
  }
}

//set click del
function setDelClick() {
  var cellsArr = cellsEle.children;
  for (var i = 0; i < cellsArr.length; i++) {
    var currDel = cellsArr[i].getElementsByClassName("del")[0];
    currDel.onclick = function () {
      // console.log(this.parentNode.parentNode.parentNode);
      delCell(this.parentNode.parentNode.parentNode);
    };
  }
}

//shrink padding 
function shrinkPadding(cell) {
  var timer2 = setInterval(function () {
    // console.log(cell);
    cell.style.paddingTop = parseInt(getCSS(cell, "paddingTop")) - 3 + "px";
    cell.style.paddingBottom = parseInt(getCSS(cell, "paddingBottom")) - 3 + "px";
    // console.log(cell.style.padding);
    parseInt(getCSS(cell, "paddingBottom")) <= 2 &&
      (cell.style.padding = "0",
        cellsEle.removeChild(cell),
        clearInterval(timer2));
  }, 150);
}

// console.log(shrinkPadding());
//set del function
function delCell(cell) {
  //shrink height
  var timer1 = setInterval(function () {
    cell.style.height = parseInt(getCSS(cell, "height")) - 6 + "px";
    // console.log(cell.style.height);
    if (parseInt(getCSS(cell, "height")) <= 5) {
      cell.style.height = 0;
      clearInterval(timer1);
      shrinkPadding(cell);
      // clearInterval(timer2);
    }
  }, 150)
}


//format date
function format(date) {
  return date.toString().replace(/^(\d)$/, "0$1");
}

//init
setCellHover();
setDelClick();