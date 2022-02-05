const messageMax = 5;

$(document).ready(function () {

    $('#message').attr("maxlength", messageMax);
    $('#remaining').text(messageMax);

    $('#encodedTA').hide();

});

function getRandom(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min) + min);
}


const randMin = 1; 
const randMax = 20;//50;
const size = 50;
let randChars = [];
for (var i =0; i< rSize; i++) {
    random.push(getRandom(rMinimum, rMaximum));
}


const messageKeyMap = new Map();
const maxNumber = 21;//31;
const numberChars = Array.from(Array(maxNumber).keys()) // 0 to (max - 1).
const capitalChars = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));
const lowercaseChars = new Array(26).fill(1).map((_, i) => String.fromCharCode(97 + i));
let availableKeyMapChars = [].concat(ordered, capitalChars, lowercaseChars);

function getRandomIndex(a) {
    return Math.floor((Math.random() * (a.length - 1)) + 0);
}

const colors = ['red', 'magenta', 'darkorange', 'orange', 'yellow', 'lawngreen', 'greenyellow', 'mediumspringgreen', 'cyan', 'lightseagreen', 'lightskyblue', 'darkorchid','blueviolet'];

function setRandomBackgroundColor(e) {
    let foo = 1;
    const i = e.id;
    const c = getRandomIndex(colors)
    $("#"+i).css("background-color",colors[c]);
    $("#history").text("You clicked on "+i);
}

function updateRemainingCharacters(e) {
    const typed = e.value.length;
    $('#remaining').text(messageMax - typed);
}

function encodeMessage() {

    if ($('#message').val().length <= 0)
        return;

    // Reset available key map characters.
    availableKeyMapChars = 0;
    availableKeyMapChars = [];
    availableKeyMapChars = [].concat(ordered, capitalChars, lowercaseChars);

    const msg = $('#message').val();
    var encoded = [];

    // Encoding alpha-numeric characters, passing through the rest.
    // If the character hasn't been encoded, then get a random character to 
    // assign as a new character for the encoding.
    for (let i = 0; i < msg.length; i++) {
        let tmp = msg[i];
        if (isAlphanumeric(tmp)) {
            if (messageKeyMap.has(tmp)) {
                encoded.push(messageKeyMap.get(tmp));
            } else {
                let ranIdx = getRandomIndex();
                let ranChar = availableKeyMapChars[ranIdx];
                encoded.push(ranChar);
                messageKeyMap.set(tmp, ranChar);

                // Removing from available chars to prevent duplicates.
                availableKeyMapChars.splice(availableKeyMapChars.indexOf(ranChar), 1);
            }
        } else {
            encoded.push(tmp);
        }
    }

    // Message key. Parsing HTML to preserve line breaks.
    // TODO: should be jumbled and a nice condensed table.
    let output = ""
    for (const [key, value] of messageKeyMap.entries()) {
        if (key !== " ") {
            output += ("<div class='key'>" + key + " = <span class='coded'>" + value + "</span></div>");
        }
    }
    $('#messageKey').html(output);

    // Assuming concatenation is always left to right (first to last).
    const encoding = encoded.join("");

    let textAreaPaddingChars = 15;

    $('#message').hide();
    $('#info').hide();
    $('#encodedTA').attr('maxlength', ((encoding.length * 2) + textAreaPaddingChars));
    $('#encodedTA').attr('placeholder', encoding);
    $('#encodedTA').val(encoding);
    $('#encodedTA').show();
}

function isAlphanumeric(char) {
    return (/[a-zA-Z0-9]/).test(char)
}