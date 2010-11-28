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
	
	//	Returns the scrollbar to the left to stop the cards from
	//	desapearing from the screen after a lot of slides
	$(document).scrollLeft(0);
}

// Toggle shuffle
function toggleShuffle() {
	window.location = $('#shuffle-button').attr('href');
}

// Catch keystrokes
function captureKeys() {
	document.addEventListener('keydown', function(e) {
		switch(e.keyCode) {
			case 37: // left arrow
				slideCard("prev");
				break;
			case 72: // 'h'
				slideCard("prev");
				break;

			case 38: // up arrow
				flipCard();
				break;
			case 75: // 'k'
				flipCard();
				break;

			case 39: // right arrow
				slideCard("next");
				break;
			case 76: // 'l'
				slideCard("next");
				break;

			case 40: // down arrow
				flipCard();
				break;
			case 74: // 'j'
				flipCard();
				break;
				
			case 83: // 's'
				toggleShuffle();
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

		// resize the text on each side
		$(this).children().each(function() {
			// get content object
			var content = $(this).children(".content");

			var card_width = $(this).width();
			var ideal_width = card_width * 0.40;	// we want the text to take up 40% of the width

			var string_length = $(this).html().length;
			var font_size = (1 / string_length) * 1400;	// rough guess

			// create div for measuring string length
			var div = document.createElement('div');
			document.body.appendChild(div);
			$(div).css({ position: 'absolute', left: -1000, top: -1000, display: 'none' });
			$(div).html($(this).html());
			
			// set initial size
			$(div).css("font-size", font_size + "px");
			div_width = $(div).outerWidth();

			if (div_width < ideal_width) {
				difference = ideal_width - div_width;
				font_size += difference / 6;
			} else if (div_width < ideal_width) {
				difference = div_width - ideal_width;
				font_size -= difference / 6;
			}

			// get rid of the placeholder
			$(div).remove();

			if (font_size > 40) { font_size = 40; }
			if (font_size < 12) { font_size = 12; }

			// resize the text
			content.css("font-size", font_size + "px");
		});

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

