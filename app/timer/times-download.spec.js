describe('    Test:   ', function() {
  describe('Service: TimesDownload', function() {
    beforeEach(module('myApp'));
    var TimesDownload, $httpBackend;
    beforeEach(inject(function(_TimesDownload_, _$httpBackend_) {
      TimesDownload = _TimesDownload_;
      $httpBackend = _$httpBackend_;
    }));

    describe('Should be Defined', function() {
      it('Functions should be defined', function() {
        expect(TimesDownload).toBeDefined();
        expect(TimesDownload.put).toBeDefined();
        expect(TimesDownload.link).toBeDefined();
      });
    });
  });
});
