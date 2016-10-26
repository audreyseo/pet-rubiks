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
	});

	it('Anything less than 200 and greater than 0 should be returned as', function() {
	  expect(millisToStringFilter(10)).toBe(10);
		expect(millisToStringFilter(199)).toBe(199);
	});

	it('Anything less than/equal to 0 should result in blank', function() {
	  expect(millisToStringFilter(0)).toEqual("--:--.---");
		expect(millisToStringFilter(-1)).toEqual("--:--.---");
		expect(millisToStringFilter(-100000)).toEqual("--:--.---");
	});

	it("Should be able to handle time strings and return as-is", function() {
		// Even if it's a weird time string, it should just return it
		expect(millisToStringFilter("00:22.192")).toEqual("00:22.192");
		expect(millisToStringFilter("(243:31.299)")).toEqual("(243:31.299)");
	});

	it("Should return 0 if it's anything but a number or a time string", function() {
		expect(millisToStringFilter({object1: {object3: "fake fake"}, object9: "mocking"})).toEqual("00:00.000");
		expect(millisToStringFilter(undefined)).toEqual("00:00.000");
//		console.log(millisToStringFilter(undefined));
	});

	it("Should return '--:--.--' if the number is -1", function() {
		expect(millisToStringFilter(-1)).toEqual("--:--.---");
	});

	it('Should just return 00:00.000 if given a string that is not already formatted', function() {
		expect(millisToStringFilter("0")).toEqual("00:00.000");
		expect(millisToStringFilter("123340343")).toEqual("00:00.000");
	});

	it('if not a string that is not formatted just return', function() {
		expect(millisToStringFilter("hi")).toEqual("hi");
	});
});
