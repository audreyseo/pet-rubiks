/**
 * http://usejsdoc.org/
 */

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
	
	describe('flashCardData.initialize', function() {
		beforeEach(function() {
			flashCardData.initialize();
		});
		
		it("After initialization, flashCards' objects should be initialized", function() {
			
		});
	});
	describe('flashCardData.isPracticing', function() {});
	describe('flashCardData.setPracticing', function() {});
	describe('flashCardData.removePracticing', function() {});
	describe('flashCardData.savePracticing', function() {});
	describe('flashCardData.getPracticing', function() {});
	describe('flashCardData.getPriority', function() {});
	describe('flashCardData.setPriority', function() {});
	describe('flashCardData.removePriority', function() {});
	describe('flashCardData.saveCardPriorities', function() {});
	describe('flashCardData.getCardPriorities', function() {});
	describe('flashCardData.getCard', function() {});
	describe('flashCardData.setCard', function() {});
	describe('flashCardData.savePracticeCards', function() {});
	describe('flashCardData.getPracticeCards', function() {});
	describe('flashCardData.saveCards', function() {});
	describe('flashCardData.getCards', function() {});
	describe('flashCardData.getAlgorithmOption', function() {});
	describe('flashCardData.setAlgorithmOption', function() {});
	describe('flashCardData.removeAlgorithmOption', function() {});
	describe('flashCardData.saveCardOptions', function() {});
	describe('flashCardData.getCardOptions', function() {});
});