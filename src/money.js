const coins = ['penny', 'nickel', 'dime', 'quarter'];

function getRandomCoin() {
    return coins[getRandomIndex(coins)];
}

function setKinderOrderedCoinsStage() {
    let amount = 5;
    let output = "";
    for (var i = 0; i < amount; i++) {
        let w = getRandomDoublePhonic()
        output += ("<div class='click-me rounded' id='double_phonic_" + w + "_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
        output += w;
        output += ("</div>");
    }
    $('#kinderOrderedCoinsStage').html(output);
}

function setKinderRandomCoinsStage() {
    let amount = 5;
    let output = "";
    for (var i = 0; i < amount; i++) {
        let coin = getRandomCoin();
        output += ("<div class='click-me rounded' id='rand_coin_" + coin + "_" + i + "' onclick='setRandomLinearBackground(this)' oncontextmenu='removeStyle(this); return false;'>");
        output += ("<img src='../img/money/coins/");
        let useFront = getRandomNumber(1, 100);
        if (useFront > 50) {
            output += ("front");
        } else {
            output += ("back");
        }
        output += ("/" + coin + ".png'></img></div>");
    }
    $('#kinderRandomCoinsStage').html(output);
}