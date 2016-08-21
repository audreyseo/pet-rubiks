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
