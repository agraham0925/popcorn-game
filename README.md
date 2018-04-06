# popcorn-game
## wdi-11-chi curious-turtles Project #1: Game

This game was created as my first solo project in General Assembly's WDI course.

## How to Play:
..* Each round, collect as many popcorn kernels as you can in your bucket.
..* Each kernel collected in the bucket gives you 1 point.
..* Collect an unpopped kernel, lose 1-3 points (point value for unpopped kernels is random!).
..* Player with the most points at the end of 3 rounds wins.

## User Stories and WireFrams:

![alt text](https://drive.google.com/file/d/0B2lKkBCaGtbxWk1ob29SZE50VVJrendIb3Z1T1dKMEZEWmNJ/view?usp=sharing)
	
..* User selects 1-2 players.
..* Hit start to begin play.
..* User gets 1 point for each white popcorn piece collected in the bucket.
..* Lose points for each yellow kernel collected in the bucket.

...point value is randomized between 1-3 points

..* User with most points after 3 rounds wins.

### Rounds:

..* 3 total, 20 seconds each.
..* speed of falling kernels increases each round.

### End Game:
..* designates which player won.
..* replay button returns to main screen to play game again.

## Technologies Used:
..* jQuery
..* Canvas

## Problems Overcame:
..* I initially struggled with getting the final scores displayed when two players played the game. I tried putting too much information in one function. Eventually, I realized the second portion of information that I needed was better suited for a separate function and for the reportScore function to call this second function, displayWinner.

## Unsolved Problems / Things to add in future versions:
	- Would like to incorporate images of actual popcorn, kernels and popcorn bucket.
	- Speed of falling kernels to increase each round does not currently work.
	- If user presses start multiple times in a round, popcorn/kernel speed increases.
	- Top level where kernel turns into popcorn.



Font Credit: <https://www.dafont.com/popping-popcorn.font>