const HEX = 16;

const colors = ['indianred', 'salmon', 'coral', 'magenta', 'darkorange', 'orange',
    'yellow', 'gold', 'lawngreen', 'aquamarine', 'tan', 'palegreen', 'wheat',
    'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue',
    'darkorchid', 'blueviolet', 'tomato', 'mistyrose'];

const hexColors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

let lastBodyBackground = getRandomLinearGradient();

$(document).ready(function () {

    setLinearBackground('body', lastBodyBackground);

    // document.getElementById("navbarAboutBtn").click();
    // document.getElementById("navbarPreKNumberBtn").click();
    // document.getElementById("numberOrderedBtn").click();
    // document.getElementById("numberQuizBtn").click();
    // document.getElementById("numberRandBtn").click();

    document.getElementById("navbarPreKLetterBtn").click();
    // document.getElementById("letterQuizBtn").click();
    // document.getElementById("letterAlphabetBtn").click();
    document.getElementById("randomLetterPhonicsBtn").click();


    setOrderedNumbers();
    setRandomNumber(false);
    setRandomNumbers();

    setOrderedLetterContent();
    setRandomLetterContent();
    setRandomLetterPhonicsStage();
    setDoublePhonicLetterStage();

    setKinderRandomCoinsStage();

    // Setup ordered and random letter cards.
    // Set the game board.
    $("#capOrdLetter").text(CAP_LETTERS[0]);
    $("#firstCapOrdLetter").prop('disabled', true);
    $("#prevCapOrdLetter").prop('disabled', true);
    $("#lowOrdLetter").text(LOW_LETTERS[0]);
    $("#firstLowOrdLetter").prop('disabled', true);
    $("#prevLowOrdLetter").prop('disabled', true);
    getRandomLetter();
    //setGameBoard();
});

function removeStyle(obj) {
    try {
        $(obj).removeAttr("style");
    } catch (err) {
        throw ("Failed to remove style for: " + obj.textContent + ". ID was: " + obj.id);
    }
}

function clearNavbarSelection() {
    let links = [];
    links.push($.makeArray($("#navbarAboutBtn"))[0]);
    $.makeArray($("#k-reading-links").children("li").children("a")).forEach(e => {
        links.push(e);
    });
    $.makeArray($("#k-money-links").children("li").children("a")).forEach(e => {
        links.push(e);
    });
    $.makeArray($("#pre-k-letter-links").children("li").children("a")).forEach(e => {
        links.push(e);
    });
    $.makeArray($("#pre-k-number-links").children("li").children("a")).forEach(e => {
        links.push(e);
    });

    for (let i = 0; i < links.length; i++) {
        links[i].style.backgroundColor = "";
        links[i].style.fontWeight = "";
        links[i].style.color = "";
    }
}

