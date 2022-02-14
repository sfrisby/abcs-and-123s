
const colors = ['indianred', 'salmon', 'coral', 'magenta', 'darkorange', 'orange',
    'yellow', 'gold', 'lawngreen', 'aquamarine', 'tan', 'palegreen', 'wheat',
    'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue',
    'darkorchid', 'blueviolet', 'tomato', 'mistyrose'];

const hexColors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

$(document).ready(function () {
    document.getElementById("defaultOpen").click();

    setOrderedContent(ordered, "#o123s");
    setRandomContent(random, "#r123s");

    setOrderedLetterContent();
    setRandomLetterContent();

    // Set random gradient for each tab.
    let tabs = ["#Letters", "#Numbers", "#About"];
    tabs.forEach(element => {
        setRandomHexBackgroundGradient(element);
    });
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

function getRandomHexBackgroundColor() {
    let color = "#"
    for (var i = 0; i < 6; i++) {
        color += hexColors[getRandomIndex(hexColors)];
    }
    return color
}

function setRandomHexBackgroundGradient(ele) {
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    let b = "linear-gradient(45deg, " + color1 + ", " + color2 + ")";
    $(ele).css({ background: b });  
}