describe("    Test:   ", function() {
  describe("Controller: OLLController", function() {
    var createController, OLL, scope, ContentControl, $cookies;

    beforeEach(module("myApp"));
    beforeEach(inject(function($rootScope, $controller, _ContentControl_, _$cookies_) {
      scope = $rootScope.$new();
      ContentControl = _ContentControl_;
      $cookies = _$cookies_;

      createController = function() {
        ContentControl.cardOptions = {"thing": "other thing"};
        ContentControl.cardPriorities = [];
        return $controller('OLLController', {
          '$scope': scope,
          'ContentControl': ContentControl,
          '$cookies': $cookies
        });
      };
    }));
    beforeEach(function() {
      PLL = createController();
    });

    describe("Defined or undefined", function() {
      it("Fields", function() {
        expect(scope.addPriorityOptions).toBeDefined();
        expect(scope.animationOpts).toBeDefined();
        expect(scope.cardOptions).toBeDefined();
        expect(scope.cardPriorities).toBeDefined();
        expect(scope.cards).toBeDefined();
        expect(scope.cases).toBeDefined();
        expect(scope.cols).toBeDefined();
        expect(scope.classes).toBeDefined();
        expect(scope.colClasses).toBeDefined();
        expect(scope.cookieString).toBeDefined();
        expect(scope.countCases).toBeDefined();
        expect(scope.cardData).toBeDefined();
        expect(scope.editCardSelection).toBeDefined();
        expect(scope.editTable).toBeDefined();
        expect(scope.filteredCases).toBeDefined();
        expect(scope.filterString).toBeDefined();
        expect(scope.flashCardsData).toBeDefined();
        expect(scope.hiddenColsData).toBeDefined();
        expect(scope.hiddenRows).toBeDefined();
        expect(scope.hiddenRowsData).toBeDefined();
        expect(scope.hideHiddenCols).toBeDefined();
        expect(scope.hideHiddenRows).toBeDefined();
        expect(scope.initialize).toBeDefined();
        expect(scope.knownCases).toBeDefined();
        expect(scope.modifyKnownCases).toBeDefined();
        expect(scope.number).toBeDefined();
        expect(scope.pickAnAlgorithm).toBeDefined();
        expect(scope.practiceCards).toBeDefined();
        expect(scope.practicing).toBeDefined();
        expect(scope.returnSolve).toBeDefined();
        expect(scope.setFilter).toBeDefined();
        expect(scope.setSort).toBeDefined();
        expect(scope.showing).toBeDefined();
        expect(scope.showHiddenRows).toBeDefined();
        expect(scope.showHiddenCols).toBeDefined();
        expect(scope.useCookieInfo).toBeDefined();
      });
    });

    describe("Functions", function() {
      describe("checkFlashCardData", function() {

      });
      describe("editTable", function() {
        it("Should call ContentControl.editTable()", function() {
          spyOn(ContentControl, 'editTable');
          scope.editTable();
          expect(ContentControl.editTable).toHaveBeenCalled();
          expect(scope.editString).toEqual(ContentControl.editString);
        });
      });
      describe("returnSolve", function() {
        it("Should return a specific solve", function() {
          var card = {};
          card.solve1 = {};
          card.solve2 = {};
          card.solve2.length = 10;
          card.solve1.length = 5;
          card.option = 1;
          card.solve1.alg = "abcdefg";
          card.solve2.alg = "hijklmn";
          expect(scope.returnSolve(card)).toEqual("abcdefg");
          card.option = 2;
          expect(scope.returnSolve(card)).toEqual("hijklmn");
          card.solve2.length = 0;
          expect(scope.returnSolve(card)).toEqual("abcdefg");
        });
      });
    });
  });
});
