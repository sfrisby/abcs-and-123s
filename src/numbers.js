

function getOrderedMax() {
    return Number($("#oMax").val());
}
function getOrderedMin() {
    return Number($("#oMin").val());
}
let oMinimum = getOrderedMin();
let oMaximum = getOrderedMax();
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

/**
 * Set ordered number HTML given an array of values.
 * <p>
 * Adding an extra element at the end to adjust for array indexing offset.
 * @param {*} arr array values.
 * @param {*} id where output is stored.
 */
function setOrderedContent(arr = ordered, id = "#o123s") {
    let output = "";
    for (var i = 0; i < arr.length; i++) {
        output += ("<div class='number' id='num_" + arr[i] + "' onclick='setRandomBackgroundColor(this)'> " + arr[i] + " </div>");
    }
    let maxIndex = arr.length - 1;
    output += ("<div class='number' id='num_" + Number(arr[maxIndex] + 1) + "' onclick='setRandomBackgroundColor(this)'> " + Number(arr[maxIndex] + 1) + " </div>");
    $(String(id)).html(output);
}

function reloadOrderedNumbers() {
    ordered = Array();
    oMinimum = getOrderedMin();
    oMaximum = getOrderedMax();
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

/**
 * Generating then setting random number content.
 * <p>
 * Adjusting the maximum to correct of array index offset.
 */
function reloadRandomNumbers() {
    oMinimum = getOrderedMin();
    oMaximum = getOrderedMax() + 1;
    if (oMinimum > oMaximum) {
        alert("The minimum value is more than the maximum. Reverse and try again.")
        return;
    }
    for (var i = 0; i < rSize; i++) {
        random[i] = (getRandomNumber(oMinimum, oMaximum));
    }
    setRandomContent(random, "#r123s");
}