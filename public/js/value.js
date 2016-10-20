/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.value('ollCases', [
		                {num: 27, src: "img/oll/27.png", code: "OCLL1", solve1: {alg: "(R U R' U) R U2 R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 26, src: "img/oll/26.png", code: "OCLL2", solve1: {alg: "R U2 R' U' R U' R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 22, src: "img/oll/22.png", code: "OCLL3", solve1: {alg: "[f (R U R' U') f'] [F (R U R' U') F']",  length: 12}, solve2: {alg: "R U2' R2' U' R2 U' R2' U2 R2", length: 9}, prob: 1/54},
		                {num: 21, src: "img/oll/21.png", code: "OCLL4", solve1: {alg: "F (R U R' U') (R U R' U') (R U R' U') F'",  length: 14}, solve2: {alg: "y (R' U' R) U' (R' U R) U' (R' U2 R)", length: 12}, prob: 1/108},
		                {num: 24, src: "img/oll/24.png", code: "OCLL5", solve1: {alg: "(r U R' U') (r' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 25, src: "img/oll/25.png", code: "OCLL6", solve1: {alg: "F' (r U R' U') (r' F R)",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 23, src: "img/oll/23.png", code: "OCLL7", solve1: {alg: "R2 [D (R' U2) R] [D' (R' U2) R']",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 58, src: "img/oll/58.png", code: "OCLL8", solve1: {alg: "",  length: 0}, solve2: {alg: "", length: 0}, prob: 1/216},
		                {num: 57, src: "img/oll/57.png", code: "E1", solve1: {alg: "(R U R' U') M' (U R U' r')",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 28, src: "img/oll/28.png", code: "E2", solve1: {alg: "M' U M U2 M' U M",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 44, src: "img/oll/44.png", code: "P1", solve1: {alg: "f (R U R' U') f'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 43, src: "img/oll/43.png", code: "P2", solve1: {alg: "f' (L' U' L U) f",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 32, src: "img/oll/32.png", code: "P3", solve1: {alg: "R U B' U' R' U R B R'",  length: 9}, solve2: {alg: "R D L' D' R' U R B R'", length: 9}, prob: 1/54},
		                {num: 31, src: "img/oll/31.png", code: "P4", solve1: {alg: "R' U' F U R U' R' F' R",  length: 9}, solve2: {alg: "y2 L' d' R d L U' L' B' L", length: 9}, prob: 1/54},
		                {num: 38, src: "img/oll/38.png", code: "W1", solve1: {alg: "(R U R' U) (R U' R' U') (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 36, src: "img/oll/36.png", code: "W2", solve1: {alg: "(L' U' L U') (L' U L U) (L F' L' F)",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 6, src: "img/oll/6.png", code: "S1", solve1: {alg: "r U2 R' U' R U' r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 5, src: "img/oll/5.png", code: "S2", solve1: {alg: "r' U2 (R U R' U) r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 48, src: "img/oll/48.png", code: "L1", solve1: {alg: "F (R U R' U') (R U R' U') F'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 47, src: "img/oll/47.png", code: "L2", solve1: {alg: "F' (L' U' L U) (L' U' L U) F",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 53, src: "img/oll/53.png", code: "L3", solve1: {alg: "l' U' L U' L' U L U' L' U2 l",  length: 11}, solve2: {alg: "y2 r' U' R U' R' U R U' R' U2 r", length: 12}, prob: 1/54},
		                {num: 54, src: "img/oll/54.png", code: "L4", solve1: {alg: "(r U R' U) R U' R' U R U2' r'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 49, src: "img/oll/49.png", code: "L5", solve1: {alg: "(R' F R' F') R2 U2 y (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 50, src: "img/oll/50.png", code: "L6", solve1: {alg: "R' F R2 B' R2' F' R2 B R'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 9, src: "img/oll/9.png", code: "F1", solve1: {alg: "(R' U' R) y' x' (R U') (R' F) (R U R')",  length: 12}, solve2: {alg: "(R U R' U')R' F R2 U R' U' F'", length: 11}, prob: 1/54},
		                {num: 10, src: "img/oll/10.png", code: "F2", solve1: {alg: "R U R' y R' F R U' R' F' R",  length: 11}, solve2: {alg: "(R U R' U)(R' F R F') R U2 R'", length: 11}, prob: 1/54},
		                {num: 35, src: "img/oll/35.png", code: "F3", solve1: {alg: "(R U2 R') (R' F R F') (R U2 R')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 37, src: "img/oll/37.png", code: "F4", solve1: {alg: "F R U' R' U' R U R' F'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 30, src: "img/oll/30.png", code: "A1", solve1: {alg: "R2 U R' B' R U' R2 U R B R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 29, src: "img/oll/29.png", code: "A2", solve1: {alg: "(R U R' U') R U' R' F' U' F R U R'",  length: 13}, solve2: {alg: "[F (R U R' U') F'] U2 [(R U R' U') (R' F R F')", length: 15}, prob: 1/54},
		                {num: 41, src: "img/oll/41.png", code: "A3", solve1: {alg: "[(R U R' U) R U2 R'] [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 42, src: "img/oll/42.png", code: "A4", solve1: {alg: "[R' U2 (R U R' U) R] y [F (R U R' U') F']",  length: 14}, solve2: {alg: "(R' F R F') (R' F R F') (R U R' U') (R U R')", length: 15}, prob: 1/54},
		                {num: 7, src: "img/oll/7.png", code: "LB1", solve1: {alg: "(r U R' U) R U2 r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 8, src: "img/oll/8.png", code: "LB2", solve1: {alg: "r' U' R U' R' U2 r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 11, src: "img/oll/11.png", code: "LB3", solve1: {alg: "[F' (L' U' L U) F] y [F (R U R' U') F']",  length: 13}, solve2: {alg: "y (r U R' U) (R' F R F') R U2 r'", length: 11}, prob: 1/54},
		                {num: 12, src: "img/oll/12.png", code: "LB4", solve1: {alg: "[F (R U R' U') F'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 39, src: "img/oll/39.png", code: "LB5", solve1: {alg: "R B' R' U' R U B U' R'",  length: 9}, solve2: {alg: "y2 L F' (L' U' L U) F U' L'", length: 10}, prob: 1/54},
		                {num: 40, src: "img/oll/40.png", code: "LB6", solve1: {alg: "R' [F (R U R' U') F'] U R",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 45, src: "img/oll/45.png", code: "T1", solve1: {alg: "F (R U R' U') F'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 33, src: "img/oll/33.png", code: "T2", solve1: {alg: "(R U R' U') (R' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 46, src: "img/oll/46.png", code: "C1", solve1: {alg: "R' U' (R' F R F') U R",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 34, src: "img/oll/34.png", code: "C2", solve1: {alg: "(R U R2' U') (R' F) (R U) (R U') F'",  length: 11}, solve2: {alg: "(R U R' U') x D' R' U R U' D x'", length: 12}, prob: 1/54},
		                {num: 55, src: "img/oll/55.png", code: "I1", solve1: {alg: "R' U2 R2 U R' U R U2 x' U' R' U",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 52, src: "img/oll/52.png", code: "I2", solve1: {alg: "(R U R' U) R d' R U' R' F'",  length: 10}, solve2: {alg: "R' U' R U' R' d R' U R B", length: 10}, prob: 1/54},
		                {num: 56, src: "img/oll/56.png", code: "I3", solve1: {alg: "F (R U R' U') R F' (r U R' U') r'",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 51, src: "img/oll/51.png", code: "I4", solve1: {alg: "f (R U R' U') (R U R' U') f'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 16, src: "img/oll/16.png", code: "K1", solve1: {alg: "(r U r') (R U R' U') (r U' r')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 15, src: "img/oll/15.png", code: "K2", solve1: {alg: "(l' U' l) (L' U' L U) (l' U l)",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 13, src: "img/oll/13.png", code: "K3", solve1: {alg: "F U R U' R2 F' R (U R U' R')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 14, src: "img/oll/14.png", code: "K4", solve1: {alg: "R' F R U R' F' R y' R U' R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 1, src: "img/oll/1.png", code: "O1", solve1: {alg: "R U2 R' (R' F R F') U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 2, src: "img/oll/2.png", code: "O2", solve1: {alg: "[F (R U R' U') F'] [f (R U R' U') f']",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 3, src: "img/oll/3.png", code: "O3", solve1: {alg: "[f (R U R' U') f'] U' [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 4, src: "img/oll/4.png", code: "O4", solve1: {alg: "[f (R U R' U') f'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 18, src: "img/oll/18.png", code: "O5", solve1: {alg: "[F (R U R' U) F'] y' U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 19, src: "img/oll/19.png", code: "O6", solve1: {alg: "M U (R U R' U') M' (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 17, src: "img/oll/17.png", code: "O7", solve1: {alg: "(R U R' U) (R' F R F') U2 (R' F R F')",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 20, src: "img/oll/20.png", code: "O8", solve1: {alg: "M U (R U R' U') M2 (U R U' r')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/216}]);

/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.value('pllCases', pllCases());


function pllCases() {
	return [
	        {num:1,code:"Ub",src:"img/pll/Ub.png",solve1:{alg:"R2 U (R U R' U')(R' U')(R' U R')",length:11},solve2:{alg:"",length:0},prob:1/18,descript:"EdgesOrCorners"},
					{num:2,code:"Ua",src:"img/pll/Ua.png",solve1:{alg:"(R U')(R U)(R U)(R U') R' U' R2",length:11},solve2:{alg:"",length:0},prob:1/18,descript:"EdgesOrCorners"},
        	{num:3,code:"Z",src:"img/pll/Z.png",solve1:{alg:"(M2 U M2 U M' U2 M2 U2 M' U2",length:10},solve2:{alg:"U2 (R U R' U)(R' U' R' U)(R U' R' U') R2 U R",length:16},prob:1/36,descript:"EdgesOrCorners"},
        	{num:4,code:"H",src:"img/pll/H.png",solve1:{alg:"M2 U M2 U2 M U M2",length:7},solve2:{alg:"",length:0},prob:1/72,descript:"EdgesOrCorners"},
        	{num:5,code:"Aa",src:"img/pll/Aa.png",solve1:{alg:"x [(R' U R') D2][(R U' R') D2] R2",length:10},solve2:{alg:"",length:0},prob:1/18,descript:"EdgesOrCorners"},
        	{num:6,code:"Ab",src:"img/pll/Ab.png",solve1:{alg:"x' [(R U' R) D2][(R' U R) D2] R2",length:10},solve2:{alg:"",length:0},prob:1/18,descript:"EdgesOrCorners"},
        	{num:7,code:"E",src:"img/pll/E.png",solve1:{alg:"x'[(R U' R')D(R U R')] D' [(R U R')D(R U' R')]D'",length:17},solve2:{alg:"x'[(R U' R') D (R U R')] u2 [(R' U R) D (R' U' R)]",length:16},prob:1/36,descript:"EdgesOrCorners"},
        	{num:8,code:"Solved",src:"img/pll/Solved.png",solve1:{alg:"",length:0},solve2:{alg:"",length:0},prob:1/72,descript:"EdgesOrCorners"},
        	{num:9,code:"Ra",src:"img/pll/Ra.png",solve1:{alg:"(L U2' L' U2')(L F')(L' U' L U)(L F) L2' U",length:14},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:10,code:"Rb",src:"img/pll/Rb.png",solve1:{alg:"(R' U2 R U2)(R' F)(R U R' U')(R' F') R2 U'",length:14},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:11,code:"Ja",src:"img/pll/Ja.png",solve1:{alg:"(R' U L')(U2 R U' R' U2)(R L U')",length:11},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:12,code:"Jb",src:"img/pll/Jb.png",solve1:{alg:"(R U R' F')[(R U R' U')(R' F)(R2 U' R') U']",length:14},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:13,code:"T",src:"img/pll/T.png",solve1:{alg:"(R U R' U')(R' F)(R2 U' R') U' (R U R' F')",length:14},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:14,code:"F",src:"img/pll/F.png",solve1:{alg:"(R' U2 R' d')(R' F')(R2 U' R' U)(R' F R U' F)",length:15},solve2:{alg:"",length:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{num:15,code:"V",src:"img/pll/V.png",solve1:{alg:"(R' U R' d')(R' F')(R2 U' R' U)(R' F R F)",length:14},solve2:{alg:"",length:0},prob:1/18,descript:"SwapDiagonalCorners"},
        	{num:16,code:"Y",src:"img/pll/Y.png",solve1:{alg:"F R U' R' U' (R U R' F')[(R U R' U')(R' F R F')]",length:17},solve2:{alg:"",length:0},prob:1/18,descript:"SwapDiagonalCorners"},
        	{num:17,code:"Na",src:"img/pll/Na.png",solve1:{alg:"[(L U' R) U2 (L' U R')][L U' R) U2 (L' U R')] U",length:15},solve2:{alg:"y (R U' R' U)(l U)(F U' R' F')(R U' R U)(l' U R')",length:18},prob:1/72,descript:"SwapDiagonalCorners"},
        	{num:18,code:"Nb",src:"img/pll/Nb.png",solve1:{alg:"[(R' U L') U2 (R U' L)][(R' U L') U2 (R U' L')] U'",length:15},solve2:{alg:"",length:0},prob:1/72,descript:"SwapDiagonalCorners"},
        	{num:19,code:"Ga",src:"img/pll/Ga.png",solve1:{alg:"R2 u R' U R' U' R u' R2 (y' R' U R)",length:13},solve2:{alg:"",length:0},prob:1/18,descript:"DoubleSpins"},
        	{num:20,code:"Gc",src:"img/pll/Gc.png",solve1:{alg:"R2 u' R U' R U R' u R2 (y R U' R')",length:13},solve2:{alg:"",length:0},prob:1/18,descript:"DoubleSpins"},
        	{num:21,code:"Gd",src:"img/pll/Gd.png",solve1:{alg:"(R U R') y' R2 u' R U' R' U R' u R2",length:13},solve2:{alg:"",length:0},prob:1/18,descript:"DoubleSpins"},
        	{num:22,code:"Gb",src:"img/pll/Gb.png",solve1:{alg:"(R' U' R) y R2 u R' U R U' R u' R2",length:13},solve2:{alg:"",length:0},prob:1/18,descript:"DoubleSpins"}
        	];
}

/**
 * http://usejsdoc.org/
 */


// Provides default data for various flashcard purposes
// So it really needs to be renamed to something more
// descriptive than cookieData
angular
	.module('myApp')
	.value('cookieData', {
			practicing: {"OCLL8": false},
			practiceCards: [],
			cardPriorities: {"OCLL8": -1},
			cardOptions: {"L3": -1, "OCLL8": -1},
			cards: {maxNumber: 5, options: range(0, 5)},
			practiceButton: "Select cases to practice"
	});


// Found on StackOverFlow:
// http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
function range(start, count) {
  return Array.apply(0, Array(count))
    .map(function (element, index) { 
      return index + start;  
  });
}
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.value('cookieDataTypes', {
			practicing: "object",
			practiceCards: "object",
			cardPriorities: "object",
			cardOptions: "object",
			practiceButton: "string"
});
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.value('cookieStrings', {
		oll: {
			hiddenRows: "OLLHiddenRowsCookie",
			hiddenCols: "OLLHiddenCookie",
			cards: "OLLMaxNumCards",
			practicing: "OLLPracticing",
			practiceCards: "OLLPracticeCards",
			cardOptions: "OLLCardOptions",
			cardPriorities: "OLLCardPriorities",
			dataCards: "OLLDataCards"
		},
		pll: {
			hiddenRows: "PLLHiddenRowsCookie",
			hiddenCols: "PLLHiddenCookie",
			cards: "PLLMaxNumCardrs",
			practicing: "PLLPracticing",
			practiceCards: "PLLPracticeCards",
			cardOptions: "PLLCardOptions",
			cardPriorities: "PLLCardPriorities",
			dataCards: "PLLDataCards"
		}
	});

/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.value('hiddenRowsY', {});