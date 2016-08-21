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
	factory.isOLL = isOLL;
	factory.isOLLCase = isOLLCase;
	factory.isPLL = isPLL;
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
