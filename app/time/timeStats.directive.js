/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('timestats', function() {
		return {
//			transclude: true,
			restrict: 'E',
			scope: {times: "@times"},
			templateUrl: 'timestats.html' //,
//			link: function(scope, elem, atr, controller) {
//				for (blah in scope) {
//					console.log("Scope[" + blah + "]: " + scope[blah]);
//				}
//			}
		};
	});