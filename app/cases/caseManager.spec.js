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
				expect(CaseManager.fetchCase).toBeDefined();
				expect(CaseManager.fetchImage).toBeDefined();
				expect(CaseManager.getCases).toBeDefined();
				expect(CaseManager.isOLL).toBeDefined();
				expect(CaseManager.isOLLCase).toBeDefined();
				expect(CaseManager.isPLL).toBeDefined();
				expect(CaseManager.isPLLCase).toBeDefined();
				expect(CaseManager.isSelected).toBeDefined();
				expect(CaseManager.mapCaseToNumber).toBeDefined();
				expect(CaseManager.setStage).toBeDefined();
				expect(CaseManager.type).toBeDefined();
			});

		});

		describe('CaseManager functions', function() {
			describe('fetchCase', function() {
			  it('should be the case that we wanted to fetch', function() {
			    expect(true).toBe(false);
			  });
			});

			describe('fetchImage', function() {
				it("should return URL for the image source for a given case code or case number", function() {
					expect(CaseManager.fetchImage('LB2')).toBeDefined();
					CaseManager.setStage('PLL');
					expect(CaseManager.fetchImage(2)).toBeDefined();
					expect(CaseManager.fetchImage(2)).toMatch(/\/img\/2\.png/);
					var num = Math.round(Math.rand() * CaseManager.pll.length);
					console.log("Num: %d", num);
					expect(CaseManager.fetchImage(num)).toMatch(/\/img\/\d{1,2}\.png/);
				});
			});

			describe('isOLL', function() {
				it("should return true depending on whether we set it to pll or oll", function() {
					CaseManager.setStage('PLL');
					expect(CaseManager.isOLL()).toBe(false);
					CaseManager.setStage('OLL');
					expect(CaseManager.isOLL()).toBe(true);
					CaseManager.stage = "";
					expect(CaseManager.isOLL()).toBe(false);
				});
			});

			describe('isOLLCase', function() {
				it("should return true/false depending on whether it is a legitimate OLL case", function() {
					expect(CaseManager.isOLLCase("ASL3")).toBe(false);
					expect(CaseManager.isOLLCase(CaseManager.pllCodes[0])).toBe(false);
					expect(CaseManager.isOLLCase(CaseManager.ollCodes[0])).toBe(true);
					expect(CaseManager.isOLLCase('LB2')).toBe(true);
					expect(CaseManager.isOLLCase('C1')).toBe(true);
				});
			});

			describe('isPLL', function() {
				it('should return true depending on whether we set it to pll or oll', function() {
				  CaseManager.setStage('OLL');
					expect(CaseManager.isPLL()).toBe(false);
					CaseManager.setStage('PLL');
					expect(CaseManager.isPLL()).toBe(true);
					CaseManager.stage = "";
					expect(CaseManager.isPLL()).toBe(false);
				});
			});

			describe('isPLLCase', function() {
				it("should return true/false depending on whether it is a legitimate PLL case", function() {
					expect(CaseManager.isPLLCase("ASL3")).toBe(false);
					expect(CaseManager.isPLLCase(CaseManager.pllCodes[0])).toBe(true);
					expect(CaseManager.isPLLCase(CaseManager.ollCodes[0])).toBe(false);
					expect(CaseManager.isPLLCase('LB2')).toBe(false);
					expect(CaseManager.isPLLCase('C1')).toBe(false);
					expect(CaseManager.isPLLCase('Ga')).toBe(true);
					expect(CaseManager.isPLLCase('Y')).toBe(true);
				});
			});

			describe('isSelected', function() {
			  it('should return true/false depending on the case', function() {
					CaseManager.setStage("PLL");
			    expect(CaseManager.isSelected(1)).toBeUndefined();					CaseManager.pll[1].selected = false;
					expect(CaseManager.isSelected(1)).toBe(false);
					CaseManager.pll[1].selected = true;
					expect(CaseManager.isSelected(1)).toBe(true);
					CaseManager.setStage("OLL");
					expect(CaseManager.isSelected(1)).toBeUndefined();
					CaseManager.oll[1].selected = false;
					expect(CaseManager.isSelected(1)).toBe(false);
					CaseManager.oll[1].selected = true;
					expect(CaseManager.isSelected(1)).toBe(true);
			  });
			});

			describe('mapCaseToNumber', function() {
				it("should create a map of cases to numbers even when made null", function() {
					CaseManager.ollMap = undefined
					CaseManager.pllMap = undefined
					expect(CaseManager.ollMap).toBeUndefined();
					expect(CaseManager.pllMap).toBeUndefined();
					CaseManager.mapCaseToNumber();
					expect(CaseManager.ollMap).toBeDefined();
					expect(CaseManager.pllMap).toBeDefined();
				});
			});
			describe('setStage', function() {
				it('should set either PLL or OLL depending on what we tell it', function() {
					expect(CaseManager.stage).toBe("");
					CaseManager.setStage("OLL");
					expect(CaseManager.type()).toBe("OLL");
					CaseManager.setStage("PLL");
					expect(CaseManager.type()).toBe("PLL");
				});
			});
			describe('type', function() {
				it('should return either PLL or OLL', function() {
				  expect(CaseManager.type()).toBe("OLL");
					CaseManager.setStage("OLL");
					expect(CaseManager.type()).toBe("OLL");
					CaseManager.setStage("PLL");
					expect(CaseManager.type()).toBe("PLL");
				});
			});
		});
	});
});
