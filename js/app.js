console.log('test test')

let time = 30;

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
		bucket.body.x = bucket.body.x - 10;
	}
	else if(key === 39) {
		bucket.direction = 'right'
		bucket.body.x = bucket.body.x + 10;
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
		$('#timer').text('timer: ' + time + ' seconds')
	}, 1000);
}





//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
	//secret bonus round of colorful popcorn if you get a certain score?
