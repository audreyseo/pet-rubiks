/**
 * http://usejsdoc.org/
 */
describe('	Test:	', function() {
	describe("Directive: DividingBox", function() {
		var $compile, $rootScope, template, $httpBackend;
		
		beforeEach(module('myApp', 'Templates'));
//		beforeEach(module('templates/dividingBox.html'));
		
		// Thanks to ng-directive-testing for this nice tidbit
		// https://github.com/vojtajina/ng-directive-testing/blob/start/test/helpers.js
//		beforeEach(function() {
//	    this.addMatchers({
//	        toHaveClass: function(cls) {
//	            this.message = function() {
//	                return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'.";
//	            };
//
//	            return this.actual.hasClass(cls);
//	        }
//	    });
//	});
		
		beforeEach(inject(function(_$httpBackend_, $templateCache, _$compile_, _$rootScope_) {
			$httpBackend = _$httpBackend_;
			
			template = $templateCache.get('templates/dividingBox.html');
//			console.log(template);
			$templateCache.put('templates/dividingBox.html', template);
			// Now it's just ignoring everything as per this suggestion: http://janetriley.net/2014/11/three-notes-on-angular-js-directives.html
			// But I also don't get my template? Like what?
			$httpBackend.whenGET(/.*\.html/).respond($templateCache.get('templates/dividingBox.html'));
			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		}));
		
		it("its contents should include whatever elements it's given", function() {
			var dividerTitle = "Foo";
			var dividerId = "foo";
			$rootScope.myDividerTitle = dividerTitle;
			$rootScope.myDividerId = dividerId;
			var myDiv = angular.element('<div id="myDiv"></div>');
			var element = ('<div><dividing-box divider-title=myDividerTitle divider-id=myDividerId>'+
																		'</dividing-box></div>');
//			console.log(element);
			var directive = $compile(element)($rootScope);
			console.log(directive);
			$rootScope.$digest();
			var contents = directive.contents();
			console.log(contents);
			console.log(contents[1]);
			console.log(directive);
			
			expect(directive.length).toEqual(1);
		});
		
	});
});