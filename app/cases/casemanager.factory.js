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
//	init();
//	
//	function init() {
//		for (var i = 0; i < factory.oll.length; i++) {
//			factory.oll["prob_type"] = {}
//			factory.oll.prob_type.red = factory.oll.prob == (1/54)
//			factory.oll.prob_type.blue = factory.oll.prob == (1/108)
//			factory.oll.prob_type.green = factory.oll.prob == (1/216)
//		}
//	}

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
