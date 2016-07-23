/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('timeStats', function() {
		return {
//			transclude: true,
			restrict: 'E',
			scope: {times: "=", timePairs: "=", timeNames: "="},
			templateUrl: '/template/timestats.html' //,
//			link: function(scope, elem, atr, controller) {
//				for (blah in scope) {
//					console.log("Scope[" + blah + "]: " + scope[blah]);
//				}
//			}
		};
	});