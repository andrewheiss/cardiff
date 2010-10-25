var WINDOW_WIDTH = getWindowWidth();
var WINDOW_HEIGHT = getWindowHeight();

// quick getters
function getWindowWidth() { return innerWidth - (MARGIN * 2); }
function getWindowHeight() { return innerHeight - (MARGIN * 2); }

// Resize the viewport
$(window).resize(function() {
	resizeViewport();
});

function resizeViewport() {
	// Get the new window size
	WINDOW_WIDTH = getWindowWidth();
	WINDOW_HEIGHT = getWindowHeight();

	// resize each card
	$('.card').each(function() {
		// resize each side
		$(this).children().each(function() {
			$(this).css("width", WINDOW_WIDTH);
			$(this).css("height", WINDOW_HEIGHT);

			// get content object
			var content = $(this).children(".content");

			if ($(this).is('.word')) {
				// words
				
				// figure out how much available space we have (WINDOW_WIDTH - TEXT_MARGIN)
				var available = WINDOW_WIDTH - TEXT_MARGIN;
				var card_width = $(this.obj).width();
				var new_size = available - card_width;
				if (new_size > 34) new_size = 34;

				// resize the text
				content.css("font-size", new_size + "px");
			}

			// also reposition the text
/*			var new_ypos = (WINDOW_HEIGHT / 2) - content.height();
			content.css("position", "relative");
			content.css("top", new_ypos + "px");*/
		});
	});
}
