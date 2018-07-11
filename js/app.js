/* Create a list that holds all of your cards */

/*
    Elements retrieved from the DOM and variable assignments
*/

const board = document.querySelector("#card__deck");
const move = document.querySelector(".score__panel--moves");

const score_panel = document.querySelector(".score__panel");
const score_panel_username_label = document.querySelector(".score__panel--username-label");

const modal_user = document.querySelector("#modal__user");

const username = document.querySelector("#modal__user--form-input");
const btn_user_submit = document.querySelector(".modal__user--form-btn");

const overlayModal = document.querySelector("#overlay");
const modal_congrats = document.querySelector("#modal_congrats");

const modal_congrats_name_output = document.querySelector(".modal__header--name");
const modalMoves = document.querySelector(".modal__statistics--moves");
const modalTime = document.querySelector(".modal__statistics--time");
const modalRestartBtn = document.querySelector("#modal__restart--btn");

const lvl = document.querySelector("level");
let lvlElem = document.querySelectorAll("#level li");

let card = document.querySelectorAll(".card__deck--card");

let matchedCard = document.getElementsByClassName("u-match");

let restart_btn = document.querySelector("#restart");
restart_btn.addEventListener("click", restart);

let timer = document.querySelector("#timer");

/*
    Manipulation of retrieved elements 
*/

let cards = [...card];
let flipped_cards = [];


/*
  FUNCTION-01: 
  Shuffle function from http://stackoverflow.com/a/2450976
*/

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
    Add event listeners onclick for every card
*/

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", cardListener);
    cards[i].addEventListener("click", flip_card);
    cards[i].addEventListener("click", gameEnd);
}

/*
    FUNCTION-02:
    Different states on click
*/

function cardListener() {
    this.classList.toggle("u-open");
    this.classList.toggle("u-show");
    this.classList.toggle("u-disabled");
}

/*
    FUNCTION-03:
    Generates a new board and shuffles the card__deck
*/

function newGame() {

    getUserName();
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (x) {
            board.appendChild(x);
        });
        cards[i].classList.remove("u-show", "u-open", "u-match", "u-disabled");
    }

    moves = 0;
    move.innerHTML = moves;

    //reset timer
    s = 0;
    m = 0;
    h = 0;

    let timer = document.querySelector("#timer");
    timer.innerHTML = "0 : 0";
    clearInterval(timeInt);
}

/*
    FUNCTION-04:
    Add fipped styling on the card elements
*/

function flip_card() {
    flipped_cards.push(this);
    moveUpdater();
    if (flipped_cards.length === 2) {
        if (flipped_cards[0].type === flipped_cards[1].type) {
            cards_matched();
        } else {
            cards_unmatched();
        }
    }
}

/*
    FUNCTION-05:
    Action if 2 flipped cards are making a match
*/

function cards_matched() {
    console.log('matched');
    flipped_cards[0].classList.add("u-match", "u-disabled");
    flipped_cards[1].classList.add("u-match", "u-disabled");
    flipped_cards[0].classList.remove("u-show", "u-open");
    flipped_cards[1].classList.remove("u-show", "u-open");
    flipped_cards = [];
}

/*
    FUNCTION-06:
    Action if 2 flipped cards are not making a match
*/

function cards_unmatched() {
    console.log('unmatched');
    flipped_cards[0].classList.add("unmatched");
    flipped_cards[1].classList.add("unmatched");

    disable();
    setTimeout(function () {
        flipped_cards[0].classList.remove("u-show", "u-open", "unmatched");
        flipped_cards[1].classList.remove("u-show", "u-open", "unmatched");
        enable();
        flipped_cards = [];
    }, 500);
}

/*
    FUNCTION-07:
    adds the u-disabled class to prevent double clicking on the same elemet
*/

function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('u-disabled');
    });
}

/*
    FUNCTION-08:
    adds the enabled class to a card in case an unmatch occurs
*/

function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('u-disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("u-disabled");
        }
    });
}

/*
    FUNCTION-09:
    Checks if all cards are flipped
*/

function gameEnd() {
    if (matchedCard.length == 16) {
        console.log("Congratulations!!");
        congratsMsg();
    }
}

/*
    FUNCTION-10:
    Automatically generates a timer of user's first click
*/

let s = 0; // Seconds
let m = 0; // Minutes
let h = 0; // Hours

let timeInt; // Holds the interval function

function startTimer() {
    timeInt = setInterval(function () {
        timer.innerHTML = m + " : " + s;
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
        }
    }, 1000);
}

/*
    FUNCTION-11:
    Updates the timer element for every click the user makes
*/
let moves = 0;

function moveUpdater() {
    moves++;
    let moveString = " Move";
    move.innerHTML = moves + moveString;

    if (moves == 1) {
        s = 0;
        m = 0;
        h = 0;
        startTimer();
    }
    if (moves > 1) {
        move.innerHTML = moves + moveString + "s";
    }
}

/*
    FUNCTION-12:
    Game restarts when the users click in the restasrt btn
*/

function restart() {
    newGame();
}

/*
    FUNCTION-13:
    A congratulations message along with the resulting score appears to the user.
*/

function congratsMsg() {
    setTimeout(() => {
        overlayModal.classList.add("u-overlay");
        modal_congrats.classList.add("modal-show");
        modalMoves.innerHTML = "Total Moves: " + moves;
        modalTime.innerHTML  = "Total Time: " + timer.innerHTML;
    }, 250);
    clearInterval(timeInt);
    console.log("Congratulations");
}

document.body.onload = newGame();

function getUserName() {
    setTimeout(() => {
        overlayModal.classList.add("u-overlay");
        modal_user.classList.add("modal-show");
    }, 250);
}

btn_user_submit.addEventListener("click", function() {
    btn_user_submit.preventDefault;
    
    setTimeout(() => {
        modal_user.classList.remove("modal-show");
    }, 500);
    
    setTimeout(() => {
        overlayModal.classList.remove("u-overlay");

        board.style.opacity = 1;
        board.style.visibility = 'visible';

        score_panel.style.opacity = 1;
        score_panel.style.visibility = 'visible';
    }, 800);

    
    let username_value = username.value;
    score_panel_username_label.innerHTML = username_value;
    modal_congrats_name_output.innerHTML += username_value;
    console.log("Your username is: " + username_value);
    
    return username_value;
});
