// desktop
import * as THREE from '../../three.js-r136/build/three.module.js';
import {FontLoader} from '../../three.js-r136/examples/jsm/loaders/FontLoader.js';
import {EffectComposer} from '../../three.js-r136/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from '../../three.js-r136/examples/jsm/postprocessing/RenderPass.js';
import {HalftonePass} from '../../three.js-r136/examples/jsm/postprocessing/HalftonePass.js';
import {OutlinePass} from '../../three.js-r136/examples/jsm/postprocessing/OutlinePass.js';


// test with r136 for faster rendering
// import * as THREE from '/three.js-r136/build/three.module.js';
// import {FontLoader} from '/three.js-r136/examples/jsm/loaders/FontLoader.js';
// import {EffectComposer} from '/three.js-r136/examples/jsm/postprocessing/EffectComposer.js';
// import {RenderPass} from '/three.js-r136/examples/jsm/postprocessing/RenderPass.js';
// import {HalftonePass} from '/three.js-r136/examples/jsm/postprocessing/HalftonePass.js';
// import {OutlinePass} from '/three.js-r136/examples/jsm/postprocessing/OutlinePass.js';


// import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
// import {EffectComposer} from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/EffectComposer.js';
// import {RenderPass} from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/RenderPass.js';
// import {HalftonePass} from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/HalftonePass.js';
// import {OutlinePass} from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/OutlinePass.js';



console.log( "THREE.r:"+THREE.REVISION );


const RND = new Random();


let camera, scene, renderer;


const EXTRUSION = 26;
let BEVEL = 8;



const W = [0, 0, 1];
const K = [0, 0, 0], K25 = [0, 0, 0.25], K50 = [0, 0, 0.5], K66 = [0, 0, 0.667], K75 = [0, 0, 0.75];

const R = [0, 1, 0.5], G = [0.333, 1, 0.5], B = [0.667, 1, 0.5];
const C = [0.5, 1, 0.5], M = [0.833, 1, 0.5], Y = [0.167, 1, 0.5];

const orange=0.042;   // dark orange
// const orange=0.084;
// const purple=0.75;
const skyblue=0.584;


// TODO: add rudimentary encoding to avoid plain text
const GRAFFITI = {
	F:[
		'all', 'em', 'her', 'him', 'it', 'me', 'no', 'off', 'that', 'this', 'yes', 'you',
		'bitcoin', 'boredom', 'cancer', 'candy', 'censorship', 'cheaters', 'cigarettes', 'cops', 'crypto', 'cyberspace', 'destiny', 'drugs', 'ecstasy', 'elitism', 'everything', 'evil', 'exploitation', 'extremism',
		'failure', 'faith', 'fascism', 'fear', 'gentrification', 'greed', 'guns', 'halloween', 'hate', 'hollywood', 'ignorance', 'influencers', 'intolerance', 'jealousy', 'money', 'mushrooms',
		'licorice', 'love', 'luck', 'narcissism', 'piracy', 'politics', 'pride', 'propaganda', 'racism', 'religion', 'sexism', 'stereotypes', 'superheroes', 'supermodels', 'uranus', 'vegetables', 'violence', 'vitriol',
		'the government', 'the internet', 'the law', 'the mainstream', 'the metaverse', 'the police', 'the rich', 'the system', 'the universe', 'the world',
		'a lot', 'animal abuse', 'art basel', 'burning man', 'celebrity worship', 'citizens united', 'coachella', 'conspiracy theories', 'comic sans', 'drunk drivers', 'ego maniacs', 'em all', 'everyone else', 'fake news', 'fast food', 'fitting in',
		'junk food', 'my life', 'outta here', 'police brutality', 'pop art', 'pumpkin spice', 'retro anything', 'shit up', 'social media', 'sour grapes', 'that shit', 'this shit', 'turkey bacon', 'your ego', 'your feelings', 'you too', 'your god', 'your idols', 'your heroes', 'your tattoos',
		'all you junkies', 'everyone but you', 'off and die', 'rock and roll', 'smiley glad hands', 'what you heard', 'around and find out',
		'cold pizza/flat soda', 'hate/love', 'me/you', 'rhyme/reason', 'stale bagels/weak coffee', 'stale donuts/weak coffee', 'this/that', 'the past/the future',
	],
	X:[
		'fuck bitches/get money', 'fuck everybody/love everybody', 'fuck everything/know everything', 'fuck life/love life', 'fuck me/love me', 'fuck you/love you', 'fuck you/pay me',
		'fuck new york/love new york',
		'for a good time/call 646-415-4676'
	]
};


const colorCombo = [
	// TODO: include more tints and shades
	// TODO: keep default R/W/B and gray scales as pre-defined combos?

	// ---- blend color combos [22]
	// SA only for bg:K, AS only for bg:W

	// -- 1/2/2
	{ bg: K,	b:[ B, C ],		f:[ B, C ],		bl:'SA' },
	{ bg: K,	b:[ B, M ],		f:[ B, M ],		bl:'SA' },
	{ bg: K,	b:[ R, C ],		f:[ R, C ],		bl:'SA' },
	{ bg: K,	b:[ R, B ],		f:[ R, B ],		bl:'SA' },
	{ bg: K,	b:[ R, M ],		f:[ R, M ],		bl:'SA' },
	{ bg: K,	b:[ Y, B ],		f:[ Y, B ],		bl:'SA' },
	{ bg: K,	b:[ Y, C ],		f:[ Y, C ],		bl:'SA' },
	{ bg: K,	b:[ Y, M ],		f:[ Y, M ],		bl:'SA' },
	{ bg: K,	b:[ Y, R ],		f:[ Y, R ],		bl:'SA' },

	// -- 1/3/3
	{ bg: K,	b:[ R, G, B ],	f:[ R, G, B ],	bl:'SA' },
	{ bg: K,	b:[ C, M, Y ],	f:[ C, M, Y ],	bl:'SA' },

	// -- 1/2/2
	{ bg: W,	b:[ B, C ],		f:[ B, C ],		bl:'AS' },
	{ bg: W,	b:[ B, M ],		f:[ B, M ],		bl:'AS' },
	{ bg: W,	b:[ R, C ],		f:[ R, C ],		bl:'AS' },
	{ bg: W,	b:[ R, B ],		f:[ R, B ],		bl:'AS' },
	{ bg: W,	b:[ R, M ],		f:[ R, M ],		bl:'AS' },
	{ bg: W,	b:[ Y, B ],		f:[ Y, B ],		bl:'AS' },
	{ bg: W,	b:[ Y, C ],		f:[ Y, C ],		bl:'AS' },
	{ bg: W,	b:[ Y, M ],		f:[ Y, M ],		bl:'AS' },
	{ bg: W,	b:[ Y, R ],		f:[ Y, R ],		bl:'AS' },

	// -- 1/3/3
	{ bg: W,	b:[ R, G, B ],	f:[ R, G, B ],	bl:'AS' },
	{ bg: W,	b:[ C, M, Y ],	f:[ C, M, Y ],	bl:'AS' },
];


const postType = [
	{ type:null },
	{ type:'halftone', radius:0 },   // radius is set in the POST PROCESSING section b/c it's relative to numberOfLines which is set by initSeed()
	{ type:'outline', clr:null }
];


const blendCombo = {
	'AS':{ f:THREE.AdditiveBlending, b:THREE.SubtractiveBlending },
	'SA':{ f:THREE.SubtractiveBlending, b:THREE.AdditiveBlending }
};


