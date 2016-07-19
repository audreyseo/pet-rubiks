/**
 * http://usejsdoc.org/
 */

function randomTimeObject(i) {
	var millis = parseInt(Math.random() * 100000) + 1000;
	var min = parseInt(millis / (60 * 60 * 1000));
	var sec = parseInt((millis % (60 * 60 * 1000)) / 1000);
	var mil = millis % 1000;
	var date2 = new Date();
	date2.setTime(0);
	var template = "aa:bb.ccc";
	var thisTime = template.replace(/(aa)/, min).replace(/(bb)/, sec).replace(/(ccc)/, mil);
	var timeObject = {index: i + 1, time: thisTime, timeStamp: date2};
	return timeObject;
}

function generateTimeArray(max) {
	var data = [];
	for (var i = 0; i < max; i++) {
		data.push(randomTimeObject(i));
	}
	return(data);
}

describe('	Test:	', function() {
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
  		var timeObject;
  		
  		beforeEach(function() {
  			timeObject = {index: 0, time: "00:00.00", timeStamp: (new Date()).setDate(0)};
  		});
  		it('data should be appended when this function is called with proper args', function() {
  			var oldRawLength = statistics.raw.length;
  			var oldDataLength = statistics.data.length;
  			
  			statistics.addData(timeObject);
  			expect(statistics.raw.length).toBe(oldRawLength + 1);
  			expect(statistics.data.length).toBe(oldDataLength + 1);
  			expect(statistics.raw[statistics.raw.length - 1]).toEqual(timeObject);
  		});
  		it("data that doesn't have a date object and/or a times string should not be appended", function () {
  			timeObject = {index: 33};
  			var oldRawLength = statistics.raw.length;
  			statistics.addData(timeObject);
  			expect(statistics.raw.length).toBe(oldRawLength);
  		});
  		it("data should be added to the end of the array", function() {
  			statistics.addData(timeObject);
  			var length = statistics.raw.length;
  			expect(statistics.raw[length - 1]).toEqual(timeObject);
  			expect(statistics.data[length - 1]).toEqual(timeConversion.stringToMillis(timeObject.time));
  		});
  	});
  	
  	describe('loadData', function() {
  		beforeEach(function() {
    		myRawData = [];
    		for (var i = 0; i < 3; i++) {
    			myRawData.push(randomTimeObject(i));
    		}
    	});
  		it("data should change in some way when function is called", function() {
  			var oldData;
  			oldData = angular.copy(statistics.data, oldData);
  			statistics.loadData(myRawData);
  			expect(statistics.raw).toEqual(myRawData);
  			expect(statistics.data).not.toEqual(oldData);
  		});
  		it("stats.data should contain integers", function() {
  			statistics.loadData(myRawData);
				var index = parseInt(Math.random(statistics.data.length));
				expect(Number.isInteger(statistics.data[index])).toBe(true);
				index = (index + parseInt(Math.random(1000))) % statistics.data.length;
				expect(Number.isInteger(statistics.data[index])).toBe(true);
  		});
  		it("stats.data should be defined still", function() {
  			expect(statistics.data).not.toBe(undefined);
  		});
  	});
  	
  	describe('calculate', function() {
  		var myRawData;
  		beforeEach(function() {
    		myRawData = generateTimeArray(10);
    		statistics.loadData(myRawData);
    		statistics.calculate();
    	});
  		it("once called, the variables of stats should change", function() {
  			var stats1 = angular.copy(statistics.stats);
  			myRawData = generateTimeArray(11);
  			statistics.loadData(myRawData);
  			statistics.calculate();
  			expect(stats1).not.toEqual(statistics.stats);
  		});
  		it("should be called after loadData is called", function() {
  			spyOn(statistics, 'calculate');
  			statistics.loadData(myRawData);
  			expect(statistics.calculate).toHaveBeenCalled();
  		});
  		it("should be called after addData is called", function() {
  			spyOn(statistics, 'calculate');
  			statistics.addData(myRawData[1]);
  			expect(statistics.calculate).toHaveBeenCalled();
  		});
  	});
  	
  	describe('statistical functions', function() {
  		var myRawData;
  		beforeEach(function() {
    		myRawData = generateTimeArray(20);
    		statistics.loadData(myRawData);
//    		statistics.calculate();
    	});
    	
    	describe('mean', function() {
    		it("stats.mean should change if mean() is called", function() {
    			var oldMean = statistics.stats.mean;
    			statistics.mean();
    			statistics.loadData(generateTimeArray(20));
    			expect(statistics.stats.mean).not.toEqual(oldMean);
    		});
    		it("mean should be -1 if the array is too small", function() {
    			var randomData = myRawData.slice(1, 5);
    			statistics.loadData(randomData);
    			statistics.mean();
    			expect(statistics.stats.mean).toEqual(-1);
    		});
    		it("mean should not be negative", function() {
    			statistics.loadData(myRawData);
    			statistics.mean();
    			expect(statistics.stats.mean < 0).toBe(false);
    		});
    	});
    	describe('stdDev', function() {
    		it("if the variance is negative, somehow, standard deviation should be -1", function() {
    			statistics.stats.variance = Math.random() * 1000 * -1;
    			statistics.stdDev();
    			expect(statistics.stats.stdDev).toEqual(-1);
    		});
    		it("standard deviation should be the square root of variance", function() {
    			expect(statistics.stats.stdDev).toEqual(Math.pow(statistics.stats.variance, 0.5));
    			statistics.loadData(myRawData);
    			statistics.mean();
    			statistics.variance();
    			statistics.stdDev();
    			expect(statistics.stats.stdDev).toEqual(Math.pow(statistics.stats.variance, 0.5));
    		});
    		it("different sets of numbers should give different standard deviations", function() {
    			statistics.loadData(myRawData);
    			statistics.mean();
    			statistics.variance();
    			statistics.stdDev();
    			var sd1 = statistics.stats.stdDev;
    			myRawData = [];
    			for (var i = 0; i < 14; i++) {
    				myRawData.push(randomTimeObject(i));
    			}
    			statistics.loadData(myRawData);
    			statistics.mean();
    			statistics.variance();
    			statistics.stdDev();
    			var sd2 = statistics.stats.stdDev;
    			expect(sd1).not.toBe(sd2);
    		});
    		it("if the length of data ≤ 5, stddev should be -1", function() {
    			var randomData = myRawData.slice(3, 5);
    			statistics.loadData(randomData);
    			statistics.mean();
    			statistics.variance();
    			statistics.stdDev();
    			expect(statistics.stats.stdDev).toBe(-1);
    		});
//    		it("if data.length > -1 and mean = -1, should call mean() and variance() before calculating", function() {
//    			statistics.loadData(myRawData);
//    			spyOn(statistics, 'mean').and.callThrough();
//    			spyOn(statistics, 'variance').and.callThrough();
//    			statistics.stdDev();
//    			expect(statistics.mean).toHaveBeenCalled();
//    			expect(statistics.variance).toHaveBeenCalled();
//    		});
    	});
    	describe('variance', function() {
    		it("if mean is -1, calls mean()", function() {
    			statistics.loadData(myRawData);
    			statistics.stats.mean = -1;
    			spyOn(statistics, 'mean').and.callThrough();
    			statistics.variance();
    			expect(statistics.mean).toHaveBeenCalled();
    		});
    		it("if the length of data ≤ 5, variance should be -1", function() {
    			var randData = myRawData.slice(2, 5);
    			statistics.loadData(randData);
    			statistics.mean();
    			statistics.variance();
    			expect(statistics.stats.variance).toBe(-1);
    		});
    		it("if the length of data is suddenly ≤ 5, and recalculated, variance should be -1", function() {
    			statistics.loadData(myRawData);
    			statistics.variance();
    			var oldVariance = statistics.stats.variance;
    			var randData = myRawData.slice(4, 5);
    			statistics.loadData(randData);
    			statistics.variance();
    			expect(statistics.stats.variance).not.toEqual(oldVariance);
    			expect(statistics.stats.variance).toEqual(-1);
    		});
    		it("variance should be the standard deviation squared", function() {
    			statistics.loadData(myRawData);
    			statistics.variance();
    			statistics.stdDev();
    			expect((statistics.stats.variance).toFixed(2)).toEqual((Math.pow(statistics.stats.stdDev, 2)).toFixed(2));
    		});
    	});
    	describe('mean5', function() {
    		beforeEach(function() {
    			statistics.loadData(myRawData);
    		});
    		it("after called, and data length ≥ 5, avg() should be called", function() {
    			spyOn(statistics, 'avg');
    			statistics.mean5();
    			expect(statistics.avg).toHaveBeenCalled();
    		});
    		it("after called, and data length < 5, avg() shouldn't be called", function() {
    			spyOn(statistics, 'avg');
    			statistics.loadData(generateTimeArray(4));  				
    			statistics.mean5();
    			expect(statistics.avg).not.toHaveBeenCalled();
    		});
    		it("after called, and data length ≥ to 5, stats.mean5 should not be the same", function() {
    			var oldMean5 = statistics.stats.mean5;
    			var newData = generateTimeArray(13);
    			statistics.loadData(newData);
    			expect(statistics.stats.mean5).not.toBe(oldMean5);
    		});
    		it("after called, and data length < 5, stats.mean5 should be -1", function() {
    			var randData = myRawData.slice(1, 4);
    			statistics.loadData(randData);
    			statistics.mean5();
    			expect(statistics.stats.mean5).toBe(-1);
    		});
    	});
    	describe('mean35', function() {
    		beforeEach(function() {
    			statistics.loadData(myRawData);
    		});
    		it("length > 5, avg() should be called when it is called", function() {
    			spyOn(statistics, 'avg');
    			statistics.mean35();
    			expect(statistics.avg).toHaveBeenCalled();
    		});
    		it("length < 5, avg() should not be called when it is called", function() {
    			var randData = myRawData.slice(3, 4);
    			statistics.loadData(randData);
    			spyOn(statistics, 'avg');
    			statistics.mean35();
    			expect(statistics.avg).not.toHaveBeenCalled();
    		});
    		it("after called, and data length ≥ 5, with different data, stats.mean35 should not be the same", function() {
    			var oldMean35 = statistics.stats.mean35;
    			var newData = generateTimeArray(17);
    			statistics.loadData(newData);
    			statistics.mean35();
    			expect(statistics.stats.mean35).not.toBe(oldMean35);
    		});
    		it("after called, and data length < 5, stats.mean35 should be -1", function() {
    			var data = myRawData.slice(2, 5);
    			statistics.loadData(data);
    			statistics.mean35();
    			expect(statistics.stats.mean35).toBe(-1);
    		});
    	});
    	describe('mean10', function() {
    		it("when called, stats.mean10 should only change if the length of the data array is greater than/equal to 10", function() {
    			statistics.mean10();
    			var oldMean10 = statistics.stats.mean10;
    			var randData = generateTimeArray(10);
    			statistics.loadData(randData);
    			statistics.mean10();
    			expect(statistics.stats.mean10).not.toEqual(oldMean10);
    		});
    		it("if length of data ≤ 10, should be -1", function() {
    			var randData = generateTimeArray(9);
    			statistics.loadData(randData);
    			expect(statistics.stats.mean10).toEqual(-1);
    		});
    		it("if the length of data becomes ≤ 10, should become -1", function() {
    			var oldMean10 = statistics.stats.mean10;
    			var data = generateTimeArray(9);
    			statistics.loadData(data);
    			expect(statistics.stats.mean10).not.toEqual(oldMean10);
    			expect(oldMean10).not.toEqual(-1);
    			expect(statistics.stats.mean10).toEqual(-1);
    		});
    	});
    	describe('mean1012', function() {
    		it("when called, it should only change if length of the data is greater than/equal to 12", function() {
    			var mean1012 = statistics.stats.mean1012;
    			var data = generateTimeArray(13);
    			statistics.loadData(data);
    			expect(statistics.stats.mean1012).not.toEqual(mean1012);
    			expect(statistics.stats.mean1012).not.toEqual(-1);
    		});
    		it("if length of data ≤ 12, should be -1", function() {
    			var data = generateTimeArray(11);
    			statistics.loadData(data);
    			var mean1012 = statistics.stats.mean1012;
    			expect(mean1012).toEqual(-1);
    		});
    		it("if length of data becomes ≤ 12, should become -1", function() {
    			var oldMean1012 = statistics.stats.mean1012;
    			var data = generateTimeArray(11);
    			statistics.loadData(data);
    			var mean1012 = statistics.stats.mean1012;
    			expect(mean1012).not.toEqual(oldMean1012);
    			expect(oldMean1012).not.toEqual(-1);
    			expect(mean1012).toEqual(-1);
    		});
    	});
    	
    	describe('mean100', function() {
  			it("if the size of the data array is less than 100, mean100 should be -1 when this is called", function() {
  				var data = generateTimeArray(10);
  				statistics.loadData(data);
  				var mean100 = statistics.stats.mean100;
  				expect(mean100).toEqual(-1);
  			});
  			
  			beforeEach(function() {
  				var data = generateTimeArray(100);
  				statistics.loadData(data);
  			});
  			
  			it("size of data ≥ 100, should not be -1", function() {
  				var mean100 = statistics.mean100;
  				expect(mean100).not.toEqual(-1);
  			});
  			it("it should be positive if size of data ≥ 100", function() {
  				statistics.mean100();
  				var mean100 = statistics.stats.mean100;
  				expect(mean100 >= 0).toBe(true);
  			});
  			it("if data length becomes < 100, should be -1", function() {
  				var data = generateTimeArray(99);
  				statistics.loadData(data);
  				statistics.mean100();
  				var mean100 = statistics.stats.mean100;
  				expect(mean100).toEqual(-1);
  			});
    	});
    	
    	describe('q1', function() {
    		it("after called, data length > 10, q1 should be smaller than q3", function() {
    			var q1 = statistics.stats.q1;
    			var q3 = statistics.stats.q3;
    			expect(q1 < q3).toBe(true);
    		});
    		it("after called, data length < 10, q1 should be -1", function() {
    			var data = generateTimeArray(9);
    			statistics.loadData(data);
    			expect(statistics.stats.q1).toBe(-1);
    		});
    	});
    	
    	describe('median', function() {
    		it("after called, and data length greater than 3, median should not be -1", function() {
    			var median = statistics.stats.median;
    			expect(median).not.toBe(-1);
    			expect(median > 0).toBe(true);
    		});
    		it("after called, stats.median should change", function() {
    			var oldMedian = statistics.stats.median;
    			var data = generateTimeArray(10);
    			statistics.loadData(data);
    			var median = statistics.stats.median;
    			expect(median).not.toEqual(-1);
    			expect(median).not.toEqual(oldMedian);
    		});
    		it("if data length becomes < 2 should be -1", function() {
    			var oldMedian = statistics.stats.median;
    			var data = generateTimeArray(2);
    			statistics.loadData(data);
    			statistics.median();
    			var median = statistics.stats.median;
    			expect(oldMedian).not.toEqual(-1);
    			expect(median).toEqual(-1);
    			expect(median).not.toEqual(oldMedian);
    		});
    	});
    	
    	describe('q3', function() {
    		it("after called, and data.length greater han 10, should be greater than q1", function() {
    			var q3 = statistics.stats.q3;
    			var q1 = statistics.stats.q1;
    			expect(q3).not.toEqual(q1);
    			expect(q3 > q1).toBe(true);
    		});
    	});
    	describe('best', function() {
    		it("after called, and data.length ≥ 3, stats.best should be < stats.worst", function() {
    			var best = statistics.stats.best;
    			var worst = statistics.stats.worst;
    			expect(worst > best).toBe(true);
    		});
    		it("if data length < 3, should be -1", function() {
    			var data = generateTimeArray(2);
    			statistics.loadData(data);
    			expect(statistics.stats.best).toBe(-1);
    		});
    	});
    	describe('worst', function() {
    		it("after called, and data.length ≥ 3, stats.worst should be > stats.best", function () {
    			var best = statistics.stats.best;
    			var worst = statistics.stats.worst;
    			expect(best < worst).toBe(true);
    		});
    		it("if data length < 3, worst should be -1", function() {
    			var data = generateTimeArray(2);
    			statistics.loadData(data);
    			expect(statistics.stats.worst).toBe(-1);
    		});
    	});
    	describe('iqr', function() {
    		it("after called, stats.iqr should be smaller than the entire range's value", function() {
    			var range = statistics.stats.range;
    			var iqr = statistics.stats.iqr;
    			var index = range.indexOf(", ");
    			var a = timeConversion.stringToMillis(range.substring(1, index));
    			var b = timeConversion.stringToMillis(range.substring(index + 2, range.length));
    			expect(iqr < (b - a)).toBe(true);
    		});
    		it("data length <= 10, should be -1", function() {
    			var data = generateTimeArray(10);
    			statistics.loadData(data);
    			expect(statistics.stats.iqr).toBe(-1);
    		});
    	});
    	describe('range', function() {
    		it("after called, range should be a string if data.length > 3", function() {
    			expect(typeof statistics.stats.range).toEqual('string');
    		});
    		it("after called, range should be -1 if data.length ≤ 3", function() {
    			var data = generateTimeArray(2);
    			statistics.loadData(data);
    			expect(statistics.stats.range).toBe(-1);
    		});
    	});
  	});
  });
});