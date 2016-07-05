/**
 * http://usejsdoc.org/
 */
var app = angular.module('myApp', ['ngCookies', 'ngSanitize', 'ollCaseContent', 'flashCards', 'cubeScrambler']);

app.config(function($cookiesProvider) {
		var date = new Date();
		date.setDate(date.getDate() + 60);
//		console.log(date.toTimeString());
		$cookiesProvider.defaults.expires = date.toUTCString();
	});

app.value('cases', [
		                {num: 27, code: "OCLL1", solve1: {alg: "(R U R' U) R U2 R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 26, code: "OCLL2", solve1: {alg: "R U2 R' U' R U' R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 22, code: "OCLL3", solve1: {alg: "[f (R U R' U') f'] [F (R U R' U') F']",  length: 12}, solve2: {alg: "R U2' R2' U' R2 U' R2' U2 R2", length: 9}, prob: 1/54},
		                {num: 21, code: "OCLL4", solve1: {alg: "F (R U R' U') (R U R' U') (R U R' U') F'",  length: 14}, solve2: {alg: "y (R' U' R) U' (R' U R) U' (R' U2 R)", length: 12}, prob: 1/108},
		                {num: 24, code: "OCLL5", solve1: {alg: "(r U R' U') (r' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 25, code: "OCLL6", solve1: {alg: "F' (r U R' U') (r' F R)",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 23, code: "OCLL7", solve1: {alg: "R2 [D (R' U2) R] [D' (R' U2) R']",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 58, code: "OCLL8", solve1: {alg: "",  length: 0}, solve2: {alg: "", length: 0}, prob: 1/216},
		                {num: 57, code: "E1", solve1: {alg: "(R U R' U') M' (U R U' r')",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 28, code: "E2", solve1: {alg: "M' U M U2 M' U M",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 44, code: "P1", solve1: {alg: "f (R U R' U') f'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 43, code: "P2", solve1: {alg: "f' (L' U' L U) f",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 32, code: "P3", solve1: {alg: "R U B' U' R' U R B R'",  length: 9}, solve2: {alg: "R D L' D' R' U R B R'", length: 9}, prob: 1/54},
		                {num: 31, code: "P4", solve1: {alg: "R' U' F U R U' R' F' R",  length: 9}, solve2: {alg: "y2 L' d' R d L U' L' B' L", length: 9}, prob: 1/54},
		                {num: 38, code: "W1", solve1: {alg: "(R U R' U) (R U' R' U') (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 36, code: "W2", solve1: {alg: "(L' U' L U') (L' U L U) (L F' L' F)",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 6, code: "S1", solve1: {alg: "r U2 R' U' R U' r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 5, code: "S2", solve1: {alg: "r' U2 (R U R' U) r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 48, code: "L1", solve1: {alg: "F (R U R' U') (R U R' U') F'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 47, code: "L2", solve1: {alg: "F' (L' U' L U) (L' U' L U) F",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 53, code: "L3", solve1: {alg: "l' U' L U' L' U L U' L' U2 l",  length: 11}, solve2: {alg: "y2 r' U' R U' R' U R U' R' U2 r", length: 12}, prob: 1/54},
		                {num: 54, code: "L4", solve1: {alg: "(r U R' U) R U' R' U R U2' r'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 49, code: "L5", solve1: {alg: "(R' F R' F') R2 U2 y (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 50, code: "L6", solve1: {alg: "R' F R2 B' R2' F' R2 B R'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 9, code: "F1", solve1: {alg: "(R' U' R) y' x' (R U') (R' F) (R U R')",  length: 12}, solve2: {alg: "(R U R' U')R' F R2 U R' U' F'", length: 11}, prob: 1/54},
		                {num: 10, code: "F2", solve1: {alg: "R U R' y R' F R U' R' F' R",  length: 11}, solve2: {alg: "(R U R' U)(R' F R F') R U2 R'", length: 11}, prob: 1/54},
		                {num: 35, code: "F3", solve1: {alg: "(R U2 R') (R' F R F') (R U2 R')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 37, code: "F4", solve1: {alg: "F R U' R' U' R U R' F'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 30, code: "A1", solve1: {alg: "R2 U R' B' R U' R2 U R B R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 29, code: "A2", solve1: {alg: "(R U R' U') R U' R' F' U' F R U R'",  length: 13}, solve2: {alg: "[F (R U R' U') F'] U2 [(R U R' U') (R' F R F')", length: 15}, prob: 1/54},
		                {num: 41, code: "A3", solve1: {alg: "[(R U R' U) R U2 R'] [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 42, code: "A4", solve1: {alg: "[R' U2 (R U R' U) R] y [F (R U R' U') F']",  length: 14}, solve2: {alg: "(R' F R F') (R' F R F') (R U R' U') (R U R')", length: 15}, prob: 1/54},
		                {num: 7, code: "LB1", solve1: {alg: "(r U R' U) R U2 r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 8, code: "LB2", solve1: {alg: "r' U' R U' R' U2 r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 11, code: "LB3", solve1: {alg: "[F' (L' U' L U) F] y [F (R U R' U') F']",  length: 13}, solve2: {alg: "y (r U R' U) (R' F R F') R U2 r'", length: 11}, prob: 1/54},
		                {num: 12, code: "LB4", solve1: {alg: "[F (R U R' U') F'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 39, code: "LB5", solve1: {alg: "R B' R' U' R U B U' R'",  length: 9}, solve2: {alg: "y2 L F' (L' U' L U) F U' L'", length: 10}, prob: 1/54},
		                {num: 40, code: "LB6", solve1: {alg: "R' [F (R U R' U') F'] U R",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 45, code: "T1", solve1: {alg: "F (R U R' U') F'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 33, code: "T2", solve1: {alg: "(R U R' U') (R' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 46, code: "C1", solve1: {alg: "R' U' (R' F R F') U R",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 34, code: "C2", solve1: {alg: "(R U R2' U') (R' F) (R U) (R U') F'",  length: 11}, solve2: {alg: "(R U R' U') x D' R' U R U' D x'", length: 12}, prob: 1/54},
		                {num: 55, code: "I1", solve1: {alg: "R' U2 R2 U R' U R U2 x' U' R' U",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 52, code: "I2", solve1: {alg: "(R U R' U) R d' R U' R' F'",  length: 10}, solve2: {alg: "R' U' R U' R' d R' U R B", length: 10}, prob: 1/54},
		                {num: 56, code: "I3", solve1: {alg: "F (R U R' U') R F' (r U R' U') r'",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 51, code: "I4", solve1: {alg: "f (R U R' U') (R U R' U') f'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 16, code: "K1", solve1: {alg: "(r U r') (R U R' U') (r U' r')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 15, code: "K2", solve1: {alg: "(l' U' l) (L' U' L U) (l' U l)",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 13, code: "K3", solve1: {alg: "F U R U' R2 F' R (U R U' R')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 14, code: "K4", solve1: {alg: "R' F R U R' F' R y' R U' R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 1, code: "O1", solve1: {alg: "R U2 R' (R' F R F') U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 2, code: "O2", solve1: {alg: "[F (R U R' U') F'] [f (R U R' U') f']",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 3, code: "O3", solve1: {alg: "[f (R U R' U') f'] U' [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 4, code: "O4", solve1: {alg: "[f (R U R' U') f'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 18, code: "O5", solve1: {alg: "[F (R U R' U) F'] y' U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 19, code: "O6", solve1: {alg: "M U (R U R' U') M' (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 17, code: "O7", solve1: {alg: "(R U R' U) (R' F R F') U2 (R' F R F')",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 20, code: "O8", solve1: {alg: "M U (R U R' U') M2 (U R U' r')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/216}]);

app.value('cookieStrings', {
	hiddenRows: "OLLHiddenRowsCookie", 
	hiddenCols: "OLLHiddenCookie", 
	cards: "OLLMaxNumCards",
	practicing: "OLLPracticing",
	practiceCards: "OLLPracticeCards",
	cardOptions: "OLLCardOptions",
	cardPriorities: "OLLCardPriorities",
	dataCards: "OLLDataCards"});
app.value('cookieData', {
			practicing: {},
			practiceCards: [],
			cardPriorities: {},
			cardOptions: {},
			practiceButton: "Select cases to practice"
	});
app.value('cookieDataTypes', {
			practicing: "object",
			practiceCards: "object",
			cardPriorities: "object",
			cardOptions: "object",
			practiceButton: "string"
});
app.value('hiddenRowsY', {});


app.filter('colorCodeAlgorithms', function() {
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
//			console.log("1: " + input + " | " + output);
			if (output !== "") {
				for (var i = 0; i < groupsToHide.length; i++) {
					// Need a regex that replaces all instances instead of just one instance
					var regex = new RegExp(groupsToHide[i], "g");
					// Uses replace to insert the new text from replacementText[i]
					// where the regex found a match
					output = output.replace(regex, replacementText[i]);
				}
//				console.log("2: " + input + " | " + output);
			} else {
				output = "[N/A]"
			}
			return(output);
		};
	});

app.directive('flashCardDisplay', function() {
	return {
		transclude: true,
		restrict: 'E',
		scope: {cards: '@cards'},
		templateUrl: 'flashCards.html'
	};
})
	.directive('flashCard', function() {
		return {
			transclude: true,
			restrict: 'E',
			scope: {title: '@title', cardsrc: '@cardsrc', cardcode: '@cardcode', cardprob: '@cardprob', cardalg: '@cardalg'},
			templateUrl: 'flashcard.html',
			link: function(scope, elem, atr, controller, transclude) {
			}
		};
	});

app.directive('ollRow', function() {
	return {
		transclude: true,
		scope: {mycases: "@mycases", mycolumn: "@mycolumn", myreverse: "@myreverse"},
		restrict: 'E',
		templateUrl: 'oll_row.html'
	};
});





app.controller("infoController", function($scope) {
		
	});




function returnAddress(value) {
	var string = "img/" + value + ".png";
	console.log(string);
	return string;
}

function declassify(event) {
	var str = $(event.target).attr("id");
//	str = str.substring(1, str.length);
	return str;
}

function addOptions(max) {
	// most likely obsolete
	var priorities = $("select .priorities");
	priorities.remove();
	priorities.each(function() {
		for (var i = 1; i <= max; i++) {
			this.append("<option>" + i + "</option>");
		}
	})
}