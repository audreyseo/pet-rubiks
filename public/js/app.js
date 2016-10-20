/**
 * http://usejsdoc.org/
 */
var app = angular.module('myApp', ['ngCookies', 'ngSanitize']); //, 'ngMock']);


	

app
	.directive(
			'ollRow',
			function() {
				return {
					transclude: true,
					scope: {mycases: "@mycases", mycolumn: "@mycolumn", myreverse: "@myreverse"},
					restrict: 'E',
					templateUrl: 'oll_row.html'
				};
			});





app.controller("InfoController", function($scope) {
		
});


/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.config(function($cookiesProvider) {
		var date = new Date();
		date.setDate(date.getDate() + 60);
		$cookiesProvider.defaults.expires = date.toUTCString();
	})
	.run(function($templateCache) {
		$templateCache.put("templates/dividingBox.html",
			'<div class="divider" id={{dividerId}}>'+'<div class="title divider" data-toggle="tooltip" title="Click to hide/show the following content." style="cursor:pointer">{{dividerTitle}}</div>' +'<div class="replaceable" ng-transclude></div>'+"</div>");
	});
/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('cardoptions', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		templateUrl: "/templates/cardOptions.html"
	};
});
/**
 * http://usejsdoc.org/
 */

angular.module("myApp")
	.factory('CaseManager', CaseManager);

CaseManager.$inject = ['ollCases', 'pllCases'];

function CaseManager(ollCases, pllCases) {
	var factory = {oll: ollCases, pll: pllCases};

	factory.fetchCase = fetchCase;
	factory.fetchImage = fetchImage;
	factory.getCases = getCases;
	factory.isOLL = isOLL;
	factory.isOLLCase = isOLLCase;
	factory.isPLL = isPLL;
	factory.isSelected = isSelected;
	factory.mapCaseToNumber = mapCaseToNumber;
	factory.setStage = setStage;
	factory.stage = "";
	factory.type = type;

	factory.mapCaseToNumber();

	function fetchCase(code) {
		if (angular.isNumber(code)) {
			if (factory.isPLL()) {
				return(factory.pll[code]);
			} else if (factory.isOLL()){
				return(factory.oll[code]);
			}
		} else {
			if (factory.isOLLCase(code)) {
				if (factory.isOLL()) {
					return factory.oll[factory.ollMap[code]];
				}
			} else if (fatory.isPLLCase(code)) {
				if (factory.isPLL()) {
					return factory.pll[factory.pllMap[code]];
				}
			}
		}
	}

	function fetchImage(code) {
		return factory.fetchCase(code).src;
	}

	function getCases() {
		if (factory.setStage !== "") {
			if (factory.isOLL()) {
				return factory.oll;
			} else if (factory.isPLL()) {
				return factory.pll;
			}
		}
	}

	function isOLL() {
		return factory.stage === "OLL";
	}

	function isOLLCase(string) {
		return string.search(/\d/) > -1;
	}

	function isPLL() {
		return factory.stage === "PLL";
	}

	function isPLLCase(string) {
		if (string.match(/[A-Z][a-z]/)) {
			return true;
		} else if (string.match(/[A-Z]/)) {
			return true;
		}
		return false;
	}

	function isSelected(index) {
		return factory.fetchCase(index).selected;
	}

	function mapCaseToNumber() {
		factory.ollMap = {};
		for (var i = 0; i < factory.oll.length; i++) {
			factory.ollMap[factory.oll[i].code] = factory.oll[i].num;
		}

		factory.pllMap = {};
		for (i = 0; i < factory.pll.length; i++) {
			factory.pllMap[factory.pll[i].code] = i;
		}
	}

	function setStage(string) {
		factory.stage = string;
	}

	function type() {
		if (factory.stage === "PLL") {
			return("PLL");
		} else {
			return("OLL");
		}
	}

	return factory;
}

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
angular
	.module('myApp')
	.filter('colorCodeAlgorithms', colorCodeAlgorithms);

function colorCodeAlgorithms() {
	return function(input) {
		var groupsToHide = ["\\(R U R' U'\\)", "\\(r U R' U'\\)", "\\(R U R' U\\)", "\\(r U R' U\\)", "\\(R' F R F'\\)", "\\(R' F R' F'\\)", "\\(r' F R F'\\)", "\\(L' U' L U\\)", "\\(L' U' L U'\\)","\\(L F' L' F\\)"];
		var replacementText = ["<span class='rurpup'>(R U R' U')</span>",
		                       "<span class='rurpup'>(<span class='abnormal'>r</span> U R' U')</span>",
		                       "<span class='rurpu'>(R U R' U)</span>",
		                       "<span class='rurpu'>(<span class='abnormal'>r</span> U R' U)</span>",
		                       "<span class='rpfrfp'>(R' F R F')</span>",
		                       "<span class='rpfrfp'>(R' F <span class='abnormal'>R'</span> F')</span>",
		                       "<span class='rpfrfp'>(<span class='abnormal'>r'</span> F R F')</span>",
		                       "<span class='rurpup'>(L' U' L U)</span>",
		                       "<span class='rurpu'>(L' U' L U')</span>",
		                       "<span class='rpfrfp'>(L F' L' F)</span>"];
		var output = input;
//		console.log("1: " + input + " | " + output);
		if (output !== "") {
			for (var i = 0; i < groupsToHide.length; i++) {
				// Need a regex that replaces all instances instead of just one instance
				var regex = new RegExp(groupsToHide[i], "g");
				// Uses replace to insert the new text from replacementText[i]
				// where the regex found a match
				output = output.replace(regex, replacementText[i]);
			}
//			console.log("2: " + input + " | " + output);
		} else {
			output = ""
		}
		return(output);
	};
}
angular.module('myApp')
  .filter('colorCodeProbability', colorCodeProbability);

function colorCodeProbability() {
  return function(input) {
    var possibles = [1.0/18.0, 1.0/36.0, 1.0/72.0];
    var wrappers = ["<span class=\"blue-prob\">$1</span>",
                    "<span class=\"green-prob\">$1</span>",
                    "<span class=\"red-prob\">$1</span>"];
    var round = function(number, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = number * factor;
      var roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
    };

    input = round(input, 5);

    var output = "" + input;
    //		console.log("1: " + input + " | " + output);
    if (output !== "") {
      for (var i = 0; i < wrappers.length; i++) {
        if (possibles[i] - input < 0.0001) {
          // Need a regex that replaces all instances instead of just one instance
          var regex = new RegExp(/(\d+\.\d+)/);
          // Uses replace to insert the new text from replacementText[i]
          // where the regex found a match
          output = output.replace(regex, wrappers[i]);
          return output;
        }
      }
      //			console.log("2: " + input + " | " + output);
    } else {
      output = ""
    }
    return(output);
  };
}

/**
 * http://usejsdoc.org/
 */

// Useful to turn off all of you console.logs audrey:
/* Find: ^[^/]([\s]+)(console\.log)
 * Replace with: //\1\2
 */


angular
	.module('myApp')
	.factory('ContentControl', ContentControl);

ContentControl.$inject = ['CaseManager', 'hiddenRowsY', 'cookieStrings', 'flashCardData', '$cookies', 'filterFilter'];

