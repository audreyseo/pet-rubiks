angular.module('myApp')
  .controller('OLLController', OLLController);

OLLController.$inject = ['$scope', 'ContentControl'];

function OLLController($scope, ContentControl) {
  $scope.addPriorityOptions = ContentControl.addPriorityOptions;
	$scope.animationOpts = {duration: 1000};
	$scope.cardOptions = flashData.getCardOptions();
	$scope.cardPriorities = flashData.getCardPriorities();
	$scope.cards = flashData.getCards();
	$scope.cases = ContentControl.cases;
	$scope.cookieString = ContentControl.cookieString;
	$scope.countCases = ContentControl.countCases;
	$scope.cardData = flashData.data;
	$scope.editCardSelection = ContentControl.editCardSelection;
	$scope.editTable = ContentControl.editTable;
	$scope.filterString = '';
	$scope.flashCardsData = ContentControl.flashCardsData;
	$scope.hiddenColsData = ContentControl.hiddenColsData;
	$scope.hiddenRows = ContentControl.hiddenRows;
	$scope.hiddenRowsData = ContentControl.hiddenRowsData;
	$scope.hideHiddenCols = ContentControl.hideHiddenCols;
	$scope.hideHiddenRows = ContentControl.hideHiddenRows;
	$scope.initialize = ContentControl.initialize;
	$scope.modifyKnownCases = ContentControl.modifyKnownCases;
	$scope.number = {knownCases: 0, cases: 58, percent: 0, prob: 0};
	$scope.pickAnAlgorithm = ContentControl.pickAnAlgorithm;
	$scope.practiceCards = flashData.getPracticeCards() || [];
	$scope.practicing = flashData.getPracticing();
	$scope.returnSolve = ContentControl.returnSolve;
	$scope.setFilter = ContentControl.setFilter;
	$scope.setSort = ContentControl.setSort;
	$scope.showHiddenCols = ContentControl.showHiddenCols;
	$scope.showHiddenRows = ContentControl.showHiddenRows;
	$scope.useCookieInfo = ContentControl.useCookieInfo;

  $scope.initialize();
	checkFlashCardData();


  function checkFlashCardData() {
		for (var data in $scope.cardData) {
			console.log(data + " is Defined?: " + angular.isDefined($scope.cardData[data]) + "  " + angular.toJson($scope.cardData[data]));
		}
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
}
