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

			var card_width = $(this.obj).width();
			var ideal_width = card_width * 0.70;	// we want the text to take up 70% of the width

			var string_length = $(this).html().length;
			var font_size = (1 / string_length) * 160;	// rough guess

			// create div for measuring string length
			var div = document.createElement('div');
			document.body.appendChild(div);
			$(div).css({ position: 'absolute', left: -1000, top: -1000, display: 'none' });
			$(div).html($(this).html());
			
			// set initial size
			$(div).css("font-size", font_size + "px");
			div_width = $(div).outerWidth();

			// get into the ballpark
			while (div_width < ideal_width) {
				font_size += 5;
				$(div).css("font-size", font_size + "px");
				div_width = $(div).outerWidth();
			}
			while (div_width > ideal_width) {
				font_size -= 5;
				$(div).css("font-size", font_size + "px");
				div_width = $(div).outerWidth();
			}

			// fine tune the result
			while (div_width < ideal_width) {
				font_size += 1;
				$(div).css("font-size", font_size + "px");
				div_width = $(div).outerWidth();
			}
			while (div_width > ideal_width) {
				font_size -= 1;
				$(div).css("font-size", font_size + "px");
				div_width = $(div).outerWidth();
			}

			// get rid of the placeholder
			$(div).remove();

			// resize the text
			content.css("font-size", font_size + "px");


			// also reposition the text
/*			var new_ypos = (WINDOW_HEIGHT / 2) - content.height();
			content.css("position", "relative");
			content.css("top", new_ypos + "px");*/
		});
	});
}