function ContentControl(manager, hiddenRows, cookieString, flashData, $cookies, filterFilter) {
	var factory = {};
	factory.addPriorityOptions = addPriorityOptions;
	factory.manager = manager;
	factory.cookieString = cookieString;
	factory.countCases = countCases;
	factory.cardData = flashData.data;
	factory.editCardSelection = editCardSelection;
	factory.editTable = editTable;
	factory.flashData = flashData;
	factory.flashCardsData = flashCardsData;
	factory.hiddenColsData = hiddenColsData;
	factory.hiddenRows = hiddenRows;
	factory.hiddenRowsData = hiddenRowsData;
	factory.hideHiddenCols = hideHiddenCols;
	factory.hideHiddenRows = hideHiddenRows;
	factory.initialize = initialize;
	factory.modifyKnownCases = modifyKnownCases;
	factory.number = {knownCases: 0, cases: 58, percent: 0, prob: 0};
	factory.pickAnAlgorithm = pickAnAlgorithm;
	factory.setCaseType = setCaseType;
	factory.setFilter = setFilter;
	factory.setSort = setSort;
	factory.showHiddenCols = showHiddenCols;
	factory.showHiddenRows = showHiddenRows;
	factory.useCookieInfo = useCookieInfo;
	factory.practiceCasesButtonValue = "Select cases to practices";
	factory.type = "";
	factory.watchCards = watchCards;
	factory.watchPracticing = watchPracticing;
	factory.watchPracticeCards = watchPracticeCards;
	factory.watchHidden = watchHidden;
	factory.watchHiddenRows = watchHiddenRows;
	factory.watchCardOptions = watchCardOptions;
	factory.watchCardPriorities = watchCardPriorities;

	function addOptions(max) {
		// most likely obsolete
		var priorities = $("select .priorities");
		priorities.remove();
		priorities.each(function() {
			for (var i = 1; i <= max; i++) {
				this.append("<option>" + i + "</option>");
			}
		});
	}

	function addPriorityOptions() {
		// Content, flashcards, info
		factory.cards.options = [];
		for (var i = 1; i <= factory.cards.maxNumber; i++) {
			factory.cards.options.push(i);
		}
	}

	function countCases() {
  		// Content, info
  //	console.log("Tried to count cases");
  	var count = 0;
  	var prob = 0;
  	for (var idx in factory.hiddenRows) {
  		if (factory.hiddenRows[idx] == 1) {
  			count++;
  			prob += factory.prob[idx];
  //			console.log("Count incremented");
  		}
  	}

  	factory.number.knownCases = count;
  	factory.number.percent = 100 * (factory.number.knownCases / factory.number.cases);
  	factory.number.prob = prob * 100;
  }

	function declassify(event) {
		var str = $(event.target).attr("id");
//		str = str.substring(1, str.length);
		return str;
	}

	function flashCardsData(){
//		console.log("Practicing: " + angular.toJson(factory.practicing));

		flashData.initialize();

//		console.log("Practicing: " + angular.toJson(flashData.data.practicing));
//		console.log("New Practicing: " + angular.toJson(factory.practicing));

		factory.practicing = flashData.data.practicing;
		factory.practiceCards = flashData.data.practiceCards;
		factory.cardOptions = flashData.data.cardOptions;
		factory.cardPriorities = flashData.data.cardPriorities;
		factory.cards = flashData.data.cards;

//		console.log("Practicing: " + angular.toJson(factory.practicing));

		factory.addPriorityOptions();
//		addOptions(factory.cards.maxNumber);
	}

	function editCardSelection() {
//		if (factory.practiceButton !== "Selecting..." || factory.practiceCards.length === factory.cards.maxNumber) {
			factory.showing.flashCardCol = !factory.showing.flashCardCol;
			factory.showing.priorityCol = !factory.showing.priorityCol;
			factory.showing.algorithmCol = !factory.showing.algorithmCol;
//			console.log(typeof factory.practiceCards);
			factory.practiceButton = (factory.showing.flashCardCol && factory.practiceCards.length !== factory.cards.maxNumber) ? "Done Selecting" : ((factory.showing.flashCardCol) ? "Selecting..." : "Select cases to practice");
//			if (factory.showing.priorityCol) {
////				addOptions(factory.cards.maxNumber);
//			}
//			factory.addPriorityOptions();
//		}
	}

	function editTable() {
		factory.editString = (factory.editString === "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
		var editingRow = $("#editRow");
		if (factory.showing.editRow) {
			// Hide away edit rows
			factory.showing.editRow = false;
			factory.showing.editCol = false;
			// Hide away chosen cases and columns
			factory.hideHiddenRows();
			factory.hideHiddenCols();
		} else {
			// Hide chosen cases and columns
			factory.showing.editRow = true;
			factory.showing.editCol = true;
			// Show selected cases and columns
			factory.showHiddenRows();
			factory.showHiddenCols();
		}
	}

	function hiddenColsData() {
		// Content mostly
  	try {
  		var hidingCookie = $cookies.getObject(factory.cookieString[factory.type].hiddenCols);
  		if (hidingCookie) {
  			factory.hidden = hidingCookie;
  		} else {
  			factory.hidden = {};
  		}

  		for (var ind = 0; ind < factory.classes.length; ind++) {
  			if (equals(factory.hidden[factory.classes[ind]], 1)) {
  				$(factory.colClasses[ind]).hide();
  			}
  		}

  		$cookies.putObject(factory.cookieString[factory.type].hiddenCols, factory.hidden);
  	} catch(e) {
  		$cookies.putObject(factory.cookieString[factory.type].hiddenCols, factory.hidden);
  	}
	}

	function hiddenRowsData() {
	// Content, info
		// Attempt to reload the data from the OLLCookie
		try {
			var cookie = $cookies.getObject(factory.cookieString[factory.type].hiddenRows);
			if (cookie) {
				factory.hiddenRows = cookie;
//					console.log(JSON.stringify(factory.hiddenRows));
			} else {
				// Else, instantiate hiddenRows
				factory.hiddenRows = {};
			}

			$cookies.putObject(factory.cookieString[factory.type].hiddenRows, factory.hiddenRows);
		} catch(e) {
			// Need to put in the object
			$cookies.putObject(factory.cookieString[factory.type].hiddenRows, factory.hiddenRows);
		}
	}

	function hideHiddenCols() {
		for (var ind = 0; ind < factory.classes.length; ind++) {
			if (factory.hidden[factory.classes[ind]] == 1) {
				$(factory.colClasses[ind]).hide();
			}
		}
	}

	function hideHiddenRows() {
	// Useful...
		for (id in factory.hiddenRows) {
			if (factory.hiddenRows[id] == 1) {
//				console.log(id);
				$("." + id).hide();
			}
		}
	}

	function initialize(type) {
		flashData.setType(type);

		factory.cardOptions = flashData.getCardOptions();
		factory.cardPriorities = flashData.getCardPriorities();
		factory.cards = flashData.getCards();
		factory.practiceCards = flashData.getPracticeCards() || [];
		factory.practicing = flashData.getPracticing();
		manager.setStage(type);
		factory.type = type.toLowerCase();
		factory.cols = ["num", "code", "solve1.alg", "solve1.length", "solve2.alg", "solve2.length", "prob"];
		factory.hidden = {num: 0, code: 0, solve1:0, length1:0, solve2:0, length2:0, prob:0};
		factory.colClasses = [".num", ".code", ".solve1", ".length1", ".solve2", ".length2", ".prob"];
		factory.classes = ["num", "code", "solve1", "length1", "solve2", "length2", "prob"];

		// More Table row/column info
		// Content, settings
		factory.cases = factory.manager.getCases();
		console.log("Content Control Cases: %s", angular.toJson(factory.cases));
		factory.filteredCases = factory.manager.getCases();
		factory.reverse = true;
		factory.column = 'num'
		factory.comparisons = {custom: false};
		factory.countCases();

	// Content, info
		factory.prob = {};

		for (var i = 0; i < factory.cases.length; i++) {
			factory.prob[factory.cases[i].code] = factory.cases[i].prob;
		}

		// Content, flashcards
		factory.showing = {
				editRow:true,
				editCol:true,
				flashCardCol: false,
				priorityCol: false,
				algorithmCol: false
		};

		// Editing helper - content, info/controls
		factory.editString = "Save Table Configuration";

		// Stores the strings for the cookies
		// Content, flashcards

		factory.useCookieInfo();
		// Content, info
		factory.knownCases = {editMessage: (factory.showing.editCol === true) ? "Save Known Cases" : "Select Known Cases to Hide"};

	// Temporary stuff that I'm just trying out
	}

	function modifyKnownCases() {
		factory.showing.editCol = !factory.showing.editCol;
	}

	function pickAnAlgorithm(myCase) {
		if (angular.isDefined(myCase.code)) {
		// console.log("cardPriorities?: " + angular.toJson(factory.cardPriorities));
			if (angular.isDefined(factory.cardPriorities)) {
				if (angular.isDefined(factory.cardPriorities[myCase.code]) && factory.showing.algorithmCol && factory.practicing[myCase.code]) {
					if (angular.isNumber(parseInt(factory.cardPriorities[myCase.code]))) {
//					console.log("Is a number: " + angular.isNumber(parseInt(factory.cardPriorities[myCase.code])));
//					console.log("This case: " + angular.toJson(myCase));
						return(myCase.solve2.length > 0);
					}
					return false;
				} else {
					return false;
				}

	  	} else {
	  		return(false);
	  	}
		}
	}

	function showHiddenCols() {
		for (var ind = 0; ind < factory.cols.length; ind++) {
			if (factory.hidden[factory.classes[ind]] == 1) {
				$(factory.colClasses[ind]).show();
			}
		}
	}

	function showHiddenRows() {
		for (id in factory.hiddenRows) {
			if (factory.hiddenRows[id] == 1) {
				$("." + id).show();
			}
		}
	}

	function setCaseType(string) {
		if (string.match(/p/i)) {
			factory.manager.setStage("PLL");
		} else if (sstring.match(/o/i)) {
			factory.manager.setStage("OLL");
		}
	}

	function setFilter(){
		// Content only
		factory.filteredCases = filterFilter(factory.cases, factory.filterString);
	}


	function setSort(column) {
	// Content only
		factory.column = column;
		factory.reverse = !factory.reverse;
	}

	function useCookieInfo() {
		// Content, Info
		factory.hiddenRowsData();
		factory.hiddenColsData();
		factory.flashCardsData();
	};

	function returnAddress(value) {
		var string = "img/" + value + ".png";
//	console.log(string);
		return string;
	}

	function watchPracticeCards(newValue, oldValue) {
		factory.flashData.savePracticeCards(newValue);
	}

	function watchCardPriorities(newValue, oldValue) {
		for (var i = 0; i < factory.practiceCards.length; i++) {
      for (var ind in newValue) {
        if (ind == factory.practiceCards[i].code) {
          factory.practiceCards[i].priority = parseInt(newValue[ind]);
        }
      }
    }
    factory.flashData.saveCardPriorities(newValue);
	}

	function watchCardOptions(newValue, oldValue) {
		for (var i = 0; i < factory.practiceCards.length; i++) {
      for (var ind in newValue) {
        if (ind == factory.practiceCards[i].code) {
          factory.practiceCards[i].option = newValue[ind];
        }
      }
    }
    factory.flashData.saveCardOptions(newValue);
	}

	function watchPracticing(newValue, oldValue) {
		for (var i = 0; i < factory.cases.length; i++) {
//			console.log(factory.cases[i].code);
      if (angular.isDefined(factory.practicing[factory.cases[i].code])) {
        if (factory.practicing[factory.cases[i].code]) {
          if (factory.practiceCards.length == 0) {
            factory.practiceCards.push({});
            angular.copy(factory.cases[i], factory.practiceCards[factory.practiceCards.length - 1]);
            factory.practiceCards[factory.practiceCards.length - 1].priority = 0;
          } else {
            for (var j = 0; j < factory.practiceCards.length; j++) {
              if (factory.practiceCards[j].code == factory.cases[i].code) {
                break;
              } else if (j + 1 == factory.practiceCards.length) {
                factory.practiceCards.push({});
                angular.copy(factory.cases[i], factory.practiceCards[factory.practiceCards.length - 1]);
                factory.practiceCards[factory.practiceCards.length - 1].priority = 0;
              }
            }
          }
        } else {
          for (var j = 0; j < factory.practiceCards.length; j++) {
            if (factory.practiceCards[j].code == factory.cases[i].code) {
              factory.practiceCards.splice(j, 1);
              break;
            }
          }
        }
      }
    }
    factory.flashData.savePracticing(newValue);
	}

	function watchCards(newValue, oldValue) {
		$cookies.putObject(factory.cookieString[factory.type].cards, newValue);

    if (newValue.maxNumber !== oldValue.maxNumber) {
      factory.addPriorityOptions();
    }
	}

	function watchHiddenRows(newValue, oldValue) {
		console.log("Saving hidden rows here: %s", factory.cookiesString[factory.type].hiddenRows);
		$cookies.putObject(factory.cookieString[factory.type].hiddenRows, newValue);
		factory.countCases();
	}

	function watchHidden(newValue, oldValue) {
		console.log("Watched hidden.");
		$cookies.putObject(factory.cookieString[factory.type].hiddenCols, newValue);
	}

	return factory;
};

/**
 * http://usejsdoc.org/
 */

// Useful to turn off all of you console.logs audrey:
/* Find: ^[^/]([\s]+)(console\.log)
 * Replace with: //\1\2
 */


angular
	.module('myApp')
	.controller('ContentController', ContentController);

ContentController.$inject = ['$scope', 'ollCases', 'hiddenRowsY', 'cookieStrings', 'flashCardData', '$cookies', 'filterFilter'];

function ContentController($scope, cases, hiddenRows, cookieString, flashData, $cookies, filterFilter) {

	$scope.addPriorityOptions = addPriorityOptions;
	$scope.animationOpts = {duration: 1000};
	$scope.cardOptions = flashData.getCardOptions();
	$scope.cardPriorities = flashData.getCardPriorities();
	$scope.cards = flashData.getCards();
	$scope.cases = cases;
	$scope.cookieString = cookieString;
	$scope.countCases = countCases;
	$scope.cardData = flashData.data;
	$scope.editCardSelection = editCardSelection;
	$scope.editTable = editTable;
	$scope.filterString = '';
	$scope.flashCardsData = flashCardsData;
	$scope.hiddenColsData = hiddenColsData;
	$scope.hiddenRows = hiddenRows;
	$scope.hiddenRowsData = hiddenRowsData;
	$scope.hideHiddenCols = hideHiddenCols;
	$scope.hideHiddenRows = hideHiddenRows;
	$scope.initialize = initialize;
	$scope.modifyKnownCases = modifyKnownCases;
	$scope.number = {knownCases: 0, cases: 58, percent: 0, prob: 0};
	$scope.pickAnAlgorithm = pickAnAlgorithm;
	$scope.practiceCards = flashData.getPracticeCards() || [];
	$scope.practicing = flashData.getPracticing();
	$scope.returnSolve = returnSolve;
	$scope.setFilter = setFilter;
	$scope.setSort = setSort;
	$scope.showHiddenCols = showHiddenCols;
	$scope.showHiddenRows = showHiddenRows;
	$scope.useCookieInfo = useCookieInfo;
	$scope.practiceCasesButtonValue = "Select cases to practices";

	$scope.initialize();
	checkFlashCardData();


	function checkFlashCardData() {
		for (var data in $scope.cardData) {
			console.log(data + " is Defined?: " + angular.isDefined($scope.cardData[data]) + "  " + angular.toJson($scope.cardData[data]));
		}
	}

	function addOptions(max) {
		// most likely obsolete
		var priorities = $("select .priorities");
		priorities.remove();
		priorities.each(function() {
			for (var i = 1; i <= max; i++) {
				this.append("<option>" + i + "</option>");
			}
		});
	}

	function addPriorityOptions() {
		// Content, flashcards, info
		$scope.cards.options = [];
		for (var i = 1; i <= $scope.cards.maxNumber; i++) {
			$scope.cards.options.push(i);
		}
	}

	function countCases() {
  		// Content, info
  //	console.log("Tried to count cases");
  	var count = 0;
  	var prob = 0;
  	for (var idx in $scope.hiddenRows) {
  		if ($scope.hiddenRows[idx] == 1) {
  			count++;
  			prob += $scope.prob[idx];
  //			console.log("Count incremented");
  		}
  	}

  	$scope.number.knownCases = count;
  	$scope.number.percent = 100 * ($scope.number.knownCases / $scope.number.cases);
  	$scope.number.prob = prob * 100;
  }

	function declassify(event) {
		var str = $(event.target).attr("id");
//		str = str.substring(1, str.length);
		return str;
	}

	function flashCardsData(){
//		console.log("Practicing: " + angular.toJson($scope.practicing));

		flashData.initialize();

//		console.log("Practicing: " + angular.toJson(flashData.data.practicing));
//		console.log("New Practicing: " + angular.toJson($scope.practicing));

		$scope.practicing = flashData.data.practicing;
		$scope.practiceCards = flashData.data.practiceCards;
		$scope.cardOptions = flashData.data.cardOptions;
		$scope.cardPriorities = flashData.data.cardPriorities;
		$scope.cards = flashData.data.cards;

//		console.log("Practicing: " + angular.toJson($scope.practicing));

		$scope.addPriorityOptions();
//		addOptions($scope.cards.maxNumber);
	}

	function editCardSelection() {
//		if ($scope.practiceButton !== "Selecting..." || $scope.practiceCards.length === $scope.cards.maxNumber) {
			$scope.showing.flashCardCol = !$scope.showing.flashCardCol;
			$scope.showing.priorityCol = !$scope.showing.priorityCol;
			$scope.showing.algorithmCol = !$scope.showing.algorithmCol;
//			console.log(typeof $scope.practiceCards);
			$scope.practiceButton = ($scope.showing.flashCardCol && $scope.practiceCards.length !== $scope.cards.maxNumber) ? "Done Selecting" : (($scope.showing.flashCardCol) ? "Selecting..." : "Select cases to practice");
//			if ($scope.showing.priorityCol) {
////				addOptions($scope.cards.maxNumber);
//			}
//			$scope.addPriorityOptions();
//		}
	}

	function editTable() {
		$scope.editString = ($scope.editString == "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
		var editingRow = $("#editRow");
		if ($scope.showing.editRow) {
			// Hide away edit rows
			$scope.showing.editRow = false;
			$scope.showing.editCol = false;
			// Hide away chosen cases and columns
			$scope.hideHiddenRows();
			$scope.hideHiddenCols();
		} else {
			// Hide chosen cases and columns
			$scope.showing.editRow = true;
			$scope.showing.editCol = true;
			// Show selected cases and columns
			$scope.showHiddenRows();
			$scope.showHiddenCols();
		}
	}

	function hiddenColsData() {
		// Content mostly
  	try {
  		var hidingCookie = $cookies.getObject($scope.cookieString.hiddenCols);
  		if (hidingCookie) {
  			$scope.hidden = hidingCookie;
  		} else {
  			$scope.hidden = {};
  		}

  		for (var ind = 0; ind < $scope.classes.length; ind++) {
  			if (equals($scope.hidden[$scope.classes[ind]], 1)) {
  				$($scope.colClasses[ind]).hide();
  			}
  		}

  		$cookies.putObject($scope.cookieString.hiddenCols, $scope.hidden);
  	} catch(e) {
  		$cookies.putObject($scope.cookieString.hiddenCols, $scope.hidden);
  	}
	}

	function hiddenRowsData() {
	// Content, info
		// Attempt to reload the data from the OLLCookie
		try {
			var cookie = $cookies.getObject($scope.cookieString.hiddenRows);
			if (cookie) {
				$scope.hiddenRows = cookie;
//					console.log(JSON.stringify($scope.hiddenRows));
			} else {
				// Else, instantiate hiddenRows
				$scope.hiddenRows = {};
			}

			$cookies.putObject($scope.cookieString.hiddenRows, $scope.hiddenRows);
		} catch(e) {
			// Need to put in the object
			$cookies.putObject($scope.cookieString.hiddenRows, $scope.hiddenRows);
		}
	}

	function hideHiddenCols() {
		for (var ind = 0; ind < $scope.classes.length; ind++) {
			if ($scope.hidden[$scope.classes[ind]] == 1) {
				$($scope.colClasses[ind]).hide();
			}
		}
	}

	function hideHiddenRows() {
	// Useful...
		for (id in $scope.hiddenRows) {
			if ($scope.hiddenRows[id] == 1) {
//				console.log(id);
				$("." + id).hide();
			}
		}
	}

	function initialize() {
		$scope.cols = ["num", "code", "solve1.alg", "solve1.length", "solve2.alg", "solve2.length", "prob"];
		$scope.hidden = {num: 0, code: 0, solve1:0, length1:0, solve2:0, length2:0, prob:0};
		$scope.colClasses = [".num", ".code", ".solve1", ".length1", ".solve2", ".length2", ".prob"];
		$scope.classes = ["num", "code", "solve1", "length1", "solve2", "length2", "prob"];

		// More Table row/column info
		// Content, settings
		$scope.filteredCases = $scope.cases;
		$scope.reverse = true;
		$scope.column = 'num'
		$scope.comparisons = {custom: false};
		$scope.countCases();

	// Content, info
		$scope.prob = {};

		for (var i = 0; i < $scope.cases.length; i++) {
			$scope.cases[i].src = "/img/" + $scope.cases[i].num + ".png";
			$scope.prob[$scope.cases[i].code] = $scope.cases[i].prob;
		}

		// Content, flashcards
		$scope.showing = {
				editRow:true,
				editCol:true,
				flashCardCol: false,
				priorityCol: false,
				algorithmCol: false
		};

		// Editing helper - content, info/controls
		$scope.editString = "Save Table Configuration";

		// Stores the strings for the cookies
		// Content, flashcards

		$scope.useCookieInfo();
		// Content, info
		$scope.knownCases = {editMessage: ($scope.showing.editCol === true) ? "Save Known Cases" : "Select Known Cases to Hide"};

	// Temporary stuff that I'm just trying out
	}

	function modifyKnownCases() {
		$scope.showing.editCol = !$scope.showing.editCol;
	}

	function pickAnAlgorithm(myCase) {
		if (angular.isDefined(myCase.code)) {
		// console.log("cardPriorities?: " + angular.toJson($scope.cardPriorities));
			if (angular.isDefined($scope.cardPriorities)) {
				if (angular.isDefined($scope.cardPriorities[myCase.code]) && $scope.showing.algorithmCol && $scope.practicing[myCase.code]) {
					if (angular.isNumber(parseInt($scope.cardPriorities[myCase.code]))) {
//					console.log("Is a number: " + angular.isNumber(parseInt($scope.cardPriorities[myCase.code])));
//					console.log("This case: " + angular.toJson(myCase));
						return(myCase.solve2.length > 0);
					}
					return false;
				} else {
					return false;
				}

	  	} else {
	  		return(false);
	  	}
		}
	}

	function returnSolve(card) {
		if (card.solve2.length > 0) {
			return (card.option == 1) ? card.solve1.alg : card.solve2.alg;
		} else {
			return(card.solve1.alg);
		}
	}

	function showHiddenCols() {
		for (var ind = 0; ind < $scope.cols.length; ind++) {
			if ($scope.hidden[$scope.classes[ind]] == 1) {
				$($scope.colClasses[ind]).show();
			}
		}
	}

	function showHiddenRows() {
		for (id in $scope.hiddenRows) {
			if ($scope.hiddenRows[id] == 1) {
				$("." + id).show();
			}
		}
	}

	function setFilter(){
		// Content only
		$scope.filteredCases = filterFilter($scope.cases, $scope.filterString);
	}


	function setSort(column) {
	// Content only
		$scope.column = column;
		$scope.reverse = !$scope.reverse;
	}

	function useCookieInfo() {
		// Content, Info
		$scope.hiddenRowsData();
		$scope.hiddenColsData();
		$scope.flashCardsData();
	};

	function returnAddress(value) {
		var string = "img/" + value + ".png";
//	console.log(string);
		return string;
	}

	$scope.$watchCollection('practiceCards', function(newValue, oldValue) {
		flashData.savePracticeCards(newValue);
	});

	$scope.$watchCollection('cardPriorities', function(newValue, oldValue){
		for (var i = 0; i < $scope.practiceCards.length; i++) {
			for (var ind in newValue) {
				if (ind == $scope.practiceCards[i].code) {
					$scope.practiceCards[i].priority = parseInt(newValue[ind]);
				}
			}
		}
		flashData.saveCardPriorities(newValue);
	});

	$scope.$watchCollection('cardOptions', function(newValue, oldValue){
		for (var i = 0; i < $scope.practiceCards.length; i++) {
			for (var ind in newValue) {
				if (ind == $scope.practiceCards[i].code) {
					$scope.practiceCards[i].option = newValue[ind];
				}
			}
		}
		flashData.saveCardOptions(newValue);
	});


	$scope.$watchCollection('practicing', function(newValue, oldValue) {
		// Content, flashcards (mostly flashcards, but heavily dependent on cases)
//
//	console.log(angular.toJson($scope.practicing));

		for (var i = 0; i < $scope.cases.length; i++) {
//			console.log($scope.cases[i].code);
			if (angular.isDefined($scope.practicing[$scope.cases[i].code])) {
				if ($scope.practicing[$scope.cases[i].code]) {
					if ($scope.practiceCards.length == 0) {
						$scope.practiceCards.push({});
						angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
						$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
					} else {
						for (var j = 0; j < $scope.practiceCards.length; j++) {
							if ($scope.practiceCards[j].code == $scope.cases[i].code) {
								break;
							} else if (j + 1 == $scope.practiceCards.length) {
								$scope.practiceCards.push({});
								angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
								$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
							}
						}
					}
				} else {
					for (var j = 0; j < $scope.practiceCards.length; j++) {
						if ($scope.practiceCards[j].code == $scope.cases[i].code) {
							$scope.practiceCards.splice(j, 1);
							break;
						}
					}
				}
			}
		}
		flashData.savePracticing(newValue);
	});

	$scope.$watchCollection('cards', function(newValue, oldValue) {
		$cookies.putObject($scope.cookieString.cards, newValue);

		if (newValue.maxNumber !== oldValue.maxNumber) {
			$scope.addPriorityOptions();
		}
	});

	$scope.$watch('showing.editCol', function(newValue, oldValue) {
		// Content, flashcards, controls
//	console.log("Watched knownCases.editMessage");
		$scope.knownCases.editMessage = (newValue) ? "Save Known Cases" : "Select Known Cases to Hide";

		if (newValue) {
			$scope.showHiddenRows();
		} else {
			$scope.hideHiddenRows();
		}
	});


	$scope.$watchCollection('hiddenRows', function(newValue, oldValue) {
		// Content, floashcards, controls, cookies
		$cookies.putObject($scope.cookieString.hiddenRows, newValue);
		$scope.countCases();
	});


	$scope.$watchCollection('hidden', function(newValue, oldValue) {
		// Cookies, content
		$cookies.putObject($scope.cookieString.hiddenCols, newValue);
	});
};

angular.module('myApp')
  .controller('OLLController', OLLController);

OLLController.$inject = ['$scope', 'ContentControl', '$cookies'];

function OLLController($scope, ContentControl, $cookies) {
  ContentControl.initialize("OLL");
  $scope.addPriorityOptions = ContentControl.addPriorityOptions;
  $scope.animationOpts = {duration: 1000};
  $scope.cardOptions = ContentControl.cardOptions;
  $scope.cardPriorities = ContentControl.cardPriorities;
  $scope.cards = ContentControl.cards;
  $scope.cases = ContentControl.cases;
  $scope.cols = ContentControl.cols;
  $scope.classes = ContentControl.classes;
  $scope.colClasses = ContentControl.colClasses;
  $scope.hidden = ContentControl.hidden;
  $scope.cookieString = ContentControl.cookieString["oll"];
  $scope.countCases = ContentControl.countCases;
  $scope.cardData = ContentControl.flashData.data;
  $scope.editCardSelection = ContentControl.editCardSelection;
  $scope.editTable = editTable;
  $scope.filteredCases = ContentControl.filteredCases;
  $scope.filterString = '';
  $scope.flashCardsData = ContentControl.flashCardsData;
  $scope.hiddenColsData = ContentControl.hiddenColsData;
  $scope.hiddenRows = ContentControl.hiddenRows;
  $scope.hiddenRowsData = ContentControl.hiddenRowsData;
  $scope.hideHiddenCols = ContentControl.hideHiddenCols;
  $scope.hideHiddenRows = ContentControl.hideHiddenRows;
  $scope.initialize = ContentControl.initialize;
  $scope.knownCases = ContentControl.knownCases;
  $scope.modifyKnownCases = ContentControl.modifyKnownCases;
  $scope.number = ContentControl.number;
  $scope.pickAnAlgorithm = ContentControl.pickAnAlgorithm;
  $scope.practiceCards = ContentControl.practiceCards || [];
  $scope.practicing = ContentControl.practicing;
  $scope.returnSolve = returnSolve;
  $scope.setFilter = ContentControl.setFilter;
  $scope.setSort = ContentControl.setSort;
  $scope.showing = ContentControl.showing;
  $scope.showHiddenCols = ContentControl.showHiddenCols;
  $scope.showHiddenRows = ContentControl.showHiddenRows;
  $scope.useCookieInfo = ContentControl.useCookieInfo;

  checkFlashCardData();
  console.log("OLLController Cases: %s", angular.toJson($scope.cases));


  function checkFlashCardData() {
    for (var data in $scope.cardData) {
      console.log(data + " is Defined?: " + angular.isDefined($scope.cardData[data]) + "  " + angular.toJson($scope.cardData[data]));
    }
  }

  function editTable() {
    ContentControl.editTable();
    $scope.editString = ContentControl.editString;
  }

  function returnSolve(card) {
		if (card.solve2.length > 0) {
			return (card.option == 1) ? card.solve1.alg : card.solve2.alg;
		} else {
			return(card.solve1.alg);
		}
	}



  $scope.$watchCollection('practiceCards', function(newValue, oldValue) {
    ContentControl.flashData.savePracticeCards(newValue);
  });

  $scope.$watchCollection('cardPriorities', function(newValue, oldValue){
    for (var i = 0; i < $scope.practiceCards.length; i++) {
      for (var ind in newValue) {
        if (ind == $scope.practiceCards[i].code) {
          $scope.practiceCards[i].priority = parseInt(newValue[ind]);
        }
      }
    }
    ContentControl.flashData.saveCardPriorities(newValue);
  });

  $scope.$watchCollection('cardOptions', function(newValue, oldValue){
    for (var i = 0; i < $scope.practiceCards.length; i++) {
      for (var ind in newValue) {
        if (ind == $scope.practiceCards[i].code) {
          $scope.practiceCards[i].option = newValue[ind];
        }
      }
    }
    ContentControl.flashData.saveCardOptions(newValue);
  });


  $scope.$watchCollection('practicing', function(newValue, oldValue) {
    // Content, flashcards (mostly flashcards, but heavily dependent on cases)
//
//	console.log(angular.toJson($scope.practicing));

    for (var i = 0; i < $scope.cases.length; i++) {
//			console.log($scope.cases[i].code);
      if (angular.isDefined($scope.practicing[$scope.cases[i].code])) {
        if ($scope.practicing[$scope.cases[i].code]) {
          if ($scope.practiceCards.length == 0) {
            $scope.practiceCards.push({});
            angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
            $scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
          } else {
            for (var j = 0; j < $scope.practiceCards.length; j++) {
              if ($scope.practiceCards[j].code == $scope.cases[i].code) {
                break;
              } else if (j + 1 == $scope.practiceCards.length) {
                $scope.practiceCards.push({});
                angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
                $scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
              }
            }
          }
        } else {
          for (var j = 0; j < $scope.practiceCards.length; j++) {
            if ($scope.practiceCards[j].code == $scope.cases[i].code) {
              $scope.practiceCards.splice(j, 1);
              break;
            }
          }
        }
      }
    }
    ContentControl.flashData.savePracticing(newValue);
  });

  $scope.$watchCollection('cards', function(newValue, oldValue) {
    $cookies.putObject($scope.cookieString.cards, newValue);

    if (newValue.maxNumber !== oldValue.maxNumber) {
      $scope.addPriorityOptions();
    }
  });

  $scope.$watch('showing.editCol', function(newValue, oldValue) {
    // Content, flashcards, controls
//	console.log("Watched knownCases.editMessage");
    $scope.knownCases.editMessage = (newValue) ? "Save Known Cases" : "Select Known Cases to Hide";

    if (newValue) {
      $scope.showHiddenRows();
    } else {
      $scope.hideHiddenRows();
    }
  });


  $scope.$watchCollection('hiddenRows', function(newValue, oldValue) {
    // Content, floashcards, controls, cookies
    console.log("Saving hidden rows here: %s", $scope.cookieString.hiddenRows);
    $cookies.putObject($scope.cookieString.hiddenRows, newValue);
    $scope.countCases();
    $scope.number = ContentControl.number;
  });

  $scope.$watchCollection('hidden', function(newValue, oldValue) {
    ContentControl.watchHidden(newValue, oldValue);
  });

  // $scope.$watchCollection('hidden', function(newValue, oldValue) {
  //   // Cookies, content
  //   $cookies.putObject($scope.cookieString.hiddenCols, newValue);
  // });
}

angular.module('myApp')
  .controller('PLLController', PLLController);

PLLController.$inject = ['$scope', 'ContentControl', '$cookies'];

function PLLController($scope, ContentControl, $cookies) {
  ContentControl.initialize("PLL");
  $scope.addPriorityOptions = ContentControl.addPriorityOptions;
	$scope.animationOpts = {duration: 1000};
	$scope.cardOptions = ContentControl.cardOptions || {};
	$scope.cardPriorities = ContentControl.cardPriorities || {};
	$scope.cards = ContentControl.cards;
	$scope.cases = ContentControl.cases;
  $scope.cols = ContentControl.cols;
  $scope.classes = ContentControl.classes;
  $scope.colClasses = ContentControl.colClasses;
  $scope.hidden = ContentControl.hidden;



	$scope.cookieString = ContentControl.cookieString["pll"];
	$scope.countCases = ContentControl.countCases;
	$scope.cardData = ContentControl.flashData.data;
  $scope.editString = ContentControl.editString;
	$scope.editCardSelection = ContentControl.editCardSelection;
	$scope.editTable = editTable;
  $scope.filteredCases = ContentControl.filteredCases;
	$scope.filterString = '';
	$scope.flashCardsData = ContentControl.flashCardsData;
	$scope.hiddenColsData = ContentControl.hiddenColsData;
	$scope.hiddenRows = ContentControl.hiddenRows;
	$scope.hiddenRowsData = ContentControl.hiddenRowsData;
	$scope.hideHiddenCols = ContentControl.hideHiddenCols;
	$scope.hideHiddenRows = ContentControl.hideHiddenRows;
	$scope.initialize = ContentControl.initialize;
  $scope.knownCases = ContentControl.knownCases;
	$scope.modifyKnownCases = ContentControl.modifyKnownCases;
	$scope.number = ContentControl.number;
	$scope.pickAnAlgorithm = ContentControl.pickAnAlgorithm;
	$scope.practiceCards = ContentControl.practiceCards || [];
	$scope.practicing = ContentControl.practicing;
	$scope.returnSolve = returnSolve;
	$scope.setFilter = ContentControl.setFilter;
	$scope.setSort = ContentControl.setSort;
  $scope.showing = ContentControl.showing;
	$scope.showHiddenCols = ContentControl.showHiddenCols;
	$scope.showHiddenRows = ContentControl.showHiddenRows;
	$scope.useCookieInfo = ContentControl.useCookieInfo;

	checkFlashCardData();
  console.log("PLLController Cases: %s", angular.toJson($scope.cases));


  function checkFlashCardData() {
		for (var data in $scope.cardData) {
			console.log(data + " is Defined?: " + angular.isDefined($scope.cardData[data]) + "  " + angular.toJson($scope.cardData[data]));
		}
	}

  function editTable() {
    ContentControl.editTable();
    $scope.editString = ContentControl.editString;
  }

  function returnSolve(card) {
		if (card.solve2.length > 0) {
      console.log('Card option: %d', card.option);
			return (card.option == 1) ? card.solve1.alg : card.solve2.alg;
		} else {
			return(card.solve1.alg);
		}
	}



  $scope.$watchCollection('practiceCards', function(newValue, oldValue) {
		ContentControl.flashData.savePracticeCards(newValue);
	});

	$scope.$watchCollection('cardPriorities', function(newValue, oldValue){
    console.log('Card priorities: %s', angular.toJson(newValue));
		for (var i = 0; i < $scope.practiceCards.length; i++) {
			for (var ind in newValue) {
				if (ind == $scope.practiceCards[i].code) {
					$scope.practiceCards[i].priority = parseInt(newValue[ind]);
				}
			}
		}
		ContentControl.flashData.saveCardPriorities(newValue);
	});

	$scope.$watchCollection('cardOptions', function(newValue, oldValue){
    console.log("Card options: %s", angular.toJson(newValue));
		for (var i = 0; i < $scope.practiceCards.length; i++) {
			for (var ind in newValue) {
				if (ind == $scope.practiceCards[i].code) {
					$scope.practiceCards[i].option = parseInt(newValue[ind]);
				}
			}
		}
		ContentControl.flashData.saveCardOptions(newValue);
	});


	$scope.$watchCollection('practicing', function(newValue, oldValue) {
		// Content, flashcards (mostly flashcards, but heavily dependent on cases)
//
	// console.log(angular.toJson($scope.practicing));

		for (var i = 0; i < $scope.cases.length; i++) {
//			console.log($scope.cases[i].code);
			if (angular.isDefined($scope.practicing[$scope.cases[i].code])) {
				if ($scope.practicing[$scope.cases[i].code]) {
					if ($scope.practiceCards.length == 0) {
						$scope.practiceCards.push({});
						angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
						$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
					} else {
						for (var j = 0; j < $scope.practiceCards.length; j++) {
							if ($scope.practiceCards[j].code == $scope.cases[i].code) {
								break;
							} else if (j + 1 == $scope.practiceCards.length) {
								$scope.practiceCards.push({});
								angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
								$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
							}
						}
					}
				} else {
					for (var j = 0; j < $scope.practiceCards.length; j++) {
						if ($scope.practiceCards[j].code == $scope.cases[i].code) {
							$scope.practiceCards.splice(j, 1);
							break;
						}
					}
				}
			}
		}
		ContentControl.flashData.savePracticing(newValue);
	});

	$scope.$watchCollection('cards', function(newValue, oldValue) {
		$cookies.putObject($scope.cookieString.cards, newValue);

		if (newValue.maxNumber !== oldValue.maxNumber) {
			$scope.addPriorityOptions();
		}
	});

	$scope.$watch('showing.editCol', function(newValue, oldValue) {
		// Content, flashcards, controls
//	console.log("Watched knownCases.editMessage");
		$scope.knownCases.editMessage = (newValue) ? "Save Known Cases" : "Select Known Cases to Hide";

		if (newValue) {
			$scope.showHiddenRows();
		} else {
			$scope.hideHiddenRows();
		}
	});


	$scope.$watchCollection('hiddenRows', function(newValue, oldValue) {
		// Content, floashcards, controls, cookies
    console.log("Saving hidden rows here: %s", $scope.cookieString.hiddenRows);
		$cookies.putObject($scope.cookieString.hiddenRows, newValue);
		$scope.countCases();
	});


	$scope.$watchCollection('hidden', function(newValue, oldValue) {
		// Cookies, content
		$cookies.putObject($scope.cookieString.hiddenCols, newValue);
	});
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

angular.module('myApp').controller('CubeScrambler', CubeScrambler);

function CubeScrambler($scope) {	
	$scope.code = "";
	$scope.code333 = [
	          		    [
	          		      "R", "R'", "R2"
	          		    ]
	          		    , [
	          		      "L", "L'", "L2"
	          		    ]
	          		    , [
	          		      "B", "B'", "B2"
	          		    ]
	          		    , [
	          		      "F", "F'", "F2"
	          		    ]
	          		    , [
	          		      "U", "U'", "U2"
	          		    ]
	          		    , [
	          		      "D", "D'", "D2"
	          		    ]
	          		  ];
	$scope.scramble = scramble;
	
	$scope.scramble();
	
	
	
	function scramble() {
		var indexX = [];
		var indexY = [];
		for (var i = 0; i < 25; i++) {
			var n = Math.floor(Math.random() * $scope.code333.length);
			var m = Math.floor(Math.random() * $scope.code333[0].length);
			if (i >= 1 && i <= 24) {
				if (m === indexY[i - 1] && n === indexX[i-1]) {
					while (m === indexY[i-1]) {
						m = Math.floor(Math.random() * $scope.code333[0].length);
					}
				}
				if (n === indexX[i-1]) {
					while (n === indexX[i-1]) {
						n = Math.floor(Math.random() * $scope.code333.length);
					}
				}
			}
  		indexX.push(n);
			indexY.push(m);
		}
		$scope.code = "";
		for (var i = 0; i < 25; i++) {
			$scope.code = $scope.code.concat($scope.code333[indexX[i]][indexY[i]] + " ");
		}
		$scope.code = $scope.code.substring(0, $scope.code.length - 1);
	};
	
};
/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('dividingBox', function() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			scope: {dividerTitle: "@", dividerId: "@"},
			templateUrl: '/templates/dividingBox.html'
		};
	});
/**
 * http://usejsdoc.org/
 */


angular
	.module('myApp')
	.factory('flashCardData', ['cookieStrings', '$cookies', 'cookieData', function(cookieStringData, $cookies, cookieData) {
  	var factory = {data: cookieData, cookies: cookieStringData, cards: {}};
		var type = "";
  //	angular.copy(cookieData, factory.data);
//  	console.log(angular.toJson(cookieData));
		factory.setType = function(string) {
			if (string.match(/pll/i)) {
				type = "pll";
			} else if (string.match(/oll/i)) {
				type = "oll";
			}
		};


  	factory.initialize = function() {
  		for (var ind in factory.data) {
  			if (!angular.isString(factory.data[ind])) {
  				try {
  				 factory.data[ind] = $cookies.getObject(factory.cookies[type][ind]);
//  				 console.log("CookieData[ind] Defined?: " + ind + ": " + angular.isDefined(cookieData[ind]));
//  				 console.log("factory.data[" + ind + "] defined: " + (angular.isDefined(factary.data[ind])));
  				 if (angular.isUndefined(factary.data[ind])) {
//  					 console.log("Redefining");
  					 factory.data[ind] = cookieData[ind];
  					 $cookies.putObject(factory.cookies[type][ind], factory.data[ind]);
  				 }
  				} catch(e) {
  					factory.data[ind] = cookieData[ind];
  					$cookies.putObject(factory.cookies[type][ind], factory.data[ind]);
  				}
//  				console.log(ind + ": " + angular.toJson(factory.data[ind]) + "  |  " + angular.isDefined(factory.data[ind]));
  			}
  		}

  		if (angular.isUndefined(factory.data.practicing)) {
  			factory.data.practicing = {};
  			$cookies.putObject(factory.cookies[type].practicing, factory.data.practicing);
//  			console.log("Practicing: " + factory.data.practicing);
  		}

  		for (var i in factory.data.practiceCards) {
  			factory.cards[factory.data.practiceCards[i].code] = factory.data.practiceCards[i];
  		}
  		try {
  			if (!angular.isNumber(factory.data.cards.maxNumber)) {
  			  //		$scope.cards = {maxNumber: 0, options: []};
  			  			factory.data.cards.maxNumber = parseInt(factory.data.cards.maxNumber);
  			  			$cookies.putObject(factory.cookies[type].cards, factory.data.cards);
  			  		}
  		} catch (e) {
  			factory.data.cards = {maxNumber: 0, options: []};
  			$cookies.putObject(factory.cookies[type].cards, factory.data.cards);
  		}

  	};

  	factory.isPracticing = function(value) {
  		if (factory.data.practicing[value] !== undefined) {
  			return factory.data.practicing[value];
  		}
  		return false;
  	};

  	factory.setPracticing = function(caseCode, value) {
  		factory.data.practicing[caseCode] = value;
  	};

  	factory.removePracticing = function(caseCode ) {
  		if (angular.isDefined(caseCode)) {
  			if (angular.isDefined(factory.data.practicing[caseCode])) {
  				factory.setPracticing(caseCode, undefined);
  			}
  		}
  	};

  	factory.savePracticing = function(newValue) {
  		if (arguments.length === 1) {
				factory.data.practicing = newValue;
  			$cookies.putObject(factory.cookies[type].practicing, newValue);
  		} else {
  			$cookies.putObject(factory.cookies[type].practicing, factory.data.practicing);
  		}
  	};

  	factory.getPracticing = function() {
  		if (angular.isDefined(factory.data.practicing)) {
  			return factory.data.practicing;
  		}
  		return cookieData.practicing;
  	};

  	factory.getPriority = function(caseCode) {
  		if (angular.isDefined(factory.data.cardPriorities[caseCode])) {
  			return factory.data.cardPriorities[caseCode];
  		} else {
  			return(-1);
  		}
  	};

  	factory.setPriority = function(caseCode, value) {
  		if (caseCode !== undefined && !(caseCode === undefined && value===undefined)) {
  			factory.data.cardPriorities[caseCode] = value;
  		}
  	};

  	factory.removePriority = function(caseCode) {
  		if (caseCode !== undefined) {
  			factory.setPriority(caseCode, undefined);
  		}
  	};

  	factory.saveCardPriorities = function(newValue) {
  		if (arguments.length === 1) {
  			$cookies.putObject(factory.cookies[type].cardPriorities, newValue);
  		} else {
  			$cookies.putObject(factory.cookies[type].cardPriorities, factory.data.cardPriorities);
  		}
  	};

  	factory.getCardPriorities = function() {
  		if (angular.isDefined(factory.data.cardPriorities)) {
  			return(factory.data.cardPriorities);
  		}
  		return(cookieData["cardPriorities"]);
  	};

  	factory.getCard = function(caseCode) {
  		if (angular.isDefined(factory.cards[caseCode])) {
  			return(factory.cards[caseCode]);
  		}
  		return -1;
  	};

  	factory.setCard = function(caseCode, cardValue) {
  		if (!angular.isUndefined(caseCode)) {
  			if (angular.isUndefined(factory.cards[caseCode])) {
    			factory.cards[caseCode] = cardValue;
    			factory.data.practiceCards.push(cardValue);
    		} else {
    			factory.cards[caseCode] = cardValue;
    			for (var ind in factory.data.practiceCards) {
    				if (factory.data.practiceCards[ind].code === caseCode) {
    					factory.data.practiceCards.splice(ind, 1);
    					factory.data.practiceCards.push(caseCode, cardValue);
    					break;
    				}
    			}
    		}
  		}
  	};

  	factory.removeCard = function(caseCode) {
  		if (angular.isUndefined(factory.cards[caseCode])) {
  			return;
  		} else {
  			factory.cards[caseCode] = undefined;
  			for (var ind in factory.data.practiceCards) {
  				if (factory.data.practiceCards[ind].code === caseCode) {
  					factory.data.practiceCards.splice(ind, 1);
  					break;
  				}
  			}
  		}
  	};

  	factory.savePracticeCards = function(newValue) {
  		if (arguments.length === 1) {
  			$cookies.putObject(factory.cookies[type].practiceCards, newValue);
  		} else {
  			$cookies.putObject(factory.cookies[type].practiceCards, factory.data.practiceCards);
  		}
  	};

  	factory.getPracticeCards = function() {
  		if (angular.isDefined(factory.data.practiceCards)) {
  			return factory.data.practiceCards;
  		}
  		return cookieData.practiceCards;
  	};

  	factory.saveCards = function(newValue) {
			if (arguments.length === 1) {
				if (newValue !== undefined) {
  				$cookies.putObject(factory.cookies[type].dataCards, newValue);
				}
  		} else {
  			if (angular.isDefined(factory.data.cards)) {
//  				console.log("Defined.");
  				$cookies.putObject(factory.cookies[type].dataCards, factory.data.cards);
  			} else {
//  				console.log("factory.data.cards: " + angular.toJson(factory.data.cards));
  				factory.data.cards = angular.copy(cookieData.cards, factory.data.cards);
//  				console.log("factory.data.cards: " + angular.toJson(factory.data.cards));
  				$cookies.putObject(factory.cookies[type].dataCards, cookieData.cards);
  			}
  		}
  	};

  	factory.getCards = function() {
  		if (angular.isDefined(factory.data.cards)) {
  			return(factory.data.cards);
  		}
  		factory.data.cards = cookieData.cards;
  		return cookieData.cards;
  	};

  	factory.getAlgorithmOption = function(caseCode) {
  		if (angular.isDefined(factory.data.cardOptions[caseCode])) {
  			return factory.data.cardOptions[caseCode];
  		}
  		return -1;
  	};

  	factory.setAlgorithmOption = function(caseCode, value) {
  		factory.data.cardOptions[caseCode] = value;
  	};

  	factory.removeAlgorithmOption = function(caseCode) {
  		factory.setAlgorithmOption(caseCode, undefined);
  	};

  	factory.saveCardOptions = function(newValue) {
  		$cookies.putObject(factory.cookies[type].cardOptions, newValue);
  	};

  	factory.getCardOptions = function() {
  		if (angular.isDefined(factory.data.cardOptions)) {
  			return factory.data.cardOptions;
  		}
  		return cookieData.cardOptions;
  	};

  	return(factory);
}]);

/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.directive('flashCard', function() {
		return {
			transclude: true,
			restrict: 'E',
			scope: {title: '@title', cardsrc: '@cardsrc', cardcode: '@cardcode', cardprob: '@cardprob', cardalg: '@cardalg'},
			templateUrl: '../flashcard.html',
			link: function(scope, elem, atr, controller, transclude) {
			}
		};
	});

/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.value('hiddenRowsY', {});
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.directive('pllFlashCard', function() {
		return {
			transclude: true,
			restrict: 'E',
			scope: {title: '@title', cardsrc: '@cardsrc', cardcode: '@cardcode', cardprob: '@cardprob', cardalg: '@cardalg'},
			templateUrl: '../pll-flashcard.html',
			link: function(scope, elem, atr, controller, transclude) {
			}
		};
	});

/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.factory(
			'statistics', ['timeConversion', 
			function(timeConversion) {
				var converter = timeConversion;
				var factory = {
						data: [],
						raw: [],
						stats: {
							mean: 0,
							stdDev: 0,
							variance: 0,
							mean5: 0,
							mean35: 0,
							mean10: 0,
							mean1012: 0,
							median: 0,
							best: 0,
							worst: 0,
							q1: 0,
							q3: 0,
							iqr: 0,
							mean100: 0,
							range: 0
						}
				};
				
				factory.addData = addData;
				factory.avg = avg;
				factory.best = best;
				factory.calculate = calculate;
				factory.compareNums = compareNums;
				factory.convert = convert;
				factory.getSum = getSum;
				factory.getVariance = getVariance;
				factory.iqr = iqr;
				factory.length = length;
				factory.loadData = loadData;
				factory.mean = mean;
				factory.mean10 = mean10;
				factory.mean100 = mean100;
				factory.mean1012 = mean1012;
				factory.mean35 = mean35;
				factory.mean5 = mean5;
				factory.median = median;
				factory.q1 = q1;
				factory.q3 = q3;
				factory.range = range;
				factory.stdDev = stdDev;
				factory.variance = variance;
				factory.worst = worst;

				
				function timeObject(value, i) {
					return {index: value.index[i], time: value.time[i], millis: value.millis[i], timeStamp: value.timeStamp[i]};
				}
				
				function compareNums(a, b) {
					return a - b;
				}
				
				function convert(num) {
					return(converter.millisToString(Math.round(num)));
				}
				
				function addData(value) {
					if (angular.isDefined(value.time) && angular.isDefined(value.timeStamp)) {
						factory.raw.push(value);
						factory.data.push(converter.stringToMillis(value.time));
					}
					factory.calculate();
				}
				
				function length() {
					return parseInt(factory.data.length);
				}
				
				function loadData(value) {
					var times = "";
					var times2 = "";
					
					var data = [];
//					console.log("Type of value: " + typeof value);
					if (angular.isDefined(value)) {
						if (angular.isDefined(value.index)) {

							for (var i = 0; i < value.index.length; i++) {
								var timeObj = timeObject(value, i);
								data.push(timeObj);
							}
							
							factory.raw = data;
//							console.log(angular.toJson(value));
							factory.data = [];
							
							for (i = 0; i < factory.raw.length; i++) {
								times = times + factory.raw[i].time + " ";
								factory.data.push(converter.stringToMillis(factory.raw[i].time));
								times2 = times2 + factory.data[i] + " ";
							}
							//console.log(times);
							//console.log(times2);
						} else {
							factory.raw = value;
//						console.log(angular.toJson(value));
							factory.data = [];
						
							for (var i = 0; i < factory.raw.length; i++) {
	  						times = times + factory.raw[i].time + " ";
	  						factory.data.push(converter.stringToMillis(factory.raw[i].time));
	  						times2 = times2 + factory.data[i] + " ";
	  					}
						}
					}
					factory.calculate();
				}
				
				function getSum(total, newValue) {
					return total + newValue;
				}
				factory.avg = avg;
				function avg(data, length) {
					return(data.reduce(getSum) / length);
				}
				
				function mean() {
					
//					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
//						total = factory.data.reduce(getSum);
						//console.log("Total: " + total + " Length: " + length);
						factory.stats.mean = factory.avg(factory.data, length);
						//console.log("Mean: " + factory.stats.mean);
					} else {
						factory.stats.mean = -1;
					}
				}
				
				function getVariance(total, newValue) {
					var mean = factory.stats.mean;
					total += Math.pow(newValue - mean, 2);
					return total;
				}
				
				function variance() {
					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
						var mean = factory.stats.mean;
						if (mean <= 0) {
							factory.mean();
						}
						total = factory.data.reduce(getVariance);
						factory.stats.variance = (total / length);
					} else {
						factory.stats.variance = -1;
					}
					
				}
				
				function stdDev() {
					if (factory.data.length > 5 && factory.stats.variance >= 0) {
						var mean = factory.stats.mean;
						var variance = factory.stats.variance;
						if (mean <= 0 || variance <= 0) {
							factory.mean();
							factory.variance();
						}
						factory.stats.stdDev = (Math.pow(factory.stats.variance, 0.5));
					} else {
						factory.stats.stdDev = -1;
					}
					
				}
				
				function mean5() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
//						var total = last5.reduce(getSum);
						factory.stats.mean5 = factory.avg(last5, 5); //(total / 5);
					} else {
						factory.stats.mean5 = -1;
					}
				}
				
				function mean35() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
						last5.sort(compareNums);
						var middle = last5.slice(1, 4);
