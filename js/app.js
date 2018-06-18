/* * Create a list that holds all of your cards */
let card = document.querySelectorAll(".card");
let cards = [...card];
let flipped_cards = [];

const board = document.querySelector("#deck");
let matchedCard = document.getElementsByClassName("match");
let restart_btn = document.querySelector(".restart");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
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

// Add event listener onclick
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", cardListener);
    cards[i].addEventListener("click", flip_card);
    cards[i].addEventListener("click", gameEnd);
}

// Different states on click
function cardListener() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

// Generates a new board and shuffles the deck
function newGame() {
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (x) {
            board.appendChild(x);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

function flip_card() {
    flipped_cards.push(this);

    startTimer();
    if (flipped_cards.length === 2) {
        if (flipped_cards[0].type === flipped_cards[1].type) {
            cards_matched();
        } else {
            cards_unmatched();
        }
    }
}

function cards_matched() {
    console.log('matched');
    flipped_cards[0].classList.add("match", "disabled");
    flipped_cards[1].classList.add("match", "disabled");
    flipped_cards[0].classList.remove("show", "open");
    flipped_cards[1].classList.remove("show", "open");
    flipped_cards = [];
}

function cards_unmatched() {
    console.log('unmatched');
    flipped_cards[0].classList.add("unmatched");
    flipped_cards[1].classList.add("unmatched");

    disable();
    setTimeout(function () {
        flipped_cards[0].classList.remove("show", "open", "unmatched");
        flipped_cards[1].classList.remove("show", "open", "unmatched");
        // enable();
        flipped_cards = [];
    }, 500);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function gameEnd() {
    if(matchedCard.length == 16) {
        console.log("Congratulations!!");
        congratsMsg();
    }
}

/*

    The starTimer() function is being invoked whene a user clicks the first card.

*/
let s = 0;
let m = 0; //s = seconds, m = minutes
let h = 0;
let time;

function startTimer() {
    let timer = document.createElement("span");
    time = setInterval(function() {

        timer.innerHTML = h + " : " + m + " : " + s;
        restart_btn.insertBefore(timer, restart_btn.childNodes[0]);
        s++;
        if(s == 60) {
            
            m++;
            s = 0;
        }
        if(m == 60) {
            h++;
            m = 0;
        }
        
    }, 1000);
    
}

document.body.onload = newGame();