
const colors = ['indianred', 'salmon', 'coral', 'magenta', 'darkorange', 'orange',
    'yellow', 'gold', 'lawngreen', 'aquamarine', 'tan', 'palegreen', 'wheat',
    'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue',
    'darkorchid', 'blueviolet', 'tomato', 'mistyrose'];

const hexColors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

$(document).ready(function () {

    setRandomLinearBackground('body');

    document.getElementById("navbarLetters").click();
    document.getElementById("alphabetLettersBtn").click();

    setOrderedNumbers();
    setRandomNumbers();
    setRandomNumber(false);

    setOrderedLetterContent();
    setRandomLetterContent();

    // Setup ordered and random letter cards.
    // Set the game board.
    $("#capOrdLetter").text(CAP_LETTERS[0]);
    $("#firstCapOrdLetter").prop('disabled', true);
    $("#prevCapOrdLetter").prop('disabled', true);
    $("#lowOrdLetter").text(LOW_LETTERS[0]);
    $("#firstLowOrdLetter").prop('disabled', true);
    $("#prevLowOrdLetter").prop('disabled', true);
    getRandomLetter();
    setGameBoard();
});

function clearNavbarSelection() {
    let links = $("#navbar").children("button");
    for (let i = 0; i < links.length; i++) {
        links[i].style.backgroundColor = "";
        links[i].style.fontWeight = "";
        links[i].style.color = "white";
    }
}

function hideTabContent() {
    hideClass("tabContent");
}

function hideLetterTabs() {
    hide("letterTabs");
}

function hideClass(name) {
    let e = document.getElementsByClassName(name);
    for (let i = 0; i < e.length; i++) {
        e[i].style.display = "none";
    }
}

function toggle(id) {
    if (document.getElementById(id).style.display === "none") {
        show(id);
    } else {
        hide(id);
    }
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "block";
}

function openPage(id, element) {
    hideTabContent();
    clearNavbarSelection();
    // TODO force select the parent tab link, i.e. if a letter sub tab is selected then the parent letter tab should be selected - without toggling the sub menu
    // if (toggleSubTabs) {
    switch (id) {
        case 'Letters':
            toggle("letterTabs");
            break;
        case 'Numbers':
            // show("numberTabs");
            break;
        default:
            break;
    }
    // }
    show(id);
    element.style.backgroundColor = getRandomColor();
    element.style.fontWeight = "bold";
    element.style.color = "black";
}

function openTabLink(id, element) {
    let letterTabs = $("#letterTabs").children("button");
    for (let i = 0; i < letterTabs.length; i++) {
        letterTabs[i].style.background = "";
        letterTabs[i].style.color = "white";
    }

    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("subContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].style.background = "";
        tabLinks[i].style.color = "white";
    }
    document.getElementById(id).style.display = "block";
    setRandomLinearBackground(element);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIndex(arr) {
    return Math.floor((Math.random() * arr.length));
}

function getRandomColor() {
    return colors[getRandomIndex(colors)];
}

function setRandomBackgroundColor(ele) {
    const i = ele.id;
    $("#" + i).css("background-color", getRandomColor());
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

function getRandomLinearGradient() {
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    return ("linear-gradient(" + getRandomNumber(0, 360) + "deg, " + color1 + ", " + color2 + ")");
}

function setRandomLinearBackground(ele) {
    let b = getRandomLinearGradient()
    $(ele).css({ background: b });
    let colors = b.split(' ');
    let color1 = colors[1].slice(0, -1)
    let color2 = colors[2].slice(0, -1)
    if (isDark(color1) && isDark(color2)) {
        $(ele).css({ color: "#ddd" });
    } else {
        $(ele).css({ color: "#222" });
    }
}

/**
 * Determine if color is 'dark' or 'light'.
 * <p>
 * Credit to https://awik.io/determine-color-bright-dark-using-javascript/ and
 * https://stackoverflow.com/questions/25426819.
 * @param {*} color 
 * @returns 
 */
function isDark(color) {
    let threshold = 127.5; // 255/2
    var r = 0, g = 0, b = 0, hsp = 0;
    if (color.match(/^rgb/)) { // RGB --> store the red, green, blue.
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    } else { // Assume hex --> Convert it to RGB: http://gist.github.com/983661.
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation http://alienryderflex.com/hsp.html.
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return (hsp < threshold)
}

/**
 * 
 * @returns RGB color with 25% transparency.
 */
function getRandRGB() {
    let r = getRandomNumber(0, 255);
    let g = getRandomNumber(0, 255);
    let b = getRandomNumber(0, 255);
    return ('rgba(' + r + ',' + g + ',' + b + ', 0.6)')
}