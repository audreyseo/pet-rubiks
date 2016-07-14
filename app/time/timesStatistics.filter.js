/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.filter('millisToString', ['timeConversion', function(converter) {
		return function(input) {
			if (String(input).indexOf(":") < 0 && (typeof input == "number")) {
//				console.log("int: " + parseInt(input) + " " + input);
				return converter.millisToString(Math.round(parseInt(input)));
			} else if (String(input).indexOf(":") < 0){
				return converter.millisToString(0);
			}
			return input;
		};
	}]);