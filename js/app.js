console.log('test test')

let time = 30;

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
