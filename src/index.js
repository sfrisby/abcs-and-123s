
const colors = ['indianred', 'salmon', 'coral', 'magenta', 'darkorange', 'orange',
    'yellow', 'gold', 'lawngreen', 'aquamarine', 'tan', 'palegreen', 'wheat',
    'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue',
    'darkorchid', 'blueviolet', 'tomato', 'mistyrose'];

const hexColors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

$(document).ready(function () {
    document.getElementById("defaultOpen").click();
    document.getElementById("defaultLetterOpen").click();
    document.getElementById("defaultNumberOpen").click();

    setOrderedNumbers();
    setRandomNumbers();
    setRandomNumber(false);

    setOrderedLetterContent();
    setRandomLetterContent();

    // Set random gradient for each tab.
    let tabs = ["Letters", "LettersCards", "Numbers", "About"];
    tabs.forEach(element => {
        setRandomHexBackgroundGradientById(element);
    });

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

function openPage(pageName, element) {
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
    element.style.backgroundColor = getRandomColor();
    element.style.color = "black";
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

/**
 * Set random gradient background given for the given ID.
 * <p>
 * Pre-pending '#' in front ID.
 * @param {*} id either a string or element object.
 */
function setRandomHexBackgroundGradientById(id) {
    if (typeof id === 'string' && id[0] != "#") {
        id = ("#" + id);
    } else if (typeof id === 'object') {
        id = ("#" + id.id)
    }
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    let b = "linear-gradient(45deg, " + color1 + ", " + color2 + ")";
    $(id).css({ background: b });
}

function setRandomHexBackgroundGradientForParent(ele) {
    setRandomHexBackgroundGradientById(ele.parentElement.id)
}

/**
 * Setting given ID to a random linear gradient background and dark font.
 * @param {} id 
 */
function updateBackground(id) {
    if (typeof id === 'string' && id[0] != "#") {
        id = ("#" + id);
    } else if (typeof id === 'object') {
        id = ("#" + id.id)
    }
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    let b = "linear-gradient(" + getRandomNumber(0, 360) + "deg, " + color1 + ", " + color2 + ")";
    $(id).css({ background: b });
    $(id).css("font-weight", "bolder");
    if (isDark(color1) || isDark(color2)) {
        $(id).css({ color: "#ddd" });
    } else {
        $(id).css({ color: "#222" });
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
    let r = getRandomNumber(0,255);
    let g = getRandomNumber(0,255);
    let b = getRandomNumber(0,255);
    return ('rgba('+r+','+g+','+b+', 0.6)')
}