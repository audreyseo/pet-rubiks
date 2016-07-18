/**
 * http://usejsdoc.org/
 */

describe('	Test:	', function() {
	describe('Controller: CubeScrambler', function() {
		var createController, $scope;
		var timeCtrl;
		
		beforeEach(module('myApp'));
		
		beforeEach(inject(function ($rootScope, $controller) {
  	    scope = $rootScope.$new();
  	    createController = function() {
  	        return $controller('TimerController', {
  	            '$scope': scope,
  	        });
  	    };
			})
		);	
		it("code333 should be defined", function() {
			timeCtrl = createController();
			expect(angular.isDefined(timeCtrl.scope.code333)).toBe(true);
		});
		
		describe('scramble', function() {
			it('When CubeScrambler is instantiated, it already has a scrambling code initialized', function() {
				timeCtrl = createController();
				
				expect(timeCtrl.code !== "").toBe(true);
				expect(typeof timeCtrl.code.length === 'number').toBe(true);
			});
			it('When $scope.scramble is called, $scope.code should change', function() {expect(true).toBe(false)});
			it('When $scope.scramble is not called, $scope.code should not change', function() {expect(true).toBe(false)});
		});
	});
});