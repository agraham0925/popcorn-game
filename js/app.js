console.log('test test')

let score = 0;
let time = 5;
let round = 1;

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const speed = 100;

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

const popcornPiece = new Popcorn();

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
})


//popcorn shape appears and moves on screen
function animateCanvas() {

	window.requestAnimationFrame(animateCanvas);
	ctx.clearRect(0,0, canvas.width, canvas.height)

	//creates popcorn pieces
	//should it take two parameters? popcorn Piece and time?
	//for the length of time, create popcorn Pieces every X amount of seconds?
		
			
	ctx.beginPath();
	ctx.arc(popcornPiece.body.x, popcornPiece.body.y, popcornPiece.body.r, popcornPiece.body.e, Math.PI * 2)
	ctx.fillStyle = "#fffbe5";
	ctx.fill();
	ctx.closePath();
				
	popcornPiece.body.y += 1	
		

	//popcorn bucket to catch popcorn
	ctx.beginPath();
	ctx.rect(bucket.body.x, bucket.body.y, bucket.body.w, bucket.body.h);
	ctx.fillStyle = ("#b7282f");
	ctx.fill();
	ctx.closePath();

	//Collision Detection

	function clamp(val, min, max) {
    	return Math.max(min, Math.min(max, val))
	}

// Find the closest point to the circle within the rectangle
// Assumes axis alignment! ie rect must not be rotated
	var closestX = clamp(popcornPiece.body.x, bucket.body.x, bucket.body.x + bucket.body.w);
	var closestY = clamp(popcornPiece.body.y, bucket.body.y, bucket.body.y + bucket.body.h);

	// Calculate the distance between the circle's center and this closest point
	var distanceX = popcornPiece.body.x - closestX;
	var distanceY = popcornPiece.body.y - closestY;

	// If the distance is less than the circle's radius, an intersection occurs
	var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
	console.log(distanceSquared < (popcornPiece.body.r * popcornPiece.body.r));
}


//event listener to move bucket right and left
document.addEventListener('keydown', function(event){
	const key = event.keyCode
	if(key === 37) {
		bucket.direction = 'left'
		bucket.body.x = bucket.body.x - 50;
	}
	else if(key === 39) {
		bucket.direction = 'right'
		bucket.body.x = bucket.body.x + 50;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height)
})


//the game logic
const game = {
	kernels: [],
	currentKernel: null,
	popcorn: [],
	currentPopcorn: null,
	makeUnpopped() {
		for(let i = 0; i < 6; i++) {
			const unpoppedK = new UnpoppedKernel();
			this.kernels.push(unpoppedK);
		}
	},
	getKernel() {
		this.currentKernel = this.kernels.pop();
		console.log(this.kernels)
		console.log(this.currentKernel)
	},
	makePopcorn() {
		for(let i = 0; i < 6; i++) {
			const popcornPiece = new Popcorn();
			this.popcorn.push(popcornPiece);
			console.log(this.popcorn)
			console.log(this.currentPopcorn)
		}
	},
		getPopcorn() {
		this.currentPopcorn = this.popcorn.pop();
		console.log(this.popcorn)
		console.log(this.currentPopcorn)
	}
}



//unpopped kernels class
class UnpoppedKernel {
	constructor() {
		let pointValues = [1, 2, 3];
		const points = pointValues[Math.floor(Math.random() * pointValues.length)];
		this.points = points;
	}	
}

//kernel shape appears on screen
// ctx.beginPath();
// ctx.arc(100, 30, 20, 0, Math.PI * 2)
// ctx.fillStyle = "#f9f148";
// ctx.fill();

// ctx.closePath();
	

//timer
const setTimer = () => {
	const timer = setInterval ( () => {
		time--

		if(time === 0) {
			clearInterval(timer)
			round++;
			$('#round').text('round: ' + round);
		}

		$('#timer').text('timer: ' + time + ' seconds')

		if(time === 0 && round === 6) {
			$('#timer').text('Game Over!')
			$('#round').text('')
		}
	}, 1000);
}


//setup round of play
const setUpRound = () => {
	//this function will include speed of popcorn falling later

	//could i write a loop? while round is < 5 (increase speed each round
	//time remains same. clear time, round game over after 5 rounds?)

	if(round === 1){
		//speed 1
		time = 5;
	} else if (round === 2) {
		//speed 2
		time = 5;
	} else if (round === 3) {
		//speed 3
		time = 5;
	} else if (round === 4) {
		//speed 4
		time = 5;
	} else if (round === 5) {
		//speed 5
		time = 5;
	} else {
		$('#timer').text('Game Over!')
	}
}

//scoreboard
	//updates due to collision detection


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
	//secret bonus round of colorful popcorn if you get a certain score?
	//pause button during round
