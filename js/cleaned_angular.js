/**
 * http://usejsdoc.org/
 */
var app = angular.module('myApp', ['ngCookies', 'ngSanitize']);

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
	maxFlashCards: "OLLMaxNumCards",
	practicing: "OLLPracticing",
	practiceCards: "OLLPracticeCards",
	cardOptions: "OLLCardOptions",
	cardPriorities: "OLLCardPriorities"});

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


app.controller('ContentController', ['$scope', 'cases', 'hiddenRowsY', 'cookieStrings','$cookies',  'orderByFilter', 'filterFilter', function($scope, cases, hiddenRows, cookieString, $cookies, orderBy, filterFilter) {
		$scope.cases = cases;
		$scope.cookieString = cookieString;
		$scope.hiddenRows = hiddenRows;
		
		// Flashcard stuff - dependent on the content
		$scope.practicing = {};
		$scope.practiceCards = [];
		$scope.cardPriorities = {};
		$scope.cardOptions = {};
		$scope.practiceButton = "Select cases to practice";	
		
		$scope.useCookieInfo = function() {
			// Content, Info
			$scope.hiddenRowsData();
			$scope.hiddenColsData();
			$scope.flashCardsData();
		};
		
		$scope.flashCardsData = function() {
			// Content, Info, Flashcards
			
			// Have cards, practicing, cardOptions, cardPriorities, and practiceCards
			$scope.cards = {maxNumber: 0, options: []};
			try {
				$scope.cards = $cookies.getObject($scope.cookieString.maxFlashCards);
				console.log(typeof $scope.cards.maxNumber);
				console.log(typeof $scope.cards.options);
				console.log(typeof $scope.cards);
				if (!angular.isNumber($scope.cards.maxNumber)) {
//					$scope.cards = {maxNumber: 0, options: []};
					$scope.cards.maxNumber = parseInt($scope.cards.maxNumber);
					$cookies.putObject($scope.cookieString.maxFlashCards, $scope.cards);
				}
			} catch(e) {
				$scope.cards = {maxNumber: 0, options: []};
				$cookies.putObject($scope.cookieString.maxFlashCards, $scope.cards);
			}
			
			// practicing
			try {
				$scope.practicing = $cookies.getObject($scope.cookieString.practicing);
				if (angular.isUndefined($scope.practicing)) {
					$scope.practicing = {};
					$cookies.putObject($scope.cookieString.practicing, $scope.practicing);
				}
			} catch (e) {
				$scope.practicing = {};
				$cookies.putObject($scope.cookieString.practicing, $scope.practicing);
			}
			
			// cardOptions
			try {
				$scope.cardOptions = $cookies.getObject($scope.cookieString.cardOptions);
				if (angular.isUndefined($scope.cardOptions)) {
					$scope.cardOptions = {};
					$cookies.putObject($scope.cookieString.cardOptions, $scope.cardOptions);
				}
			} catch (e) {
				$scope.cardOptions = {};
				$cookies.putObject($scope.cookieString.cardOptions, $scope.cardOptions);
			}
			
			// cardPriorities
			try {
				$scope.cardPriorities = $cookies.getObject($scope.cookieString.cardPriorities);
				if (angular.isUndefined($scope.cardPriorities)) {
					$scope.cardPriorities = {};
					$cookies.putObject($scope.cookieString.cardPriorities, $scope.cardPriorities);
				}
			} catch (e) {
				$scope.cardPriorities = {};
				$cookies.putObject($scope.cookieString.cardPriorities, $scope.cardPriorities);
			}
			
			//practiceCards {
			try {
				$scope.practiceCards = $cookies.getObject($scope.cookieString.practiceCards);
				if (angular.isUndefined($scope.practiceCards)) {
					$scope.practiceCards = [];
					$cookies.putObject($scope.cookieString.practiceCards, $scope.practiceCards);
				}
			} catch (e) {
				$scope.practiceCards = [];
				$cookies.putObject($scope.cookieString.practiceCards, $scope.practiceCards);
			}
			
			$scope.addPriorityOptions();
//			addOptions($scope.cards.maxNumber);
		};
		
		$scope.$watchCollection('practiceCards', function(newValue, oldValue) {
			$cookies.putObject($scope.cookieString.practiceCards, newValue);
		});
		
		$scope.$watchCollection('cardPriorities', function(newValue, oldValue){
			for (var i = 0; i < $scope.practiceCards.length; i++) {
				for (var ind in newValue) {
					if (ind == $scope.practiceCards[i].code) {
						$scope.practiceCards[i].priority = newValue[ind];
					}
				}
			}
			$cookies.putObject($scope.cookieString.cardPriorities, newValue);
		});
		
		$scope.$watchCollection('cardOptions', function(newValue, oldValue){
			for (var i = 0; i < $scope.practiceCards.length; i++) {
				for (var ind in newValue) {
					if (ind == $scope.practiceCards[i].code) {
						$scope.practiceCards[i].option = newValue[ind];
					}
				}
			}
			$cookies.putObject($scope.cookieString.cardOptions, newValue);
		});

		
		$scope.$watchCollection('practicing', function(newValue, oldValue) {
			// Content, flashcards (mostly flashcards, but heavily dependent on cases)
//			var str = "";
//			for (var i in newValue) {
//				str = str.concat(i + " " + newValue[i] + " | ");
//			}
			
			
			for (var i = 0; i < $scope.cases.length; i++) {
//				console.log(newValue[$scope.cases[i].code]);
				if (newValue[$scope.cases[i].code] !== undefined) {
					if (newValue[$scope.cases[i].code]) {
						if ($scope.practiceCards.length == 0) {
							$scope.practiceCards.push({});
							angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
							$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
						} else {
							for (var j = 0; j < $scope.practiceCards.length; j++) {
								if ($scope.practiceCards[j].code == $scope.cases[i].code) {
//									console.log("broken");
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
			$cookies.putObject($scope.cookieString.practicing, newValue);
			
//			var str1 = "";
//			for (var i = 0; i < $scope.practiceCards.length; i++) {
//				str1 = str1.concat(angular.toJson($scope.practiceCards[i]) + "  |  ");
//			}
//			str = str.substring(0, str.length - 3);
//			str1 = str1.substring(0, str1.length - 3);
//			console.log(str);
//			console.log(str1);
		});
		
		$scope.$watchCollection('cards', function(newValue, oldValue) {
			// Content, flashcards
			console.log("Watched cards: " + angular.toJson(newValue));
			$cookies.putObject($scope.cookieString.maxFlashCards, newValue);
			console.log("New Value: " + newValue.maxNumber);
			console.log("New cookie: " + angular.toJson($cookies.getObject($scope.cookieString.maxFlashCards)));
			if (newValue.maxNumber !== oldValue.maxNumber) {
				$scope.addPriorityOptions();
			}
		});
		
		$scope.hiddenRowsData = function() {
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
			
		};
		
		$scope.addPriorityOptions = function() {
			// Content, flashcards, info
			$scope.cards.options = [];
			for (var i = 1; i <= $scope.cards.maxNumber; i++) {
				$scope.cards.options.push(i);
			}
		};
		
		$scope.hiddenColsData = function() {
			// Content mostly
//			$cookies.putObject($scope.cookieString.hiddenCols, $scope.hidden);
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
		};
				
		$scope.animationOpts = {duration: 1000};
		
		// Content, Info
		$scope.number = {knownCases: 0, cases: 58, percent: 0, prob: 0};
		
		$scope.countCases = function() {
			// Content, info
//			console.log("Tried to count cases");
			var count = 0;
			var prob = 0;
			for (var idx in $scope.hiddenRows) {
				if ($scope.hiddenRows[idx] == 1) {
					count++;
					prob += $scope.prob[idx];
//					console.log("Count incremented");
				}
			}
			
			$scope.number.knownCases = count;
			$scope.number.percent = 100 * ($scope.number.knownCases / $scope.number.cases);
			$scope.number.prob = prob * 100;
		};
		
		
		// Inits all of my things
		$scope.initialize = function() {
			// Table row/column info
			// Mostly content, some used for flashcards and info
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
					algorithmCol: false};
			
			// Editing helper - content, info/controls
			$scope.editString = "Save Table Configuration";
			
			// Stores the strings for the cookies
			// Content, flashcards
			
			$scope.useCookieInfo();
			// Content, info
			$scope.knownCases = {editMessage: ($scope.showing.editCol === true) ? "Save Known Cases" : "Select Known Cases to Hide"};
			
			
		// Temporary stuff that I'm just trying out
			$scope.htmlTest = {value:"<em>Some emphasized text</em>"};
		};
		
		// Set up everything
		$scope.initialize();
		
		// Flashcards - dependent on Content
		$scope.editCardSelection = function() {
			if ($scope.practiceButton !== "Selecting..." || $scope.practiceCards.length === $scope.cards.maxNumber) {
				$scope.showing.flashCardCol = !$scope.showing.flashCardCol;
				$scope.showing.priorityCol = !$scope.showing.priorityCol;
				$scope.showing.algorithmCol = !$scope.showing.algorithmCol;
//				console.log(typeof $scope.practiceCards);
				$scope.practiceButton = ($scope.showing.flashCardCol && $scope.practiceCards.length !== $scope.cards.maxNumber) ? "Done Selecting" : (($scope.showing.flashCardCol) ? "Selecting..." : "Select cases to practice");
//				if ($scope.showing.priorityCol) {
////					addOptions($scope.cards.maxNumber);
//				}
				$scope.addPriorityOptions();
			}
		};
		
		$scope.pickAnAlgorithm = function(myCase) {
			if (angular.isDefined($scope.cardPriorities[myCase.code])) {
				return($scope.showing.algorithmCol && angular.isNumber($scope.cardPriorities[myCase.code]) && myCase.solve2.length > 0);
			} else {
				return(false);
			}
		};
		
		// Content, controls
		$scope.modifyKnownCases = function() {
//			$scope.knownCases.editMessage = ($scope.knownCases.editMessage === "Select Known Cases to Hide") ? "Save Known Cases" : "Select Known Cases to Hide";
//			console.log("EditCol: " + $scope.showing.editCol);
			$scope.showing.editCol = !$scope.showing.editCol;
//			console.log("After - EditCol: " + $scope.showing.editCol);
			
		};
		
		$scope.returnSolve = function(card) {
			if (card.solve2.length > 0) {
				return (card.option == 1) ? card.solve1.alg : card.solve2.alg;
			} else {
				return(card.solve1.alg);
			}
		};
		
		
		$scope.$watch('showing.editCol', function(newValue, oldValue) {
			// Content, flashcards, controls
			console.log("Watched knownCases.editMessage");
//			console.log($scope.knownCases.editMessage);
			$scope.knownCases.editMessage = (newValue) ? "Save Known Cases" : "Select Known Cases to Hide";
			
			if (newValue) {
				$scope.showHiddenRows();
			} else {
				$scope.hideHiddenRows();
			}
//			console.log($scope.knownCases.editMessage);
		});
		
		
		$scope.$watchCollection('hiddenRows', function(newValue, oldValue) {
			// Content, floashcards, controls, cookies
			$cookies.putObject($scope.cookieString.hiddenRows, newValue);
			$scope.countCases();
//			console.log("Saved Hidden Rows");
//			console.log($cookies.get($scope.cookieString.hiddenRows));
		});
		
		
		$scope.$watchCollection('hidden', function(newValue, oldValue) {
			// Cookies, content
			$cookies.putObject($scope.cookieString.hiddenCols, newValue);
//			console.log("Saved Hidden Columns");
//			console.log($cookies.get($scope.cookieString.hiddenCols));
		});
		
		$scope.showHiddenRows = function() {
			// Useful...
			for (id in $scope.hiddenRows) {
				if ($scope.hiddenRows[id] == 1) {
					$("." + id).show();
				}
			}
		};
		
		$scope.hideHiddenRows = function() {
			// Useful...
			for (id in $scope.hiddenRows) {
				if ($scope.hiddenRows[id] == 1) {
//					console.log(id);
					$("." + id).hide();
				}
			}
		};
		
		$scope.hideHiddenCols = function() {
			for (var ind = 0; ind < $scope.classes.length; ind++) {
				if ($scope.hidden[$scope.classes[ind]] == 1) {
					$($scope.colClasses[ind]).hide();
				}
			}
		};
		
		$scope.showHiddenCols = function() {
			for (var ind = 0; ind < $scope.cols.length; ind++) {
				if ($scope.hidden[$scope.classes[ind]] == 1) {
					$($scope.colClasses[ind]).show();
				}
			}
		};
		
		$scope.editTable = function() {
			// Mostly content
			$scope.editString = ($scope.editString == "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
			
//			$scope.showingEditRow = !$scope.showingEditRow;
//			$scope.showingEditCol = !$scope.showingEditCol;
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
		};
		
		$scope.setSort = function(column) {
			// Content only
			$scope.column = column;
			$scope.reverse = !$scope.reverse;
		};
		
		$scope.filterString = '';
		$scope.setFilter = function() {
			// Content only
//			console.log($scope.filterString);
			$scope.filteredCases = filterFilter($scope.cases, $scope.filterString);
		};
	}]);


app.controller("infoController", function($scope) {
		
	});


app.controller('cubeScrambler', ['$scope', 'hiddenRowsY', function($scope, hiddenRows) {
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
		          		
		$scope.code = "";
		$scope.blah = hiddenRows;
		          		
		$scope.scramble = function() {
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
	$scope.scramble();
}]);

app.controller('timerController', ['$scope', '$interval', '$cookies', function($scope, $interval, $cookies) {
    $scope.offset;
    $scope.clock;
    $scope.state;
    $scope.options;
    $scope.interval = null;
    $scope.records = [];
    $scope.recordsCookie = "TimeRecordsCookie";
    
    $scope.getCookies = function() {
    	try {
    		$scope.records = $cookies.getObject($scope.recordsCookie);
    		if (angular.isUndefined($scope.records)) {
    			$scope.records = [];
    			$scope.putObject($scope.recordsCookie, $scope.records);
    		}
    	} catch(e) {
//    		console.log("caught!");
    		$scope.records = [];
    		$cookies.putObject($scope.recordsCookie, $scope.records);
    	}
    }
    
    // default options
    $scope.options = {delay: 5};
    $scope.getCookies();
    
    // Another one of my additions:
    $scope.state = {running: false, stopped: false};
    $scope.time = {string: "00:00.00"};
    $scope.displayTimeString = "00:00.00";
    $scope.clock = 0;
    
    $scope.returnObjects = function() {
    	if ($scope.state.running) {
    		console.log('please help me 1 ' + $scope.time.string);
    		$scope.stop();
    	} else {
    		console.log('please help me 3 ' + $scope.time.string);
    		$scope.start();
    	}
    };
    
    $scope.returnName = function() {
    	if ($scope.state.running) {
    		return("Stop");
    	} else {
    		return("Start");
    	}
    }
    
    $scope.start = function() {
    		$scope.reset();
    		console.log("helllpppp");
    		$scope.state.running = true;
    		$scope.state.stopped = false;
    	  $scope.offset   = Date.now();
    	  $scope.interval = $interval($scope.update, $scope.options.delay);
    };
    
    $scope.stop = function() {
    		$scope.state.running = false;
    		$scope.state.stopped = true;
    		$scope.records.push($scope.time.string);
    	  $interval.cancel($scope.interval);
    	$scope.render();
    };
    
    $scope.reset = function() {
    	$scope.state.stopped = false;
    	$scope.clock = 0;
    	$scope.render();
    };
    
    $scope.update = function() {
    		$scope.clock += $scope.delta();
      	$scope.render();
//    	return $scope.display;
    };
    
    $scope.render = function() {
    	var minutes = (($scope.clock < 1000 * 60) ? "00" : (($scope.clock < 10 * 60 * 1000) ? "0" + Math.floor($scope.clock / 60000) : Math.floor($scope.clock / 60000)));
    	var seconds = ((($scope.clock % 60000) < 1000) ? ":00" : ((($scope.clock % 60000) < 1000 * 10) ? ":0" + Math.floor(($scope.clock % 60000) / 1000) : ":" + Math.floor(($scope.clock % 60000) / 1000)));
    	var milliseconds = ((($scope.clock % 1000) < 10) ? ".00" + parseInt($scope.clock % 1000) : (($scope.clock % 1000) < 100) ? ".0" + ($scope.clock % 1000) : "." + ($scope.clock % 1000));
    	$scope.time.string = minutes + seconds + milliseconds;
    };
    
    $scope.delta = function() {
    	$scope.now = Date.now(),
    	$scope.d   = $scope.now - $scope.offset;
    	
    	$scope.offset = $scope.now;
    	if (isNaN($scope.d)) {
    		return(0);
    	}
    	return $scope.d;
    };
    
    $scope.$watchCollection('time', function(newValue, oldValue) {
//    	console.log("scope fired");
    	$scope.displayTimeString = $scope.time.string;
    });
    
    $scope.$watchCollection('records', function(newValue, oldValue) {
    	console.log("Filed!");
    	$cookies.putObject($scope.recordsCookie, newValue);
    	console.log("Cookie records: \n" + angular.toJson($cookies.getObject($scope.recordsCookie)));
    });
    
    console.log("help");
    
    $scope.reset();
	}]);

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