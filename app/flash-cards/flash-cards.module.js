/**
 * http://usejsdoc.org/
 */


angular
	.module('myApp')
	.factory('flashCardData', ['cookieStrings', '$cookies', 'cookieData', '$log', function(cookieStringData, $cookies, cookieData, $log) {
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
			var ind;
			for (ind in factory.data) {
				factory.data[ind] = cookieData[ind];
			}
			console.log('Cookie data: ' + angular.toJson(cookieData));
			console.log('Factory data: ' + angular.toJson(factory.data));
			if ((typeof factory.data) == 'undefined') {
				console.log('The cookie data: ' + angular.toJson(cookieData));
				factory.data = {
						practicing: {"OCLL8": false},
						practiceCards: [],
						cardPriorities: {"OCLL8": -1},
						cardOptions: {"L3": -1, "OCLL8": -1},
						cards: {maxNumber: 5, options: range(0, 5)},
						practiceButton: "Select cases to practice"
				};
			}
  		for (ind in factory.data) {
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
				console.log("Cookies[type]: " + angular.toJson(factory.cookies[type]));
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
