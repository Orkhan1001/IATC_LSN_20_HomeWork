
let t_card = document.getElementsByClassName("t_card");
let t_hiddenCard = document.getElementsByClassName("t_hiddenCard");
let t_starCard = document.getElementsByClassName("t_starCard");
let t_colors = ["black", "gray", "yellow", "blue", "crimson", "crimson", "red", "aqua", "red", "yellow", "green", "blue", "black", "green", "aqua", "gray"];

for (let i = 0; i < 16; i++) {
    t_hiddenCard[i].style.backgroundColor = t_colors[i];
}

let toPosition1 = 110;
let toPosition2 = 220;
let toPosition3 = 330;

// Position Cards
function tPositionaCards() {
    // Hidden Cards Position
    let t_right = 0;
    for (let i = 0; i < 16; i++) {
        t_hiddenCard[i].style.right = t_right + "px";
        t_right += 111;
        if (i == 3 || i == 7 || i == 11) {
            t_right = 0;
        }
        if (i > 3 && i < 8) {
            t_hiddenCard[i].style.top = toPosition1 + "px";
        }
        if (i > 7 && i < 12) {
            t_hiddenCard[i].style.top = toPosition2 + "px";
        }
        if (i > 11) {
            t_hiddenCard[i].style.top = toPosition3 + "px";
        }
    }

    // Normal Cards Position
    t_right = 0;
    for (let i = 0; i < 16; i++) {
        t_card[i].style.right = t_right + "px";
        t_right += 111;
        if (i == 3 || i == 7 || i == 11) {
            t_right = 0;
        }
        if (i > 3 && i < 8) {
            t_card[i].style.top = toPosition1 + "px";
        }
        if (i > 7 && i < 12) {
            t_card[i].style.top = toPosition2 + "px";
        }
        if (i > 11) {
            t_card[i].style.top = toPosition3 + "px";
        }
    }

    // Star Cards Position
    t_right = 0;
    for (let i = 0; i < 16; i++) {
        t_starCard[i].style.right = t_right + "px";
        t_right += 111;
        if (i == 3 || i == 7 || i == 11) {
            t_right = 0;
        }
        if (i > 3 && i < 8) {
            t_starCard[i].style.top = toPosition1 + "px";
        }
        if (i > 7 && i < 12) {
            t_starCard[i].style.top = toPosition2 + "px";
        }
        if (i > 11) {
            t_starCard[i].style.top = toPosition3 + "px";
        }
    }
}

tPositionaCards();

let tClickCounter = 0;
let tCounterForYouWinMessage = 0;
let tClickedCardIndex;
let tPreviousCardIndex;

// Onclick Calling Function
function tChangeBackground(t_this) {

    //Saving every previous click. Starting from second click.
    if (tClickCounter > 0) {
        tPreviousCardIndex = tClickedCardIndex;
    }

    let t_elem = t_this;
    t_elem.style.visibility = "hidden";

    //Capture clicked elements index
    for (let i = 0; i < 16; i++) {
        if (t_card[i] == t_elem) {
            tClickedCardIndex = i;
        }
    }

    tClickCounter++;
    const myTimeout = setTimeout(t_timeFunk, 100);
}

function t_timeFunk() {

    // If same color card founded
    if (t_colors[tPreviousCardIndex] == t_colors[tClickedCardIndex]) {
        t_hiddenCard[tPreviousCardIndex].style.visibility = "hidden";
        t_hiddenCard[tClickedCardIndex].style.visibility = "hidden";
        t_starCard[tPreviousCardIndex].style.zIndex = 3;
        t_starCard[tClickedCardIndex].style.zIndex = 3;
        tCounterForYouWinMessage += 2;
    }
    else {
        if (tClickCounter > 1 && tClickCounter % 2 == 0) {
            document.getElementsByClassName("t_card")[tPreviousCardIndex].style.visibility = "visible";
            document.getElementsByClassName("t_card")[tClickedCardIndex].style.visibility = "visible";
            tClickedCardIndex = -1;
        }
    }

    // In the end message
    if (tCounterForYouWinMessage == 16) {
        swal("YOU WINN", {
            icon: "success",
        }).then((tF) => {
            if (tF) {
                setTimeout(tAskContinue(), 1000);
            }
        })

    }
}

// Ask for Continue or not
let tInkrement = 7;
let tRotater = 0;
function tAskContinue() {
    swal("Do You Want To Continue", {
        buttons: true,
    }).then((tF) => {
        if (tF) {
            tInkrement++;
            if (tInkrement == 15) { tInkrement = 7; }
            for (let i = 0; i < 16; i++) {
                t_card[i].style.visibility = "visible";
                t_hiddenCard[i].style.visibility = "visible";
                t_starCard[i].style.zIndex = 0;
            }
            tCounterForYouWinMessage = 0;
            tPreviousCardIndex = 0;
            tClickedCardIndex = 0;
            tClickCounter = 0;

            tRotater += 90;
            let tRotated = "rotate(" + tRotater + "deg)"
            let tRotatedStar = "rotate(" + -(tRotater) + "deg)"
            document.getElementsByClassName("t_main")[0].style.transform = tRotated;
            for (let i = 0; i < 16; i++) {
                document.getElementsByClassName("t_starCard")[i].style.transform = tRotatedStar;
            }
            toPosition1 += 110; // 220 330 110 220
            toPosition2 += 110; // 330 110 220 330
            toPosition3 += 110; // 110 220 330 110
            if (toPosition1 == 440) { toPosition1 = 110; }
            if (toPosition2 == 440) { toPosition2 = 110; }
            if (toPosition3 == 440) { toPosition3 = 110; }
            tPositionaCards();
            document.getElementById("tYouWinn").style.visibility = "hidden";

        }
        else {
            document.getElementById("tYouWinn").style.visibility = "visible";
        }
    })
}

