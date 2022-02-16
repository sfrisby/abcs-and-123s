const numOfLetters = 26;
const capitals = 65;
const lowercase = 97;
const cLetters = new Array(numOfLetters).fill(1).map((_, i) => String.fromCharCode(capitals + i));
const lLetters = new Array(numOfLetters).fill(1).map((_, i) => String.fromCharCode(lowercase + i));
const letters = [].concat(cLetters, lLetters);
const rLetterSize = 50;


function openLetterPage(pageName, element) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("letterTabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("letterTablink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].style.background = "";
        tabLinks[i].style.color = "white";
    }
    document.getElementById(pageName).style.display = "block";
    updateBackground(element.id);
}


function setOrderedLetterContent() {
    let output = "";
    for (var i = 0; i < cLetters.length; i++) {
        output += ("<div class='letter' id='char_" + lLetters[i]);
        output += ("' onclick='updateBackground(this)'> ");
        output += (cLetters[i] + " " + lLetters[i] + " </div>");
    }
    $('#oabcs').html(output);
}

function setRandomLetterContent() {
    let output = "";
    for (var i = 0; i < rLetterSize; i++) {
        let index = getRandomIndex(letters);
        output += ("<div class='letter' id='random_" + letters[index] + "_" + i);
        output += ("' onclick='updateBackground(this)'>");
        output += (letters[index] + "</div>");
    }
    $('#rabcs').html(output);
}

function getRandomLetter(correct) {
    if (correct) {
        $("#letterCorrectCount").text( parseInt($("#letterCorrectCount").text()) + 1 )
    }
    $("#randLetter").text(letters[getRandomIndex(letters)])
}

function getLowLetter() {
    return $("#lowOrdLetter").text();
}

function getCapLetter() {
    return $("#capOrdLetter").text();
}

function getLowLetterIndex() {
    return lLetters.indexOf(getLowLetter())
}

function getCapLetterIndex() {
    return cLetters.indexOf(getCapLetter())
}

function getFirstLowLetter() {
    $("#prevLowOrdLetter").prop('disabled', true);
    $("#firstLowOrdLetter").prop('disabled', true);
    $("#nextLowOrdLetter").prop('disabled', false);
    $("#lastLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(lLetters[0])
}
function getPrevLowLetter() {
    if ((getLowLetterIndex() - 1) == 0) {
        $("#prevLowOrdLetter").prop('disabled', true);
        $("#firstLowOrdLetter").prop('disabled', true);
    }
    $("#nextLowOrdLetter").prop('disabled', false);
    $("#lastLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(lLetters[getLowLetterIndex() - 1])
}
function getNextLowLetter() {
    if (getLowLetterIndex() >= (lLetters.length - 2)) {
        $("#nextLowOrdLetter").prop('disabled', true);
        $("#lastLowOrdLetter").prop('disabled', true);
    }
    $("#prevLowOrdLetter").prop('disabled', false);
    $("#firstLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(lLetters[getLowLetterIndex() + 1])
}
function getLastLowLetter() {
    $("#nextLowOrdLetter").prop('disabled', true);
    $("#lastLowOrdLetter").prop('disabled', true);
    $("#prevLowOrdLetter").prop('disabled', false);
    $("#firstLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(lLetters[lLetters.length - 1])
}

function getFirstCapLetter() {
    $("#prevCapOrdLetter").prop('disabled', true);
    $("#firstCapOrdLetter").prop('disabled', true);
    $("#nextCapOrdLetter").prop('disabled', false);
    $("#lastCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(cLetters[0])
}
function getPrevCapLetter() {
    if ((getCapLetterIndex() - 1) == 0) {
        $("#prevCapOrdLetter").prop('disabled', true);
        $("#firstCapOrdLetter").prop('disabled', true);
    }
    $("#nextCapOrdLetter").prop('disabled', false);
    $("#lastCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(cLetters[getCapLetterIndex() - 1])
}
function getNextCapLetter() {
    if (getCapLetterIndex() >= (cLetters.length - 2)) {
        $("#nextCapOrdLetter").prop('disabled', true);
        $("#lastCapOrdLetter").prop('disabled', true);
    }
    $("#prevCapOrdLetter").prop('disabled', false);
    $("#firstCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(cLetters[getCapLetterIndex() + 1])
}
function getLastCapLetter() {
    $("#nextCapOrdLetter").prop('disabled', true);
    $("#lastCapOrdLetter").prop('disabled', true);
    $("#prevCapOrdLetter").prop('disabled', false);
    $("#firstCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(cLetters[cLetters.length - 1])
}
