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
