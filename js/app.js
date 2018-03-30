console.log('test test')

//GAME PLANNING:
	//OUTCOME ONE: you collect popcorn kernel
	//OUTCOME TWO: you collect unpopped kernel
	//OUTCOME THREE: you miss popcorn kernel
	//OUTCOME FOUR: you miss unpopped kernel
const game = {
	kernels: [],
	currentKernel: null,
	makeUnpopped() {
		for(let i = 0; i < 6; i++) {
			const unpoppedK = new UnpoppedKernel();
			this.kernels.push(unpoppedK);
		}
	},
	getKernel() {
		this.currentKernel = this.kernels.pop();
		console.log(this.currentKernel)
	}
}


//STEPS TO BUILDING GAME

//objects:
	//popcorn kernels

//unpopped kernels
	//function to generate random point value
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





//NICE TO HAVES
	//popcorn animation for winner
	//different color buckets for each player
	//top level where unpopped turns into popped
