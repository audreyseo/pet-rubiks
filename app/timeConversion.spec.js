/**
 * http://usejsdoc.org/
 */

describe('Factory: TimeConversion', function() {
	var converter;
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_timeConversion_) {
		converter = _timeConversion_;
	}));
	
	describe('milliToSecond', function() {
		// Purpose is to convert millis to a # of seconds
		it("should be able to handle positive integers and round them", function() {
			// 3000 == 3
			expect(converter.milliToSecond(3000)).toEqual(3);
			// 1500 == 2
			expect(converter.milliToSecond(1500)).toEqual(2);
			// 1100 == 1
			expect(converter.milliToSecond(1100)).toEqual(1);
			expect(converter.milliToSecond(8800)).toEqual(9);
		});
		
		// Need to think about what other cases there are for this
	});
	describe('milliToMinute', function() {
		// Purpose is to convert milliseconds to minutes
		it("should be able to handle positive integers and round", function() {
			expect(converter.milliToMinute(5 * 60 * 1000)).toEqual(5);
			expect(converter.milliToMinute(10.5 * 60 * 1000)).toEqual(11);
			expect(converter.milliToMinute(20.1 * 60 * 1000)).toEqual(20);
		});
		
		// Need to think about what other cases there are for this
	});
	describe('getSeconds', function() {
		// Instead of merely converting seconds, this function actually
		// gets the number of seconds, out of sixty, that have elapsed since
		// the last time the second hand, so to speak, passed the 12, or its
		// zero point, if we were actually talking about an analog clock.
		// This is for the purpose of actually putting together a string that
		// represents a readable number of minutes, seconds, and milliseconds
		// that have passed.
		it("should be able to handle positive integers and floor them", function() {
			// Case: 05:04.300, testing normal use
			expect(converter.getSeconds((5 * 60000) + (4 * 1000) + 300)).toEqual(4);
			// Case: 1001:18.000, just putting in a ridiculously high number to make sure it still works
			expect(converter.getSeconds((1000 * 60000) + (77 * 1000) + 1000)).toEqual(17 + 1);
			// Case: 00:09.999, testing flooring function
			expect(converter.getSeconds( 9999 )).toEqual( 9 );
		});
	});
	
	describe('getHours', function() {
		// Converts milliseconds to hours. Did not originally have this function until I started unit testing
		// this factory, and I really don't think that there's a real use case for it in this particular context, because unless we're talking someone
		// other than myself, who is a speedcuber who hasn't been above 1 minute for about...a year? now, so yeah. But I'm just making it for completeness
		// anyway. It's a general-purpose time-conversion factory, so having it actually be all-purpose would be nice for future reference and use.
		it("should be able to handle positive integers", function() {
			expect(converter.getHours(10 * (60 * 60 * 1000))).toEqual(10);
		});
		
		it("should be able to handle special, very unlikely cases", function() {
			expect(converter.getHours(24 * (60 * 60 * 1000))).toEqual(0);
			expect(converter.getHours((24 + 36) * (60 * 60 * 1000))).toEqual(12);
		});
	});
	
	describe('getMinutes', function() {
		// Instead of converting to minutes, this function gets the number of minutes that have elapsed
		// when counting the time in milliseconds
		it("should be able to handle positive integers", function() {
			expect(converter.getMinutes(( 100 * 60 * 1000 ))).toEqual(40);
			expect(converter.getMinutes(( 20 * 60 * 1000 ) + (90 * 1000) + 300)).toEqual(21);
		});
		
		it ("should be able to floor the positive integers properly", function() {
			expect(converter.getMinutes((5 * 60 * 1000) + (59.999 * 1000))).toEqual(5);
			expect(converter.getMinutes((1 * 60 * 1000) + (59 * 1000) + 999)).toEqual(1);
		});
	});
	describe('getMillis', function() {
		// Grabs the last however so milliseconds that have elapsed since the last second passed
		it("should be able to handle positive integers", function() {
			expect(converter.getMillis((60 * 1000 * 60) + (4 * 1000) + 200)).toEqual(200);
			expect(converter.getMillis((2 * 1000 * 60) + (4.5 * 1000))).toEqual(500);
		});
		it("should be able to handle overflow", function() {
			expect(converter.getMillis(1001)).toEqual(1);
			expect(converter.getMillis(999)).toEqual(999);
			expect(converter.getMillis(1000)).toEqual(0);
			expect(converter.getMillis(100001)).toEqual(1);
		});
	});
	describe('secondToMilli', function() {
		// Converts seconds back to milliseconds
		it("should handle any positive integer", function() {
			expect(converter.secondToMilli(1)).toEqual(1000);
			expect(converter.secondToMilli(3.5)).toEqual(3500);
			expect(converter.secondToMilli(40000)).toEqual(40000 * 1000);
		});
		
		// What else does this need to do??? Do backflips???
	});
	describe('minuteToMilli', function() {
		it("should handle any positive integer", function() {
			expect(converter.minuteToMilli(100)).toEqual(100 * 60 * 1000);
			expect(converter.minuteToMilli(2)).toEqual(2 * 60 * 1000);
			expect(converter.minuteToMilli(3.5)).toEqual(3.5 * 60 * 1000);
		});
	});
	describe('stringToMillis', function() {
		// Converts a time string back to milliseconds
		it("Turn a regular time string in mm:ss.mmm into a number of milliseconds", function() {
			// 00:00.300
			expect(converter.stringToMillis("00:00.300")).toEqual(300);
			// 00:23.504
			expect(converter.stringToMillis("00:23.504")).toEqual(23504);
			// 10:30.999
			expect(converter.stringToMillis("10:30.999")).toEqual(630999);
		});
		
		it("Should be able to handle an abnormal time string in an odd format", function() {
			// 0:0.0
			expect(converter.stringToMillis("0:0.00000")).toEqual(0);
			// 00:101.399
			expect(converter.stringToMillis("00:101.399")).toEqual(101399);
			// 0:3.00
			expect(converter.stringToMillis("0:3.00")).toEqual(3000);
		});
		
		it("Should be able to handle cases where the units are not what we're used to", function() {
			// Toss in some hours
			expect(converter.stringToMillis("00:00:00.000")).toEqual(0);
			expect(converter.stringToMillis("01:02:59.002")).toEqual(3779002);
		});
		
		it("Should be able to also handle cases where both the units and the formatting are unfamiliar", function() {
			expect(converter.stringToMillis("0:02:10.24")).toEqual(130024);
			expect(converter.stringToMillis("14:300:22.000")).toEqual(68422000);
		});
	});
	describe('millisToString', function() {
		// Converts a given amount in milliseconds into a time string of the format that we expect, loosely, mm:ss.mmm
		it("Should be able to handle positive integers including and below 59 * 60000 + 59 * 1000 + 999", function() {
			expect(converter.millisToString(3599999)).toEqual("59:59.999");
			expect(converter.millisToString(0)).toEqual("00:00.000");
			expect(converter.millisToString(625105)).toEqual("10:25.105");
		});
		
		// Support for hours?
	});
});