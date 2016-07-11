/**
 * http://usejsdoc.org/
 */

describe('Filter: colorCodeAlgorithms', function() {
	var colorCodeAlgorithmsFilter;
	
	beforeEach(module('myApp'));
	beforeEach(inject(function(_colorCodeAlgorithmsFilter_) {
		colorCodeAlgorithmsFilter = _colorCodeAlgorithmsFilter_;
	}));
	
	it("should be able to recognize all 9 sequences", function() {
		// R U R' U'
		expect(colorCodeAlgorithmsFilter("(R U R' U')"))
					.toEqual("<span class='rurpup'>(R U R' U')</span>");
		// r U R' U'
		expect(colorCodeAlgorithmsFilter("(r U R' U')"))
					.toEqual("<span class='rurpup'>(<span class='abnormal'>r</span> U R' U')</span>");
		// R U R' U
		expect(colorCodeAlgorithmsFilter("(R U R' U)"))
					.toEqual("<span class='rurpu'>(R U R' U)</span>");
		// r U R' U
		expect(colorCodeAlgorithmsFilter("(r U R' U)"))
					.toEqual("<span class='rurpu'>(<span class='abnormal'>r</span> U R' U)</span>");
		// R' F R F'
		expect(colorCodeAlgorithmsFilter("(R' F R F')"))
					.toEqual("<span class='rpfrfp'>(R' F R F')</span>");
		// R' F R' F'
		expect(colorCodeAlgorithmsFilter("(R' F R' F')"))
					.toEqual("<span class='rpfrfp'>(R' F <span class='abnormal'>R'</span> F')</span>");
		// r' F R F'
		expect(colorCodeAlgorithmsFilter("(r' F R F')"))
					.toEqual("<span class='rpfrfp'>(<span class='abnormal'>r'</span> F R F')</span>");
		// L' U' L U
		expect(colorCodeAlgorithmsFilter("(L' U' L U)"))
					.toEqual("<span class='rurpup'>(L' U' L U)</span>");
		// L' U' L U'
		expect(colorCodeAlgorithmsFilter("(L' U' L U')"))
					.toEqual("<span class='rurpu'>(L' U' L U')</span>");
		// L F' L' F
		expect(colorCodeAlgorithmsFilter("(L F' L' F)"))
					.toEqual("<span class='rpfrfp'>(L F' L' F)</span>");
	});
	
	it("should return blanks for blank sequences", function() {
		expect(colorCodeAlgorithmsFilter("")).toEqual("");
	});
	
	it("inputs without the 9 sequences should be returned as-is", function() {
		// Close enough?: R u R' U'
		expect(colorCodeAlgorithmsFilter("(R u R' U')")).toEqual("(R u R' U')");
		// Empty Parentheses
		expect(colorCodeAlgorithmsFilter("()")).toEqual("()");
		// Close enough?: Open parentheses
		expect(colorCodeAlgorithmsFilter("(R U R' U'")).toEqual("(R U R' U'");
		// Close enough?: R U R'
		expect(colorCodeAlgorithmsFilter("(R U R')")).toEqual("(R U R')");
	});
});