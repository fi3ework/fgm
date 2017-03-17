/**
 * Created by wee on 17/3/12.
 */

window.onload = function () {
    var greenToggle = document.getElementById("green");
    greenToggle.className += " current";
    var link = document.getElementsByTagName("link")[0];
    var toggle = document.querySelectorAll("#toggleWrapper div");
    for (var i = 0; i < toggle.length; i++){
        toggle[i].onclick = function () {
            for (var p in toggle) toggle[p].className = "toggleDiv";
            this.className += " current";
            link.href = this.id + ".css";
        }
    }
};

