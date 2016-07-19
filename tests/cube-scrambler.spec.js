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
  	        return $controller('CubeScrambler', {
  	            '$scope': scope,
  	        });
  	    };
			})
		);
		
		it("code333 should be defined", function() {
			timeCtrl = createController();
			expect(angular.isDefined(scope.code333)).toBe(true);
		});
		
		describe('scramble()', function() {
			beforeEach(function() {
				timeCtrl = createController();
			});
			it('When CubeScrambler is instantiated, it already has a scrambling code initialized', function() {				
				expect(scope.code !== "").toBe(true);
				expect(typeof scope.code.length === 'number').toBe(true);
			});
			
			var code;
			
			beforeEach(function() {
				code = angular.copy(scope.code);
			});
			
			it('When $scope.scramble is called, $scope.code should change', function() {
				scope.scramble();
				expect(code).not.toEqual(scope.code);
			});
			it('Items should not repeat', function() {
				var codes = code.split(' ');
				var right = true;
				for (var i = 1; i < codes.length; i++) {
					right = right && (codes[i - 1] !== codes[i]);
				}
				expect(right).toBe(true);
			});
			it("Base types of moves (R, L, D, U, F, B) should also not repeat", function() {
				code = code.replace(/[0-9\']/g, '');
				var codes = code.split(' ');
				var right = true;
				for (var i = 1; i < codes.length; i++) {
					right = right && (codes[i - 1] !== codes[i]);
				}
				expect(right).toBe(true);
			});
			it("There should be exactly 25 moves in the entire scramble algorithm", function() {
				var codes = code.split(' ');
				expect(codes.length).toEqual(25);
			});
			it("Scramble algorithm should be a string", function() {
				expect(typeof code).toEqual('string');
			});
		});
	});
});