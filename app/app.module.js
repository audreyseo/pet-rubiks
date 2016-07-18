/**
 * http://usejsdoc.org/
 */
var app = angular.module('myApp', ['ngCookies', 'ngSanitize']);


	

app
	.directive(
			'ollRow',
			function() {
				return {
					transclude: true,
					scope: {mycases: "@mycases", mycolumn: "@mycolumn", myreverse: "@myreverse"},
					restrict: 'E',
					templateUrl: 'oll_row.html'
				};
			});





app.controller("InfoController", function($scope) {
		
});
