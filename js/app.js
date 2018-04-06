console.log('test test')

let score = 0;
let time = 20;
let round = 1;

//controls if animation runs
let theAnimation;

let roundText = $('#round').text();

//arrays to hold the kernels and popcorns created from classes
let kernels = [];
let popcorn = [];

//array for number of players 
let players = [];
players[0] = "Player 1";

//one player mode is default. This button must be clicked for two players
$('#players2').on('click', function (e) {
	players.push("Player 2")
	$('#whosTurn').text("Player One starts.")
})

//determines whos turn it is in 2-player mode
let whosTurn = 0;

//arrays to hold player scores for each round
const player1Scores = [];
const player2Scores = [];

//variables to describe final scores
let finalScore1 = 0;
let finalScore2 = 0;



const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');


//unpopped kernels class
class UnpoppedKernel {
	constructor() {
		let pointValues = [1, 2, 3];
		const points = pointValues[Math.floor(Math.random() * pointValues.length)];
		this.points = points;
		this.body = {
			x: Math.floor(Math.random() * 600),
			y: 0,
			r: 20,
			e: 0
		}	
	}
}


//popcorn class
class Popcorn {
	constructor() {
		this.points = 1;
		this.body = {
			x: Math.floor(Math.random() * 600),
			y: 0,
			r: 20,
			e: 0		
		}
	}
}

function makePopcorn() {

	const popcornPiece = new Popcorn();

	//add to array of popcorn
	popcorn.push(popcornPiece)
}

function makeKernels() {
	const kernelPiece = new UnpoppedKernel();
		
	//add to array of kernels	
	kernels.push(kernelPiece)
}


//for popcorn bucket
const bucket = {
	body: {
		x: 300,
		y: 400,
		w: 200,
		h: 200,
	},

	direction: 'right',
}

$('#start').on('click', function (e){
	setTimer();
	setUpRound();

	animateCanvas();

	$('#start').text('Start Next Round')
})


function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val))
}


function whosTurnDisplay () {
	if(players.length === 2 && whosTurn === 0) {
		$('#whosTurn').text("It's Player One's turn.")
	} else if(players.length === 2 && whosTurn === 1) {
		$('#whosTurn').text("It's Player Two's turn.")
	} else {
		$('#whosTurn').text("Good luck!")
	}
}

function animateCanvas() {

	theAnimation = window.requestAnimationFrame(animateCanvas);
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	//creates popcorn pieces
	for(let i = 0; i < popcorn.length; i++) {

		ctx.beginPath();
		ctx.arc(popcorn[i].body.x, popcorn[i].body.y, popcorn[i].body.r, popcorn[i].body.e, Math.PI * 2)
		ctx.fillStyle = "#fffbe5";
		ctx.fill();
		ctx.closePath();

		if (roundText === 'round: 1') {
			popcorn[i].body.y += 6
		} else if (roundText === 'round: 2') {
			popcorn[i].body.y += 7
		} else if (roundText === 'round: 3') {
			popcorn[i].body.y += 8.5
		}
	}

	//creates kernel pieces
	for(let i = 0; i < kernels.length; i++) {
		ctx.beginPath();
		ctx.arc(kernels[i].body.x, kernels[i].body.y, kernels[i].body.r, kernels[i].body.e, Math.PI * 2)
		ctx.fillStyle = "#f9f148";
		ctx.fill();
		ctx.closePath();

		if (roundText === 'round: 1') {
			kernels[i].body.y += 7
		} else if (roundText === 'round: 2') {
			kernels[i].body.y += 8
		} else if (roundText === 'round: 3') {
			kernels[i].body.y += 8.5
		}		
	}

	//popcorn bucket to catch popcorn
	ctx.beginPath();
	ctx.rect(bucket.body.x, bucket.body.y, bucket.body.w, bucket.body.h);
	
	ctx.fillStyle = '#b7282f';
	ctx.fill();
	ctx.closePath();


	//Collision Detection - if popcorn or kernel hits bucket
	for(let i = 0; i < popcorn.length; i++) { 

		// Find the closest point to the circle (popcorn) within the rectangle (bucket)
		const closestX = clamp(popcorn[i].body.x, bucket.body.x, bucket.body.x + bucket.body.w);
		const closestY = clamp(popcorn[i].body.y, bucket.body.y, bucket.body.y + bucket.body.h);
	
		// Calculate the distance between the popcorn's center and this closest point
		const distanceX = popcorn[i].body.x - closestX;
		const distanceY = popcorn[i].body.y - closestY;

		// If the distance is less than the popcorn's radius, an intersection occurs
		const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
		if(distanceSquared < (popcorn[i].body.r * popcorn[i].body.r)) {

			//point value of popcorn added to score if collision occurs 
			score = score + popcorn[i].points
			$('#scoreboard').text('score: ' + score)

			// delete the popcorn
			popcorn.splice(i, 1);
		}
	}

		for(let i = 0; i < kernels.length; i++) {

		// Find the closest point to the circle (kernels) within the rectangle (bucket)
		const closestX = clamp(kernels[i].body.x, bucket.body.x, bucket.body.x + bucket.body.w);
		const closestY = clamp(kernels[i].body.y, bucket.body.y, bucket.body.y + bucket.body.h);
	
		// Calculate the distance between the kernel's center and this closest point
		const distanceX = kernels[i].body.x - closestX;
		const distanceY = kernels[i].body.y - closestY;

		// If the distance is less than the kernel's radius, an intersection occurs
		const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
		if(distanceSquared < (kernels[i].body.r * kernels[i].body.r)) {

			//point value of kernel decreased from score if collision occurs 
			score = score - kernels[i].points
			$('#scoreboard').text('score: ' + score)

			// delete the kernel
			kernels.splice(i, 1);
		}
	}
}


