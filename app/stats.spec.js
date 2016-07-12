/**
 * http://usejsdoc.org/
 */

describe('Test:	', function() {
  describe('Factory: Statistics', function() {
  	var statistics, timeConversion;
  	
  	beforeEach(module('myApp'));
  	beforeEach(inject(function(_statistics_, _timeConversion_) {
  		statistics = _statistics_;
  		timeConversion = _timeConversion_;
  	}));
  	
  	it('TimeConversion should be defined', function() {
  		expect(angular.isDefined(timeConversion)).toBe(true);
  	});
  	
  	it("Statistics' stats should be defined", function() {
  		expect(angular.isDefined(statistics.stats)).toBe(true);
  	});
  	
  	it("methods should be defined", function() {
  		expect(angular.isDefined(statistics.addData)).toBe(true);
  		expect(angular.isDefined(statistics.loadData)).toBe(true);
  		expect(angular.isDefined(statistics.mean)).toBe(true);
  		expect(angular.isDefined(statistics.variance)).toBe(true);
  		expect(angular.isDefined(statistics.stdDev)).toBe(true);
  		expect(angular.isDefined(statistics.mean5)).toBe(true);
  		expect(angular.isDefined(statistics.mean35)).toBe(true);
  		expect(angular.isDefined(statistics.mean10)).toBe(true);
  		expect(angular.isDefined(statistics.mean1012)).toBe(true);
  		expect(angular.isDefined(statistics.q1)).toBe(true);
  		expect(angular.isDefined(statistics.q3)).toBe(true);
  		expect(angular.isDefined(statistics.best)).toBe(true);
  		expect(angular.isDefined(statistics.worst)).toBe(true);
  		expect(angular.isDefined(statistics.iqr)).toBe(true);
  		expect(angular.isDefined(statistics.range)).toBe(true);
  		expect(angular.isDefined(statistics.median)).toBe(true);
  		expect(angular.isDefined(statistics.mean100)).toBe(true);
  		expect(angular.isDefined(statistics.calculate)).toBe(true);
  	});
  	
  	describe("stats' variable", function() {
  		it("mean should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean)).toBe(true);
  		});
  		it("stdDev should be defined", function() {
  			expect(angular.isDefined(statistics.stats.stdDev)).toBe(true);
  		});
  		it("variance should be defined", function() {
  			expect(angular.isDefined(statistics.stats.variance)).toBe(true);
  		});
  		it("mean5 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean5)).toBe(true);
  		});
  		it("mean35 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean35)).toBe(true);
  		});
  		it("mean10 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean10)).toBe(true);
  		});
  		it("mean1012 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean1012)).toBe(true);
  		});
  		it("median should be defined", function() {
  			expect(angular.isDefined(statistics.stats.median)).toBe(true);
  		});
  		it("best should be defined", function() {
  			expect(angular.isDefined(statistics.stats.best)).toBe(true);
  		});
  		it("worst should be defined", function() {
  			expect(angular.isDefined(statistics.stats.worst)).toBe(true);
  		});
  		it("q1 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.q1)).toBe(true);
  		});
  		it("q3 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.q3)).toBe(true);
  		});
  		it("iqr should be defined", function() {
  			expect(angular.isDefined(statistics.stats.iqr)).toBe(true);
  		});
  		it("mean100 should be defined", function() {
  			expect(angular.isDefined(statistics.stats.mean100)).toBe(true);
  		});
  		it("range should be defined", function() {
  			expect(angular.isDefined(statistics.stats.range)).toBe(true);
  		});
  	});
  	
  	describe('addData', function() {
  		it('data should be appended when this function is called', function() {expect(true).toBe(false)});
  		it("data should be a longer array after this function is called", function() {expect(true).toBe(false)});
  		it("data that doesn't have a date object and/or a times string should not be appended", function () {expect(true).toBe(false)});
  		it("data should be added to the end of the array", function() {expect(true).toBe(false)});
  	});
  	describe('loadData', function() {
  		it("data should change in some way when function is called", function() {expect(true).toBe(false)});
  		it("stats.data should contain integers", function() {expect(true).toBe(false)});
  		it("stats.data should be defined still", function() {expect(true).toBe(false)});
  	});
  	describe('mean', function() {
  		it("stats.mean should change if mean() is called", function() {expect(true).toBe(false)});
  		it("mean should be for the entire array", function() {expect(true).toBe(false)});
  		it("mean should be 0 if the array is too small", function() {expect(true).toBe(false)});
  		it("mean should not be negative", function() {expect(true).toBe(false)});
  	});
  	describe('variance', function() {
  		it("variance should be for the entire array", function() {expect(true).toBe(false)});
  		it("variance should be the standard deviation squared", function() {expect(true).toBe(false)});
  	});
  	describe('stdDev', function() {
  		it("if the variance is negative, somehow, standard deviation should be 0", function() {expect(true).toBe(false)});
  		it("standard deviation should be the square root of variance", function() {expect(true).toBe(false)});
  		it("different sets of numbers should give different standard deviations", function() {expect(true).toBe(false)});
  	});
  	describe('mean5', function() {
  		it("after called, and data length ≥ to 5, stats.mean5 should not be the same", function() {expect(true).toBe(false)});
  		it("different sets of data should give different means of the last 5", function() {expect(true).toBe(false)});
  		it("after called, and data length < 5, stats.mean5 should be the same", function() {expect(true).toBe(false)});
  	});
  	describe('mean35', function() {
  		it("after called, and data length ≥ 5, stats.mean35 should not be the same", function() {expect(true).toBe(false)});
  		it("after called, and data length < 5, stats.mean35 should be the same", function() {expect(true).toBe(false)});
  		it("after called, and data is different, stats.mean35 should not be the same", function() {expect(true).toBe(false)});
  	});
  	describe('mean10', function() {
  		it("when called, stats.mean10 should only change if the length of the data array is greater than/equal to 10", function() {expect(true).toBe(false)});
  	});
  	describe('mean1012', function() {expect(true).toBe(false)});
  	describe('mean100', function() {
			it("if the size of the data array is less than 100, mean100 should be zero when this is called", function() {expect(true).toBe(false)});
  	});
  	describe('q1', function() {
  		it("after called, q1 should be smaller than q3", function() {expect(true).toBe(false)});
  	});
  	describe('median', function() {
  		it("after called, and data length greater than 3, median should not be 0", function() {expect(true).toBe(false)});
  		it("after called, stats.median should change", function() {expect(true).toBe(false)});
  		it("after called, stats.median should be different for different data", function() {expect(true).toBe(false)});
  	});
  	describe('q3', function() {
  		it("after called, and data.length greater han 10, should be greater than q1", function() {expect(true).toBe(false)});
  	});
  	describe('best', function() {
  		it("after called, and data.length ≥ 3, stats.best should be < stats.worst", function() {expect(true).toBe(false)});
  	});
  	describe('worst', function() {
  		it("after called, and data.length ≥ 3, stats.worst should be > stats.best", function () {expect(true).toBe(false)});
  	});
  	describe('iqr', function() {
  		it("after called, stats.iqr should be smaller than the entire range's value", function() {expect(true).toBe(false)});
  	});
  	describe('range', function() {
  		it("after called, stats.range should be a string if data.length > 3", function() {expect(true).toBe(false)});
  		it("after called, stats.range should be 0 if data.length ≤ 3", function() {expect(true).toBe(false)});
  	});
  	describe('calculate', function() {
  		it("once called, the variables of stats should change", function() {expect(true).toBe(false)});
  		it("should be called after loadData is called", function() {expect(true).toBe(false)});
  		it("should be called after addData is called", function() {expect(true).toBe(false)});
  	});
  });
});