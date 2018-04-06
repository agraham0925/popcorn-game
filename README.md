# popcorn-game
## wdi-11-chi curious-turtles Project #1: Game

This game was created as my first solo project in General Assembly's WDI course.

## How to Play:
1. Each round, collect as many popcorn kernels as you can in your bucket.
2. Each kernel collected in the bucket gives you 1 point.
3. Collect an unpopped kernel, lose 1-3 points (point value for unpopped kernels is random!).
4. Player with the most points at the end of 3 rounds wins.

## User Stories and WireFrames:

[Wireframes](https://drive.google.com/file/d/0B2lKkBCaGtbxWk1ob29SZE50VVJrendIb3Z1T1dKMEZEWmNJ/view?usp=sharing)
	
1. User selects 1-2 players.
2. Hit start to begin play.
3. User gets 1 point for each white popcorn piece collected in the bucket.
4. Lose points for each yellow kernel collected in the bucket. Point value is randomized between 1-3 points
5. User with most points after 3 rounds wins.

### Rounds:

1. 3 total, 20 seconds each.
2. speed of falling kernels increases each round.

### End Game:
1. designates which player won.
2. replay button returns to main screen to play game again.

## Technologies Used:
1. jQuery
2. Canvas

## Problems Overcame:
1. I initially struggled with getting the final scores displayed when two players played the game. I tried putting too much information in one function. Eventually, I realized the second portion of information that I needed was better suited for a separate function and for the reportScore function to call this second function, displayWinner.

## Unsolved Problems / Things to add in future versions:
	- Would like to incorporate images of actual popcorn, kernels and popcorn bucket.
	- Speed of falling kernels to increase each round does not currently work.
	- If user presses start multiple times in a round, popcorn/kernel speed increases.
	- Top level where kernel turns into popcorn.



Font Credit: <https://www.dafont.com/popping-popcorn.font>