//event listener to move bucket right and left
document.addEventListener('keydown', function(event){
	const key = event.keyCode
	if(key === 37) {
		bucket.direction = 'left'
		bucket.body.x = bucket.body.x - 150;
	}
	else if(key === 39) {
		bucket.direction = 'right'
		bucket.body.x = bucket.body.x + 150;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height)
})
	
let timer;
//timer
const setTimer = () => {
	timer = setInterval ( () => {

		if(time % 1 === 0) {
			makePopcorn();
		}

		if(time % 2 === 0) {
			makeKernels();
		}

		time--

		//one player score saved for the round
		if(time === 0 && whosTurn === 0 && players.length === 1) {
			clearInterval(timer)
			round++;
			player1Scores.push(score);

			window.cancelAnimationFrame(theAnimation);
			kernels = [];
			popcorn = [];
			ctx.clearRect(0, 0, canvas.width, canvas.height);


		} else if(time === 0 && players.length === 2) {
			if(whosTurn === 0) {
				clearInterval(timer)
				round++;
				player1Scores.push(score);	
				whosTurn = 1;	

				window.cancelAnimationFrame(theAnimation);
				kernels = [];
				popcorn = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);	
				// $('#whosTurn').text("It's Player Two's turn.")

			} else {
				clearInterval(timer)
				round ++;
				player2Scores.push(score);
				whosTurn = 0;
				
				window.cancelAnimationFrame(theAnimation);
				kernels = [];
				popcorn = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				// $('#whosTurn').text("It's Player One's turn.")
			}
		}

		$('#timer').text('timer: ' + time + ' seconds')
		whosTurnDisplay();
		reportScore();
	}, 1000);
}


//setup round of play
const setUpRound = () => {
	time = 20;
	score = 0;

	//one player mode is default
	if(players.length === 1) {
		if(round === 1){
			$('#round').text('round: ' + round);
			$('#scoreboard').text('score: ' + score)
		} else if (round === 2) {
			$('#round').text('round: ' + round);
			$('#scoreboard').text('score: ' + score)
		} else if (round === 3) {
			$('#round').text('round: ' + round);
			$('#scoreboard').text('score: ' + score)	
		} 

	//runs if two players button is clicked on
	} else if(players.length === 2) {
		if(round === 1){
			$('#round').text('round: 1')
			$('#scoreboard').text('score: ' + score)

		} else if (round === 2) {
			$('#round').text('round: 1')
			$('#scoreboard').text('score: ' + score)

		} else if (round === 3) {
			$('#round').text('round: 2')
			$('#scoreboard').text('score: ' + score)

		} else if (round === 4) {
			$('#round').text('round: 2')	
			$('#scoreboard').text('score: ' + score)

		} else if (round === 5) {
			$('#round').text('round: 3')
			$('#scoreboard').text('score: ' + score)

		} else if (round === 6) {
			$('#round').text('round: 3')
			$('#scoreboard').text('score: ' + score)		
		} 		
	}
}


const reportScore = () => {
	if(time === 0 && round === 4 && players.length === 1) {

		$('#timer').text('')
		$('#round').text('Game over!')
		$('#start').text('Play again').on('click', function (e) {
			location.reload();
		})

		player1Scores.reduce(function(a,b) {
			return finalScore = a + b
		})
			
		$('#scoreboard').text('Final Score: ' + finalScore)

	} else if (time === 0 && round === 7 && players.length === 2) {

		player1Scores.reduce(function(a,b) {
			finalScore1 = a + b	
			return finalScore1
		})			

		player2Scores.reduce(function(a,b) {
			finalScore2 = a + b	
			return finalScore2			
		})
		displayWinner();
	}
}


// if two players, this function called to declare/display winner and final scores
const displayWinner = () => {

		$('#round').text('game over!')
		$('#scoreboard').text('Player one: ' + finalScore1 + ' Player two: ' + finalScore2)

	if(finalScore1 > finalScore2) {

		$('#timer').text('player 1 wins!')
		ctx.beginPath();

		ctx.fillStyle = '#fffbe5';
		ctx.font = '40px Bree Serif';
		ctx.fillText("Player 1 wins!", 200, 300)

		ctx.closePath();

	} else if (player1Scores === player2Scores) {

		ctx.beginPath();

		ctx.fillStyle = '#fffbe5';
		ctx.font = '40px Bree Serif';
		ctx.fillText("It's a tie!", 200, 300)

		ctx.closePath();

	} else {

		$('#timer').text('player 2 wins!')

		ctx.beginPath();

		ctx.fillStyle = '#fffbe5';
		ctx.font = '40px Bree Serif';
		ctx.fillText("Player 2 wins!", 200, 300)

		ctx.closePath();

	}
}



//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
	//pause button during round
	//collision detect only on top of the bucket, not sides