/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.controller('ContentController', ContentController);

ContentController.$inject = ['$scope', 'cases', 'hiddenRowsY', 'cookieStrings', 'flashCardData', '$cookies',  'orderByFilter', 'filterFilter'];

function ContentController($scope, cases, hiddenRows, cookieString, flashData, $cookies, orderBy, filterFilter) {
	
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
	$scope.practiceCards = flashData.getPracticeCards();
	$scope.practicing = flashData.getPracticing();
	$scope.returnSolve = returnSolve;
	$scope.setFilter = setFilter;
	$scope.setSort = setSort;
	$scope.showHiddenCols = showHiddenCols;
	$scope.showHiddenRows = showHiddenRows;
	$scope.useCookieInfo = useCookieInfo;

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
				algorithmCol: false};
		
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
//			console.log("cardPriorities?: " + angular.toJson($scope.cardPriorities));
			if (angular.isDefined($scope.cardPriorities)) {
				if (angular.isDefined($scope.cardPriorities[myCase.code])) {
					return($scope.showing.algorithmCol && angular.isNumber(parseInt($scope.cardPriorities[myCase.code])) && myCase.solve2.length > 0);
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
		console.log(string);
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

	
	$scope.$watchCollection('$scope.practicing', function(newValue, oldValue) {
		// Content, flashcards (mostly flashcards, but heavily dependent on cases)
		
		for (var i = 0; i < $scope.cases.length; i++) {
			if (newValue[$scope.cases[i].code] !== undefined) {
				if (newValue[$scope.cases[i].code]) {
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
};