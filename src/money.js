const MIN_NUM_OF_KINDER_RAND_COINS = 1;

const coins = ['penny', 'nickel', 'dime', 'quarter'];

function getKinderRandomCoinAmount() {
    return Number($("#kinderRandomCoinAmount").val());
}

function getRandomCoin() {
    return coins[getRandomIndex(coins)];
}

function setKinderOrderedCoinsStage() {
    let output = "";
    for (var i = 0; i < coins.length; i++) {
        output += ("<div class='click-coin rounded-circle' id='ordered_coin_front_" + coins[i] + "_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
        output += ("<img src='../img/money/coins/front/" + coins[i] + ".png'></img></div>");
        output += ("<div class='click-coin rounded-circle' id='ordered_coin_back_" + coins[i] + "_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
        output += ("<img src='../img/money/coins/back/" + coins[i] + ".png'></img></div>");
    }
    $('#kinderOrderedCoinsStage').html(output);
}

function setKinderRandomCoinsStage() {
    let amount = getKinderRandomCoinAmount();
    for (var i = amount; i > 0; i--) {
        $('#kinderRandomCoinsStage').children().remove();
    }
    for (var i = 0; i < amount; i++) {
        getKinderRandomCoinDiv().appendTo('#kinderRandomCoinsStage');
    }
    setKinderRandomCoinChecks();
}

function flipCoin() {
    return (Math.random() > 0.5);
}

function getKinderRandomCoinDiv() {
    let coin = getRandomCoin();
    let output = $("<div class='click-coin rounded-circle' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
    output.attr('id', ('rand_coin_' + coin + '_' + getRand32Uint()));

    let image = $("<img></img>");
    if (flipCoin()) {
        image.attr('src', '../img/money/coins/front/' + coin + '.png');
    } else {
        image.attr('src', '../img/money/coins/back/' + coin + '.png');
    }
    image.appendTo(output);
    return output;
}

function addKinderRandomCoin() {
    getKinderRandomCoinDiv().appendTo('#kinderRandomCoinsStage');
    increment('kinderRandomCoinAmount');
    setKinderRandomCoinChecks();
}

function removeKinderRandomCoin() {
    if ($('#kinderRandomCoinsStage').children().length > MIN_NUM_OF_KINDER_RAND_COINS) {
        $('#kinderRandomCoinsStage').children().last().remove();
        decrement('kinderRandomCoinAmount');
    }
    setKinderRandomCoinChecks();
}

function kinderRandomCoinCheck(ele) {
    if (ele.textContent === getKinderRandomCoinsValue()) {
        $("#" + ele.id).attr('class', 'btn btn-success btn-lg fs-1');
    } else {
        $("#" + ele.id).attr('class', 'btn btn-danger btn-lg fs-1');
    }
}

function getKinderRandomCoinsValue() {
    let sum = 0.0;
    $('#kinderRandomCoinsStage').children().each(function () {
        if ($(this)[0].id.match(/quarter/)) {
            sum += 0.25;
        } else if ($(this)[0].id.match(/dime/)) {
            sum += 0.10;
        } else if ($(this)[0].id.match(/nickel/)) {
            sum += 0.05;
        } else {
            sum += 0.01;
        }
    });
    return Number(sum).toFixed(2);
}

const kinderRandCoinCheckOptionsAmount = 5;
function setKinderRandomCoinChecks() {
    let trueValueIndex = getRandomNumber(1, kinderRandCoinCheckOptionsAmount);
    let scalar = Math.floor(getKinderRandomCoinsValue());
    for (var i = 1; i <= kinderRandCoinCheckOptionsAmount; i++) {
        $('#kinderRandomCoinCheck' + i).attr('class', 'btn btn-secondary btn-lg fs-1');
        if (trueValueIndex == i) {
            $('#kinderRandomCoinCheck' + i).text(getKinderRandomCoinsValue());
        } else {
            $('#kinderRandomCoinCheck' + i).text(Number(scalar + Math.random()).toFixed(2));
        }
    }
}