/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('cardoptions', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		templateUrl: "/templates/cardOptions.html"
	};
});