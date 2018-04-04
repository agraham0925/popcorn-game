console.log('test test')

let score = 0;
let time = 10;
let round = 1;

const kernels = [];
const popcorn = [];

// const players = [];
// players[0] = "Player 1";
// players[1] = "Player 2";

// let whosTurn = 0;
// console.log(players[whosTurn])

const player1Scores = [];
// const player2Scores = [];

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

	// add to array of popcorn
	popcorn.push(popcornPiece)

	//RA Notes:
	// console.log("we just made a popcorn...")
	// console.log(Array.from(popcorn))
	// console.log(popcorn[popcorn.length-1])
	// console.log('------that was all the popcorns and the last popcorn')
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


//NEED TO FIGURE OUT WHERE TO PLACE FUNCTION AND FUNCTION CALL
// SHOULD ONLY BE USED IF A PLAYER CLICKS TWO PLAYERS. SHOULD NOT BE USED IF PLAYER 1 SELECTED
// $('#players2').on('click', function (){
// 	//function to change players. Function is called when time is 0
// 	function toggle() {
// 		if(whosTurn === 0) { 
// 			whosTurn = 1;
// 		} else {
// 			whosTurn = 0;
// 		} console.log("It's " + players[whosTurn] + " turn.")
// 	}
// })

// toggle();




//RA Notes:
// let frameCount = 0; // 60 hz
// let theAnimation;

function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val))
}

// popcorn shape appears and moves on screen
// this will get run 60 times per second
function animateCanvas() {

	theAnimation = window.requestAnimationFrame(animateCanvas);
	ctx.clearRect(0,0, canvas.width, canvas.height)

	//creates popcorn pieces
	for(let i = 0; i < popcorn.length; i++) {

		ctx.beginPath();
		ctx.arc(popcorn[i].body.x, popcorn[i].body.y, popcorn[i].body.r, popcorn[i].body.e, Math.PI * 2)
		ctx.fillStyle = "#fffbe5";
		ctx.fill();
		ctx.closePath();
					
		popcorn[i].body.y += 3
	}

	//creates kernel pieces
	for(let i = 0; i < kernels.length; i++) {
		ctx.beginPath();
		ctx.arc(kernels[i].body.x, kernels[i].body.y, kernels[i].body.r, kernels[i].body.e, Math.PI * 2)
		ctx.fillStyle = "#f9f148";
		ctx.fill();
		ctx.closePath();

		kernels[i].body.y += 3
	}

	//popcorn bucket to catch popcorn
	ctx.beginPath();
	ctx.rect(bucket.body.x, bucket.body.y, bucket.body.w, bucket.body.h);
	ctx.fillStyle = ("#b7282f");
	ctx.fill();
	ctx.closePath();


	// RA notes: if(frameCount % 60 == 30) console.log("about to do for loop for frameCount: " + frameCount )
	//Collision Detection
	for(let i = 0; i < popcorn.length; i++) { //if(frameCount % 60 == 30) { console.log("collision detection popcorn..." + i); console.log(popcorn[i]) }

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
	// RA notes: frameCount++;

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
			$('#scoreboard').text('scoreboard: ' + score)

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
	/*const*/ timer = setInterval ( () => {

		if(time % 2 === 0) {
			makePopcorn();
		}

		if(time % 3 === 0) {
			makeKernels();
		}

		time--

		if(time === 0) {
			clearInterval(timer)
			round++;
			$('#round').text('round: ' + round);
			player1Scores.push(score);
			// const clickHandler = (e) => {
			// 	const startDiv = $(e.currentTarget).detach();

			// 	$(e.currentTarget).text('Start next round')
			// }
		}

		$('#timer').text('timer: ' + time + ' seconds')

		if(time === 0 && round === 6) {
			$('#timer').text('Game Over!')
			$('#round').text('')
			$('#start').text('Play Again')

			player1Scores.reduce(function(a,b) {
				return finalScore = a + b
			})
			
			$('#scoreboard').text('Final Score: ' + finalScore)
		}
	}, 1000);
}


//setup round of play
const setUpRound = () => {

	if(round === 1){
		time = 30;
		score = 0;
		$('#scoreboard').text('Score: ' + score)
	} else if (round === 2) {
		time = 30;
		score = 0;
		$('#scoreboard').text('Score: ' + score)
	} else if (round === 3) {
		time = 30;
		score = 0;
		$('#scoreboard').text('Score: ' + score)
	} else if (round === 4) {
		time = 30;
		score = 0;	
		$('#scoreboard').text('Score: ' + score)	
	} else if (round === 5) {
		time = 30;
		score = 0;
		$('#scoreboard').text('Score: ' + score)		
	} else {
		$('#timer').text('Game Over!')
	}
}



//////// need a way to store score and distinguish between the two players///////
//player 1
	//total score
	//current score
	
//player 2
	//total score
	//current score


//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
	//pause button during round