//						var total = middle.reduce(getSum);
						factory.stats.mean35 = factory.avg(middle, 3); //(total / 3);
					} else {
						factory.stats.mean35 = -1;
					}
				}
				
				function mean10() {
					var length = factory.data.length;
					if (length >= 10) {
						var last10 = factory.data.slice(length - 10, length);
//						var total = last10.reduce(getSum);
						factory.stats.mean10 = factory.avg(last10, 10); //(total / 10);
					} else {
						factory.stats.mean10 = -1;
					}
				}
				
				function mean1012() {
					var length = factory.data.length;
					if (length >= 12) {
						var last12 = factory.data.slice(length - 12, length);
						last12.sort(compareNums);
						var middle = last12.slice(1, 11);
						var total = middle.reduce(getSum);
						factory.stats.mean1012 = factory.avg(middle, 10); //(total / 10);
					} else {
						factory.stats.mean1012 = -1;
					}
				}
				
				function mean100() {
					var length = factory.data.length;
					if (length >= 100) {
						var last100 = factory.data.slice(length-100, length);
//						var total = last100.reduce(getSum);
						factory.stats.mean100 = factory.avg(last100, 100); //(total / 100);
					} else {
						factory.stats.mean100 = -1;
					}
				}
				
				function q1() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 === 0 || length % 4 == 3) {
							// Splits perfectly into 4 segments
							var qB = Math.ceil(length * 0.25);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q1 = (avg);
						} else if (length % 4 === 1 || length % 4 == 2) {
							var q = Math.floor(length * 0.25);
							factory.stats.q1 = (sorted[q]);
						}
					} else {
						factory.stats.q1 = -1;
					}
				}
				
				function median() {
					var length = factory.data.length;
					if (length > 3) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 2 == 1) {
							var q = Math.round(length * 0.5);
							factory.stats.median = (sorted[q]);
						} else {
							var qB = Math.ceil(length * 0.5);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.median = (avg);
						}
					} else {
						factory.stats.median = -1;
					}
				}
				
				function q3() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 == 1 || length % 4 == 2) {
							var q = Math.round((length - 1) * 0.75);
							factory.stats.q3 = (sorted[q]);
						} else if (length % 4 == 3 || length % 4 === 0) {
							var qB = Math.ceil(length * 0.75);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q3 = avg;
						}
					} else {
						factory.stats.q3 = -1;
					}
				}
				
				function best() {
					var length = factory.data.length;
					if (length > 3) {
						var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
						factory.stats.best = sorted[0];
					} else {
						factory.stats.best = -1;
					}
				}
			
				function worst() {
					var length = factory.data.length;
          if (length > 3) {
          	var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
          	factory.stats.worst = sorted[sorted.length - 1];
					} else {
						factory.stats.worst = -1;
					}
				}
				
				function iqr() {
					var length = factory.data.length;
					if (length > 10) {
						factory.stats.iqr = factory.stats.q3 - factory.stats.q1;
					} else {
						factory.stats.iqr = -1;
					}
				}
				
				function range() {
					var length = factory.data.length;
					if (length > 3) {
						factory.stats.range = "(" + convert(factory.stats.best) + ", " + convert(factory.stats.worst) + ")";
					} else {
						factory.stats.range = -1;
					}
					
				}
				
				function calculate() {
					factory.mean();
					factory.variance();
					factory.stdDev();
					factory.mean5();
					factory.mean35();
					factory.mean10();
					factory.mean1012();
					factory.mean100();
					factory.q1();
					factory.q3();
					factory.median();
					factory.best();
					factory.worst();
					factory.iqr();
					factory.range();
				}
				
				return factory;
			}]);
