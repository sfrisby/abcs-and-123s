
const colors = ['indianred', 'salmon', 'coral', 'magenta', 'darkorange', 'orange',
    'yellow', 'gold', 'lawngreen', 'aquamarine', 'tan', 'palegreen', 'wheat',
    'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue',
    'darkorchid', 'blueviolet', 'tomato', 'mistyrose'];

$(document).ready(function () {
    document.getElementById("defaultOpen").click();

    setOrderedContent(ordered, "#o123s");
    setRandomContent(random, "#r123s");
    $("#oMin").val(oMinimum);
    $("#oMax").val(oMaximum);
});

function openPage(pageName, element, color) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].style.backgroundColor = "";
        tabLinks[i].style.color = "white";
    }
    document.getElementById(pageName).style.display = "block";
    element.style.backgroundColor = color;
    element.style.color = "black";
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIndex(arr) {
    return Math.floor((Math.random() * arr.length));
}

function setRandomBackgroundColor(ele) {
    const i = ele.id;
    const c = getRandomIndex(colors)
    $("#" + i).css("background-color", colors[c]);
    $("#" + i).css("color", "#222");
    $("#" + i).css("font-weight", "bolder");
}