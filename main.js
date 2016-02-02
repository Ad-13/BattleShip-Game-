/*var randomLoc = Math.floor(Math.random() * 5);

var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;*/

/*while (isSunk == false) {
	guess = prompt("Ready? Aim and FIIIRE!! (enter a number 0-6):");

	if (guess >= 0 && guess <=5) {
		guesses++;

		if (guess == location1 || guess == location2 || guess == location3) {
			hits++;
			alert("HIT!");

			if (hits == 3) {
				isSunk = true;
				alert("You sank the battleship!");
			}

		} else {
			alert("MISS!");
		}
	} else {
		alert("Please enter a valid cell number!");
	}
}

var stats = "You took " + guesses + " guesses to sink the battleship, which means your shooting accuracy was " + ((3/guesses)*100) + "%";
alert(stats);


function doIt (param) {
	param = 2;
}

var test = 1;
doIt(test);
console.log(test);

*/
/*
var td = document.getElementsByTagName('td');

td.on('click', function () {
	this.setAttribute('class', 'miss');
})*/



var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg;
	},
	displayHit: function (location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},
	displayMiss: function (location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	}
}

var model = {
	boardSize: 7,
	numShips: 3,
	shipsSunk: 0,
	shipsLength: 3,

	ships: [	{ locations: ["0", "0", "0"], hits: ["", "", ""] },
						{ locations: ["0", "0", "0"], hits: ["", "", ""] },
						{ locations: ["0", "0", "0"], hits: ["", "", ""] }	],

	fire: function (guess) {

		for (var i = 0; i < this.numShips; i++) {

			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {

				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!!!");

				if (this.isSunk(ship)) {

					view.displayMessage("BLIN!! You sank my battleship!");
					this.shipsSunk++;
				};

				return true;
			}
		};

		view.displayMiss(guess);
		view.displayMessage("You missed XO-XO-XO =P");

		return false;
	},

	isSunk: function (ship) {
		for (var i = 0; i < this.shipsLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			};
		}
		return true;
	},

	generateShipLocation: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function () {
		var direction = Math.floor(Math.random()*2);
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipsLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipsLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipsLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;
	},

	collision: function (locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for ( var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {return true};
			}
		}

		return false;
	}

}

var controller = {
	guesses: 0,

	processGuess: function (guess) {
		var location = parseGuess(guess);
		this.guesses++;
		var hit = model.fire(location);
		if (hit && model.shipsSunk === model.numShips) {
			alert("You win! All ships are sunk! You are like CAPITAN BLAD!!")
		};
	}
}

function parseGuess (guess) {
	var alphabetUppercase = ["A", "B", "C", "D", "E", "F", "G"];
	var alphabetLowercase = ["a", "b", "c", "d", "e", "f", "g"];
	var row, column, firstChar;

	if (guess === null || guess.length !== 2) {
		view.displayMessage("Please put a letter and a number of board");
	} else {
		firstChar = guess.charAt(0);
		column = guess.charAt(1);

		if (alphabetUppercase.indexOf(firstChar) === -1) {
			console.log(1);
			row = alphabetLowercase.indexOf(firstChar);
		} else {
			console.log(2);
			row = alphabetUppercase.indexOf(firstChar);
		}

		if (isNaN(row) || isNaN(column)) {
			view.displayMessage("Please put a letter and a number of board");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			view.displayMessage("Please put a letter and a number of board");
		} else {
			return row + column;
		}
	}

	return null;
}

function init () {
	var fireButton = document.getElementById('fireButton');
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById('guessInput');
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocation();
}

function handleKeyPress (e) {
	var fireButton = document.getElementById('fireButton');
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	};
}

function handleFireButton () {
	var guessInput = document.getElementById('guessInput');
	var guess = guessInput.value;
	controller.processGuess(guess);

	guessInput.value = "";
}

window.onload = init;

