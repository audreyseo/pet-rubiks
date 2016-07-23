/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.directive('dividingBox', function() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			scope: {dividerTitle: "@", dividerId: "@"},
			templateUrl: '/templates/dividingBox.html'
		};
	});