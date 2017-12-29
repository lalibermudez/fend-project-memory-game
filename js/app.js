/*
 * Create a list that holds all of your cards
 */

let cards = [
	"fa fa-anchor",
	"fa fa-anchor",
	"fa fa-bolt",
	"fa fa-bolt",
	"fa fa-cube",
	"fa fa-cube",
	"fa fa-leaf",
	"fa fa-leaf",
	"fa fa-bicycle",
	"fa fa-bicycle",
	"fa fa-diamond",
	"fa fa-diamond",
	"fa fa-bomb",
	"fa fa-bomb",
	"fa fa-paper-plane-o",
	"fa fa-paper-plane-o",
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(cards);
addClass(cards);


$(".restart").click(function(){
	shuffle(cards);
	addClass(cards);

});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function addClass(array) {
	$("li.card").children().removeClass();
	for (var i = 0; i <= 15; i++) {
		$("li.card").eq(i).children().addClass(array[i]);
		console.log(array[i]);
	};
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// $(".card").click(
// 	showCard();,
// 	openCard();

// 	// list of oopen cards 
// 	// if cardsMatch();
// 	// else cardsDontMatch();
// 	// counter();
// 	// if all cards match finalScore();
// 	);

// function showCard {
// 	$(".card").addClass("show");
// };

// function openCard {
// 	$(".card").addClass("open");
// };

let open = [];
let match = 0;
let show = 0;

$("li.card").click(function() {
	//TODO: add move counter++
	showCards($(this));
	openCards($(this));
	cardsMatch();
	// let value = $(this).children().attr("class");
	// $(this).addClass("show open");
	// show++
	// open.push(value);
	// if (open.length === 2) {
	// 	if (open[0] === open[1]) {
	// 		$(this).removeClass("open");
	// 		$(this).addClass("match");
	// 		match++
	// 	} else {
	// 		$(this).removeClass("show open");
	// 	}
	// }
});

function showCards(elem) {
	elem.addClass("open show");
};

function openCards(elem) {
	open.push(elem.children().attr("class"));
	console.log(open);
};

