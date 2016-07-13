/**
 * http://usejsdoc.org/
 */

describe('	Test:	', function() {
	describe("Controller: ContentController", function() {
		
		beforeEach(module('myApp', function($provide) {
			$provide.value('cases', [{num: 27, code: "OCLL1", solve1: {alg: "(R U R' U) R U2 R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
			             	          {num: 26, code: "OCLL2", solve1: {alg: "R U2 R' U' R U' R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
			             	          {num: 22, code: "OCLL3", solve1: {alg: "[f (R U R' U') f'] [F (R U R' U') F']",  length: 12}, solve2: {alg: "R U2' R2' U' R2 U' R2' U2 R2", length: 9}, prob: 1/54},
			             	          {num: 21, code: "OCLL4", solve1: {alg: "F (R U R' U') (R U R' U') (R U R' U') F'",  length: 14}, solve2: {alg: "y (R' U' R) U' (R' U R) U' (R' U2 R)", length: 12}, prob: 1/108}]);
		}));
		
		// All of the modules and other things that will be injected at some point
		//'$scope', 'cases', 'hiddenRowsY', 'cookieStrings',
		//'flashCardData', '$cookies',  'orderByFilter', 'filterFilter'
		
		it('Should have access to cases', inject(function(cases){
			expect(angular.isDefined(cases)).toBe(true);
		}));
		
		it('Priority should be changed if the select box is changed', function(){
			
		});
		
		describe('addPriorityOptions', function() {});
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