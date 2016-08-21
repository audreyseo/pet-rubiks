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
	factory.returnSolve = returnSolve;
	factory.setCaseType = setCaseType;
	factory.setFilter = setFilter;
	factory.setSort = setSort;
	factory.showHiddenCols = showHiddenCols;
	factory.showHiddenRows = showHiddenRows;
	factory.useCookieInfo = useCookieInfo;
	factory.practiceCasesButtonValue = "Select cases to practices";
	factory.type = "";

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
		factory.editString = (factory.editString == "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
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

	function returnSolve(card) {
		if (card.solve2.length > 0) {
			return (card.option == 1) ? card.solve1.alg : card.solve2.alg;
		} else {
			return(card.solve1.alg);
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

	return factory;
};
