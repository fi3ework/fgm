
/**
* Created by wee on 17/3/8.
 */

function changeStyle(elem, attr, value) {
    elem.style[attr] = value
};

window.onload =  function () {
    var rect = document.getElementById("rect");
    var btns = document.getElementsByTagName("button");
    var attrs = ["width", "height", "background", "display", "display"];
    var styleValues = ["200px", "200px", "red", "none", "block"];
    console.log("into change");
    for (let i = 0; i < btns.length; i++){
        // btns[i].index = i;
        btns[i].onclick = function () {
            (function () {
                this.index == btns.length - 1 && (rect.style.cssText = "");
                changeStyle(rect, attrs[i], styleValues[i]);
            })(i);
        }
    }
};
