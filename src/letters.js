const numOfLetters = 26;
const capitals = 65;
const lowercase = 97;
const cLetters = new Array(numOfLetters).fill(1).map((_, i) => String.fromCharCode(capitals + i));
const lLetters = new Array(numOfLetters).fill(1).map((_, i) => String.fromCharCode(lowercase + i));
const letters = [].concat(cLetters, lLetters);
const rLetterSize = 50;

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

function getLetter() {
    return $("#ordLetter").text();
}

function getLetterIndex() {
    return letters.indexOf(getLetter())
}

function getPrevLetter() {
    if ((getLetterIndex() - 1) == 0)
        $("#prevOrdLetter").prop('disabled', true);
    $("#nextOrdLetter").prop('disabled', false);
    $("#ordLetter").text(letters[getLetterIndex() - 1])
}

function getNextLetter() {
    if (getLetterIndex() >= (letters.length - 2))
        $("#nextOrdLetter").prop('disabled', true);
    $("#prevOrdLetter").prop('disabled', false);
    $("#ordLetter").text(letters[getLetterIndex() + 1])
}

function getRandomLetter(correct) {
    if (correct) {
        $("#letterCorrectCount").text( parseInt($("#letterCorrectCount").text()) + 1 )
    }
    $("#randLetter").text(letters[getRandomIndex(letters)])
}