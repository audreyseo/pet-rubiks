/**
 * http://usejsdoc.org/
 */
describe('	Test:	', function() {
	describe("Directive: DividingBox", function() {
		var $compile, $rootScope, template;
		
		beforeEach(module('myApp', 'templates/dividingBox.html'));
		
		beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {
			template = $templateCache.get('templates/dividingBox.html');
			$templateCache.put('templates/dividingBox.html', template);
			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		}));
		
		it("its contents should include whatever elements it's given", function() {
			var dividerTitle = "My Div";
			var dividerId = "myDividerId";
			$rootScope.myDividerTitle = dividerTitle;
			$rootScope.myDividerId = dividerId;
			var myDiv = angular.element('<div id="myDiv"></div>');
			var element = angular.element('<dividing-box divider-title="myDividerTitle" divider-id="myDividerId"><div id="myDiv"></div></dividing-box>');
			
			var directive = $compile(element)($rootScope);
			$rootScope.$digest();
			
			expect(directive.find('input').length).toEqual(2);
		});
		
	});
});