/*
 * Create a list that holds all of your cards
 */

let cards = [
	"fa fa-anchor",
	"fa fa-anchor",
	"fa fa-bicycle",
	"fa fa-bicycle",
	"fa fa-bolt",
	"fa fa-bolt",
	"fa fa-bomb",
	"fa fa-bomb",
	"fa fa-cube",
	"fa fa-cube",
	"fa fa-diamond",
	"fa fa-diamond",
	"fa fa-leaf",
	"fa fa-leaf",
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


$(".restart").click(function() {
	location.reload();
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

let open = [];
let match = 0;
let show = 0;
let counter = 0;
let n = 2;
let stars = 3;
let secs = 0;
let minutes = 0;

$("li.card").click(function() {
	showCards($(this));
	openCards($(this));
	cardsMatch();
	if (match === 8) {
		gameOver();
	};
});

$("li.card").one("click", function() {
	startTimer();
})

function showCards(elem) {
	elem.addClass("open show");
};

function openCards(elem) {
	open.push(elem.children().attr("class"));
};

function cardsMatch(elem) {
	if (open.length <= 2) {
		if (open.length === 2) {
			if (open[0] === open[1]) {
				$("li.card.open").effect("shake");
				$("li.card.open").addClass("match").removeClass("open");
				match++
			} else {
				$("li.card.open").effect("shake").css({"background": "#f44242"});
				window.setTimeout(function() {
					$("li.card.open").removeClass("open show");
				}, 500);
			};
			counterUp();
			open.pop();
			open.pop();
		};
	};
};

function counterUp() {
	counter++
	$(".moves").text(counter);
	if (counter % 8 === 0) {
		let modulo = counter % 8;
		$("ul.stars").children().eq(n).children().removeClass("fa-star").addClass("fa-star-o");
		n--;
		stars--;
		if (stars < 0) {
			stars = 0;
		}
	};
};

function gameOver() {
	$(".dialog-text").text(function(){
		if (stars === 1) {
			return "CONGRATULATIONS!! You've won! With " + counter + " moves, " + stars + " star, and " + minutes + ":" + secs + " minutes.";
		} else {
			return "CONGRATULATIONS!! You've won! With " + counter + " moves, " + stars + " stars, and " + minutes + ":" + secs + " minutes.";
		};
	});
    $( ".ui-dialog" ).dialog({
    	modal: true,
    	buttons: [{
        	text: "OK",
        	icon: "ui-icon-check",
        	click: function() {
          	$(this).dialog("close");
          	location.reload();
        	}
      	}]
    });
};

function startTimer() {
	let time = setInterval(function() {
		secs++;
		if (secs >= 60) {
			secs = 0;
			minutes++;
		}
		$(".timer").children().text(minutes+":"+secs);
		if (match === 8) {
			clearInterval(time);
		return time;
		}
	}, 1000);
};