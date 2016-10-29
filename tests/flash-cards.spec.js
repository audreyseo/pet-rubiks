/**
 * http://usejsdoc.org/
 */
describe('	Test:	', function() {
	describe('Factory: FlashCardData', function() {
		var flashCardData, cookieStrings, $cookies, cookieData, $log;

		beforeEach(module('myApp'));

		beforeEach(inject(function(_flashCardData_,_cookieStrings_,_$cookies_,_cookieData_, _$log_) {
			flashCardData = _flashCardData_;
			cookieStrings = _cookieStrings_;
			$cookies = _$cookies_;
			cookieData = _cookieData_;
			$log = _$log_;
		}));

		beforeEach(function() {
			flashCardData.setType("pll");
		});

		it('both the module and its functions should be defined', function() {
			expect(flashCardData.initialize).toBeDefined();
			expect(flashCardData.isPracticing).toBeDefined();
			expect(flashCardData.setPracticing).toBeDefined();
			expect(flashCardData.savePracticing).toBeDefined();
			expect(flashCardData.getPracticing).toBeDefined();
			expect(flashCardData.getPriority).toBeDefined();
			expect(flashCardData.setPriority).toBeDefined();
			expect(flashCardData.removePriority).toBeDefined();
			expect(flashCardData.getCardPriorities).toBeDefined();
			expect(flashCardData.getCard).toBeDefined();
			expect(flashCardData.setCard).toBeDefined();
			expect(flashCardData.savePracticeCards).toBeDefined();
			expect(flashCardData.getPracticeCards).toBeDefined();
			expect(flashCardData.saveCards).toBeDefined();
			expect(flashCardData.getCards).toBeDefined();
			expect(flashCardData.getAlgorithmOption).toBeDefined();
			expect(flashCardData.setAlgorithmOption).toBeDefined();
			expect(flashCardData.removeAlgorithmOption).toBeDefined();
			expect(flashCardData.saveCardOptions).toBeDefined();
			expect(flashCardData.getCardOptions).toBeDefined();
		});

		it("its dependencies should be defined", function() {
			expect(flashCardData).toBeDefined();
			expect(cookieStrings).toBeDefined();
			expect($cookies).toBeDefined();
			expect(cookieData).toBeDefined();
			expect(flashCardData.data).toBeDefined();
			expect(flashCardData.cookies).toBeDefined();
			expect(flashCardData.cards).toBeDefined();
		});

		describe('initialize', function() {
			beforeEach(function() {
				flashCardData.initialize();
			});

			it("After initialization, flashCards' objects should be initialized", function() {
				expect(flashCardData.data).toBeDefined();
				expect(flashCardData.cookies).toBeDefined();
				expect(flashCardData.cards).toBeDefined();
			});
		});

		describe('data.practicing functions', function() {
			beforeEach(function() {
				flashCardData.data.practicing = {"OLL8":true, "OLL3":false};
			});

			describe('isPracticing', function() {
				// Returns a boolean value for a given code
				it("should return the correct boolean value given a proper case code", function() {
					expect(flashCardData.isPracticing("OLL8")).toBe(true);
					expect(flashCardData.isPracticing("OLL3")).toBe(false);
				});
				it("should return false if given a case code results in undefined", function() {
					expect(flashCardData.isPracticing("C3")).toBe(false);
					expect(flashCardData.isPracticing("L4")).toBe(false);
				});
				it("should return false if given an undefined case code", function() {
					expect(flashCardData.isPracticing(undefined)).toBe(false);
				});
			});
			describe('setPracticing', function() {
				it("even after setting a case code to the opposite value, the refs to the objects should be the same", function() {
					oldObject = flashCardData.data.practicing;
					flashCardData.setPracticing("L3", true);
					newObject = flashCardData.data.practicing;
					expect(oldObject).toEqual(newObject);
				});
				it("after setting a case code to the its same value, objects should be the same", function() {
					var old = angular.copy(flashCardData.data.practicing);
					flashCardData.setPracticing("OLL8", true);
					expect(flashCardData.data.practicing).toEqual(old);
				});
				it("if caseCode is undefined, should not attempt to change data.practicing", function() {
					flashCardData.setPracticing(undefined, true);
					expect(flashCardData.getPracticing('undefined')).not.toBe(true);
				});
			});
			describe('removePracticing', function() {
				it("once called with legit data, setPracticing should be called", function() {
					spyOn(flashCardData, 'setPracticing');

				});
				it("if called with caseCode=undefined, should not attempt to do anything", function() {
					flashCardData.removePracticing(undefined);
//				console.log(flashCardData.data.practicing);
					expect(flashCardData.data.practicing['undefined']).toBe(undefined);
					expect(flashCardData.data.practicing['undefined']).not.toBe('undefined');
				});
				it("if called and data.practicing[caseCode] is undefined, should not do anything", function() {
					flashCardData.data.practicing['foo3'] = undefined;
					spyOn(flashCardData, 'setPracticing');
					flashCardData.removePracticing('foo3');
					expect(flashCardData.setPracticing).not.toHaveBeenCalled();
				});
			});
			describe('savePracticing', function() {
				it("when called w/o arguments, $cookies.putObject() should be called but with data.practicing", function() {
					spyOn($cookies, 'putObject');
					flashCardData.savePracticing();
					expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.practicing, flashCardData.data.practicing);
				});
				it("when called w/ argument, $cookies.putObject() should be called but with our data", function() {
					spyOn($cookies, 'putObject');
					var fakeData = {
						'foo1': true,
						'foo2': false,
						'foo3': true
					};
					flashCardData.savePracticing(fakeData);
					expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.practicing, fakeData);
				});
				it("after called w/o args, $cookies.getObject(cookies.practicing) should be the same as data.practicing", function() {
					spyOn($cookies, 'putObject').and.callThrough();
					flashCardData.savePracticing();
					expect($cookies.getObject(cookieStrings.pll.practicing)).toEqual(flashCardData.data.practicing);
				});
			});
			describe('getPracticing', function() {
				it("if data.practicing is defined, should return", function() {
					expect(flashCardData.getPracticing()).toEqual(flashCardData.data.practicing);
				});
				it("if data.practicing is undefined, should return cookieData.practicing", function() {
					flashCardData.data.practicing = undefined;
					expect(flashCardData.getPracticing()).toEqual(cookieData.practicing);
				});
			});
		});

		describe('data.cardPriority functions', function() {
			beforeEach(function() {
				flashCardData.data.cardPriorities = {'OLL8': 1, 'OLL3': 2, 'LB2': 4};
			});
			describe('getPriority', function() {
				it("if data.cardPriorities[caseCode] is defined, returns a value ≥ 0", function() {
					expect(flashCardData.getPriority('OLL8') >= 0).toBe(true);
				});
				it("if data.cardPriorities[caseCode] is undefined, returns -1", function() {
					expect(flashCardData.getPriority('S5')).toBe(-1);
				});
				it("if caseCode is undefined, returns a -1", function() {
					expect(flashCardData.getPriority(undefined)).toBe(-1);
				});
			});
			describe('setPriority', function() {
				it("if cardPriorities[caseCode] was undefined before, and a defined value is passed through, should be defined now", function() {
					var fakeCase = 'foo1';
					flashCardData.data.cardPriorities[fakeCase] = undefined;
					flashCardData.setPriority(fakeCase, 1);
					expect(angular.isDefined(flashCardData.data.cardPriorities[fakeCase])).toBe(true);
				});
				it("if assigning a different value, should be different", function() {
					var fakeCase = 'foo2';
					flashCardData.data.cardPriorities[fakeCase] = 1;
					flashCardData.setPriority(fakeCase, 2);
					expect(flashCardData.data.cardPriorities[fakeCase]).not.toBe(1);
					expect(flashCardData.data.cardPriorities[fakeCase]).toBe(2);
				});
				it("if caseCode is undefined, does not modify data.cardPriorities", function() {
					flashCardData.setPriority(undefined, 3);
					expect(flashCardData.data.cardPriorities['undefined']).not.toBe(3);
				});
				it("if caseCode and value are both undefined, does not modify cardPriorities", function() {
					flashCardData.data.cardPriorities['undefined'] = 3;
					flashCardData.setPriority(undefined, undefined);
					expect(flashCardData.data.cardPriorities['undefined']).toBe(3);
				});
			});
			describe('removePriority', function() {
				it("after called with legit code, data.cardPriorities should be smaller", function() {
					var oldCount = 0;
					for (var i in flashCardData.data.cardPriorities) {
						if (angular.isDefined(flashCardData.data.cardPriorities[i])) {
							oldCount++;
						}
					}
					flashCardData.removePriority('OLL8');
					var newCount = 0;
					for (var i in flashCardData.data.cardPriorities) {
						if (angular.isDefined(flashCardData.data.cardPriorities[i])) {
							newCount++;
						}
					}
					expect(oldCount > newCount).toBe(true);
				});
				it("after called, and caseCode=undefined, data.cardPriorities should be the same", function() {
					var old;
					old = angular.copy(flashCardData.data.cardPriorities, old);
					flashCardData.removePriority(undefined);
					expect(old).toEqual(flashCardData.data.cardPriorities);
				});
				it("should not call setPriority when the caseCode is undefined", function() {
					spyOn(flashCardData, 'setPriority');
					flashCardData.removePriority(undefined);
					expect(flashCardData.setPriority).not.toHaveBeenCalled();
				});
			});
			describe('saveCardPriorities', function() {
				it("if called with arguments, then calls $cookies.putObject with that arg", function() {
					spyOn($cookies, 'putObject');
					var fakePriorities = {
							'foo1': 1,
							'foo2': 2,
							'foo3': 3
					};
					flashCardData.saveCardPriorities(fakePriorities);
					expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.cardPriorities, fakePriorities);
				});
				it("once called w/o args, $cookies.putObject should also be called", function() {
					spyOn($cookies, 'putObject');
					flashCardData.saveCardPriorities();
					expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.cardPriorities, flashCardData.data.cardPriorities);
				});
				it("once called w/o args, $cookies.getObject(cookieStrings.cardPriorities) should be the same as cardPriorities", function() {
					spyOn($cookies, 'putObject').and.callThrough();
					flashCardData.saveCardPriorities();
					expect($cookies.getObject(cookieStrings.pll.cardPriorities)).toEqual(flashCardData.data.cardPriorities);
				});
			});
			describe('getCardPriorities', function() {
				it("should return an object", function() {
					expect(typeof flashCardData.getCardPriorities()).toBe('object');
				});
				it("should return a defined object", function() {
					expect(angular.isDefined(flashCardData.getCardPriorities())).toBe(true);
				});

				describe('if cardPriorities is undefined', function() {
					beforeEach(function() {
						flashCardData.data.cardPriorities = undefined;
						cookieData['cardPriorities'] = {'foo1': 2, 'foo2': 3};
					});

					it("should still return an defined object if cookieData['cardPriorities'] is defined", function() {
						expect(angular.isDefined(flashCardData.getCardPriorities())).toBe(true);
					});
					it("should return cookieData[cardPriorities]", function() {
//						console.log(typeof cookieData['cardPriorities']);
						expect(flashCardData.getCardPriorities()).toEqual(cookieData['cardPriorities']);
					});
				});
			});
		});

		describe('cards functions', function() {
			beforeEach(function() {
				flashCardData.cards = {'fooCode1': {code: 'fooCode1'}};
			});

			describe('getCard', function() {
				it("should return an object if this is one of the cards", function() {
					expect(typeof flashCardData.getCard('fooCode1')).toBe('object');
				});
				it("should return -1 if the object is not one of the cards", function() {
					expect(flashCardData.getCard('fooCode2')).toBe(-1);
				});
				it("should return -1 if caseCode is undefined", function() {
					expect(flashCardData.getCard(undefined)).toBe(-1);
				});
			});

			beforeEach(function() {
				flashCardData.data.practiceCards = [{code: 'fooCode1'}];
			});
			describe('setCard', function() {
				it("if the card is the same card as before, flashCardData.cards should be the same", function() {
					var old;
					old = angular.copy(flashCardData.cards, old);
					flashCardData.setCard('fooCode1', {code: 'fooCode1'});
					expect(flashCardData.cards).toEqual(old);
				});
				it("if a different card is added, flashCardData.cards should be different", function() {
					var old;
					old = angular.copy(flashCardData.cards, old);
//					console.log("Old: "  + angular.toJson(old));
					var cardObject = {code: 'fooCode2'};
					flashCardData.setCard('fooCode2', cardObject);
//					console.log("Old: "  + angular.toJson(old));
					expect(flashCardData.cards).not.toEqual(old);
				});
				it("if caseCode is undefined, shouldn't do anything to either cards or practiceCards", function() {
					var oldCards, oldPractice;
					oldCards = angular.copy(flashCardData.cards, oldCards);
					oldPractice = angular.copy(flashCardData.data.practiceCards, oldPractice);
					flashCardData.setCard(undefined, {code: 'fooCode3'});
					expect(oldCards).toEqual(flashCardData.cards);
					expect(oldPractice).toEqual(flashCardData.data.practiceCards);
				});
			});
			describe('removeCard', function() {
				it("if caseCode is undefined, should not modify cards", function() {
					var old;
					old = angular.copy(flashCardData.cards, old);
					flashCardData.removeCard(undefined);
					expect(old).toEqual(flashCardData.cards);
				});
				it("if caseCode is undefined, should not modify practiceCards", function() {
					var old;
					old = angular.copy(flashCardData.data.practiceCards, old);
					flashCardData.removeCard(undefined);
					expect(old).toEqual(flashCardData.data.practiceCards);
				});
			});
		});

		describe('data.practiceCards functions', function() {
			describe('savePracticeCards', function() {
				beforeEach(function() {
					flashCardData.data.practiceCards = [{code: 'fooCode1'}];
				});
				describe('when called with args', function() {
					var fakeData;

					beforeEach(function() {
						fakeData = [{code: 'fooCode2'}, {code: 'fooCode1'}];
					});
					it("once called, $cookies.putObject should also be called", function() {
						spyOn($cookies, 'putObject');
						flashCardData.savePracticeCards(fakeData);
						expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.practiceCards, fakeData);
					});
					it("after called, $cookies.getObject(practiceCards) should be the same as fakeData", function() {
						spyOn($cookies, 'putObject').and.callThrough();
						flashCardData.savePracticeCards(fakeData);
						expect($cookies.getObject(cookieStrings.pll.practiceCards)).toEqual(fakeData);
					});
				});
				describe('when called without args', function() {
					it("once called, $cookies.putObject should also be called", function() {
						spyOn($cookies, 'putObject');
						flashCardData.savePracticeCards();
						expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.practiceCards, flashCardData.data.practiceCards);
					});
					it("after called, $cookies.getObject(practiceCards) should be the same as practiceCards", function() {
						spyOn($cookies, 'putObject').and.callThrough();
						flashCardData.savePracticeCards();
//						console.log($cookies.getObject(cookieStrings.practiceCards));
//						console.log(flashCardData.data.practiceCards);
						expect($cookies.getObject(cookieStrings.pll.practiceCards)).toEqual(flashCardData.data.practiceCards);
					});
				});
			});
			describe('getPracticeCards', function() {
				beforeEach(function() {
					flashCardData.data.practiceCards = [{code: 'fooCode1'}];
				});

				it("once called, returns practiceCards", function() {
					expect(flashCardData.getPracticeCards()).toEqual(flashCardData.data.practiceCards);
				});

				it("if called and practiceCards is undefined, returns cookieData.practiceCards", function() {
					cookieData.practiceCards = [{code: 'fooCode1'}];
					flashCardData.data.practiceCards = undefined;
					expect(flashCardData.getPracticeCards()).toEqual(cookieData.practiceCards);
				});
			});
		});

		describe('data.cards functions', function() {
			beforeEach(function() {
				flashCardData.data.cards = {maxNumber: 5, options: [1, 2, 3, 4, 5]};
			});
			describe('saveCards', function() {
				describe('called with args', function() {
					it("if value is undefined, does not save", function() {
						spyOn($cookies, 'putObject');
						flashCardData.saveCards(undefined);
						expect($cookies.putObject).not.toHaveBeenCalled();
					});

					describe('if value is defined', function() {
						var value;
						beforeEach(function() {
							value = {maxNumber: 6, options: [0, 1, 2, 3, 4, 5]};
						});
						it("should save by calling $cookies.putObject", function() {
							spyOn($cookies, 'putObject');
							flashCardData.saveCards(value);
							expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.dataCards, value);
						});
						it("if saved in cookies, getting it from $cookies.getObject should be the same", function() {
							flashCardData.initialize();
							spyOn($cookies, 'putObject').and.callThrough();
							flashCardData.saveCards(value);
							expect($cookies.putObject).toHaveBeenCalled();
							expect($cookies.getObject(cookieStrings.pll.dataCards)).toEqual(value);
						});
					});
				});
				describe('called without args', function() {
					describe('cards is defined', function() {
						it("save it to the dataCards string", function() {
  						spyOn($cookies, 'putObject');
  						flashCardData.saveCards();
  						expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.dataCards, flashCardData.data.cards);
  					});
  					it("should be able to call the same object through $cookies.getObject", function() {
  						spyOn($cookies, 'putObject').and.callThrough();
  						flashCardData.saveCards();
  						expect($cookies.getObject(cookieStrings.pll.dataCards)).toEqual(flashCardData.data.cards);
  					});
					});
					describe('cards is not defined', function() {
						beforeEach(function() {
							flashCardData.data.cards = undefined;
							cookieData.cards = {maxNumber: 6, options: [0, 1, 2, 3, 4, 5]};
						});
						it("should assign it to a default value and save", function() {
							spyOn($cookies, 'putObject');
							flashCardData.saveCards();
//							console.log("cookieData.cards: " + angular.toJson(cookieData.cards));
							expect($cookies.putObject).toHaveBeenCalledWith(cookieStrings.pll.dataCards, cookieData.cards);
						});
						it("should be able to retrieve the saved value through $cookies.getObject", function() {
							spyOn($cookies, 'putObject').and.callThrough();
							flashCardData.data = {};
							flashCardData.data.cards = [];
							flashCardData.saveCards();
							expect($cookies.getObject(cookieStrings.pll.dataCards)).toEqual(cookieData.cards);
						});
					});
				});
			});
			describe('getCards', function() {
				describe("cards is defined", function() {
					it("should return same value as cards", function() {
						expect(flashCardData.getCards()).toEqual(flashCardData.data.cards);
					});
				});
				describe("cards is undefined", function() {
					it ("should assign it to default value and return the default value", function() {
						flashCardData.cards = undefined;
						expect(flashCardData.getCards()).toEqual(cookieData.cards);
					});
				});
			});
		});

		describe('data.cardOptions functions', function() {
			describe('getAlgorithmOption', function() {});
			describe('setAlgorithmOption', function() {});
			describe('removeAlgorithmOption', function() {});
			describe('saveCardOptions', function() {});
			describe('getCardOptions', function() {});
		});
	});
});
