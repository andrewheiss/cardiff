<?php

include_once('lib/markdown.php');
include_once('lib/smartypants.php');

class Card {
	public $side1;
	public $side2;

	public function __construct($side1, $side2) {
		$this->side1 = $side1;
		$this->side2 = $side2;
	}
}

$cards = array();

$slug = $_GET["slug"];			// slug for card deck
$mobile = $_GET["m"];			// mobile flag

// Get the real file path for the card deck

$filename = realpath(dirname(__FILE__) . '/' . $slug . '.text');

// Make sure the card deck path is valid (i.e., no '../../' in the slug),
// and ensure that the file exists.

if (strpos($filename, dirname(__FILE__)) === 0 && file_exists($filename)) {
	$input = fopen($filename, "r");

	$count = 1;

	// read in the deck
	while (!feof($input)) {
		$line = fgets($input);

		if ($count == 1) {
			$title = trim($line);				// first line is title
		} else if (trim($line) != "") {
			$card = explode("|", $line);
			$side1 = SmartyPants(Markdown(trim($card[0])));
			$side2 = SmartyPants(Markdown(trim($card[1])));

			if ($side1 && $side2) {
				$newCard = new Card($side1, $side2);

				array_push($cards, $newCard);
			}
		}
		$count++;
	}
}

?>
<!DOCTYPE html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">

	<?php if ($mobile) { ?>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=320;" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no; width=320;" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-touch-fullscreen" content="yes" />
	<?php } ?>

	<title><?php echo $title; ?> | Cardiff</title>

	<link href="../cardiff.css" rel="stylesheet" type="text/css" media="screen" charset="utf-8" />
	<?php if ($mobile) { ?>
	<link href="../mobile.css" rel="stylesheet" type="text/css" media="screen" charset="utf-8" />
	<?php } ?>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>

	<script src="../cardiff.js" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript" charset="utf-8">
		var mobile = <?php if ($mobile) { echo "true"; } else { echo "false"; } ?>;
	</script>
	<?php if ($mobile) { ?>
	<script src="../mobile.js" type="text/javascript" charset="utf-8"></script>
	<?php } ?>
</head>
<body>
	<?php if (!$mobile) { ?>
	<header><div id="status"><span id="decktitle"><?php echo $title; ?></span><span id="counter">#<span id="current_card">1</span> of <?php echo count($cards); ?></span></div></header>
	<?php
	}

	$card_id = 1;
	foreach ($cards as $card) { ?>
	<article id="<?php echo $card_id; ?>" class="card">
		<section class="side1 word<?php if ($card_id == 1) echo " active"; ?>">
			<div class="content"><?php echo $card->side1; ?></div>
		</section>
		<section class="side2 word">
			<div class="content"><?php echo $card->side2; ?></div>
		</section>
	</article>
	<?php
		$card_id++;
	}
	?>
</body>
