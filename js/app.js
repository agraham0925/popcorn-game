console.log('test test')

let score = 0;
let time = 5;
let round = 1;

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const speed = 100;

//GAME PLANNING:
	//OUTCOME ONE: you collect popcorn kernel
	//OUTCOME TWO: you collect unpopped kernel
	//OUTCOME THREE: you miss popcorn kernel
	//OUTCOME FOUR: you miss unpopped kernel
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


//STEPS TO BUILDING GAME

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
	drawPopcorn() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI * 2)
		ctx.fillStyle = "#fffbe5";
		ctx.fill();
		ctx.closePath();
	}
}





ctx.beginPath();
ctx.arc(100, 30, 20, 0, Math.PI * 2)
ctx.fillStyle = "#f9f148";
ctx.fill();

ctx.closePath();
animateCanvas();

// function animateCanvas() {
// 	ctx.clearRect(0,0, canvas.width, canvas.height)
// 	Popcorn.drawPopcorn();

// 	//this next line starts the animation/recursion
// 	window.requestAnimationFrame(animateCanvas);
// }

//unpopped kernels class
class UnpoppedKernel {
	constructor() {
		let pointValues = [1, 2, 3];
		const points = pointValues[Math.floor(Math.random() * pointValues.length)];
		this.points = points;
	}	
}

	
//bucket
const bucket = {
	body: {

	},
	direction: "right",
	initialize () {
		this.body = {
			x: 300,
			y: 400,
			w: 200,
			h: 200
		}
	},
	drawBucket () {
		ctx.beginPath();
		ctx.rect(this.body.x, this.body.y, this.body.w, this.body.h);
		ctx.fillStyle = ("#b7282f");
		ctx.fill();
		ctx.closePath();
	},
	move () {
		switch (bucket.direction) {
			case 'left':
			this.body.x = this.body.x - speed;
			break;
			case 'right':
			this.body.x = this.body.x + speed;
			break;
		}
	}
}

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
	bucket.drawBucket();
})

bucket.initialize();
bucket.drawBucket();
	
//player 1
	//total score
	//current score
	
//player 2
	//total score
	//current score
	
//scoreboard
	
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
	}, 1000);
}

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

$('#start').on('click', function (e){
	setTimer();
	setUpRound();
	//function to start kernels
})


// SAMPLE CODE FROM A LESSON THAT COULD BE USED FOR POPCORNS/KERNELS
//function animateCanvas () {
// 	ctx.clearRect(0,0, canvas.width, canvas.height)
// 	hero.move(); //this will just update the data that is used by drawBody
// 	hero.drawBody();

// 	//this next line starts the animation/recursion
// 	window.requestAnimationFrame(animateCanvas);
// }


//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
	//secret bonus round of colorful popcorn if you get a certain score?
	//pause button during round
