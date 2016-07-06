/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.controller('ContentController', ContentController);

ContentController.$inject = ['$scope', 'cases', 'hiddenRowsY', 'cookieStrings', 'flashCardData', '$cookies',  'orderByFilter', 'filterFilter'];

function ContentController($scope, cases, hiddenRows, cookieString, flashData, $cookies, orderBy, filterFilter) {
	var vm = this;
	
	vm.addPriorityOptions = addPriorityOptions;
	vm.animationOpts = {duration: 1000};
	vm.cardOptions = flashData.data.cardOptions;
	vm.cardPriorities = flashData.data.cardPriorities;
	vm.cards = flashData.data.cards;
	vm.cases = cases;
	vm.cookieString = cookieString;
	vm.countCases = countCases;
	vm.editCardSelection = editCardSelection;
	vm.editTable = editTable;
	vm.filterString = '';
	vm.flashCardsData = flashCardsData;
	vm.hiddenColsData = hiddenColsData;
	vm.hiddenRows = hiddenRows;
	vm.hiddenRowsData = hiddenRowsData;
	vm.hideHiddenCols = hideHiddenCols;
	vm.hideHiddenRows = hideHiddenRows;
	vm.initialize = initialize;
	vm.modifyKnownCases = modifyKnownCases;
	vm.number = {knownCases: 0, cases: 58, percent: 0, prob: 0};
	vm.pickAnAlgorithm = pickAnAlgorithm;
	vm.practiceCards = flashData.data.practiceCards;
	vm.practicing = flashData.data.practicing;
	vm.returnSolve = returnSolve;
	vm.setFilter = setFilter;
	vm.setSort = setSort;
	vm.showHiddenCols = showHiddenCols;
	vm.showHiddenRows = showHiddenRows;
	vm.useCookieInfo = useCookieInfo;

	vm.initialize();
	
	
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
		vm.cards.options = [];
		for (var i = 1; i <= vm.cards.maxNumber; i++) {
			vm.cards.options.push(i);
		}
	}
	
	function countCases() {
  		// Content, info
  //	console.log("Tried to count cases");
  	var count = 0;
  	var prob = 0;
  	for (var idx in vm.hiddenRows) {
  		if (vm.hiddenRows[idx] == 1) {
  			count++;
  			prob += vm.prob[idx];
  //			console.log("Count incremented");
  		}
  	}
  	
  	vm.number.knownCases = count;
  	vm.number.percent = 100 * (vm.number.knownCases / vm.number.cases);
  	vm.number.prob = prob * 100;
  }
	
	function declassify(event) {
		var str = $(event.target).attr("id");
//		str = str.substring(1, str.length);
		return str;
	}
	
	function flashCardsData(){
//		console.log("Practicing: " + angular.toJson(vm.practicing));
		
		flashData.initialize();
		
//		console.log("Practicing: " + angular.toJson(flashData.data.practicing));
//		console.log("New Practicing: " + angular.toJson(vm.practicing));
		
		vm.practicing = flashData.data.practicing;
		vm.practiceCards = flashData.data.practiceCards;
		vm.cardOptions = flashData.data.cardOptions;
		vm.cardPriorities = flashData.data.cardPriorities;
		vm.cards = flashData.data.cards;
		
//		console.log("Practicing: " + angular.toJson(vm.practicing));
		
		vm.addPriorityOptions();
//		addOptions(vm.cards.maxNumber);
	}
	
	function editCardSelection() {
		if (vm.practiceButton !== "Selecting..." || vm.practiceCards.length === vm.cards.maxNumber) {
			vm.showing.flashCardCol = !vm.showing.flashCardCol;
			vm.showing.priorityCol = !vm.showing.priorityCol;
			vm.showing.algorithmCol = !vm.showing.algorithmCol;
//			console.log(typeof vm.practiceCards);
			vm.practiceButton = (vm.showing.flashCardCol && vm.practiceCards.length !== vm.cards.maxNumber) ? "Done Selecting" : ((vm.showing.flashCardCol) ? "Selecting..." : "Select cases to practice");
//			if (vm.showing.priorityCol) {
////				addOptions(vm.cards.maxNumber);
//			}
			vm.addPriorityOptions();
		}
	}
	
	function editTable() {
		vm.editString = (vm.editString == "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
		var editingRow = $("#editRow");
		if (vm.showing.editRow) {
			// Hide away edit rows
			vm.showing.editRow = false;
			vm.showing.editCol = false;
			// Hide away chosen cases and columns
			vm.hideHiddenRows();
			vm.hideHiddenCols();
		} else {
			// Hide chosen cases and columns
			vm.showing.editRow = true;
			vm.showing.editCol = true;
			// Show selected cases and columns
			vm.showHiddenRows();
			vm.showHiddenCols();
		}
	}
	
	function hiddenColsData() {
		// Content mostly
  	try {
  		var hidingCookie = $cookies.getObject(vm.cookieString.hiddenCols);
  		if (hidingCookie) {
  			vm.hidden = hidingCookie;
  		} else {
  			vm.hidden = {};
  		}
  		
  		for (var ind = 0; ind < vm.classes.length; ind++) {
  			if (equals(vm.hidden[vm.classes[ind]], 1)) {
  				$(vm.colClasses[ind]).hide();
  			}
  		}
  		
  		$cookies.putObject(vm.cookieString.hiddenCols, vm.hidden);
  	} catch(e) {
  		$cookies.putObject(vm.cookieString.hiddenCols, vm.hidden);
  	}
	}
	
	function hiddenRowsData() {
	// Content, info
		// Attempt to reload the data from the OLLCookie
		try {
			var cookie = $cookies.getObject(vm.cookieString.hiddenRows);
			if (cookie) {
				vm.hiddenRows = cookie;
//					console.log(JSON.stringify(vm.hiddenRows));
			} else {
				// Else, instantiate hiddenRows
				vm.hiddenRows = {};
			}
			
			$cookies.putObject(vm.cookieString.hiddenRows, vm.hiddenRows);
		} catch(e) {
			// Need to put in the object
			$cookies.putObject(vm.cookieString.hiddenRows, vm.hiddenRows);
		}
	}
	
	function hideHiddenCols() {
		for (var ind = 0; ind < vm.classes.length; ind++) {
			if (vm.hidden[vm.classes[ind]] == 1) {
				$(vm.colClasses[ind]).hide();
			}
		}
	}
	
	function hideHiddenRows() {
	// Useful...
		for (id in vm.hiddenRows) {
			if (vm.hiddenRows[id] == 1) {
//				console.log(id);
				$("." + id).hide();
			}
		}
	}
	
	function initialize() {
		vm.cols = ["num", "code", "solve1.alg", "solve1.length", "solve2.alg", "solve2.length", "prob"];
		vm.hidden = {num: 0, code: 0, solve1:0, length1:0, solve2:0, length2:0, prob:0};
		vm.colClasses = [".num", ".code", ".solve1", ".length1", ".solve2", ".length2", ".prob"];
		vm.classes = ["num", "code", "solve1", "length1", "solve2", "length2", "prob"];
		
		// More Table row/column info
		// Content, settings
		vm.filteredCases = vm.cases;
		vm.reverse = true;
		vm.column = 'num'
		vm.comparisons = {custom: false};
		vm.countCases();
		
	// Content, info
		vm.prob = {};
		for (var i = 0; i < vm.cases.length; i++) {
			vm.cases[i].src = "/img/" + vm.cases[i].num + ".png";
			vm.prob[vm.cases[i].code] = vm.cases[i].prob;
		}
		
		// Content, flashcards
		vm.showing = {
				editRow:true, 
				editCol:true, 
				flashCardCol: false, 
				priorityCol: false, 
				algorithmCol: false};
		
		// Editing helper - content, info/controls
		vm.editString = "Save Table Configuration";
		
		// Stores the strings for the cookies
		// Content, flashcards
		
		vm.useCookieInfo();
		// Content, info
		vm.knownCases = {editMessage: (vm.showing.editCol === true) ? "Save Known Cases" : "Select Known Cases to Hide"};
		
	// Temporary stuff that I'm just trying out
	}

	function modifyKnownCases() {
		vm.showing.editCol = !vm.showing.editCol;
	}
	
	function pickAnAlgorithm(myCase) {
  	if (angular.isDefined(vm.cardPriorities[myCase.code])) {
  		return(vm.showing.algorithmCol && angular.isNumber(parseInt(vm.cardPriorities[myCase.code])) && myCase.solve2.length > 0);
  	} else {
  		return(false);
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
		for (var ind = 0; ind < vm.cols.length; ind++) {
			if (vm.hidden[vm.classes[ind]] == 1) {
				$(vm.colClasses[ind]).show();
			}
		}
	}
	
	function showHiddenRows() {
		for (id in vm.hiddenRows) {
			if (vm.hiddenRows[id] == 1) {
				$("." + id).show();
			}
		}
	}
	
	function setFilter(){
		// Content only
		vm.filteredCases = filterFilter(vm.cases, vm.filterString);
	}
	
	
	function setSort(column) {
	// Content only
		vm.column = column;
		vm.reverse = !vm.reverse;
	}
	
	function useCookieInfo() {
		// Content, Info
		vm.hiddenRowsData();
		vm.hiddenColsData();
		vm.flashCardsData();
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

	
	$scope.$watchCollection('practicing', function(newValue, oldValue) {
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