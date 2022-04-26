const LETTERS_SUM = 26;
const ASCII_CAPITAL_A = 65;
const ASCII_LOWERCASE_A = 97;
const CAP_LETTERS = new Array(LETTERS_SUM).fill(1).map((_, i) => String.fromCharCode(ASCII_CAPITAL_A + i));
const LOW_LETTERS = new Array(LETTERS_SUM).fill(1).map((_, i) => String.fromCharCode(ASCII_LOWERCASE_A + i));
const LETTERS = [].concat(CAP_LETTERS, LOW_LETTERS);
const SUM_OF_RANDOM_LETTERS = 30;
const SUM_OF_PHONICS_LETTERS = 30;

const VOWELS = [
    LETTERS[LETTERS.indexOf('A')], LETTERS[LETTERS.indexOf('a')],
    LETTERS[LETTERS.indexOf('E')], LETTERS[LETTERS.indexOf('e')],
    LETTERS[LETTERS.indexOf('I')], LETTERS[LETTERS.indexOf('i')],
    LETTERS[LETTERS.indexOf('O')], LETTERS[LETTERS.indexOf('o')],
    LETTERS[LETTERS.indexOf('U')], LETTERS[LETTERS.indexOf('u')]];

const CONSONANTS = LETTERS.filter(function (item) { return VOWELS.indexOf(item) === -1; });

const LETTER_COLORS = new Array(26).fill(1).map((_, i) => getRandRGB());

const TEST_LETTERS = LETTERS.slice(0, 4);

function setOrderedLetterContent() {
    let output = "";
    for (var i = 0; i < CAP_LETTERS.length; i++) {
        output += ("<div class='letter rounded' id='char_" + LOW_LETTERS[i]);
        output += ("' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'> ");
        output += (CAP_LETTERS[i] + " " + LOW_LETTERS[i] + " </div>");
    }
    $('#letterAlphabetStage').html(output);
}

