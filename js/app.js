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

// Adding the shuffled cards to the html
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

// Event listener for when every card is clicked
$("li.card").click(function() {
	showCards($(this));
	// openCards($(this));
	cardsMatch();
	if (match === 8) {
		gameOver();
	};
});

// Event listener to start the timer, for when the first card is clicked
$("li.card").one("click", function() {
	startTimer();
})

// show clicked card
function showCards(elem) {
	if (elem.hasClass("open") === false && elem.hasClass("show") === false) {
		elem.addClass("open show");
		openCards(elem);
	};
};

// Save opened card
function openCards(elem) {
	open.push(elem.children().attr("class"));
	console.log(open);
};

// Check to see if opened cards match
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
				}, 600);
			};
			counterUp();
			open.pop();
			open.pop();
		};
	};
};

// Increase the moves counter
function counterUp() {
	counter++
	$(".moves").text(counter);
	if (counter % 8 === 0) {
		let modulo = counter % 8;
		$("ul.stars").children().eq(n).children().removeClass("fa-star").addClass("fa-star-o");
		n--;
		stars--;
		if (stars < 1) {
			stars = 1;
		};
		if (n < 1) {
			n = 1;
		};
	};
};

// Modal to be displayed when all cards match
// from http://api.jqueryui.com/dialog/
function gameOver() {
	stopTimer();
	$(".dialog-text").html(function(){
		if (stars === 1) {
			return "<p><b>CONGRATULATIONS</b> You won!</p> <div><b>Moves</b> " + counter + "</div><div><b>Rating </b> " + stars + " star</div><div><b>Time </b>" + minutes + ":" + secs + "</div><div><p>Click <b>OK</b> to start a new game.</p></div>";
		} else {
			return "<p><b>CONGRATULATIONS</b> You won!</p> <div><b>Moves</b> " + counter + "</div><div><b>Rating </b> " + stars + " stars</div><div><b>Time </b>" + minutes + ":" + secs + "</div><div><p>Click <b>OK</b> to start a new game.</p></div>";
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

// the time counter function
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#Example
// https://stackoverflow.com/questions/34278816/how-to-add-a-timer-in-html5-and-javascript
let time;

function startTimer() {
	stopTimer();
	time = setInterval(function() {
		timerUp();
	}, 1000);
};

function timerUp() {
	secs++;
	if (secs >= 60) {
		secs = 0;
		minutes++;
	}
	$(".timer").children().text(minutes+":"+secs);
};

function stopTimer() {
    if (time) {
    	clearInterval(time);	
    };
};