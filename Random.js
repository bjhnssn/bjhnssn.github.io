
function getHashStr(){
	// let hashStr = "0x";
	let hashStr = "";
	for( let i=0; i<32; i++ ){
		const r = Math.floor( Math.random() * 256 );
		let rHex = "";
		if( r<16 ) rHex += "0";
		rHex += r.toString(16);
		hashStr += rHex;
	}
	return hashStr;
}


// const tokenData = { hash: "0x11ac128f8b54949c12d04102cfc01960fc496813cbc3495bf77aeed738579738" };
const tokenData = { hash: getHashStr() };


class Random {
	constructor() {
		this.useA = false;
		let sfc32 = function (uint128Hex) {
			let a = parseInt(uint128Hex.substr(0, 8), 16);
			let b = parseInt(uint128Hex.substr(8, 8), 16);
			let c = parseInt(uint128Hex.substr(16, 8), 16);
			let d = parseInt(uint128Hex.substr(24, 8), 16);
			return function () {
				a |= 0; b |= 0; c |= 0; d |= 0;
				let t = (((a + b) | 0) + d) | 0;
				d = (d + 1) | 0;
				a = b ^ (b >>> 9);
				b = (c + (c << 3)) | 0;
				c = (c << 21) | (c >>> 11);
				c = (c + t) | 0;
				return (t >>> 0) / 4294967296;
			};
		};
		// seed prngA with first half of tokenData.hash
		this.prngA = new sfc32(tokenData.hash.substr(2, 32));
		// seed prngB with second half of tokenData.hash
		this.prngB = new sfc32(tokenData.hash.substr(34, 32));
		for (let i = 0; i < 1e6; i += 2) {
			this.prngA();
			this.prngB();
		}
	}
	// random number between 0 (inclusive) and 1 (exclusive)
	random_dec() {
		this.useA = !this.useA;
		return this.useA ? this.prngA() : this.prngB();
	}
	// random number between a (inclusive) and b (exclusive)
	random_num(a, b) {
		return a + (b - a) * this.random_dec();
	}
	// random integer between a (inclusive) and b (inclusive)
	// requires a < b for proper probability distribution
	random_int(a, b) {
		return Math.floor(this.random_num(a, b + 1));
	}
	// random boolean with p as percent liklihood of true
	random_bool(p) {
		return this.random_dec() < p;
	}
	// random value in an array of items
	random_choice(list) {
		return list[this.random_int(0, list.length - 1)];
	}
}


/*
// We can get an instance of the Random class like so:
let R = new Random();
console.log( R );

// Now each time we need some randomness we can call various helper functions:

let R_dec = R.random_dec()      // Random decimal [0-1)
console.log( "R_dec: "+R_dec );

let R_num = R.random_num(0, 10)	// Random decimal [0-10)
console.log( "R_num: "+R_num );

// let R_int = R.random_int(0, 10) // Random integer [0-10]
// console.log( "R_int: "+R_int );
for( let i=0; i<10; i++ ){
	console.log( "R_int: "+R.random_int(0, 10) );
}

let R_bool = R.random_bool(0.5)  // Random boolean with probability 0.5
console.log( "R_bool: "+R_bool );

// let R_choice = R.random_choice([1, 2, 3])  // Random choice from a given list. Nice for random from a discreet set like a color palette
// console.log( "R_choice: "+R_choice );
for( let i=0; i<10; i++ ){
	console.log( "R_choice: "+R.random_choice( ['F', 'F', 'F', 'F', 'F', 'FL', 'N'] ) );
}
*/
