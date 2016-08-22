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
