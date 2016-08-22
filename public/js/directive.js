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
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.directive('flashCard', function() {
		return {
			transclude: true,
			restrict: 'E',
			scope: {title: '@title', cardsrc: '@cardsrc', cardcode: '@cardcode', cardprob: '@cardprob', cardalg: '@cardalg'},
			templateUrl: '../flashcard.html',
			link: function(scope, elem, atr, controller, transclude) {
			}
		};
	});

/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.directive('pllFlashCard', function() {
		return {
			transclude: true,
			restrict: 'E',
			scope: {title: '@title', cardsrc: '@cardsrc', cardcode: '@cardcode', cardprob: '@cardprob', cardalg: '@cardalg'},
			templateUrl: '../pll-flashcard.html',
			link: function(scope, elem, atr, controller, transclude) {
			}
		};
	});

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