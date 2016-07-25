/**
 * http://usejsdoc.org/
 */

angular.module("myApp")
	.factory('CaseManager', CaseManager);

CaseManager.$inject = ['ollCases', 'pllCases'];

function CaseManager(ollCases, pllCases) {
	var factory = {oll: ollCases, pll: pllCases};
	
	factory.fetchImage = fetchImage;
	factory.isOLL = isOLL;
	factory.isOLLCase = isOLLCase;
	factory.makeImages = makeImages;
	factory.mapCaseToNumber = mapCaseToNumber;
	factory.setStage = setStage;
	factory.stage = "";
	factory.type = type;
	
	factory.makeImages();
	factory.mapCaseToNumber();
	
	function fetchImage(code) {
		if (angular.isNumber(code)) {
			if (factory.type() === "PLL") {
				return(factory.pll.img[i]);
			} else if (factory.type() === "OLL"){
				return(factory.oll.img[i]);
			}
		} else {
			if (factory.isOLLCase(code)) {
				
			} else {
				
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
	
	function makeImages() {
		for (var i = 0; i < factory.oll.length; i++) {
			factory.oll[i].img = "/img/" + factory.oll[i].code + ".png";
		}
		for (i = 0; i < factory.pll.length; i++) {
			factory.pll[i].img = "/img/" + factory.pll[i].code + ".png";
		}
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