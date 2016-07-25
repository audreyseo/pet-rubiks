/**
 * http://usejsdoc.org/
 */


describe('	Test:	', function() {
	describe('Factory: CaseManager', function() {
		beforeEach(module('myApp'));
		var CaseManager, ollCases, pllCases;
		
		beforeEach(inject(function(_CaseManager_, _ollCases_, _pllCases_) {
			CaseManager = _CaseManager_;
			ollCases = _ollCases_;
			pllCases = _pllCases_;
		}));
		
		describe('Ensure Things Are Defined', function() {
			it("Functions are defined", function() {
				expect(CaseManager.fetchImage).toBeDefined();
				expect(CaseManager.isOLL).toBeDefined();
				expect(CaseManager.isOLLCase).toBeDefined();
				expect(CaseManager.makeImages).toBeDefined();
				expect(CaseManager.mapCaseToNumber).toBeDefined();
				expect(CaseManager.setStage).toBeDefined();
				expect(CaseManager.type).toBeDefined();
			});
			
		});
		
		describe('CaseManager functions', function() {
			describe('fetchImage', function() {
				it("should return URL for the image source for a given case code or case number", function() {
					expect(CaseManager.fetchImage('LB2')).toBeDefined();
					CaseManager.setSTage('PLL');
					expect(CaseManager.fetchImage(2)).toBeDefined();
					expect(CaseManager.fetchImage(2)).toMatch(/\/img\/2\.png/);
				});
			});
			
			describe('isOLL', function() {
				
			});
			
			describe('isOLLCase', function() {
				
			});
			
			describe('isPLL', function() {
				
			});
			
			describe('makeImages', function() {});
			describe('mapCaseToNumber', function() {});
			describe('pllMap', function() {
				
			});
			describe('setStage', function() {});
			describe('type', function() {});
		});
	});
});