function openPage(id, element) {
    $(".tabContent").hide();
    clearNavbarSelection();
    if (id[0] != "#") { id = "#" + id; }
    $(id).show();
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

function getRandomLinearGradient() {
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    return ("linear-gradient(" + getRandomNumber(0, 360) + "deg, " + color1 + ", " + color2 + ")");
}

function getVerticalGradient() {
    let color1 = getRandomHexBackgroundColor();
    let color2 = getRandomHexBackgroundColor();
    return ("linear-gradient(" + 0 + "deg, " + color1 + ", " + color2 + ")");
}

function setLinearBackground(ele, bg) {
    $(ele).css({ background: bg });
    let colors = bg.split(' ');
    let color1 = colors[1].slice(0, -1)
    let color2 = colors[2].slice(0, -1)
    if (isDark(color1) && isDark(color2)) {
        $(ele).css({ color: "#ddd" });
    } else {
        $(ele).css({ color: "#222" });
    }
}

function setRandomLinearBackground(ele) {
    let bg = getRandomLinearGradient();
    $(ele).css({ background: bg });
    if (ele === 'body') {
        lastBodyBackground = bg;
    }
    let colors = bg.split(' ');
    let color1 = colors[1].slice(0, -1)
    let color2 = colors[2].slice(0, -1)
    if (isDark(color1) && isDark(color2)) {
        $(ele).css({ color: "#ddd" });
    } else {
        $(ele).css({ color: "#222" });
    }
}

let colorReferenceStep = function (a, b, u) {
    return ((1 - u) * a + u * b);
};

let colorReferenceStepHex = function (a, b, u) {
    let calc = parseInt(((1 - u) * parseInt(a, HEX) + u * parseInt(b, HEX)).toString(HEX), HEX).toString(HEX);
    if (calc.length == 1) {
        calc = '0' + calc;
    }
    return calc;
};

let colorRound = function (s, e, u) {
    return (Math.round(colorReferenceStep(s.g, e.g, u)));
}


let isAnimatedRandomLinearBackgroundRunning = false;
function setAnimatedRandomLinearBackground(ele) {
    if (isAnimatedRandomLinearBackgroundRunning) return; // Simply ignore transition if already animating.
    let lastColors = lastBodyBackground.split(' ');
    let lastColorsFirst = lastColors[1].slice(1, -1); // Producing hex '######'.
    let lastColorFistRGB = { r: lastColorsFirst.slice(0, 2), g: lastColorsFirst.slice(2, 4), b: lastColorsFirst.slice(4, 6) }; // Splitting hex to RGB components.
    let lastColorsSecond = lastColors[2].slice(1, -1);
    let lastColorSecondRGB = { r: lastColorsSecond.slice(0, 2), g: lastColorsSecond.slice(2, 4), b: lastColorsSecond.slice(4, 6) }; // Splitting hex to RGB components.
    let lastColorDeg = lastColors[0].split('(')[1].slice(0, -4); // Call to slice removes 'deg,'.

    let newColor = getRandomLinearGradient();
    let newColors = newColor.split(' ');
    let newColorsFirst = newColors[1].slice(1, -1);
    let newColorsFirstRGB = { r: newColorsFirst.slice(0, 2), g: newColorsFirst.slice(2, 4), b: newColorsFirst.slice(4, 6) };
    let newColorsSecond = newColors[2].slice(1, -1);
    let newColorsSecondRGB = { r: newColorsSecond.slice(0, 2), g: newColorsSecond.slice(2, 4), b: newColorsSecond.slice(4, 6) };
    let newColorsDeg = newColors[0].split('(')[1].slice(0, -4);

    lastBodyBackground = newColor;
    var interval = 10;
    var duration = 1000;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 10);
    isAnimatedRandomLinearBackgroundRunning = true;
    function frame() {
        if (u >= 1.0) {
            clearInterval(id);
            isAnimatedRandomLinearBackgroundRunning = false;
        } else {
            let deg = Math.round(colorReferenceStep(lastColorDeg, newColorsDeg, u));
            let rFirst = colorReferenceStepHex(lastColorFistRGB.r, newColorsFirstRGB.r, u);
            let gFirst = colorReferenceStepHex(lastColorFistRGB.g, newColorsFirstRGB.g, u);
            let bFirst = colorReferenceStepHex(lastColorFistRGB.b, newColorsFirstRGB.b, u);
            let rSecond = colorReferenceStepHex(lastColorSecondRGB.r, newColorsSecondRGB.r, u);
            let gSecond = colorReferenceStepHex(lastColorSecondRGB.g, newColorsSecondRGB.g, u);
            let bSecond = colorReferenceStepHex(lastColorSecondRGB.b, newColorsSecondRGB.b, u);
            let first = (rFirst + gFirst + bFirst).toString()
            let second = (rSecond + gSecond + bSecond).toString();
            let tmp = 'linear-gradient(' + deg + 'deg, #' + first + ', #' + second + ')';
            $(ele).css({ background: 'linear-gradient(' + deg + 'deg, #' + first + ', #' + second + ')' });
            u += step_u;
        }
    }
    if (isDark("#" + newColorsFirst) && isDark("#" + newColorsSecond)) {
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

function increment(id) {
    let v = Number($("#" + id).val());
    $("#" + id).val(v + 1);
}

function decrement(id) {
    let v = Number($("#" + id).val());
    if (v <= 1) {
        $("#" + id).val(1);
    } else {
        $("#" + id).val(v - 1);
    }
}