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