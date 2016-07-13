/**
 * http://usejsdoc.org/
 */
describe('	Test:	', function() {
	describe('Factory: flashCardData', function() {
		var flashCardData, cookieStrings, $cookies, cookieData;
		
		beforeEach(module('myApp'));
		
		beforeEach(inject(function(_flashCardData_,_cookieStrings_,_$cookies_,_cookieData_) {
			flashCardData = _flashCardData_;
			cookieStrings = _cookieStrings_;
			$cookies = _$cookies_;
			cookieData = _cookieData_;
		}));
		
		it('both the module and its functions should be defined', function() {
			expect(angular.isDefined(flashCardData.initialize)).toBe(true);
			expect(angular.isDefined(flashCardData.isPracticing)).toBe(true);
			expect(angular.isDefined(flashCardData.setPracticing)).toBe(true);
			expect(angular.isDefined(flashCardData.savePracticing)).toBe(true);
			expect(angular.isDefined(flashCardData.getPracticing)).toBe(true);
			expect(angular.isDefined(flashCardData.getPriority)).toBe(true);
			expect(angular.isDefined(flashCardData.setPriority)).toBe(true);
			expect(angular.isDefined(flashCardData.removePriority)).toBe(true);
			expect(angular.isDefined(flashCardData.saveCardPriorities)).toBe(true);
			expect(angular.isDefined(flashCardData.getCardPriorities)).toBe(true);
			expect(angular.isDefined(flashCardData.getCard)).toBe(true);
			expect(angular.isDefined(flashCardData.setCard)).toBe(true);
			expect(angular.isDefined(flashCardData.savePracticeCards)).toBe(true);
			expect(angular.isDefined(flashCardData.getPracticeCards)).toBe(true);
			expect(angular.isDefined(flashCardData.saveCards)).toBe(true);
			expect(angular.isDefined(flashCardData.getCards)).toBe(true);
			expect(angular.isDefined(flashCardData.getAlgorithmOption)).toBe(true);
			expect(angular.isDefined(flashCardData.setAlgorithmOption)).toBe(true);
			expect(angular.isDefined(flashCardData.removeAlgorithmOption)).toBe(true);
			expect(angular.isDefined(flashCardData.saveCardOptions)).toBe(true);
			expect(angular.isDefined(flashCardData.getCardOptions)).toBe(true);
		});
		
		describe('initialize', function() {
			beforeEach(function() {
				flashCardData.initialize();
			});
			
			it("After initialization, flashCards' objects should be initialized", function() {
				expect(angular.isDefined(flashCardData.data)).toBe(true);
				expect(angular.isDefined(flashCardData.cookies)).toBe(true);
				expect(angular.isDefined(flashCardData.cards)).toBe(true);
			});
		});
		describe('isPracticing', function() {
			// Returns a boolean value for a given code
			it("should return the correct boolean value given a proper case code", function() {
				flashCardData.data.practicing = {"OLL8":true, "OLL3":false};
			});
		});
		describe('setPracticing', function() {});
		describe('removePracticing', function() {});
		describe('savePracticing', function() {});
		describe('getPracticing', function() {});
		describe('getPriority', function() {});
		describe('setPriority', function() {});
		describe('removePriority', function() {});
		describe('saveCardPriorities', function() {});
		describe('getCardPriorities', function() {});
		describe('getCard', function() {});
		describe('setCard', function() {});
		describe('savePracticeCards', function() {});
		describe('getPracticeCards', function() {});
		describe('saveCards', function() {});
		describe('getCards', function() {});
		describe('getAlgorithmOption', function() {});
		describe('setAlgorithmOption', function() {});
		describe('removeAlgorithmOption', function() {});
		describe('saveCardOptions', function() {});
		describe('getCardOptions', function() {});
	});
});