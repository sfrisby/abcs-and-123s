

let oMinimum = $("#oMin").val();
let oMaximum = $("#oMax").val();
let oSize = oMaximum - oMinimum;
let ordered = Array(oSize);
for (var i = oMinimum; i < oSize; i++) {
    ordered[i] = i;
}

const rSize = 50;
const random = Array(50);
for (var i = 0; i < rSize; i++) {
    random[i] = (getRandomNumber(oMinimum, oMaximum));
}


function setOrderedContent(arr, id) {
    let output = "";
    for (var i = 0; i < arr.length; i++) {
        output += ("<div class='number' id='num_" + arr[i] + "' onclick='setRandomBackgroundColor(this)'><span class='coded'> " + arr[i] + " </span></div>");
    }
    $(String(id)).html(output);
}

function reloadOrderedNumbers() {
    ordered = Array();
    oMinimum = Number($("#oMin").val());
    oMaximum = Number($("#oMax").val());
    if (oMinimum > oMaximum) {
        alert("The minimum value is more than the maximum. Reverse and try again.")
        return;
    }
    oSize = Math.abs(oMaximum - oMinimum);
    ordered = Array(oSize);
    for (var i = 0; i < oSize; i++) {
        ordered[i] = i + oMinimum;
    }
    setOrderedContent(ordered, "#o123s");
}

function setRandomContent(arr, id) {
    let output = "";
    for (var i = 0; i < arr.length; i++) {
        output += ("<div class='number' id='num_" + arr[i] + "_" + i + "' onclick='setRandomBackgroundColor(this)'><span class='coded'> " + arr[i] + " </span></div>");
    }
    $(String(id)).html(output);
}

function reloadRandomNumbers() {
    oMinimum = Number($("#oMin").val());
    oMaximum = Number($("#oMax").val());
    if (oMinimum > oMaximum) {
        alert("The minimum value is more than the maximum. Reverse and try again.")
        return;
    }
    for (var i = 0; i < rSize; i++) {
        random[i] = (getRandomNumber(oMinimum, oMaximum));
    }
    setRandomContent(random, "#r123s");
}