const schemeType = [
	// TODO: replace this array with function

	{ bg:null,	b:{ type:'solid',		clr:[] },	f:{ type:'solid',		clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'solid',		clr:[] }, 	f:{ type:'gradient',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'solid',		clr:[] }, 	f:{ type:'grafArray',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'solid',		clr:[] }, 	f:{ type:'grafCycle',	clr:[],val:'',amp:0 },		post:null,	bl:null },
	{ bg:null,	b:{ type:'solid',		clr:[] }, 	f:{ type:'lineLerp',	clr:[] },		post:null,	bl:null },

	{ bg:null,	b:{ type:'grafArray',	clr:[] }, 	f:{ type:'solid',		clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafArray',	clr:[] }, 	f:{ type:'gradient',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafArray',	clr:[] }, 	f:{ type:'grafArray',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafArray',	clr:[] }, 	f:{ type:'grafCycle',	clr:[],val:'',amp:0 },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafArray',	clr:[] }, 	f:{ type:'lineLerp',	clr:[] },		post:null,	bl:null },

	{ bg:null,	b:{ type:'grafCycle',	clr:[],val:'',amp:0 }, 	f:{ type:'solid',		clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafCycle',	clr:[],val:'',amp:0 }, 	f:{ type:'gradient',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafCycle',	clr:[],val:'',amp:0 }, 	f:{ type:'grafArray',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafCycle',	clr:[],val:'',amp:0 }, 	f:{ type:'grafCycle',	clr:[],val:'',amp:0 },		post:null,	bl:null },
	{ bg:null,	b:{ type:'grafCycle',	clr:[],val:'',amp:0 }, 	f:{ type:'lineLerp',	clr:[] },		post:null,	bl:null },

	{ bg:null,	b:{ type:'lineLerp',	clr:[] }, 	f:{ type:'solid',		clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'lineLerp',	clr:[] }, 	f:{ type:'gradient',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'lineLerp',	clr:[] }, 	f:{ type:'grafArray',	clr:[] },		post:null,	bl:null },
	{ bg:null,	b:{ type:'lineLerp',	clr:[] },	f:{ type:'grafCycle',	clr:[], val:'', amp:0 },	post:null,	bl:null },
	{ bg:null,	b:{ type:'lineLerp',	clr:[] },	f:{ type:'lineLerp',	clr:[] },		post:null,	bl:null },
];



// set by seed
// probably don't need these to be global
let grafFX = 'F';	// F/X. F prepends fuck.
let grafSubject = 'the world';		// remove default value?

let grafStrLen = [];
let lineWordsArr = [];
let numberOfLines;
let charScaleFactor;
let lineScaleFactor;
let wordSpacing;
let wordsGap;
let lineSpacing;
let lineSpacingFactor;
let scrollFactor;
let faceWavLen;
let faceFreq;

let clrScheme;
let postPass = false;
let lineMat = false;

let maxW = 150;
const rad = 40 * Math.PI / 180;
const hypo = maxW / Math.cos( rad );

let wordXperLine = [];

let currentAngle;


const charObjArr = [];

let rotX, rotY, rotZ;
let newX, newY, newZ;
let incX, incY, incZ;
let doAnimRot = false;

const allLineGroups = [];
const allLineFaceOffsets = [];

const bodyMeshes = [];


let composer;


init();

animate();



function logSomeInfo(){
	console.log('\n:: variation stats');
	const subjectCount = GRAFFITI.F.length + GRAFFITI.X.length;
	const lineCounts = [7,8,9,10,11,12,13,14,15].length;
	const colorComboCount = colorCombo.length;
	const postCount = postType.length;
	const schemeCount = schemeType.length;
	const faceWavLengths = [0.125, 0.25, 0.375, 0.5].length;

	const variationCount = subjectCount * lineCounts * colorComboCount * postCount * schemeCount * faceWavLengths;

	console.log('graf subjects: '+subjectCount+' [goal 200?]');
	console.log('line counts: '+lineCounts+' [7-15. final]');
	console.log('color combos: '+colorComboCount+' [+many more dynamic combos]');   // includes blended color combos
	console.log('post types: '+postCount+' [final]');
	// console.log('blend combos: 2 [not counted yet]');
	console.log('scheme types: '+schemeCount+' [final]');
	// console.log('line materials: [not counted yet]');
	console.log('face wave lengths: '+faceWavLengths+' [final]');
	console.log('total(ish) variations: '+variationCount);

	console.log('\n');
}



function initSeed( _hash ){
	console.log( 'initSeed( '+_hash+' )' );

	let seedValues16 = [];
	let seedValues256 = [];

	const hash = _hash.split(' ').join('');

	for( let i=0; i<hash.length; i++ ){
		seedValues16[i] = parseInt( hash[i], 16 );
		if( i%2 == 0 ){
			seedValues256[i/2] = parseInt( hash[i]+hash[i+1], 16 );
		}
	}

	// console.log( seedValues16 );
	// console.log( seedValues256 );


	// seedValues256
	// 2	category
	// 4	subject
	// 6	start angle
	// 8	number of lines

	// 10	color combo
	// 12	post type
	// 14	scheme type

	// 16	line material
	// 18	face z wave length


	// ----- 256[2]: category F or X (don't add fuck)
	// MAYBE: adjust probabilities
	if( seedValues256[2] < 20 ) grafFX = 'X';

	const grafObj = GRAFFITI[ grafFX ];

	// ----- 256[4]: which subject from the grafObj category array
	// NOTE: grafObj.length can not be bigger than 256 with this solution
	let nPerSubject = Math.ceil( 256 / grafObj.length );
	let nSubject = Math.floor( seedValues256[4] / nPerSubject );

	grafSubject = grafObj[ nSubject ];

	const subjectArr = grafSubject.split('/');

	subjectArr.forEach( (subject) => {
		const grafStr = (grafFX == 'F' ? 'fuck '+subject : subject);
		grafStrLen.push( grafStr.replace(/\s/g, '').length );

		const wordArr = grafStr.toUpperCase().split(' ');
		console.log( wordArr );

		lineWordsArr.push( wordArr );
	});


	// ----- 256[6]: start angle
	const nAngle = Math.floor( seedValues256[6]/32 );
	switch( nAngle ){
		// currentAngle alts only affect anim to new angle
		case 1: currentAngle = 1; rotX = -35, rotY =  45, rotZ = 0; break;	// vert TL-BR
		case 2: currentAngle = 1; rotX =  35, rotY = -45, rotZ = 0; break;	// vert TL-BR
		case 3: currentAngle = 2; rotX = -55, rotY = 0,  rotZ =  45; break;	// hor BL-TR
		case 4: currentAngle = 2; rotX =  55, rotY = 0,  rotZ =  45; break;	// hor BL-TR
		case 5: currentAngle = 3; rotX = -55, rotY = 0,  rotZ = -45; break;	// hor TL-BR
		case 6: currentAngle = 3; rotX =  55, rotY = 0,  rotZ = -45; break;	// hor TL-BR
		case 7: currentAngle = 0; rotX = -35, rotY = -45, rotZ = 0; break;	// vert BL-TR
		default: currentAngle = 0; rotX = 35, rotY =  45, rotZ = 0;			// vert BL-TR
	}

	// --- 256[8]: number of lines [7-15]
	// MAYBE: refactor this?
	const nLineCount = seedValues256[8];
	if     ( nLineCount < 25 )  numberOfLines = 7;
	else if( nLineCount < 50 )  numberOfLines = 8;
	else if( nLineCount < 75 )  numberOfLines = 9;
	else if( nLineCount < 100 ) numberOfLines = 10;
	else if( nLineCount < 125 ) numberOfLines = 12;
	else if( nLineCount < 150 ) numberOfLines = 13;
	else if( nLineCount < 175 ) numberOfLines = 14;
	else if( nLineCount < 200 ) numberOfLines = 15;
	else				  		numberOfLines = 11;   // highest probability


	function getColorCombo(  _type, _clr, _deg, _bg, _h ){
		// console.log('.getColorCombo()');
		const ccObj = { bg:null, b:[], f:[] };
		const type = ( _type % 2 ) ? 'set' : 'rng';
		// console.log( '.type:'+type );
		const h = Math.floor( _h / 16 ) * 16;   // H should be decimal
		// console.log( '.h:'+h );
		if( type == 'set' ){   // odd
			const nColors = _clr % 3 + 1;   // 1/2/3
			// console.log('.nColors: '+nColors);
			const spread = _deg % 3 * 15 + 15;   // 15/30/45
			// console.log('.spread: '+spread);
			const degGap = 180 - (nColors-1) * spread;
			// console.log('degGap: '+degGap);
			if( _clr % 2 ){
				let bgH;
				if( _clr < 127 ) bgH = (h + spread * (nColors-1) + degGap/2) % 360;
				else {
					bgH = h - degGap/2;
					if( bgH < 0 ) bgH = 360 + bgH;
				}
				ccObj.bg = [bgH/255, 1, 0.5];
			}
			else {
				const bgL = _bg % 4 * 1/3;   // 0, 0.333, 0.667, 1
				// console.log('bgL.1: '+bgL);
				ccObj.bg = [0, 0, bgL];
			}
			for( let i=0; i<nColors*2; i++ ){
				let S = 1, L = 0.5;
				// use _type here too b/c it doesn't need to be a diff value
				if( _type < 32 ){   // W
					S = 0;
					L = 1;
					// console.log('W1');
				}
				else if( _type > 224 ){   // K
					S = 0;
					L = 0;
					// console.log('K1');
				}
				if( i<nColors ){
					const H = (h + i * spread) % 360;
					ccObj.b.push( [H/255, S, L] );
				}
				else {
					const H = (h + (i-nColors) * spread + 180) % 360;
					// don't change K to W if .bg is W
					const adjL = (L != 0.5 && ccObj.bg[2] != 1 ? Math.abs(L-1) : L);   // if L is set to anything but 0.5, change it to the opposite
					ccObj.f.push( [H/255, S, adjL] );
				}
			}
		}
		else {   // rng
			const nColors = (_clr % 3 + 1) * 2;   // 2/4/6
			// console.log('.nColors: '+nColors);
			const range = _deg % 4 * 90 + 90;   // 90/180/270/360
			// console.log('.range: '+range);
			let addBg = 0;
			if( _clr % 2 ) addBg = 1;
			else {
				const bgL = _bg % 4 * 1/3;   // 0, 0.333, 0.667, 1
				// console.log('bgL.2: '+bgL);
				ccObj.bg = [0, 0, bgL];
			}
			let offset = ( range != 360 ? 1 : 0 );
			for( let i=0; i<nColors+addBg; i++ ){
				let H = (h + i * range/(nColors-offset)) % 360;
				let S = 1, L = 0.5;
				// use _type here too b/c it doesn't need to be a diff value
				if( _type < 32 ){   // W
					S = 0;
					L = 1;
					// console.log('W2');
				}
				else if( _type > 224 ){   // K
					S = 0;
					L = 0;
					// console.log('K2');
				}
				if( i<nColors/2 ) ccObj.b.push( [H/255, S, L] );
				else if( i<nColors ){
					const adjL = (L != 0.5 && ccObj.bg[2] != 1 ? Math.abs(L-1) : L);
					ccObj.f.push( [H/255, S, adjL] );
				}
				else ccObj.bg = [H/255, 1, 0.5];   // don't change bg here
			}
		}
		return ccObj;
	}


	function getColorScheme( _cc, _pt, _st ){
		console.log('getColorScheme(_cc:'+_cc+', _pt:'+_pt+', _st:'+_st+')');

		const _color = _cc;

		const _scheme = schemeType[_st];

		_scheme.bg = _color.bg;

		if( _scheme.b.type == 'grafCycle' ){
			_scheme.b.clr = [ _color.b[0] ];
			_scheme.b.val = 'H';
			_scheme.b.amp = 0.1;
		}
		else {
			// lineLerp requires that 2 colors are defined
			_scheme.b.clr = ( _color.b.length == 1 ? [_color.b[0], _color.b[0]] : _color.b );
		}

		if( _scheme.f.type == 'grafCycle' ){
			_scheme.f.clr = [ _color.f[0] ];
			_scheme.f.val = 'H';
			_scheme.f.amp = 0.1;
		}
		else {
			// lineLerp requires that 2 colors are defined
			_scheme.f.clr = ( _color.f.length == 1 ? [_color.f[0], _color.f[0]] : _color.f );
		}


		if( _color.bl ){
			const b = _color.bl;
			_scheme.bl = blendCombo[b];
		}

		if( !lineMat ) _scheme.post = postType[_pt];
		else _scheme.post = postType[0];


		if( !_color.bl && _scheme.post.type == 'outline' ){

			if( !lineMat ){
				_scheme.b.clr = [ _color.bg, _color.bg ];   // lineLerp requires that 2 colors are defined
			}

			// if( _color.bg == K ){
			if( _color.bg.toString() == [0,0,0].toString() ){
				// console.log('K');
				// random for testing. should use seed
				_scheme.post.clr = RND.random_choice( [ R, G, B, C, M, Y ] );
			}
			// else if( _color.bg == W ){
			else if( _color.bg.toString() == [0,0,1].toString() ){
				// console.log('W');
				_scheme.bg = K;
				_scheme.post.clr = W;
			}
			else {
				_scheme.post.clr = ( _color.bg == K ? _color.b[0] : W );
			}
		}
		else if( _color.bl && _scheme.post.type == 'outline' ){
			_scheme.post.type = 'halftone';
		}

		return _scheme;
	}


	// ----- 256[10],[12],[14],[16],[18]: color combo
	// ----- 256[20]: post type
	// ----- 256[22]: scheme type
	// MAYBE: adjust probabilities

	// currently 22 pre-defined combos (all blends atm)
	// 22x5 = 110
	// -- color combo
	const CC = ( seedValues256[10] < 110 ) ? colorCombo[ seedValues256[10] % 5 ] : getColorCombo( seedValues256[10], seedValues256[12], seedValues256[14], seedValues256[16], seedValues256[18] );
	// const CC = colorCombo[ 8 ];

	let nPerPT = Math.ceil( 256 / postType.length );
	let nPT = Math.floor( seedValues256[20] / nPerPT );

	let nPerST = Math.ceil( 256 / schemeType.length );
	let nST = Math.floor( seedValues256[22] / nPerST );


	// -- manually set values for testing ------------------------------------------------------------------------------------------------------------------------------------

	// -- post type
	// nPT = 0;   // null
	// nPT = 1;   // halftone
	// nPT = 2;   // outline // can't be combined with lineMat

	// -- scheme type
	// nST = 0;


	// ----- 256[24] line material
	if( seedValues256[24] > 225 && seedValues256[24] <= 235 ){
		lineMat = 'face';
	}
	else if( seedValues256[24] > 235 && seedValues256[24] <= 245 ){
		lineMat = 'body';
		BEVEL = 0;
	}
	else if( seedValues256[24] > 245 ){
		lineMat = 'bodyAndFace';
		BEVEL = 0;
	}
	console.log( 'lineMat: '+lineMat );


	clrScheme = getColorScheme( CC, nPT, nST );
	console.log( clrScheme );


	if( clrScheme.post.type ) postPass = true;


	lineScaleFactor = 0.0125;
	lineSpacingFactor = 125;

	if( clrScheme.bl ){
		lineScaleFactor *= 2;
		lineSpacingFactor *= 0.5;
	}

	charScaleFactor = 100 / numberOfLines * lineScaleFactor;   // 100 is font size
	wordSpacing = charScaleFactor * 25;
	wordsGap = charScaleFactor * 50;
	lineSpacing = charScaleFactor * lineSpacingFactor;

	scrollFactor = 0.01;   // allow range?


	// ----- 256[26]: face z wave length
	// 0.125, 0.25, 0.375, 0.5
	// add 0.625?
	faceWavLen = ( Math.floor( seedValues256[26]/64 ) + 1 ) * 0.125;

	// allow range?
	faceFreq = 1;
}


function init(){
	logSomeInfo();

	let hashStr = getHashStr();
	initSeed( hashStr );

	const canvas = document.querySelector('#c');

	// RENDERER
	{
		renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		// is this needed?
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( canvas.clientWidth, canvas.clientHeight );
	}

	// CAMERA
	{
		const left = -50;
		const right = 50;
		const top = 50;
		const bottom = -50;

		const near = -100;   // 0.01;
		const far = 300;

		camera = new THREE.OrthographicCamera( left, right, top, bottom, near, far );

		// don't need to be set with controls disabled
		// camera.position.z = 1;
	}

	// SCENE
	{
		scene = new THREE.Scene();
		const bgClr = clrScheme.bg;
		scene.background = new THREE.Color().setHSL( bgClr[0], bgClr[1], bgClr[2] );
	}

	// POST PROCESSING
	{
		let fxPass;

		if( postPass && clrScheme.post.type ){
			composer = new EffectComposer( renderer );
			composer.addPass( new RenderPass( scene, camera ) );

			if( clrScheme.post.type == 'halftone' ){
				fxPass = new HalftonePass(
					canvas.clienWidth, canvas.clientHeight,
					{
						// lines/radius: 7/13, 8/12.5, [9/12], 10/11.5, 11/11, 12/10.5, 13/10, 14/9.5, 15/9
						// TODO: should also be relative to canvas size
						radius: (15-numberOfLines) * 0.5 + 9
						// set more params?
					}
				);
			}
			else if( clrScheme.post.type == 'outline' ){
				fxPass = new OutlinePass( new THREE.Vector2( canvas.clientWidth, canvas.clientHeight ), scene, camera );

				BEVEL = 6;

				const clr = new THREE.Color().setHSL( clrScheme.post.clr[0], clrScheme.post.clr[1], clrScheme.post.clr[2] );
				fxPass.visibleEdgeColor = clr;

				fxPass.selectedObjects = bodyMeshes;
			}

			composer.addPass( fxPass );
		}
	}


	{
		const fontObj = {"glyphs":{"1":{"ha":875,"x_min":0,"x_max":0,"o":"m 268 515 b 194 603 268 578 263 603 b 143 600 176 603 160 600 b 88 646 114 600 88 615 b 606 818 88 742 400 818 b 721 756 649 818 721 815 b 617 606 721 686 619 736 b 614 439 615 532 614 485 b 626 201 614 378 615 260 b 808 76 651 78 808 175 b 725 6 808 28 765 15 b 444 -19 653 -10 519 -19 b 57 83 396 -19 57 -12 b 119 139 57 117 88 139 b 192 131 143 139 168 131 b 268 326 244 131 268 167 "},"4":{"ha":875,"x_min":0,"x_max":0,"o":"m 347 244 b 444 332 443 244 444 242 b 411 525 444 392 465 529 b 349 482 383 522 364 504 b 203 275 324 447 201 319 b 304 244 204 240 283 244 m 746 319 b 786 264 746 279 742 264 b 839 207 835 264 839 260 l 839 96 b 801 36 839 64 840 40 b 763 -46 758 32 763 28 b 704 -135 763 -108 775 -135 l 494 -135 b 436 -51 428 -135 436 -124 b 368 39 436 19 443 39 l 125 39 b 17 131 51 39 17 50 b 158 414 17 233 35 264 l 479 783 b 681 872 536 838 600 872 b 746 779 744 872 746 829 "},"5":{"ha":875,"x_min":0,"x_max":0,"o":"m 397 558 b 326 515 365 558 326 560 b 397 479 326 481 368 482 b 829 185 757 439 829 281 b 324 -151 829 6 622 -151 b 57 -39 101 -151 57 -89 b 96 40 57 -19 67 40 b 253 13 104 40 183 13 b 388 107 311 13 388 36 b 186 244 388 197 257 232 b 46 313 149 250 46 253 b 139 644 46 382 113 574 b 283 808 203 818 214 808 l 757 808 b 822 747 808 808 822 806 b 689 558 822 683 792 558 "},"6":{"ha":875,"x_min":0,"x_max":0,"o":"m 861 363 b 453 -19 861 171 706 -19 b 25 396 197 -19 25 160 b 346 928 25 622 260 928 b 543 846 375 932 543 888 b 507 790 543 828 518 803 b 410 624 456 733 410 668 b 432 597 410 611 418 597 b 596 635 456 597 519 635 b 861 363 744 635 861 508 m 556 238 b 431 433 556 301 513 433 b 364 347 382 433 364 390 b 490 174 364 288 424 174 b 556 238 529 174 556 199 "},"7":{"ha":875,"x_min":0,"x_max":0,"o":"m 756 808 b 840 756 792 808 840 807 b 829 707 840 739 835 724 l 550 -137 b 469 -185 539 -174 538 -185 b 253 -107 318 -185 253 -129 b 267 -74 253 -97 263 -81 l 517 404 b 554 499 528 426 554 474 b 390 544 554 553 432 544 b 131 458 114 544 244 458 b 26 613 47 458 26 546 b 151 847 26 744 86 847 b 331 808 208 847 194 808 "}," ":{"ha":438,"x_min":0,"x_max":0,"o":""},"-":{"ha":415,"x_min":0,"x_max":0,"o":"m 360 283 b 285 233 342 249 325 233 b 183 244 251 233 217 244 b 42 239 63 244 54 239 b 0 281 19 239 0 256 b 56 453 0 315 43 428 b 131 503 74 488 90 503 b 232 492 164 503 199 492 b 374 497 353 492 361 497 b 415 456 396 497 415 481 b 360 283 415 421 372 308 "},"A":{"ha":1207,"x_min":0,"x_max":0,"o":"m 575 401 b 631 419 589 401 631 399 b 579 532 631 440 590 513 b 513 606 567 554 543 606 b 450 507 479 606 456 522 b 421 421 444 492 421 438 b 471 401 421 397 456 401 m 283 501 b 383 829 326 597 383 719 b 551 997 383 925 428 997 b 803 782 672 997 749 874 b 1086 203 826 742 1036 317 b 1207 82 1132 97 1207 161 b 940 -15 1207 -19 1010 -15 b 622 72 742 -15 622 -14 b 707 163 622 139 707 114 b 449 231 707 225 672 231 b 333 160 376 231 333 228 b 422 69 333 106 422 142 b 217 -15 422 -14 272 -15 b 0 67 18 -15 0 22 b 115 163 0 132 75 113 b 196 311 146 200 175 267 "},"B":{"ha":1047,"x_min":0,"x_max":0,"o":"m 944 756 b 868 583 944 692 918 624 b 843 546 856 572 843 564 b 872 515 843 528 858 522 b 1028 303 929 493 1028 419 b 656 -7 1028 164 935 -7 b 524 -3 608 -7 565 -6 b 397 0 482 -1 440 0 b 254 -3 350 0 301 -1 b 111 -7 207 -6 160 -7 b 19 67 68 -7 19 18 b 118 296 19 153 110 65 l 133 696 b 22 906 142 906 22 810 b 122 983 22 958 79 983 b 276 979 174 983 225 981 b 431 974 328 976 379 974 b 528 979 464 974 496 976 b 625 983 560 981 593 983 b 944 756 879 983 944 863 m 464 644 b 504 564 464 590 461 564 b 607 699 588 564 607 622 b 510 839 607 761 586 839 b 464 757 458 839 464 797 m 464 306 b 533 140 464 144 490 140 b 640 267 613 140 640 194 b 518 426 640 351 615 426 b 464 375 475 426 465 404 "},"C":{"ha":1050,"x_min":0,"x_max":0,"o":"m 33 490 b 575 993 33 775 301 993 b 835 925 711 993 799 925 b 897 935 865 925 874 935 b 1031 693 956 935 1031 847 b 901 547 1031 614 983 547 b 547 793 758 547 794 793 b 396 617 440 793 396 693 b 700 236 396 411 506 236 b 946 332 876 236 903 332 b 1006 250 986 332 1006 285 b 872 61 1006 189 942 61 b 564 -19 825 61 728 -19 b 33 490 272 -19 33 211 "},"D":{"ha":1171,"x_min":0,"x_max":0,"o":"m 144 746 b 43 910 147 889 43 819 b 172 983 43 974 124 983 l 625 983 b 1138 494 1011 983 1138 744 b 635 -7 1138 236 986 -7 b 482 -3 575 -7 525 -6 b 363 0 439 -1 401 0 b 244 -3 324 0 283 -1 b 126 -7 206 -6 167 -7 b 19 72 79 -7 19 17 b 133 264 19 172 129 61 m 478 238 b 564 138 478 167 489 138 b 769 456 739 138 769 317 b 540 832 769 781 647 832 b 478 756 482 832 478 808 "},"E":{"ha":1008,"x_min":0,"x_max":0,"o":"m 593 974 b 828 1001 779 974 806 1001 b 940 804 907 1001 940 865 b 868 704 940 758 922 704 b 583 838 758 704 847 838 b 444 650 429 838 444 810 b 533 567 444 569 449 567 b 658 721 639 567 560 721 b 744 510 739 721 744 564 b 651 286 744 453 735 286 b 511 432 565 286 651 432 b 454 335 453 432 454 379 b 614 142 454 132 468 142 b 932 338 899 142 818 338 b 999 249 976 338 999 288 b 868 -15 999 154 924 -15 b 807 -7 858 -15 836 -11 b 690 0 776 -4 738 0 l 119 0 b 26 60 28 0 26 42 b 131 222 26 136 121 75 b 135 701 147 475 149 450 b 19 903 125 914 19 804 b 193 974 19 988 136 974 "},"F":{"ha":965,"x_min":0,"x_max":0,"o":"m 142 568 b 138 768 143 625 144 714 b 31 908 121 888 31 832 b 136 983 31 961 92 983 b 538 969 172 983 422 969 b 864 983 565 969 844 983 b 975 779 918 983 975 874 b 900 683 975 732 953 683 b 588 826 804 683 854 826 b 467 632 503 826 467 833 b 549 583 467 607 468 583 b 685 711 656 583 588 711 b 769 506 764 711 769 560 b 668 272 769 440 763 272 b 522 429 579 272 671 429 b 468 275 461 429 469 418 b 603 78 463 69 603 183 b 278 -15 603 46 615 -15 b 19 76 56 -15 19 17 b 124 192 19 154 94 118 b 142 375 138 231 142 329 "},"G":{"ha":1158,"x_min":0,"x_max":0,"o":"m 393 572 b 649 183 393 286 560 183 b 733 269 697 183 733 219 b 588 400 733 385 588 272 b 868 508 588 501 797 508 b 1144 394 1129 508 1144 435 b 1081 328 1144 358 1114 333 b 1032 281 1044 324 1042 317 b 585 -19 978 78 782 -19 b 33 492 290 -19 33 185 b 579 993 33 785 282 993 b 804 956 701 993 768 956 b 890 976 829 956 865 976 b 1028 764 976 976 1028 835 b 918 626 1028 696 993 626 b 592 819 781 626 781 819 b 393 572 471 819 393 719 "},"H":{"ha":1169,"x_min":0,"x_max":0,"o":"m 1050 229 b 1093 146 1050 188 1056 167 b 1140 88 1121 131 1140 122 b 864 -15 1140 54 1138 -15 b 625 79 803 -15 625 -14 b 722 350 619 186 722 68 b 636 422 722 425 706 422 b 460 292 442 422 460 417 b 546 88 460 101 546 178 b 276 -15 546 -10 343 -15 b 19 85 213 -15 19 -10 b 64 143 19 114 40 132 b 132 453 114 167 132 163 b 75 819 132 822 126 792 b 29 871 54 831 29 843 b 339 989 29 978 261 989 b 558 899 397 989 558 982 b 503 821 558 856 535 840 b 460 661 468 801 460 785 b 563 593 460 583 496 593 l 633 593 b 722 650 725 593 722 607 b 681 821 722 801 699 811 b 629 885 654 836 629 849 b 900 989 629 911 624 989 b 1150 890 965 989 1150 988 b 1107 825 1150 860 1135 839 b 1050 590 1065 807 1050 811 "},"I":{"ha":604,"x_min":0,"x_max":0,"o":"m 135 556 b 106 792 135 732 121 772 b 19 889 74 832 19 836 b 331 989 19 989 303 989 b 585 892 414 989 585 986 b 500 808 585 842 532 844 b 472 556 474 778 472 653 l 472 418 b 517 160 472 171 489 176 b 585 89 551 139 585 132 b 268 -15 585 47 572 -15 b 35 75 210 -15 35 -14 b 104 153 35 119 82 126 b 135 418 121 172 135 224 "},"J":{"ha":915,"x_min":0,"x_max":0,"o":"m 783 303 b 392 -19 775 8 469 -19 b -10 246 231 -19 -10 47 b 146 413 -10 336 53 413 b 307 275 226 413 307 363 b 297 210 307 251 297 228 b 358 158 297 175 325 156 b 456 708 522 175 444 458 b 331 874 463 863 331 781 b 613 989 331 900 342 989 b 906 886 875 989 906 925 b 794 731 906 814 797 847 "},"K":{"ha":1207,"x_min":0,"x_max":0,"o":"m 640 188 b 503 317 617 215 535 317 b 461 240 467 317 461 281 l 461 211 b 549 71 461 144 549 139 b 272 -15 549 26 517 -15 b 25 69 53 -15 25 22 b 111 219 25 142 94 104 b 125 465 124 297 125 386 b 111 736 125 551 126 651 b 19 889 93 856 19 804 b 311 989 19 911 7 989 b 521 894 376 989 521 990 b 444 701 521 821 444 865 b 471 643 444 683 446 643 b 618 818 508 643 618 786 b 596 892 618 847 596 861 b 846 989 596 994 779 989 b 1074 897 913 989 1074 996 b 881 803 1074 783 929 851 b 735 632 853 775 735 690 b 790 535 735 594 768 561 l 1081 203 b 1207 76 1122 156 1207 161 b 1082 0 1207 7 1136 0 l 846 0 b 735 72 792 0 790 4 "},"L":{"ha":924,"x_min":0,"x_max":0,"o":"m 154 0 b 39 61 110 0 39 -3 b 151 236 39 147 147 75 b 154 508 154 338 154 426 b 144 747 154 592 147 669 b 19 882 142 864 19 803 b 306 989 19 983 238 989 b 597 894 583 982 597 942 b 488 744 597 814 488 875 l 488 303 b 603 154 488 203 504 154 b 847 347 839 154 758 347 b 933 228 910 347 933 281 b 792 -19 933 119 856 -19 b 722 -10 767 -19 747 -14 b 618 0 696 -4 665 0 "},"M":{"ha":1290,"x_min":0,"x_max":0,"o":"m 386 390 b 338 450 378 408 363 450 b 308 221 294 450 308 267 b 397 67 308 72 397 142 b 194 -15 397 -12 249 -15 b 19 61 146 -15 19 -11 b 114 189 19 140 103 75 b 138 636 125 306 138 435 b 117 794 138 719 132 763 b 24 890 103 824 24 833 b 264 989 24 969 153 989 b 465 890 426 989 424 961 b 661 567 514 808 600 581 b 811 817 704 557 761 725 b 1067 989 882 947 883 989 b 1267 897 1128 989 1267 985 b 1190 783 1267 842 1204 831 b 1169 518 1179 744 1169 581 b 1183 215 1169 497 1178 344 b 1271 74 1188 114 1271 136 b 1019 -15 1271 -19 1081 -15 b 772 68 963 -15 772 -21 b 844 169 772 117 835 125 b 829 432 850 193 878 432 b 708 239 786 432 742 310 b 583 22 678 175 628 17 b 467 210 561 25 550 22 "},"N":{"ha":1213,"x_min":0,"x_max":0,"o":"m 763 639 b 849 585 779 625 824 585 b 885 665 883 585 885 642 b 872 792 885 700 883 760 b 779 904 853 850 779 829 b 979 989 779 993 921 989 b 1192 900 1040 989 1192 996 b 1094 786 1192 821 1118 850 b 1076 597 1076 736 1076 650 l 1076 238 b 992 -15 1076 175 1085 -15 b 919 19 964 -15 940 1 l 490 404 b 406 456 471 422 435 456 b 361 336 363 456 361 365 b 371 210 361 297 363 246 b 465 86 392 121 465 154 b 257 -15 465 -7 322 -15 b 50 83 193 -15 50 -7 b 144 217 50 157 131 128 b 157 426 154 276 157 364 b 142 728 157 526 157 628 b 19 896 119 867 19 813 b 269 989 19 994 207 989 b 433 928 356 989 371 983 "},"O":{"ha":1136,"x_min":0,"x_max":0,"o":"m 554 -19 b 33 490 261 -19 33 194 b 571 993 33 785 268 993 b 1101 476 954 993 1101 656 b 554 -19 1101 178 838 -19 m 744 336 b 507 786 744 463 669 786 b 390 638 429 786 390 706 b 624 188 390 519 474 188 b 744 336 708 188 744 261 "},"P":{"ha":999,"x_min":0,"x_max":0,"o":"m 658 669 b 521 829 658 757 614 829 b 468 785 467 829 468 813 l 468 576 b 531 515 468 547 456 515 b 658 669 622 515 658 585 m 149 763 b 19 899 149 867 19 811 b 124 965 19 954 81 965 b 226 963 158 965 192 963 b 608 983 428 963 578 983 b 979 675 797 983 979 883 b 611 357 979 468 804 357 b 490 364 569 357 528 364 b 468 342 474 364 468 357 l 468 261 b 574 79 472 88 574 160 b 311 -15 574 -11 374 -15 b 47 76 253 -15 47 -14 b 149 219 47 153 149 106 "},"Q":{"ha":1140,"x_min":0,"x_max":0,"o":"m 744 336 b 507 786 744 463 669 786 b 390 638 429 786 390 706 b 624 188 390 519 474 188 b 744 336 708 188 744 261 m 347 -126 b 117 -51 228 -78 179 -51 b 82 -54 106 -51 94 -54 b 50 -14 60 -54 50 -33 b 160 76 50 44 107 76 b 189 75 169 76 179 75 b 210 89 197 75 210 78 b 33 490 210 119 33 211 b 571 993 33 785 268 993 b 1101 476 954 993 1101 656 b 771 19 1101 258 974 101 b 753 0 764 17 753 8 b 961 -64 753 -22 800 -64 b 1071 -39 1017 -64 1060 -39 b 1107 -93 1092 -39 1107 -75 b 789 -260 1107 -136 1017 -260 b 561 -214 703 -260 642 -243 "},"R":{"ha":1133,"x_min":0,"x_max":0,"o":"m 447 624 b 483 557 444 588 438 557 b 603 693 574 557 603 607 b 506 831 603 761 586 831 b 453 756 454 831 456 799 m 125 685 b 19 897 125 900 19 811 b 183 983 19 974 128 983 b 269 979 213 983 240 981 b 354 974 297 976 326 974 b 489 979 399 974 443 976 b 624 983 533 981 579 983 b 963 729 781 983 963 914 b 844 528 963 646 922 565 b 822 500 832 521 822 517 b 857 467 822 479 840 474 b 1017 217 954 431 997 367 b 1124 81 1033 88 1124 165 b 903 -28 1124 28 1060 -28 b 610 283 681 -28 653 100 b 494 410 594 347 571 410 b 453 318 464 410 453 406 b 463 183 453 278 456 222 b 544 72 474 119 544 139 b 285 -15 544 22 510 -15 b 21 86 218 -15 21 -15 b 125 289 21 158 125 108 "},"S":{"ha":942,"x_min":0,"x_max":0,"o":"m 188 424 b 56 669 111 485 56 569 b 464 993 56 814 194 993 b 674 953 553 993 653 953 b 742 969 693 953 713 969 b 894 750 789 969 894 867 b 813 656 894 703 864 656 b 521 814 719 656 665 814 b 432 744 478 814 432 794 b 783 557 432 635 622 664 b 913 326 869 500 913 431 b 456 -19 913 164 779 -19 b 128 47 364 -19 207 4 b 29 303 61 85 29 232 b 88 378 29 340 46 378 b 425 157 186 378 169 157 b 532 225 456 157 532 172 b 188 424 532 325 342 300 "},"T":{"ha":1024,"x_min":0,"x_max":0,"o":"m 692 974 b 800 983 751 974 779 979 b 857 993 819 989 831 993 b 1024 736 911 993 1024 886 b 917 621 1024 667 988 621 b 726 785 796 621 797 785 b 678 699 672 785 678 710 l 678 272 b 806 89 678 107 806 186 b 519 -15 806 46 779 -15 b 189 89 449 -15 189 -18 b 303 186 189 163 275 133 b 324 333 317 215 322 299 l 335 640 b 292 785 340 786 311 785 b 86 621 229 785 199 621 b 0 721 32 621 0 671 b 179 993 0 839 100 993 b 231 983 189 993 204 989 b 350 974 257 979 294 974 "},"U":{"ha":1197,"x_min":0,"x_max":0,"o":"m 874 733 b 754 906 874 882 754 825 b 972 989 754 992 915 989 b 1178 908 1025 989 1178 989 b 1074 751 1178 831 1074 878 l 1074 376 b 594 -19 1074 314 1075 -19 b 108 419 47 -19 108 403 l 108 740 b 19 892 114 828 19 828 b 290 989 19 911 4 989 b 563 893 517 989 563 947 b 454 717 563 793 461 886 l 454 461 b 664 190 454 296 517 190 b 874 388 883 190 874 372 "},"V":{"ha":1172,"x_min":0,"x_max":0,"o":"m 690 106 b 558 -15 661 49 633 -15 b 426 96 478 -15 457 31 l 150 707 b 42 822 108 797 96 814 b 0 876 14 826 0 847 b 292 989 0 983 221 989 b 572 899 583 989 572 919 b 506 806 572 846 506 843 b 593 596 506 776 560 668 b 651 517 606 572 621 518 b 738 621 697 514 721 592 b 818 813 754 654 818 779 b 747 904 818 863 747 849 b 978 989 747 990 922 989 b 1182 908 1153 989 1182 957 b 1121 849 1182 871 1154 853 b 1003 739 1061 842 1056 846 "},"W":{"ha":1518,"x_min":0,"x_max":0,"o":"m 807 385 b 767 443 800 400 789 443 b 694 318 740 443 731 407 l 610 108 b 476 -15 581 36 567 -15 b 353 97 399 -15 378 33 l 94 757 b 0 890 56 857 0 806 b 251 989 0 986 188 989 b 489 900 454 989 489 957 b 457 810 489 858 457 853 b 506 651 457 769 500 668 b 575 532 513 629 543 532 b 647 653 611 532 640 632 b 665 707 651 661 665 697 b 594 829 665 719 636 806 b 543 897 567 843 543 863 b 814 989 543 906 524 989 b 1078 903 1083 989 1078 926 b 1015 810 1078 857 1015 844 b 1076 656 1015 772 1063 686 b 1150 547 1086 633 1117 547 b 1257 803 1197 547 1257 783 b 1167 908 1257 863 1167 832 b 1365 989 1167 993 1308 989 b 1526 904 1422 989 1526 982 b 1431 757 1526 836 1468 854 l 1192 132 b 1051 -15 1163 57 1131 -15 b 935 81 982 -15 960 22 "},"X":{"ha":1160,"x_min":0,"x_max":0,"o":"m 751 617 b 732 588 747 613 732 594 b 751 557 732 578 746 564 l 1011 231 b 1160 97 1082 142 1160 179 b 815 -15 1160 56 1156 -15 b 553 69 757 -15 553 -22 b 610 151 553 122 610 122 b 532 290 610 188 553 263 b 508 310 525 297 519 310 b 406 164 490 310 406 183 b 464 72 406 132 464 135 b 232 -15 464 33 429 -15 b 0 79 33 -15 0 32 b 81 147 0 115 24 147 b 247 269 135 147 171 174 l 375 429 b 394 458 379 435 394 451 b 375 489 394 468 381 483 l 178 744 b 24 874 107 836 24 793 b 367 989 24 906 26 989 b 608 901 564 989 608 961 b 558 819 608 840 558 846 b 624 735 558 799 607 735 b 696 819 642 735 696 806 b 643 904 696 851 643 847 b 882 989 643 951 678 989 b 1085 901 940 989 1085 989 b 985 832 1085 838 1033 836 b 847 739 931 828 879 779 "},"Y":{"ha":1138,"x_min":0,"x_max":0,"o":"m 797 607 b 732 392 736 531 732 489 b 751 182 732 264 739 208 b 844 85 771 142 844 150 b 557 -15 844 -15 625 -15 b 249 85 285 -15 249 47 b 353 189 249 160 328 132 b 375 419 367 221 375 285 b 314 588 375 499 363 525 l 157 769 b -1 894 89 849 -1 826 b 313 989 -1 926 -11 989 b 599 904 601 989 599 935 b 560 825 599 868 560 854 b 650 707 560 794 615 707 b 744 813 686 707 744 781 b 704 907 744 851 704 854 b 918 989 704 989 865 989 b 1138 907 1092 989 1138 968 b 968 794 1138 818 1038 869 "},"Z":{"ha":1001,"x_min":0,"x_max":0,"o":"m 588 332 b 526 206 575 311 526 229 b 622 174 526 172 601 174 b 892 357 865 174 786 357 b 992 250 961 357 992 315 b 851 -12 992 100 900 -12 b 789 -6 844 -12 818 -10 b 708 0 760 -3 728 0 l 122 0 b 24 53 75 0 24 -12 b 53 122 24 79 40 101 l 403 717 b 428 769 410 728 428 754 b 336 810 428 806 371 810 b 106 622 161 810 204 622 b 10 738 49 622 10 685 b 139 983 10 843 106 983 b 183 974 146 983 156 979 b 349 964 213 969 263 964 b 618 976 408 964 515 971 b 849 989 719 983 815 989 b 919 925 889 989 919 968 b 886 846 919 900 897 867 "}},"ascender":974,"descender":-415,"underlinePosition":-104,"underlineThickness":69,"boundingBox":{"yMin":-347,"xMin":-240,"yMax":1324,"xMax":1804},"resolution":1000};


		// if testing with r136 inst of r124
		let loader = ( THREE.REVISION == 136 ? new FontLoader() : new THREE.FontLoader() );


		if( clrScheme.b.type == 'lineLerp' ){
			const incr = 1/(numberOfLines-1);

			const clr0 = clrScheme.b.clr[0];
			const clr1 = clrScheme.b.clr[1];

			for( let i=0; i<numberOfLines; i++ ){
				const alpha = i * incr;
				const clrFrom = new THREE.Color().setHSL( clr0[0], clr0[1], clr0[2] );
				const clrTo = new THREE.Color().setHSL( clr1[0], clr1[1], clr1[2] );
				const lerpClr = new THREE.Color().copy( clrFrom ).lerp( clrTo, alpha );
				clrScheme.b.clr[i] = lerpClr;
			}
		}

		if( clrScheme.f.type == 'lineLerp' ){
			const incr = 1/(numberOfLines-1);

			const clr0 = clrScheme.f.clr[0];
			const clr1 = clrScheme.f.clr[1];

			for( let i=0; i<numberOfLines; i++ ){
				const alpha = i * incr;
				const clrFrom = new THREE.Color().setHSL( clr0[0], clr0[1], clr0[2] );
				const clrTo = new THREE.Color().setHSL( clr1[0], clr1[1], clr1[2] );
				const lerpClr = new THREE.Color().copy( clrFrom ).lerp( clrTo, alpha );
				clrScheme.f.clr[i] = lerpClr;
			}
		}


		const lineWordShapes = [];


		for( let i=0; i<lineWordsArr.length; i++ ){
			const fontData = loader.parse( fontObj );

			const lineWords = [];
			lineWordsArr[i].forEach( (word) => {
				lineWords.push( fontData.generateShapes(word, 100) );   // 100 is font size
			});

			lineWordShapes.push( lineWords );
		}


		for( let j=0; j<numberOfLines; j++ ){
			const wordShapesNum = j % lineWordsArr.length;

			wordXperLine[j] = 0;

			const charComboGroup = new THREE.Group();
			const charFaceOffsets = [];

			// color really shouldn't be needed b/c it should be set when material is created, right?
			charObjArr.push( {char:[], bb:0, clrBody:[], matBody:[], ff:0, clrFace:[], matFace:[]} );


			while( wordXperLine[j] < hypo ){

				// TODO: create all materials out here so it's on a graf basis instead?

				for( let i=0; i<lineWordsArr[ wordShapesNum ].length; i++ ){

					let wordWidth = 0;

					if( i ) wordXperLine[j] += wordSpacing;

					for( let ii=0; ii<lineWordsArr[ wordShapesNum ][ i ].length; ii++ ){
						let grafStrLenNum = ( grafStrLen.length > 1 ? j%2 : 0 );
						let grafStrPos = charObjArr[j].char.length % grafStrLen[ grafStrLenNum ];

						const shape = lineWordShapes[wordShapesNum][i][ii];

						const charCombo = new THREE.Object3D();

						const bodyGeometry = new THREE.ExtrudeGeometry( shape, {
							depth: EXTRUSION,
							bevelThickness: 0,
							bevelSize: BEVEL,
							// curveSegments: 8   // 12 is default
						} );

						const faceGeometry = new THREE.ShapeGeometry( shape );

						let bodyHSL;
						let bodyColor;
						let bodyMat;

						if( clrScheme.b.type == 'grafArray' ){
							if( !charObjArr[j].char.length ){
								charObjArr[j].bb = j % clrScheme.b.clr.length;
							}
							bodyHSL = getCharObjColorBody( j, !grafStrPos );
						}
						else if( clrScheme.b.type == 'grafCycle' ){
							if( !charObjArr[j].char.length ){
								charObjArr[j].bb = j * 30;   // NOTE: what exactly is 30 here? don't remember..
							}
							bodyHSL = getCharObjColorBody( j, !grafStrPos );
						}
						else if( clrScheme.b.type == 'lineLerp' ){
							const bodyClrNum = j % clrScheme.b.clr.length;
							bodyColor = clrScheme.b.clr[ bodyClrNum ];
						}
						else {
							const bodyClrNum = j % clrScheme.b.clr.length;
							bodyHSL = clrScheme.b.clr[ bodyClrNum ];
						}

						if( !bodyColor ) bodyColor = new THREE.Color().setHSL( bodyHSL[0], bodyHSL[1], bodyHSL[2] );

						const propsBody = {
							color: bodyColor,
							depthTest: false
						};

						// materials should really only be created per line or per graf, not per char

						bodyMat = lineMat=='body'||lineMat=='bodyAndFace' ? new THREE.LineBasicMaterial( propsBody ) : new THREE.MeshBasicMaterial( propsBody );

						if( clrScheme.bl ) bodyMat.blending = clrScheme.bl.b;



						let faceHSL;
						let faceColor;
						let faceMat;

						if( clrScheme.f.type == 'grafArray' ){
							if( !charObjArr[j].char.length ){
								charObjArr[j].ff = j % clrScheme.f.clr.length;
							}
							faceHSL = getCharObjColorFace( j, !grafStrPos );
						}
						else if( clrScheme.f.type == 'grafCycle' ){
							if( !charObjArr[j].char.length ){
								charObjArr[j].f = j * 30 -90;
							}
							faceHSL = getCharObjColorFace( j, !grafStrPos );
						}
						else if( clrScheme.f.type == 'lineLerp' ){
							const faceClrNum = j % clrScheme.f.clr.length;
							faceColor = clrScheme.f.clr[ faceClrNum ];
						}
						else if( clrScheme.f.type == 'gradient' ){
							faceGeometry.computeBoundingBox();

							const gradClr1 = clrScheme.f.clr[0];
							const gradClr2 = clrScheme.f.clr[1];

							faceMat = new THREE.ShaderMaterial({
								uniforms: {
									// color order switched in shader
									color1: { value: new THREE.Color().setHSL( gradClr1[0], gradClr1[1], gradClr1[2] ) },
									color2: { value: new THREE.Color().setHSL( gradClr2[0], gradClr2[1], gradClr2[2] ) },
									bboxMin: { value: faceGeometry.boundingBox.min },
									bboxMax: { value: faceGeometry.boundingBox.max }
								},
								vertexShader: `
									uniform vec3 bboxMin;
									uniform vec3 bboxMax;
									varying vec2 vUv;
									void main() {
										vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
										gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
									}
								`,
								fragmentShader: `
									uniform vec3 color1;
									uniform vec3 color2;
									varying vec2 vUv;
									void main() {
										gl_FragColor = vec4( mix( color2, color1, vUv.y ), 1.0 );
									}
								`
							});
						}
						else {
							const faceClrNum = j % clrScheme.f.clr.length;
							faceHSL = clrScheme.f.clr[ faceClrNum ];
						}


						if( !faceColor && clrScheme.f.type != 'gradient' ) faceColor = new THREE.Color().setHSL( faceHSL[0], faceHSL[1], faceHSL[2] );

						const propsFace = {
							color: faceColor,
							depthTest: false
						};

						// materials should really only be created per line or per graf, not per char

						if( !faceMat ) faceMat = lineMat=='face'||lineMat=='bodyAndFace' ? new THREE.LineBasicMaterial( propsFace ) : new THREE.MeshBasicMaterial( propsFace );

						if( clrScheme.bl ) faceMat.blending = clrScheme.bl.f;


						// some of these might not be needed if face.type is gradient

						charObjArr[j].char.push( grafStrPos );
						charObjArr[j].clrBody.push( bodyHSL );
						charObjArr[j].clrFace.push( faceHSL );

						charObjArr[j].matBody.push( bodyMat );
						charObjArr[j].matFace.push( faceMat );


						const lineBodyGeometry = lineMat=='body'||lineMat=='bodyAndFace' ? new THREE.EdgesGeometry( bodyGeometry ) : null;
						const bodyMesh = lineMat=='body'||lineMat=='bodyAndFace' ? new THREE.LineSegments( lineBodyGeometry, bodyMat ) : new THREE.Mesh( bodyGeometry, bodyMat ) ;

						bodyMesh.scale.x = charScaleFactor;
						bodyMesh.scale.y = charScaleFactor;
						bodyMesh.scale.z = charScaleFactor;

						const charBodyBox = new THREE.Box3().setFromObject( bodyMesh );
						const charBodyMidX = (charBodyBox.max.x + charBodyBox.min.x) / 2;
						const charBodyMidY = (charBodyBox.max.y + charBodyBox.min.y) / 2;
						const charBodyMidZ = (charBodyBox.max.z + charBodyBox.min.z) / 2;
						bodyMesh.position.x -= charBodyMidX;
						bodyMesh.position.y -= charBodyMidY;
						bodyMesh.position.z -= charBodyMidZ;

						bodyMeshes.push( bodyMesh );


						const lineFaceGeometry = lineMat=='face'||lineMat=='bodyAndFace' ? new THREE.EdgesGeometry( faceGeometry ) : null;
						const faceMesh = lineMat=='face'||lineMat=='bodyAndFace' ? new THREE.LineSegments( lineFaceGeometry, faceMat ) : new THREE.Mesh( faceGeometry, faceMat );

						faceMesh.scale.x = charScaleFactor;
						faceMesh.scale.y = charScaleFactor;
						faceMesh.scale.z = charScaleFactor;

						const charFaceBox = new THREE.Box3().setFromObject( faceMesh );
						const charFaceMidX = (charFaceBox.max.x + charFaceBox.min.x) / 2;
						const charFaceMidY = (charFaceBox.max.y + charFaceBox.min.y) / 2;
						faceMesh.position.x -= charFaceMidX;
						faceMesh.position.y -= charFaceMidY;
						faceMesh.position.z += EXTRUSION / 2 * charScaleFactor;

						faceMesh.renderOrder = 1;


						charCombo.add( bodyMesh );
						charCombo.add( faceMesh );

						charCombo.position.x += charFaceMidX + wordXperLine[j];

						wordWidth = charFaceBox.max.x;

						charComboGroup.add( charCombo );


						charFaceOffsets.push( charFaceOffsets.length );
					}

					wordXperLine[j] += wordWidth;
				}

				wordXperLine[j] += wordsGap;
			}

			const lineBox = new THREE.Box3().setFromObject( charComboGroup );
			const lineSize = lineBox.getSize( new THREE.Vector3() );

			charComboGroup.children.forEach( (char) => {
				char.position.x -= lineSize.x / 2;
			} );

			charComboGroup.position.y = j * -lineSpacing;
			charComboGroup.position.y += (numberOfLines-1) / 2 * lineSpacing;

			allLineGroups.push( charComboGroup );
			allLineFaceOffsets.push( charFaceOffsets );

			scene.add( charComboGroup );
		}

	}


	allLineGroups.forEach( (line) => {
		line.rotation.x = Math.PI/180 * rotX;
		line.rotation.y = Math.PI/180 * rotY;
		line.rotation.z = Math.PI/180 * rotZ;
	} );
}


function getCharObjColorBody( _ln, _iterate ){
	if( clrScheme.b.type == 'grafArray' ){
		if( charObjArr[ _ln ].char[0] == 0 && _iterate ){
			charObjArr[ _ln ].bb < clrScheme.b.clr.length-1 ? charObjArr[ _ln ].bb++ : charObjArr[ _ln ].bb = 0;
		}
		const arrayColor = clrScheme.b.clr[ charObjArr[ _ln ].bb ];
		return arrayColor;
	}
	else if( clrScheme.b.type == 'grafCycle' ){
		if( _iterate && charObjArr[ _ln ].char[0] == 0 ){
			charObjArr[ _ln ].bb < 330 ? charObjArr[ _ln ].bb += 30 : charObjArr[ _ln ].bb = 0;
		}
		const deg = charObjArr[ _ln ].bb;
		const clr = clrScheme.b.clr[0];
		const val = clrScheme.b.val;
		const amp = clrScheme.b.amp;
		const sinVal = Math.sin( deg * Math.PI / 180 ) * amp;
		const cycleColor = [ clr[0], clr[1], clr[2] ];
		if( val == 'H' ) cycleColor[0] += sinVal;
		return cycleColor;
	}
}


function getCharObjColorFace( _ln, _iterate ){
	if( clrScheme.f.type == 'grafArray' ){
		if( charObjArr[ _ln ].char[0] == 0 && _iterate ){
			charObjArr[ _ln ].ff < clrScheme.f.clr.length-1 ? charObjArr[ _ln ].ff++ : charObjArr[ _ln ].ff = 0;
		}
		const arrayColor = clrScheme.f.clr[ charObjArr[ _ln ].ff ];
		return arrayColor;
	}
	else if( clrScheme.f.type == 'grafCycle' ){
		if( _iterate && charObjArr[ _ln ].char[0] == 0 ){
			charObjArr[ _ln ].ff < 330 ? charObjArr[ _ln ].ff += 30 : charObjArr[ _ln ].ff = 0;
		}

		const deg = charObjArr[ _ln ].ff;

		const clr = clrScheme.f.clr[0];
		const val = clrScheme.f.val;
		const amp = clrScheme.f.amp;

		const sinVal = Math.sin( deg * Math.PI / 180 ) * amp;

		const cycleColor = [ clr[0], clr[1], clr[2] ];

		if( val == 'H' ) cycleColor[0] += sinVal;

		return cycleColor;
	}

}


function shiftChar( _ln ){
	allLineFaceOffsets[ _ln ].shift();
	const n = allLineFaceOffsets[ _ln ][ allLineFaceOffsets[ _ln ].length-1 ] + 1;

	allLineFaceOffsets[ _ln ].push(n);

	const el = allLineGroups[ _ln ].children.shift();
	allLineGroups[ _ln ].children.push( el );

	const cb = getCharObjColorBody( _ln, true );
	const cf = getCharObjColorFace( _ln, true );

	const c = charObjArr[ _ln ].char.shift();
	charObjArr[ _ln ].char.push( c );

	if( clrScheme.b.type == 'grafArray' || clrScheme.b.type == 'grafCycle' ){
		charObjArr[ _ln ].clrBody.shift();
		charObjArr[ _ln ].clrBody.push( cb );

		const mb = charObjArr[ _ln ].matBody.shift();
		charObjArr[ _ln ].matBody.push( mb );

		for( let i=0; i<charObjArr[ _ln ].char.length; i++ ){
			const clrB = charObjArr[ _ln ].clrBody[i];
			charObjArr[ _ln ].matBody[i].clr = new THREE.Color().setHSL( clrB[0], clrB[1], clrB[2] );
		}
	}

	if( clrScheme.f.type == 'grafArray' || clrScheme.f.type == 'grafCycle' ){
		charObjArr[ _ln ].clrFace.shift();
		charObjArr[ _ln ].clrFace.push( cf );

		const mf = charObjArr[ _ln ].matFace.shift();
		charObjArr[ _ln ].matFace.push( mf );

		for( let i=0; i<charObjArr[ _ln ].char.length; i++ ){
			const clrF = charObjArr[ _ln ].clrFace[i];
			charObjArr[ _ln ].matFace[i].clr = new THREE.Color().setHSL( clrF[0], clrF[1], clrF[2] );
		}
	}
}


function animate( time ){
	time *= 0.001;


	if( doAnimRot ){
		rotX += incX;
		rotY += incY;
		rotZ += incZ;

		rotX = Math.round( rotX * 10 ) / 10;
		rotY = Math.round( rotY * 10 ) / 10;
		rotZ = Math.round( rotZ * 10 ) / 10;

		for( let i=0; i<allLineGroups.length; i++ ){
			allLineGroups[i].rotation.x = Math.PI/180 * rotX;
			allLineGroups[i].rotation.y = Math.PI/180 * rotY;
			allLineGroups[i].rotation.z = Math.PI/180 * rotZ;
			if( rotX == newX && rotY == newY && rotZ == newZ ) doAnimRot = false;
		}
	}


	for( let i=0; i<numberOfLines; i++ ){
		for( let ii=0; ii<allLineGroups[i].children.length; ii++ ){

			let sinVal = Math.sin( time * faceFreq + allLineFaceOffsets[i][ii] * faceWavLen ) * EXTRUSION / 2 * charScaleFactor;

			allLineGroups[i].children[ii].children[1].position.z = sinVal;

			allLineGroups[i].children[ii].position.x -= scrollFactor * (i+1);

			if( allLineGroups[i].children[ii].position.x < -hypo * 0.5 ){
				allLineGroups[i].children[ii].position.x += wordXperLine[i];
				shiftChar( i );
			}
		}
	}


	requestAnimationFrame( animate );

	render();
}


function render(){
	if( postPass && clrScheme.post.type )
		composer.render();
	else
		renderer.render( scene, camera );
}


function initRotAnim( n ){
	let angles = [
		[ { x: 35, y: 45, z: 0 }, { x:-35, y:-45, z: 0 } ],
		[ { x:-35, y: 45, z: 0 }, { x: 35, y:-45, z: 0 } ],
		[ { x:-55, y: 0, z: 45 }, { x: 55, y: 0, z: 45 } ],
		[ { x:-55, y: 0, z:-45 }, { x: 55, y: 0, z:-45 } ]
	];

	if( n != currentAngle && !doAnimRot ){
		currentAngle = n;

		// there's always two ways to animate to every new angle, with the final position appearing to be the same
		// randomly choosing btw the two makes the animation unpredictable and more fun to interactive with
		let r = RND.random_int(0, 1);

		newX = angles[n][r].x;
		newY = angles[n][r].y;
		newZ = angles[n][r].z;

		incX = (newX - rotX) / 50;
		incY = (newY - rotY) / 50;
		incZ = (newZ - rotZ) / 50;

		doAnimRot = true;
	}
}


document.getElementById('btnAngle1').addEventListener( 'click', function(){ initRotAnim(0) });		// vert BL-TR
document.getElementById('btnAngle2').addEventListener( 'click', function(){ initRotAnim(1) });		// vert TL-BR
document.getElementById('btnAngle3').addEventListener( 'click', function(){ initRotAnim(2) });		// hor BL-TR
document.getElementById('btnAngle4').addEventListener( 'click', function(){ initRotAnim(3) });		// hor TL-BR

document.getElementById('c').addEventListener( 'click', function(e){
	const clickX = e.offsetX;
	const clickY = e.offsetY;

	let rect = this.getBoundingClientRect();
	const canvasScaleRatio = rect.width / 720;

	const halfSize = 360 * canvasScaleRatio;

	if( clickX < halfSize && clickY < halfSize ) initRotAnim(0);			// TL quadrant
	else if( clickX >= halfSize && clickY < halfSize ) initRotAnim(3);		// TR
	else if( clickX < halfSize && clickY >= halfSize ) initRotAnim(2);		// BL
	else if( clickX >= halfSize && clickY >= halfSize ) initRotAnim(1);		// BR
});
