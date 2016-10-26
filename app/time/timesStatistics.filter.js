/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.filter('millisToString', ['timeConversion', function(converter) {
		return function(input) {
			if (String(input).indexOf(":") < 0 && (typeof input === "number")) {
//				console.log("int: " + parseInt(input) + " " + input);
				var num = parseInt(input);
				if (input <= 0) {
					return("--:--.---");
				} else if (input > 0 && input < 200) {
					return input;
				} else {
					return converter.millisToString(Math.round(parseInt(input)));
				}
			} else if (String(input).indexOf(":") < 0 && (!String(input).match(/^[a-zA-Z]+$/) || String(input) === "undefined")){
				return converter.millisToString(0);
			}
			return input;
		};
	}]);