function setRandomLetterContent() {
    let output = "";
    for (var i = 0; i < SUM_OF_RANDOM_LETTERS; i++) {
        let index = getRandomIndex(LETTERS);
        output += ("<div class='letter rounded' id='random_" + LETTERS[index] + "_" + i);
        output += ("' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
        output += (LETTERS[index] + "</div>");
    }
    $('#letterRandomStage').html(output);
}

function setLetterPhonicsStage() {
    let output = "";
    for (var i = 0; i < SUM_OF_PHONICS_LETTERS; i++) {
        let c1 = getRandomIndex(CONSONANTS);
        let c2 = getRandomIndex(CONSONANTS);
        let v = getRandomIndex(VOWELS);
        let w = CONSONANTS[c1].toUpperCase() + VOWELS[v].toLowerCase() + CONSONANTS[c2].toLowerCase()
        output += ("<div class='letter rounded' id='random_" + w +  "_" + i);
        output += ("' onclick='setRandomLinearBackground(this)'>");
        output += (w + "</div>");
    }
    $('#letterPhonicsStage').html(output);
}

function getRandomLetter(correct) {
    if (correct) {
        $("#letterCorrectCount").text(parseInt($("#letterCorrectCount").text()) + 1)
    }
    $("#randLetter").text(LETTERS[getRandomIndex(LETTERS)])
}

function getLowLetter() {
    return $("#lowOrdLetter").text();
}

function getCapLetter() {
    return $("#capOrdLetter").text();
}

function getLowLetterIndex() {
    return LOW_LETTERS.indexOf(getLowLetter())
}

function getCapLetterIndex() {
    return CAP_LETTERS.indexOf(getCapLetter())
}

function getFirstLowLetter() {
    $("#prevLowOrdLetter").prop('disabled', true);
    $("#firstLowOrdLetter").prop('disabled', true);
    $("#nextLowOrdLetter").prop('disabled', false);
    $("#lastLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(LOW_LETTERS[0])
}
function getPrevLowLetter() {
    if ((getLowLetterIndex() - 1) == 0) {
        $("#prevLowOrdLetter").prop('disabled', true);
        $("#firstLowOrdLetter").prop('disabled', true);
    }
    $("#nextLowOrdLetter").prop('disabled', false);
    $("#lastLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(LOW_LETTERS[getLowLetterIndex() - 1])
}
function getNextLowLetter() {
    if (getLowLetterIndex() >= (LOW_LETTERS.length - 2)) {
        $("#nextLowOrdLetter").prop('disabled', true);
        $("#lastLowOrdLetter").prop('disabled', true);
    }
    $("#prevLowOrdLetter").prop('disabled', false);
    $("#firstLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(LOW_LETTERS[getLowLetterIndex() + 1])
}
function getLastLowLetter() {
    $("#nextLowOrdLetter").prop('disabled', true);
    $("#lastLowOrdLetter").prop('disabled', true);
    $("#prevLowOrdLetter").prop('disabled', false);
    $("#firstLowOrdLetter").prop('disabled', false);
    $("#lowOrdLetter").text(LOW_LETTERS[LOW_LETTERS.length - 1])
}

function getFirstCapLetter() {
    $("#prevCapOrdLetter").prop('disabled', true);
    $("#firstCapOrdLetter").prop('disabled', true);
    $("#nextCapOrdLetter").prop('disabled', false);
    $("#lastCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(CAP_LETTERS[0])
}
function getPrevCapLetter() {
    if ((getCapLetterIndex() - 1) == 0) {
        $("#prevCapOrdLetter").prop('disabled', true);
        $("#firstCapOrdLetter").prop('disabled', true);
    }
    $("#nextCapOrdLetter").prop('disabled', false);
    $("#lastCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(CAP_LETTERS[getCapLetterIndex() - 1])
}
function getNextCapLetter() {
    if (getCapLetterIndex() >= (CAP_LETTERS.length - 2)) {
        $("#nextCapOrdLetter").prop('disabled', true);
        $("#lastCapOrdLetter").prop('disabled', true);
    }
    $("#prevCapOrdLetter").prop('disabled', false);
    $("#firstCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(CAP_LETTERS[getCapLetterIndex() + 1])
}
function getLastCapLetter() {
    $("#nextCapOrdLetter").prop('disabled', true);
    $("#lastCapOrdLetter").prop('disabled', true);
    $("#prevCapOrdLetter").prop('disabled', false);
    $("#firstCapOrdLetter").prop('disabled', false);
    $("#capOrdLetter").text(CAP_LETTERS[CAP_LETTERS.length - 1])
}

/**
 * <p>
 * TODO: add in more letters after testing is complete.
 */
function setGameBoard() {
    let output = "";
    let rows = 5;//26;
    let cols = 5;//13;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            // let l = letters[getRandomIndex(letters)];
            let l = TEST_LETTERS[getRandomIndex(TEST_LETTERS)]
            let id = (r + "_" + c + "_" + l.toLowerCase());
            output += ("<div class='gameLetter rounded' id='" + id + "' style='background:");
            output += (getColorForLetter(l) + ";' onclick='process(this)'>" + l + "</div>");
        }
        output += "<br />"
    }
    $('#letterGameBoard').html(output);
}

/**
 * Get the color for the provided letter from the letter color index.
 * <p>
 * A is index 0 and B is 1, etc. The colors are generated randomly.
 * @param {*} l letter
 * @returns 
 */
function getColorForLetter(l) {
    l = l.toLowerCase();
    let color = 'rgba(225, 225, 225, 0.25)';
    switch (l) {
        case 'a':
            color = LETTER_COLORS[0];
            break;
        case 'b':
            color = LETTER_COLORS[1]
            break;
        case 'c':
            color = LETTER_COLORS[2];
            break;
        case 'd':
            color = LETTER_COLORS[3]
            break;
        case 'e':
            color = LETTER_COLORS[4];
            break;
        case 'f':
            color = LETTER_COLORS[5]
            break;
        case 'g':
            color = LETTER_COLORS[6];
            break;
        case 'h':
            color = LETTER_COLORS[7]
            break;
        case 'i':
            color = LETTER_COLORS[8];
            break;
        case 'j':
            color = LETTER_COLORS[9]
            break;
        case 'k':
            color = LETTER_COLORS[10];
            break;
        case 'l':
            color = LETTER_COLORS[11]
            break;
        case 'm':
            color = LETTER_COLORS[12];
            break;
        case 'N':
            color = LETTER_COLORS[13]
            break;
        case 'o':
            color = LETTER_COLORS[14];
            break;
        case 'p':
            color = LETTER_COLORS[15]
            break;
        case 'q':
            color = LETTER_COLORS[16];
            break;
        case 'r':
            color = LETTER_COLORS[17]
            break;
        case 's':
            color = LETTER_COLORS[18];
            break;
        case 't':
            color = LETTER_COLORS[19]
            break;
        case 'u':
            color = LETTER_COLORS[20];
            break;
        case 'v':
            color = LETTER_COLORS[21]
            break;
        case 'w':
            color = LETTER_COLORS[22];
            break;
        case 'x':
            color = LETTER_COLORS[23]
            break;
        case 'y':
            color = LETTER_COLORS[24];
            break;
        case 'z':
            color = LETTER_COLORS[25]
            break;
        default:
            break;
    }
    return color;
}

function process(ele) {
    let [row, col, l] = ele.id.split("_");

    var selected = {
        'row': Number(row),
        'col': Number(col),
        'letter': l
    };
    let group = new Set();

    var ids = getGroupIds(group, selected);

    let foo = 1;
}

/**
 * TODO:
 * ) Grid is filled with random Letters. 
 * ) Rounds start at A/a and go to Z/z.
 * )) User must select A which will then move onto B, etc.
 * ))) If A is not selected, then it is marked as a fail and indicator is displayed.
 * )))) Necessary letter (A in this case) must then be selected before moving onto 
 *      next necessary letter.
 * )))) If the necessary letter isn't found in the grid, then what?
 * ) The more identical letters (case ignored) grouped increases the score.
 * ) If the necessary letter is not selected within 5 turns, it is game over!
 * ) Once a group is clicked, it is removed, and the letters above 'fall' down.
 * )) A group is made from all surrounding letters, i.e. given selected letter 
 *    'a' and '_' is any other letter, the following is a group:
 * 
 *              _ _ _ _ _ _ _
 *              _ a _ _ _ _ _
 *              _ _ a _ _ a _
 *              _ _ A a A _ _ <--- the selected letter was 'a'.
 *              _ _ _ _ A a _
 *              _ _ _ a _ _ _
 *              _ _ _ _ _ _ _ 
 */


/**
 * 
 * <p>
 * The neighbors array, where 'X' is the center position:
 *                 top
 *        top left  |  top right
 *                \ | /
 *           left - X - right
 *                / | \
 *     bottom left  |  bottom right
 *              bottom
 * 
 * @param {*} group set of elements already added.
 * @param {*} selected element; containing the row, col, and letter.
 * @returns IDs of all the elements with the same letter touching each other.
 */
function getGroupIds(group, selected) {
    let tmpSet = new Set();

    let row = selected.row;
    let col = selected.col;
    let l = selected.letter;

    let center = (row + "_" + col + "_" + l);
    tmpSet.add(center);
    group.forEach(element => {
        tmpSet.add(element);
    });

    let topRow = row - 1;
    let bottomRow = row + 1;
    let rightCol = col + 1;
    let leftCol = col - 1;

    let topLeft = (topRow + "_" + leftCol + "_" + l);
    let top = (topRow + "_" + col + "_" + l);
    let topRight = (topRow + "_" + rightCol + "_" + l);
    let right = (row + "_" + rightCol + "_" + l);
    let bottomRight = (bottomRow + "_" + rightCol + "_" + l);
    let bottom = (bottomRow + "_" + col + "_" + l);
    let bottomLeft = (bottomRow + "_" + leftCol + "_" + l);
    let left = (row + "_" + leftCol + "_" + l);

    let neighbors = [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];

    neighbors.forEach(element => {
        if ($("#" + element).length) { // Filtering edges.
            let [r, c, letter] = element.split("_");
            if (l === letter && !group.has(element)) {
                var tmpSelected = {
                    'row': Number(r),
                    'col': Number(c),
                    'letter': letter
                };
                let a = new Set();
                a = getGroupIds(tmpSet, tmpSelected);
                a.forEach(element => {
                    group.add(element);
                });
            }
        }
    });

    return group;
}

function getNeighborWithoutParent(pRow, pCol) {

}