
function getOrderedMax() {
    return Number($("#oMax").val());
}
function getOrderedMin() {
    return Number($("#oMin").val());
}
function getOrderedCountBy() {
    return Number($("#oCountBy").val());
}
function setOrderedCountBy(v) {
    return $("#oCountBy").val(v);
}

function getRandMax() {
    return Number($("#rMax").val());
}
function getRandMin() {
    return Number($("#rMin").val());
}
function getRandAmount() {
    return Number($("#rAmount").val());
}

function getQuizMax() {
    return Number($("#qMax").val());
}
function getQuizMin() {
    return Number($("#qMin").val());
}

function openNumberPage(pageName, element) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("numberTabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("numberTabLink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].style.background = "";
        tabLinks[i].style.color = "white";
    }
    document.getElementById(pageName).style.display = "inline-block";
    setRandomLinearBackground(element.id);
}

/**
 * Set ordered numbers, min to max by 1.
 * @param {*} id where HTML is stored.
 */
function setOrderedNumbers(id = "#o123s") {
    let oMin = getOrderedMin();
    let oMax = getOrderedMax();
    let c = getOrderedCountBy();
    if (c <= 0) {
        c = 1;
        setOrderedCountBy(1);
    }
    let output = "";
    for (var i = oMin; i < oMax; i = (i + c)) {
        output += ("<div class='click-me rounded' id='num_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'> " + i + " </div>");
    }
    if (oMax % c === 0) {
        output += ("<div class='click-me rounded' id='num_" + oMax + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'> " + oMax + " </div>");
    }
    $(String(id)).html(output);
}

function setRandomNumbers(id = "#r123s") {
    let oMinimum = getRandMin();
    let oMaximum = getRandMax() + 1;
    let output = "";
    for (var i = 0; i < getRandAmount(); i++) {
        let tmp = getRandomNumber(oMinimum, oMaximum);
        output += ("<div class='click-me rounded' id='num_" + tmp + "_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'><span class='coded'> " + tmp + " </span></div>");
    }
    $(String(id)).html(output);
}

function minusOrderedMin() {
    let v = getOrderedMin();
    v = v - 1;
    $("#oMin").val(v);
}
function addOrderedMin() {
    let v = getOrderedMin();
    v = v + 1;
    $("#oMin").val(v);
}
function minusOrderedMax() {
    let v = getOrderedMax();
    v = v - 1;
    $("#oMax").val(v);
}
function addOrderedMax() {
    let v = getOrderedMax();
    v = v + 1;
    $("#oMax").val(v);
}
function minusCountBy() {
    let v = getOrderedCountBy();
    v = v - 1;
    if (v <= 1) v = 1;
    $("#oCountBy").val(v);
}
function addCountBy() {
    let v = getOrderedCountBy();
    v = v + 1;
    $("#oCountBy").val(v);
}

function minusRandMin() {
    let v = getRandMin();
    v = v - 1;
    $("#rMin").val(v);
}
function addRandMin() {
    let v = getRandMin();
    v = v + 1;
    $("#rMin").val(v);
}
function minusRandMax() {
    let v = getRandMax();
    v = v - 1;
    $("#rMax").val(v);
}
function addRandMax() {
    let v = getRandMax();
    v = v + 1;
    $("#rMax").val(v);
}

function minusQuizMin() {
    let v = getQuizMin();
    v = v - 1;
    $("#qMin").val(v);
}
function addQuizMin() {
    let v = getQuizMin();
    v = v + 1;
    $("#qMin").val(v);
}
function minusQuizMax() {
    let v = getQuizMax();
    v = v - 1;
    $("#qMax").val(v);
}
function addQuizMax() {
    let v = getQuizMax();
    v = v + 1;
    $("#qMax").val(v);
}

function setRandomNumber(increment) {
    if (increment) {
        let c = Number($("#numberCorrectCount").text());
        c = c + 1;
        $("#numberCorrectCount").text(c);
    }
    $("#randNumber").text(getRandomNumber(getQuizMin(), getQuizMax()));
}