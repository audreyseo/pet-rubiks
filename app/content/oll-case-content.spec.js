/**
 * http://usejsdoc.org/
 */

xdescribe('	Test:	', function() {
	describe("Controller: ContentController", function() {
		var createController,ctrl, scope, hiddenRows, $cookies, flashCard, cookieString, $filter, theseCases;
		beforeEach(module('myApp'));
		
		beforeEach(module(function($provide) {
			$provide.value('ollCases', {
				ollCases: function() {
					 theseCases = [{num: 27, code: "OCLL1", solve1: {alg: "(R U R' U) R U2 R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
							  {num: 26, code: "OCLL2", solve1: {alg: "R U2 R' U' R U' R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
   			        {num: 22, code: "OCLL3", solve1: {alg: "[f (R U R' U') f'] [F (R U R' U') F']",  length: 12}, solve2: {alg: "R U2' R2' U' R2 U' R2' U2 R2", length: 9}, prob: 1/54},
         			  {num: 21, code: "OCLL4", solve1: {alg: "F (R U R' U') (R U R' U') (R U R' U') F'",  length: 14}, solve2: {alg: "y (R' U' R) U' (R' U R) U' (R' U2 R)", length: 12}, prob: 1/108}];
				}
			});
		}));
		
		beforeEach(inject(function ($rootScope, $controller, _$cookies_, _flashCardData_, _cookieStrings_, _$filter_) {
	    scope = $rootScope.$new();
	    flashCard = _flashCardData_;
	    cookieString = _cookieStrings_;
	    $filter = _$filter_;
	    
	    createController = function() {
        return $controller('ContentController', {
            '$scope': scope,
            'cases': theseCases,
            'hiddenRowsY': hiddenRows,
            'cookieStrings': cookieString,
            'flashCardData': flashCard,
            '$cookies': $cookies,
            'filterFilter': $filter('filter')
        });
    	};
    	
		})
		);
		
		
		
		describe('Functions', function() {
			beforeEach(function() {
				ctrl = createController();
			});
			
			// All of the modules and other things that will be injected at some point
			//'$scope', 'cases', 'hiddenRowsY', 'cookieStrings',
			//'flashCardData', '$cookies',  'orderByFilter', 'filterFilter'
			
			it('Should have access to cases', inject(function(cases){
				expect(angular.isDefined(scope.cases)).toBe(true);
			}));
			
//			it('Priority should be changed if the select box is changed', function(){
//				
//			});
			
			
			describe('addPriorityOptions', function() {
				it("once called, options should be an array of numbers", function() {
					var right = true;
					for (var i = 0; i < scope.cards.options.length; i++) {
						right = right && (typeof scope.cards.options[i] == 'number');
					}
				});
			});
			describe('countCases', function() {});
			describe('editCardSelection', function() {});
			describe('$socpe.editTable', function() {});
			describe('flashCardsData', function() {});
			describe('hiddenColsData', function() {});
			describe('hiddenRowsData', function() {});
			describe('hideHiddenCols', function() {});
			describe('hideHiddenRows', function() {});
			describe('initialize', function() {});
			describe('modifyKnownCases', function() {});
			describe('pickAnAlgorithm', function() {});
			describe('returnSolve', function() {});
			describe('setFilter', function() {});
			describe('setSort', function() {});
			describe('showHiddenCols', function() {});
			describe('showHiddenRows', function() {});
			describe('useCookieInfo', function() {});
		});
	});
});