console.log('test test')

let score = 0;
let time = 5;
let round = 1;

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const speed = 100;

//for popcorn animation to fall from top of canvas
//would y start at 0 so this starts at the top of the screen?
let y = 30;
let x = Math.floor(Math.random() * 600)

//for popcorn bucket
let bucketX = 300;
let bucketY = 400;
let bucketDirection = 'right';

$('#start').on('click', function (e){
	setTimer();
	setUpRound();

	//function to start popcorn falling (eventually also kernels)
	animateCanvas();
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


//GAME OBJECTS & ANIMATIONS

//popcorn class
class Popcorn {
	constructor() {
		this.points = 1;
		this.body = {
			x: 300,
			y: 30,
			r: 20,
			e: 0		
		}
	}
	// drawPopcorn() {
		// ctx.beginPath();
		// ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI * 2)
		// ctx.fillStyle = "#fffbe5";
		// ctx.fill();
		// ctx.closePath();
	// }
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

//popcorn shape appears and moves on screen
function animateCanvas() {

	// Popcorn.drawPopcorn();

	window.requestAnimationFrame(animateCanvas);
	ctx.clearRect(0,0, canvas.width, canvas.height)

	ctx.beginPath();
	ctx.arc(x, y, 20, 0, Math.PI * 2)
	ctx.fillStyle = "#fffbe5";
	ctx.fill();
	ctx.closePath();

	y += 1

	//popcorn bucket to catch popcorn
		ctx.beginPath();
		ctx.rect(bucketX, bucketY, 200, 200);
		ctx.fillStyle = ("#b7282f");
		ctx.fill();
		ctx.closePath();
}

//event listener to move bucket right and left
document.addEventListener('keydown', function(event){
	const key = event.keyCode
	if(key === 37) {
		bucketDirection = 'left'
		bucketX = bucketX - 50;
	}
	else if(key === 39) {
		bucketDirection = 'right'
		bucketX = bucketX + 50;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height)
})
	

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

//player 1
	//total score
	//current score
	
//player 2
	//total score
	//current score

//GAME PLANNING:
	//OUTCOME ONE: you collect popcorn kernel
	//OUTCOME TWO: you collect unpopped kernel
	//OUTCOME THREE: you miss popcorn kernel
	//OUTCOME FOUR: you miss unpopped kernel

//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
	//secret bonus round of colorful popcorn if you get a certain score?
	//pause button during round
