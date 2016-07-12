/**
 * http://usejsdoc.org/
 */

describe("Filter: millisToString", function() {
	var millisToStringFilter;
	beforeEach(module('myApp'));
	beforeEach(inject(function(_millisToStringFilter_) {
		millisToStringFilter = _millisToStringFilter_;
	}));
	
	it("Should be able to handle normal, sub-3599999, quantities of milliseconds for formatting", function() {
		expect(millisToStringFilter(3599999)).toEqual("59:59.999");
		expect(millisToStringFilter((4 * 60 * 1000) + (33 * 1000) + (39))).toEqual("04:33.039");
		expect(millisToStringFilter(0)).toEqual("00:00.000");
	});
	
	it("Should be able to handle time strings and return as-is", function() {
		// Even if it's a weird time string, it should just return it
		expect(millisToStringFilter("00:22.192")).toEqual("00:22.192");
		expect(millisToStringFilter("(243:31.299)")).toEqual("(243:31.299)");
	});
	
	it("Should return 0 if it's anything but a number or a time string", function() {
		expect(millisToStringFilter({object1: {object3: "fake fake"}, object9: "mocking"})).toEqual("00:00.000");
		expect(millisToStringFilter(undefined)).toEqual("00:00.000");
		console.log(millisToStringFilter(undefined));
	});
});