/**
 * http://usejsdoc.org/
 */

var app = angular.module('myApp');

app.directive('myTabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope) {
			var panes = $scope.panes = [];
			$scope.select = function(pane) {
				pane.selected = !pane.selected;
			};

			this.addPane = function(pane) {
				if (panes.length === 0) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
		},
		templateUrl: "tabs.html"
	};
});

app.directive('myPane', function() {
	return {
		require: '^^myTabs',
		restrict: 'E',
		templateUrl: 'pane.html',
		transclude: true,
		scope: {title: '@'},
		link: function(scope, element, attrs, tabsCtrl) {
			//console.log(angular.toJson(scope));
			tabsCtrl.addPane(scope);
		}

	};
});

/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.factory('timeConversion', function() {
		var factory = {};
		
		factory.milliToSecond = function(mil) {
			return(Math.round(mil / 1000));
		};
		
		factory.milliToMinute = function(mil) {
			return(Math.round(mil / (60000)));
		};
		
		factory.getSeconds = function(mil) {
			return(Math.floor((mil % 60000) / 1000));
		};
		
		factory.getHours = function(mil) {
			return(Math.floor((mil % (24 * 3600 * 1000)) / (3600 * 1000)));
		}
		
		factory.getMinutes = function(mil) {
			return(Math.floor((mil % (60 * 60000)) / 60000));
		};
		
		factory.getMillis = function(mil) {
			return(mil % 1000);
		};
		
		factory.secondToMilli = function(sec) {
			return(sec * 1000);
		};
		
		factory.minuteToMilli = function(min) {
			return(min * 60 * 1000);
		};
		
		factory.hourToMilli = function(hour) {
			return(hour * 60 * 60 * 1000);
		}
		
		factory.stringToMillis = function(time) {
//			console.log(time.time);
			var string = time;
//			console.log(string);
			if (string.length > 0) {
				var a, a1, b, c;
				
				var splits = string.split(':');
				
				if (splits.length === 3) {
					a1 = string.indexOf(":");
//					console.log("A1: " + a1);
//					console.log(string);
					a = string.indexOf(":", a1 + 1);
				} else {
					a = string.indexOf(":");
				}
				b = string.indexOf(".", a);
				c = string.length;
//				
//				console.log(string.substring(0, a));
//				console.log(string.substring(a, b));
//				console.log(string.substring(b, c));
				var hour = 0;
				if (splits.length === 3) {
					hour = parseInt(string.substring(0, a1));
					hour = factory.hourToMilli(hour);
				}
				var min, sec, mil;
				
				if (splits.length === 3) {
					min = parseInt(string.substring(a1 + 1, a));
				} else {
					min = parseInt(string.substring(0, a));
				}
				sec = parseInt(string.substring(a + 1, b));
				mil = string.substring(b + 1, c);
				
				if (mil.length < 2) {
					mil = mil + '0';
					mil = parseInt(mil);
				} else {
					mil = parseInt(mil);
				}
				
				var minM = factory.minuteToMilli(min);
				var secM = factory.secondToMilli(sec);
				
				
//				console.log(a + " " + b + " " + c + "\n" +
//						'Type of Mil: ' + (typeof mil) + "\n" +
//						min + " " + sec + " " + mil + "\n" +
//						minM + " " + secM + " " + mil);
//				console.log('Type of Mil: ' + (typeof mil));
//				console.log(min + " " + sec + " " + mil);
				return (hour + minM + secM + mil);
			}
			return(0);
		};
		
		factory.millisToString = function(mils) {
			var min = factory.getMinutes(mils);
			var sec = factory.getSeconds(mils);
			var mil = factory.getMillis(mils);
			
			var minStr = (min < 10) ? "0" + min : min;
			var secStr = (sec < 10) ? ":0" + sec : ":" + sec;
			var milStr = (mil < 10) ? ".00" + mil : ((mil < 100) ? ".0" + mil : "." + mil);
			return(minStr + secStr + milStr);
		};
		
		return factory;
	});
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.filter('millisToString', ['timeConversion', function(converter) {
		return function(input) {
			if (String(input).indexOf(":") < 0 && (typeof input == "number")) {
//				console.log("int: " + parseInt(input) + " " + input);
				var num = parseInt(input);
				if (input < 0) {
					return("--:--.---");
				} else {
					return converter.millisToString(Math.round(parseInt(input)));
				}
			} else if (String(input).indexOf(":") < 0){
				return converter.millisToString(0);
			}
			return input;
		};
	}]);
