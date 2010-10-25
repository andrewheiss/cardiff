var MARGIN = 25;								// equal sides (includes box-shadow)
var WINDOW_WIDTH = getWindowWidth();
var WINDOW_HEIGHT = getWindowHeight();
var TEXT_MARGIN = 30;							// 25px on each side
var TEXT_WIDTH = 300;
var flipping = false;

// quick getters
function getWindowWidth() { return innerWidth - (MARGIN * 2); }
function getWindowHeight() { return innerHeight - (MARGIN * 2); }

// flip the current card
function flipCard() {
	// get active card and the other side
	var cur_side = $('.active');
	var target_side = $('.active').siblings();

	// rotate the old side out
	cur_side.css({
		"-webkit-transform": "rotateX(90deg)",
		"-webkit-transition": "all .1s ease-in-out"
	});

	cur_side.removeClass('active');

	target_side.addClass('active');

	// now show the other side
	target_side.css({
		"-webkit-transform": "rotateX(0deg)",
		"-webkit-transition": "all .1s ease-in-out",
		"-webkit-transition-delay": ".1s"
	});
}

// Show a new card
function showCard(card) {
	card.show();
	card.children(".side1").css("-webkit-transform", "rotateX(0deg)");
	card.children(".side2").css("-webkit-transform", "rotateX(90deg)");
}

// Hide card
function hideCard(card) {
	card.hide();
	card.children(".side1").css("-webkit-transform", "rotateX(90deg)");
	card.children(".side2").css("-webkit-transform", "rotateX(90deg)");
}

// Move to the previous card
function slideCard(dir) {
	var cur_card = $(".active").parent(".card");

	if (dir == "next") {
		var new_card = cur_card.next("article");
		var waiting_x = 0 - (WINDOW_WIDTH * 2);
		var new_x = WINDOW_WIDTH * 2;
	} else {
		var new_card = cur_card.prev("article");
		var waiting_x = WINDOW_WIDTH * 2;
		var new_x = 0 - (WINDOW_WIDTH * 2);
	}

	// check boundaries
	if (new_card.length) {
		// position the new card off to the side and a little to the back
		cur_card.css({"-webkit-transform": "translate3d(" + waiting_x + "px, 0px, 0px)", "-webkit-transition": "all .3s"});

		new_card.css({
			"-webkit-transform": "translate3d(" + new_x + "px, 0px, 0px)"
		});

		// update the header #
		$("#current_card").html(new_card.attr("id"));

		// make it visible
		showCard(new_card);

		setTimeout(function() {
			new_card.css({
				"-webkit-transform": "translate3d(0px, 0px, 0px)",
				"-webkit-transition": "all 0.15s linear"
			});
		}, 0);

		// deactivate current card
		cur_card.children(".side1").removeClass("active");
		cur_card.children(".side2").removeClass("active");

		// activate new card
		new_card.children(".side1").addClass("active");
	}
}

// Catch keystrokes
function captureKeys() {
	document.addEventListener('keydown', function(e) {
		switch(e.keyCode) {
			case 37: // left
				slideCard("prev");
				break;
			case 38: // up
				flipCard();
				break;
			case 39: // right
				slideCard("next");
				break;
			case 40: // down
				flipCard();
				break;
		};
	}, false);
}


//
// MAIN
//
$(document).ready(function() {
	if (mobile) {
		// add flip handler
		document.body.addEventListener('touchstart', function(e) {
			flipCard();
			e.preventDefault();
		});

		// resize cards to fit viewport
		resizeViewport();
	}

	// initialize cards
	$('.card').each(function() {
		card_id = $(this).attr("id");

		// hide each card
		$(this).hide();
	});

	// display the active card
	$('.card .active').parent('.card').show();

	if (!mobile) {
		// set up keyboard handler
		captureKeys();
	}
});

