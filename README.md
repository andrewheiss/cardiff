## Cardiff

A web-based flash card engine. Runs on PHP, Javascript, HTML5, and CSS 3.

It works in Chrome and Safari.

### Demo

* [http://bencrowder.net/sandbox/cardiff/sample/](http://bencrowder.net/sandbox/cardiff/sample/)
* [http://bencrowder.net/sandbox/cardiff/sample/m](http://bencrowder.net/sandbox/cardiff/sample/m) (mobile)

### Installation

1. Put the files in a directory (don't forget .htaccess).
2. Add decks (see the "Deck file format" section).
3. There is no step 3.

### Deck file format

The basic format is YAML, using `.deck` for the extension. A sample:

	Title: Deck title
	
	side1: side2
	side1: side2
	side1: side2

For example:

	Title: Latin Vocabulary 1

	amo, amare: to love
	moneo, monere: to warn
	lego, legere: to read

See `sample.deck` and `sample2.deck` for examples of how to do things (including Markdown formatting and multi-line cards).

The filename is the slug. For example, `latin-vocab-1.deck` becomes `http://yoururl.com/cards/latin-vocab-1` (assuming you've put Cardiff in the directory for `http://yoururl.com/cards`).

### Keyboard shortcuts

* Flip card: up/down arrow or `j` or `k`
* Previous card: left arrow or `h`
* Next card: right arrow or `l`

### License

Public domain.