/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('timeStats', function() {
		return {
//			transclude: true,
			restrict: 'E',
			scope: {times: "=", timePairs: "=", timeNames: "="},
			templateUrl: '/template/timestats.html' //,
//			link: function(scope, elem, atr, controller) {
//				for (blah in scope) {
//					console.log("Scope[" + blah + "]: " + scope[blah]);
//				}
//			}
		};
	});
/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.factory('timerRecords',
			['statistics', '$cookies', function(statistics, $cookies) {
				var recordsCookie = "TimeRecordsCookie";
				var factory = {dates: {}, allData: [], allStats: statistics, dateKeys: []};
				var comparator = "";
				
				function getDayOnly(date) {
					if (angular.isDate(date)) {
						var y = date.getFullYear();
						var m = date.getMonth();
						var d = date.getDate();
						var months = [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December"
						];
						return d + " " + months[m] + " " + y;
					}
					return(na);
				}
				
				function findSame(timeStamp) {
					return (getDayOnly(timeStamp) == comparator);
				}
				
				factory.loadData = function(newData) {
					var data = [];
					
					for (var i = 0; i < newData.index.length; i++) {
						var timeObj = {index: newData.index[i], time: newData.time[i], millis: newData.millis[i], timeStamp: newData.timeStamp[i]};
						data.push(timeObj);
					}
					
					var oldLength = factory.allData.length;
					var newLength = data.length;
					factory.allData = factory.allData.concat(newData.slice(oldLength, newLength - oldLength));
					for (var i = oldLength; i < newLength; i++) {
						var index = null;
						
						if (angular.isUndefined(factory.allData[i].timeStamp)) {
							factory.allData[i].timeStamp = "na";
							comparator = "na";
						} else {
							comparator = getDayOnly(factory.allData[i].timeStamp);
						}
						
						index = factory.dateKeys.indexOf(findSame);
						
						if (index < 0) {
							factory.dateKeys.push(comparator);
							factory.dates[comparator] = statistics;
							factory.dates[comparator].addData(factory.allData[i]);
						} else {
							factory.dates[comparator].addData(factory.allData[i]);
						}
					}
				};
				
				factory.update = function(newData) {
					factory.loadData(newData);
					factory.allStats.loadData(factory.allData);
					factor.allStats.calculate();
					for (var i = 0; i < factory.dateKeys.length; i++) {
						factory.dates[factory.dateKeys[i]].calculate();
					}
				};
				
				factory.save = function() {
					for (var i = 0; i < factory.dateKeys.length; i++) {
						$cookies.put(recordsCookie + factory.dateKeys[i], factory.dates[factory.dateKeys[i]]);
					}
				};
			}]);
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.controller('TimerController',  TimerController);

