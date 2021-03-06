/**
 * http://usejsdoc.org/
 */

var app = angular.module('myApp');

app.directive('myTabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope) {
			var panes = $scope.panes = [];
			$scope.select = function(pane) {
				pane.selected = !pane.selected;
			};

			this.addPane = function(pane) {
				if (panes.length === 0) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
		},
		templateUrl: "tabs.html"
	};
});

app.directive('myPane', function() {
	return {
		require: '^^myTabs',
		restrict: 'E',
		templateUrl: 'pane.html',
		transclude: true,
		scope: {title: '@'},
		link: function(scope, element, attrs, tabsCtrl) {
			//console.log(angular.toJson(scope));
			tabsCtrl.addPane(scope);
		}

	};
});
