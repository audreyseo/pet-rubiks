describe('  Test: ', function() {
  describe('Factory: ContentControl', function() {
    var ContentControl;
    beforeEach(module('myApp'));

    beforeEach(inject(function(_ContentControl_) {
      ContentControl = _ContentControl_;
    }));

    describe('Things must be Defined', function() {
      it('Functions', function() {
        expect(ContentControl.addPriorityOptions).toBeDefined();
        expect(ContentControl.countCases).toBeDefined();
        expect(ContentControl.editCardSelection).toBeDefined();
        expect(ContentControl.editTable).toBeDefined();
        expect(ContentControl.flashCardsData).toBeDefined();
        expect(ContentControl.initialize).toBeDefined();
        expect(ContentControl.modifyKnownCases).toBeDefined();
        expect(ContentControl.pickAnAlgorithm).toBeDefined();
        expect(ContentControl.setCaseType).toBeDefined();
        expect(ContentControl.setFilter).toBeDefined();
        expect(ContentControl.setSort).toBeDefined();
        expect(ContentControl.showHiddenCols).toBeDefined();
        expect(ContentControl.showHiddenRows).toBeDefined();
        expect(ContentControl.useCookieInfo).toBeDefined();
        expect(ContentControl.watchCards).toBeDefined();
        expect(ContentControl.watchPracticing).toBeDefined();
        expect(ContentControl.watchPracticeCards).toBeDefined();
        expect(ContentControl.watchHidden).toBeDefined();
        expect(ContentControl.watchHiddenRows).toBeDefined();
        expect(ContentControl.watchCardOptions).toBeDefined();
        expect(ContentControl.watchCardPriorities).toBeDefined();
      });

      it('Fields', function() {
        expect(ContentControl.manager).toBeDefined();
        expect(ContentControl.cookieString).toBeDefined();
        expect(ContentControl.flashData).toBeDefined();
        expect(ContentControl.hiddenRows).toBeDefined();
        expect(ContentControl.number).toBeDefined();
        expect(ContentControl.practiceCasesButtonValue).toBeDefined();
        expect(ContentControl.type).toBeDefined();
      });
    });
    describe('Functions', function() {
      describe('addPriorityOptions', function() {
        it('should create an array that makes things work', function() {
          ContentControl.cards = {};
          expect(ContentControl.cards.options).toBeUndefined();
          ContentControl.cards.maxNumber = 7;
          ContentControl.addPriorityOptions();
          expect(ContentControl.cards.options).toBeDefined();
          expect(ContentControl.cards.options[0]).toBe(1);
          expect(ContentControl.cards.options[ContentControl.cards.options.length - 1]).toBe(7);
        });
      });
      describe('countCases', function() {
        it('should count the number of cases that are hidden', function() {
          ContentControl.initialize("OLL");
          expect(ContentControl.number.knownCases).toBeDefined();
          expect(ContentControl.number.percent).toBeDefined();
          expect(ContentControl.number.percent).toBeGreaterThan(-0.0000001);
          expect(ContentControl.number.percent).toBeLessThan(100);
          expect(ContentControl.number.prob).toBeDefined();
          expect(ContentControl.number.prob).toBeLessThan(100);
          expect(ContentControl.number.prob).toBeGreaterThan(-0.0000001);
        });
      });
      describe('editCardSelection', function() {});
      describe('editTable', function() {});
      describe('flashCardsData', function() {
        it('should call flashData.initialize, addPriorityOptions', function() {
          ContentControl.initialize("OLL");
          spyOn(ContentControl, 'addPriorityOptions');
          ContentControl.flashCardsData();
          expect(ContentControl.addPriorityOptions).toHaveBeenCalled();
        });
      });
      describe('initialize', function() {
        it('should call countCases and useCookieInfo', function() {
          spyOn(ContentControl, 'countCases');
          spyOn(ContentControl, 'useCookieInfo');
          ContentControl.initialize("OLL");
          expect(ContentControl.countCases).toHaveBeenCalled();
          expect(ContentControl.useCookieInfo).toHaveBeenCalled();
        });
      });
      describe('modifyKnownCases', function() {
        it('after called, should be the opposite', function() {
          ContentControl.showing = {};
          ContentControl.showing.editCol = false;
          expect(ContentControl.showing.editCol).toBe(false);
          ContentControl.modifyKnownCases();
          expect(ContentControl.showing.editCol).not.toBe(false);
          expect(ContentControl.showing.editCol).toBe(true);
        });
      });
      describe('pickAnAlgorithm', function() {});
      describe('setCaseType', function() {});
      describe('setFilter', function() {});
      describe('setSort', function() {});
      describe('showHiddenRows', function() {});
      describe('showHiddenCols', function() {});
      describe('useCookieInfo', function() {});
      describe('watchCards', function() {});
      describe('watchPracticing', function() {});
      describe('watchPracticeCards', function() {});
      describe('watchHidden', function() {});
      describe('watchHiddenRows', function() {
        it('should call countCases', function() {
          spyOn(ContentControl, 'countCases');
          ContentControl.initialize("PLL");
          ContentControl.watchHiddenRows([], []);
          expect(ContentControl.countCases).toHaveBeenCalled();
        });
      });
      describe('watchCardOptions', function() {});
      describe('watchCardPriorities', function() {});
    });
  });
});