TimerController.$inject = ['$scope', '$interval', '$cookies', '$log', '$http', 'statistics'];

function TimerController($scope, $interval, $cookies, $log, $http, statistics) {
	$scope.cookieOpts = {time: ".time", timeStamp: '.date', index: ".index", millis: ".millis"};
  $scope.clock = 0;
  $scope.deleteAll = deleteAll;
  $scope.deleteIndex = deleteIndex;
  $scope.deleteRecord = deleteRecord;
  $scope.delta = delta;
  $scope.displayTimeString = "00:00.00";
  $scope.downloadClicked = downloadClicked;
  $scope.downloadable;
  $scope.isEncoded = isEncoded;
  $scope.encodedUri = "";
  $scope.getCookies = getCookies;
  $scope.interval = null;
  $scope.offset;
  $scope.options = {delay: 5};
  $scope.records = {time: [], timeStamp: [], index: [], millis: []};
  $scope.numRecords = 0;
  $scope.pairs = [
		{a: "best", b: "worst"},
		{a: "q1", b: "q3"},
		{a: "mean", b: "median"},
		{a: "mean5", b: "mean35"},
		{a: "mean10", b: "mean1012"},
		{a: "variance", b: "stdDev"},
		{a: "iqr", b: "range"}
  ];
  $scope.pairNames = {
  	"best": "Best",
  	"worst": "Worst",
  	"q1": "Q1",
  	"q3": "Q3",
  	"mean": "Mean",
  	"median": "Median",
  	"mean5": "Last 5",
  	"mean35": "3 of 5",
  	"mean10": "Last 10",
  	"mean1012": "10 of 12",
  	"variance": "Variance",
  	"stdDev": "StdDev",
  	"iqr": "IQR",
  	"range": "Range"
  };
  $scope.recordsCookie = "TimeRecordsCookie";
  $scope.render = render;
  $scope.reset = reset;
  $scope.returnObjects = returnObjects;
  $scope.returnNames = returnNames;
  $scope.save = save;
  $scope.saveRecords = saveRecords;
  $scope.start = start;
  $scope.state = {running: false, stopped: false};
  $scope.myStats = statistics;
  $scope.stop = stop;
  $scope.time = {string: "00:00.00"};
  $scope.update = update;

  $scope.getCookies();

  $scope.reset();

  $scope.myStats.loadData($scope.records);

//  function addRecord(index, time, millis, timeStamp) {
//
//  }

  function deleteAll() {
  	var confirmed = window.confirm("This will delete all of your currently saved times. Do you really wish to proceed?");

  	if (confirmed) {
  		$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  		$scope.saveRecords();
  		$scope.numRecords = 0;
  	}
  }

  function deleteIndex(index) {
  	if (index >= 0) {
  		if (angular.isDefined($scope.records.index)) {
    		if (index < $scope.records.index.length) {
      		for (var str in $scope.records) {
//      			console.log(str);
      			$scope.records[str].splice(index, 1);
      		}
      	}
    	} else {
    		if (index < $scope.records.length) {
    			$scope.records.splice(index, 1);
    		}
    	}
  		$scope.numRecords --;
  	}
  }

  function deleteRecord(index) {
//  	console.log("Index: " + index);
//  	console.log("Boolean: " + (angular.isDefined(index) && !isNaN(index)));
  	if (angular.isDefined(index) && !isNaN(index)) {
  		$scope.deleteIndex(index);
  		$scope.saveRecords();
  	}
  }

  function delta() {
  	$scope.now = Date.now(),
  	$scope.d   = $scope.now - $scope.offset;

  	$scope.offset = $scope.now;
  	if (isNaN($scope.d)) {
  		return(0);
  	}
  	return $scope.d;
  }

  function downloadClicked() {
  	$scope.downloadble = false;
  }

  function getCookies() {
  	try {

  		for (ind in $scope.records) {
//  			var timeObj = {index: newData.index[i], time: newData.time[i], millis: newData.millis[i], timeStamp: newData.timeStamp[i]};
  			$scope.records[ind] = $cookies.getObject($scope.recordsCookie + $scope.cookieOpts[ind]);
  		}

  		$scope.numRecords = $scope.records.index.length;
//  		console.log("Defined?: " + (typeof $scope.records));
//  		console.log("Records: " + angular.toJson($scope.records));
  		if (angular.isUndefined($scope.records)) {
//  			console.log("Caught #1");
  			$scope.numRecords = 0;
  			$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  			for (str in $scope.records) {
  				$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
  			}
  		}
  	} catch(e) {
//  		console.log("Caught #2");
  		$scope.numRecords = 0;
  		$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  		for (str in $scope.records) {
				$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
			}
  	}
  }

  function isEncoded() {
  	return ($scope.downloadable);
  }

  function render() {
  	if ((typeof $scope.clock) !== 'undefined' && !isNaN($scope.clock)) {
  		var minutes = (($scope.clock < 1000 * 60) ? "00" : (($scope.clock < 10 * 60 * 1000) ? "0" + Math.floor($scope.clock / 60000) : Math.floor($scope.clock / 60000)));
    	var seconds = ((($scope.clock % 60000) < 1000) ? ":00" : ((($scope.clock % 60000) < 1000 * 10) ? ":0" + Math.floor(($scope.clock % 60000) / 1000) : ":" + Math.floor(($scope.clock % 60000) / 1000)));
    	var milliseconds = ((($scope.clock % 1000) < 10) ? ".00" + parseInt($scope.clock % 1000) : (($scope.clock % 1000) < 100) ? ".0" + ($scope.clock % 1000) : "." + ($scope.clock % 1000));
    	$scope.time['string'] = minutes + seconds + milliseconds;
  	} else {
  		$scope.time['string'] = "00:00.000";
  	}
  }

  function reset() {
  	$scope.state.stopped = false;
  	$scope.clock = 0;
  	$scope.render();
  }

  function returnNames() {
  	if ($scope.state.running) {
  		return "Stop" ;
  	}
  		return "Start";

  }

  replaceAll = function(search, replacement, look) {
    var target = look;
    return target.replace(new RegExp(search, 'g'), replacement);
	};

  function convertDate(today) {

    var day = today.getDate();
    var month = 1 + today.getMonth();

    var dateOptions = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'EDT', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    //today = today.toLocaleFormat("%a %e %B %Y %I.%M.%S %p %Z");
    today = replaceAll(':', '.', today.toLocaleString(dateOptions));
    //console.log("Today: " + today);
    today = replaceAll('/', ' ', today);
    //console.log('Month: ' + month.toString());
    today = today.replace(month.toString(), "DAY");
    today = today.replace(day.toString(), "MONTH");
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    today = today.replace("MONTH", months[month - 1]);
    today = today.replace("DAY", day.toString());
    return today;
  }

  function returnObjects() {
  	if ($scope.state.running) {
//  		console.log('please help me 1 ' + $scope.time.string);
  		return $scope.stop();
  	}
//  		console.log('please help me 3 ' + $scope.time.string);
  		return $scope.start();
  }

  function save() {
  	$("#downloadLink").remove();
  	$scope.csvContent = "data:text/csv;charset=utf-8,";
  	$scope.csvContent += "\n" + "index,timeStamp,millis,time";
		var data = "index,timeStamp,millis,time";
		for (var i = 0; i < $scope.records.index.length; i++) {
			var infoArray = ["index", "timeStamp", "millis", "time"];
			var dataString = $scope.records[infoArray[0]][i] + ",";

			// if (typeof $scope.records['timeStamp'][i] === 'date') {
			// 	dataString += convertDate($scope.records['timeStamp'][i]) + ",";
			// } else {
			// 	dataString += $scope.records['timeStamp'][i] + ",";
			// }

			for (var j = 1; j < infoArray.length; j++) {
//				dataString += "," + $scope.records[infoArray[j]][i];
				var index = infoArray[j];
				var sep = ",";
				if (j == infoArray.length - 2) {
					sep = "";
				}
				dataString += $scope.records[index][i] + ",";
			}
			dataString = dataString.substring(0, dataString.length - 1);
			$scope.csvContent += "\n" + dataString;
			data += "\n" + dataString;
		}
  	$scope.encodedUri = encodeURI($scope.csvContent);
  	shortened = encodeURI(data);

  	var httpConfig = {method: "PUT",
  			url: "/data.csv",
  			data: shortened,
  			headers: {'content-type': 'data/csv;charset=utf-8'}
  	};


  	var httpPromise = $http.put('http://0.0.0.0:3000/data.csv', shortened	, httpConfig);
  	httpPromise.then(function success(response) {
  		console.log("Success: " + response.status + " " + response.statusText + " " + response.config.method);
  	}, function failed(response) {
  		console.log("Failure: " + response.status + " " + response.statusText + " " + response.config.method);
  	});

  	var link1 = document.createElement('a');
  	link1.setAttribute('href', "http://0.0.0.0:3000/data.csv");
  	link1.setAttribute('download', 'data.csv');
  	link1.setAttribute('id', "downloadLink");
  	$(link1).html("Download");
  	link1 = $(link1);
  	$("#saveButtonDiv").after(link1);
  }

  function saveRecords() {
  	if (angular.isDefined($scope.records.index)) {
  		for (str in $scope.records) {
  			$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
  		}
  	} else {
  		$cookies.putObject($scope.recordsCookie, $scope.records[str]);
  	}
  	$scope.myStats.loadData($scope.records);
  }

  function start() {
		$scope.reset();
		$scope.state.running = true;
		$scope.state.stopped = false;
	  $scope.offset   = Date.now();
	  $scope.interval = $interval($scope.update, $scope.options.delay);
	  $scope.render();
  }

  function stop() {
  	$scope.state.running = false;
  	$scope.state.stopped = true;
  	$interval.cancel($scope.interval);
		var date = new Date();
		date.setDate(date.getDate());
		$scope.numRecords++;
  	var timeRecordsObject = {index: ($scope.numRecords), time: "", millis: $scope.clock, timeStamp: date};
  	timeRecordsObject.time = $scope.time.string;
//  	$scope.records.push(timeRecordsObject);
  	saveTimeObject(timeRecordsObject);
  	$scope.saveRecords();
  	$scope.interval = undefined;
  	$scope.render();
  }

  function saveTimeObject(value) {
// 	console.log(angular.toJson($scope.records));
  	for (str in value) {
//  		console.log("Str: " + str);
  		$scope.records[str].push(value[str])
  	}
//		return {index: value.index[i], time: value.time[i], millis: value.millis[i], timeStamp: value.timeStamp[i]};
	}


  function update() {
  		$scope.clock += $scope.delta();
    	$scope.render();
//    	return $scope.display;
  }

}

angular.module('myApp')
  .service('TimesDownload', TimesDownload);

TimesDownload.$inject = ["$http"];

function TimesDownload($http) {
  var service = {};
  service.put = put;
  service.link = link;

  function link(data) {
    $("#downloadLink").remove();
    var link1 = document.createElement('a');
    link1.setAttribute('href', "http://0.0.0.0:3000/data.csv");
    link.setAttribute('download', 'data.csv');
    link1.attribute('id', 'downloadLink');
    $(link1).html("Download");
    link1 = $(link1);
    $("#saveButtonDiv").after(link1);
  }

  function put(shortened) {
    var httpConfig = {
      methon: "PUT",
      url: "/data.csv",
      data: shortened,
      headers: {
        'content-type': 'data/csv;charset=utf-8'
      }
    }

    var httpPromise = $http.put('http://0.0.0.0:3000/data.csv', shortened	, httpConfig);
  	httpPromise.then(function success(response) {
  		console.log("Success: " + response.status + " " + response.statusText + " " + response.config.method);
  	}, function failed(response) {
  		console.log("Failure: " + response.status + " " + response.statusText + " " + response.config.method);
  	});
  }
}
