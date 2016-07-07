/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.filter('millisToString', ['timeConversion', function(converter) {
		return function(input) {
			if (String(input).indexOf(":") < 0) {
				console.log("int: " + parseInt(input) + " " + input);
				return converter.millisToString(Math.round(parseInt(input)));
			}
			return input;
		};
	}]);