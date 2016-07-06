/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.controller('ContentController', ContentController);

ContentController.$inject(['$scope', 'cases', 'hiddenRowsY', 'cookieStrings', 'flashCardData', '$cookies',  'orderByFilter', 'filterFilter']);

function ContentController($scope, cases, hiddenRows, cookieString, flashData, $cookies, orderBy, filterFilter) {
	

	$scope.cases = cases;
	$scope.cookieString = cookieString;
	$scope.hiddenRows = hiddenRows;
	
	// Flashcard stuff - dependent on the content
	$scope.practicing = flashData.data.practicing;
	$scope.practiceCards = flashData.data.practiceCards;
	$scope.cardOptions = flashData.data.cardOptions;
	$scope.cardPriorities = flashData.data.cardPriorities;
	$scope.cards = flashData.data.cards;
	$scope.useCookieInfo = useCookieInfo();
	
	function useCookieInfo() {
		// Content, Info
		$scope.hiddenRowsData();
		$scope.hiddenColsData();
		$scope.flashCardsData();
	};
	
	function returnAddress(value) {
		var string = "img/" + value + ".png";
		console.log(string);
		return string;
	}

	function declassify(event) {
		var str = $(event.target).attr("id");
//		str = str.substring(1, str.length);
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
	
	$scope.flashCardsData = function() {
		console.log("Practicing: " + angular.toJson($scope.practicing));
		
		flashData.initialize();
		
		console.log("Practicing: " + angular.toJson(flashData.data.practicing));
		console.log("New Practicing: " + angular.toJson($scope.practicing));
		
		$scope.practicing = flashData.data.practicing;
		$scope.practiceCards = flashData.data.practiceCards;
		$scope.cardOptions = flashData.data.cardOptions;
		$scope.cardPriorities = flashData.data.cardPriorities;
		$scope.cards = flashData.data.cards;
		
		console.log("Practicing: " + angular.toJson($scope.practicing));
		
		$scope.addPriorityOptions();
//		addOptions($scope.cards.maxNumber);
	};
	
	$scope.$watchCollection('practiceCards', function(newValue, oldValue) {
//		$cookies.putObject($scope.cookieString.practiceCards, newValue);
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
//		console.log(angular.toJson(newValue));
//		$cookies.putObject($scope.cookieString.cardPriorities, newValue);
	});
	
	$scope.$watchCollection('cardOptions', function(newValue, oldValue){
		for (var i = 0; i < $scope.practiceCards.length; i++) {
			for (var ind in newValue) {
				if (ind == $scope.practiceCards[i].code) {
					$scope.practiceCards[i].option = newValue[ind];
				}
			}
		}
//		$cookies.putObject($scope.cookieString.cardOptions, newValue);
		flashData.saveCardOptions(newValue);
	});

	
	$scope.$watchCollection('practicing', function(newValue, oldValue) {
		// Content, flashcards (mostly flashcards, but heavily dependent on cases)
//		var str = "";
//		for (var i in newValue) {
//			str = str.concat(i + " " + newValue[i] + " | ");
//		}
		
		
		for (var i = 0; i < $scope.cases.length; i++) {
//			console.log(newValue[$scope.cases[i].code]);
			if (newValue[$scope.cases[i].code] !== undefined) {
				if (newValue[$scope.cases[i].code]) {
					if ($scope.practiceCards.length == 0) {
						$scope.practiceCards.push({});
						angular.copy($scope.cases[i], $scope.practiceCards[$scope.practiceCards.length - 1]);
						$scope.practiceCards[$scope.practiceCards.length - 1].priority = 0;
					} else {
						for (var j = 0; j < $scope.practiceCards.length; j++) {
							if ($scope.practiceCards[j].code == $scope.cases[i].code) {
//								console.log("broken");
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
//		$cookies.putObject($scope.cookieString.practicing, newValue);
		
//		var str1 = "";
//		for (var i = 0; i < $scope.practiceCards.length; i++) {
//			str1 = str1.concat(angular.toJson($scope.practiceCards[i]) + "  |  ");
//		}
//		str = str.substring(0, str.length - 3);
//		str1 = str1.substring(0, str1.length - 3);
//		console.log(str);
//		console.log(str1);
	});
	
	$scope.$watchCollection('cards', function(newValue, oldValue) {
		// Content, flashcards
//		console.log("Watched cards: " + angular.toJson(newValue));
		$cookies.putObject($scope.cookieString.cards, newValue);
//		console.log("New Value: " + newValue.maxNumber);
//		console.log("New cookie: " + angular.toJson($cookies.getObject($scope.cookieString.cards)));
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
//				console.log(JSON.stringify($scope.hiddenRows));
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
//		$cookies.putObject($scope.cookieString.hiddenCols, $scope.hidden);
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
//		console.log("Tried to count cases");
		var count = 0;
		var prob = 0;
		for (var idx in $scope.hiddenRows) {
			if ($scope.hiddenRows[idx] == 1) {
				count++;
				prob += $scope.prob[idx];
//				console.log("Count incremented");
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
//			console.log(typeof $scope.practiceCards);
			$scope.practiceButton = ($scope.showing.flashCardCol && $scope.practiceCards.length !== $scope.cards.maxNumber) ? "Done Selecting" : (($scope.showing.flashCardCol) ? "Selecting..." : "Select cases to practice");
//			if ($scope.showing.priorityCol) {
////				addOptions($scope.cards.maxNumber);
//			}
			$scope.addPriorityOptions();
		}
	};
	
	$scope.pickAnAlgorithm = function(myCase) {
//		console.log(myCase.code + ": " + angular.isDefined($scope.cardPriorities[myCase.code]) + "  " + $scope.cardPriorities[myCase.code]);
//		console.log(myCase.code + " " + $scope.cardPriorities[myCase.code] + " " + angular.toJson(myCase) + " " + myCase.solve2.length > 0);		
		if (angular.isDefined($scope.cardPriorities[myCase.code])) {
			console.log(myCase.code + " :   " +  myCase.solve2.length + " : " + (myCase.solve2.length > 0) + " ; " + $scope.cardPriorities[myCase.code] + " : " + (angular.isString($scope.cardPriorities[myCase.code])));
			return($scope.showing.algorithmCol && angular.isNumber(parseInt($scope.cardPriorities[myCase.code])) && myCase.solve2.length > 0);
		} else {
			return(false);
		}
	};
	
	// Content, controls
	$scope.modifyKnownCases = function() {
//		$scope.knownCases.editMessage = ($scope.knownCases.editMessage === "Select Known Cases to Hide") ? "Save Known Cases" : "Select Known Cases to Hide";
//		console.log("EditCol: " + $scope.showing.editCol);
		$scope.showing.editCol = !$scope.showing.editCol;
//		console.log("After - EditCol: " + $scope.showing.editCol);
		
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
//				console.log(id);
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
	};
	
	$scope.setSort = function(column) {
		// Content only
		$scope.column = column;
		$scope.reverse = !$scope.reverse;
	};
	
	$scope.filterString = '';
	$scope.setFilter = function() {
		// Content only
//		console.log($scope.filterString);
		$scope.filteredCases = filterFilter($scope.cases, $scope.filterString);
	};
};