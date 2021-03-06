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
