/* Create a list that holds all of your cards */

/*
    Elements retrieved from the DOM and variable assignments
*/

const board = document.querySelector("#deck");
const move = document.querySelector(".moves");

let card = document.querySelectorAll(".card");
let matchedCard = document.getElementsByClassName("match");
let restart_btn = document.querySelector(".restart");

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
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

/*
    FUNCTION-03:
    Generates a new board and shuffles the deck
*/

    function newGame() {
    startTimer();
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (x) {
            board.appendChild(x);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
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
    flipped_cards[0].classList.add("match", "disabled");
    flipped_cards[1].classList.add("match", "disabled");
    flipped_cards[0].classList.remove("show", "open");
    flipped_cards[1].classList.remove("show", "open");
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
        flipped_cards[0].classList.remove("show", "open", "unmatched");
        flipped_cards[1].classList.remove("show", "open", "unmatched");
        enable();
        flipped_cards = [];
    }, 500);
}

/*
    FUNCTION-07:
    adds the disabled class to prevent double clicking on the same elemet
*/

function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

/*
    FUNCTION-08:
    adds the enabled class to a card in case an unmatch occurs
*/

function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
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
    Automatically generates a timer of users first click
*/

let s = 0; // Seconds
let m = 0; // Minutes
let h = 0; // Hours

let time; // Holds the interval function
let timer = document.createElement("span"); //Creates the display timer element

function startTimer() {
    time = setInterval(function () {
        timer.innerHTML = h + " : " + m + " : " + s;
        restart_btn.insertBefore(timer, restart_btn.childNodes[0]);
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
    A congratulations message along with the resulting score appears to the user.
*/
let moves = 0;

function moveUpdater() {
    moves++;
    move.innerHTML = moves ;
}

/*
    FUNCTION-12:
    A congratulations message along with the resulting score appears to the user.
*/

function congratsMsg() {
    console.log("Congratulations");    
}

document.body.onload = newGame();