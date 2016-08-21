/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.value('pllCases', pllCases());


function pllCases() {
	return [
	        {code:"Ub",src:"img/pll/Ub.png",solve1:{alg1:"R2 U (R U R' U')(R' U')(R' U R')",len1:11},solve2:{alg2:"",len2:0},prob:1/18,descript:"EdgesOrCorners"},
					{code:"Ua",src:"img/pll/Ua.png",solve1:{alg1:"(R U')(R U)(R U)(R U') R' U' R2",len1:11},solve2:{alg2:"",len2:0},prob:1/18,descript:"EdgesOrCorners"},
        	{code:"Z",src:"img/pll/Z.png",solve1:{alg1:"(M2 U M2 U M' U2 M2 U2 M' U2",len1:10},solve2:{alg2:"U2 (R U R' U)(R' U' R' U)(R U' R' U') R2 U R",len2:16},prob:1/36,descript:"EdgesOrCorners"},
        	{code:"H",src:"img/pll/H.png",solve1:{alg1:"M2 U M2 U2 M U M2",len1:7},solve2:{alg2:"",len2:0},prob:1/72,descript:"EdgesOrCorners"},
        	{code:"Aa",src:"img/pll/Aa.png",solve1:{alg1:"x [(R' U R') D2][(R U' R') D2] R2",len1:10},solve2:{alg2:"",len2:0},prob:1/18,descript:"EdgesOrCorners"},
        	{code:"Ab",src:"img/pll/Ab.png",solve1:{alg1:"x' [(R U' R) D2][(R' U R) D2] R2",len1:10},solve2:{alg2:"",len2:0},prob:1/18,descript:"EdgesOrCorners"},
        	{code:"E",src:"img/pll/E.png",solve1:{alg1:"x'[(R U' R')D(R U R')] D'[(R U R')G(R U' R')]D'",len1:17},solve2:{alg2:"x'[(R U' R') D (R U R')] u2 [(R' U R) D (R' U' R)]",len2:16},prob:1/36,descript:"EdgesOrCorners"},
        	{code:"Solved",src:"img/pll/Solved.png",solve1:{alg1:"",len1:0},solve2:{alg2:"",len2:0},prob:1/72,descript:"EdgesOrCorners"},
        	{code:"Ra",src:"img/pll/Ra.png",solve1:{alg1:"(L U2' L' U2')(L F')(L' U' L U)(L F) L2' U",len1:14},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"Rb",src:"img/pll/Rb.png",solve1:{alg1:"(R' U2 R U2)(R' F)(R U R' U')(R' F') R2 U'",len1:14},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"Ja",src:"img/pll/Ja.png",solve1:{alg1:"(R' U L')(U2 R U' R' U2)(R L U')",len1:11},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"Jb",src:"img/pll/Jb.png",solve1:{alg1:"(R U R' F')[(R U R' U')(R' F)(R2 U' R') U']",len1:14},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"T",src:"img/pll/T.png",solve1:{alg1:"(R U R' U')(R' F)(R2 U' R') U' (R U R' F')",len1:14},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"F",src:"img/pll/F.png",solve1:{alg1:"(R' U2 R' d')(R' F')(R2 U' R' U)(R' F R U' F)",len1:15},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapAdjacentCorners"},
        	{code:"V",src:"img/pll/V.png",solve1:{alg1:"(R' U R' d')(R' F')(R2 U' R' U)(R' F R F)",len1:14},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapDiagonalCorners"},
        	{code:"Y",src:"img/pll/Y.png",solve1:{alg1:"F R U' R' U' (R U R' F')[(R U R' U')(R' F R F')]",len1:17},solve2:{alg2:"",len2:0},prob:1/18,descript:"SwapDiagonalCorners"},
        	{code:"Na",src:"img/pll/Na.png",solve1:{alg1:"[(L U' R) U2 (L' U R')][L U' R) U2 (L' U R')] U",len1:15},solve2:{alg2:"y (R U' R' U)(l U)(F U' R' F')(R U' R U)(l' U R')",len2:18},prob:1/72,descript:"SwapDiagonalCorners"},
        	{code:"Nb",src:"img/pll/Nb.png",solve1:{alg1:"[(R' U L') U2 (R U' L)][(R' U L') U2 (R U' L')] U'",len1:15},solve2:{alg2:"",len2:0},prob:1/72,descript:"SwapDiagonalCorners"},
        	{code:"Ga",src:"img/pll/Ga.png",solve1:{alg1:"R2 u R' U R' U' R u' R2 (y' R' U R)",len1:13},solve2:{alg2:"",len2:0},prob:1/18,descript:"DoubleSpins"},
        	{code:"Gc",src:"img/pll/Gc.png",solve1:{alg1:"R2 u' R U' R U R' u R2 (y R U' R')",len1:13},solve2:{alg2:"",len2:0},prob:1/18,descript:"DoubleSpins"},
        	{code:"Gd",src:"img/pll/Gd.png",solve1:{alg1:"(R U R') y' R2 u' R U' R' U R' u R2",len1:13},solve2:{alg2:"",len2:0},prob:1/18,descript:"DoubleSpins"},
        	{code:"Gb",src:"img/pll/Gb.png",solve1:{alg1:"(R' U' R) y R2 u R' U R U' R u' R2",len1:13},solve2:{alg2:"",len2:0},prob:1/18,descript:"DoubleSpins"}
        	];
}
