describe('    Test:   ', function() {
  describe('Service: TimesDownload', function() {
    beforeEach(module('myApp'));
    var TimesDownload, $httpBackend, $http;
    beforeEach(inject(function(_TimesDownload_, _$http_, _$httpBackend_) {
      TimesDownload = _TimesDownload_;
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    }));

    describe('Should be Defined', function() {
      it('Functions should be defined', function() {
        expect(TimesDownload).toBeDefined();
        expect(TimesDownload.put).toBeDefined();
        expect(TimesDownload.link).toBeDefined();
      });
    });

    describe("put", function() {
      it("should call $http.put", function() {
        spyOn($http, 'put').and.callThrough();
        TimesDownload.put("asahsaetnhaueueohtn");
        expect($http.put).toHaveBeenCalled();
      });
    });
  });
});
