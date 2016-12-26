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

angular
	.module('myApp')
	.controller('TimerController',  TimerController);

TimerController.$inject = ['$scope', '$interval', '$cookies', '$log', '$http', 'statistics'];

function TimerController($scope, $interval, $cookies, $log, $http, statistics) {
	$scope.cookieOpts = {time: ".time", timeStamp: '.date', index: ".index", millis: ".millis"};
  $scope.clock = 0;
  $scope.deleteAll = deleteAll;
  $scope.deleteIndex = deleteIndex;
	$scope.deleteLastTime = deleteLastTime;
  $scope.deleteRecord = deleteRecord;
  $scope.delta = delta;
  $scope.displayTimeString = "00:00.00";
	$scope.downloadable;
  $scope.downloadClicked = downloadClicked;
  $scope.encodedUri = "";
  $scope.getCookies = getCookies;
	$scope.getDuration = getDuration;
  $scope.interval = null;
	$scope.isEncoded = isEncoded;
	$scope.myStats = statistics;
	$scope.numRecords = 0;
  $scope.offset;
  $scope.options = {delay: 5};
  $scope.pairs = [
		{a: "best", b: "worst"},
		{a: "q1", b: "q3"},
		{a: "mean", b: "median"},
		{a: "mean5", b: "mean35"},
		{a: "mean10", b: "mean1012"},
		{a: "variance", b: "stdDev"},
		{a: "iqr", b: "range"},
		{a: "count", b: "full_range"}
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
  	"range": "Range",
		"count": "Count",
		"full_range": "Full Range"
  };
	$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  $scope.recordsCookie = "TimeRecordsCookie";
  $scope.render = render;
  $scope.reset = reset;
  $scope.returnObjects = returnObjects;
  $scope.returnNames = returnNames;
  $scope.save = save;
  $scope.saveRecords = saveRecords;
  $scope.start = start;
  $scope.state = {running: false, stopped: false};
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

	function deleteLastTime() {
		var confirmed = window.confirm("This will delete your last time, " + $scope.records.time[$scope.records.time.length - 1] + ". Do you wish to proceed?");

		if (confirmed) {
			for (var str in $scope.records) {
				$scope.records[str].pop();
			}
			$scope.numRecords --;
			$scope.saveRecords();
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

	function getDuration() {
		if ($scope.records.timeStamp.length > 1) {
			var date1 = $scope.records.timeStamp[0];
			var date2 = $scope.records.timeStamp[$scope.records.timeStamp.length - 1];
			console.log("date1: " + angular.isDate(date1) + "date2: " + angular.isDate(date2));
			if (angular.isDate(date1) && angular.isDate(date2)) {
				var del = date2.getTime() - date1.getTime();
				return del;
			}
		}
		return "00:00:00.000";
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
		var date = new Date();
  	link1.setAttribute('href', "http://0.0.0.0:3000/"+ getDayOnly(date) + ".csv");
  	link1.setAttribute('download', getDayOnly(date) + '.csv');
  	link1.setAttribute('id', "downloadLink");
  	$(link1).html("Download");
  	link1 = $(link1);
  	$("#saveButtonDiv").after(link1);
  }

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
		return("na");
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
