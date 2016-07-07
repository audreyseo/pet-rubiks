/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.factory('timeConversion', function() {
		var factory = {};
		
		factory.milliToSecond = function(mil) {
			return(Math.round(mil / 1000));
		};
		
		factory.milliToMinute = function(mil) {
			return(Math.round(mil / (60000)));
		};
		
		factory.getSeconds = function(mil) {
			return(Math.floor((mil % 60000) / 1000));
		};
		
		factory.getMinutes = function(mil) {
			return(Math.floor(mil / 60000));
		};
		
		factory.getMillis = function(mil) {
			return(mil % 1000);
		};
		
		factory.secondToMilli = function(sec) {
			return(sec * 1000);
		};
		
		factory.minuteToMilli = function(min) {
			return(min * 60 * 1000);
		};
		
		factory.stringToMillis = function(time) {
//			console.log(time.time);
			var string = time;
//			console.log(string);
			if (string.length > 0) {
				var a = string.indexOf(":");
				var b = string.indexOf(".");
				var c = string.length;
//				
//				console.log(string.substring(0, a));
//				console.log(string.substring(a, b));
//				console.log(string.substring(b, c));
				
				var min = parseInt(string.substring(0, a));
				var sec = parseInt(string.substring(a + 1, b));
				var mil = parseInt(string.substring(b + 1, c));
				
				var minM = factory.minuteToMilli(min);
				var secM = factory.secondToMilli(sec);
				
				
//				console.log(a + " " + b + " " + c + "\n" +
//						'Type of Mil: ' + (typeof mil) + "\n" +
//						min + " " + sec + " " + mil + "\n" +
//						minM + " " + secM + " " + mil);
//				console.log('Type of Mil: ' + (typeof mil));
//				console.log(min + " " + sec + " " + mil);
				return (minM + secM + mil);
			}
			return(0);
		};
		
		factory.millisToString = function(mils) {
			var min = factory.getMinutes(mils);
			var sec = factory.getSeconds(mils);
			var mil = factory.getMillis(mils);
			
			var minStr = (min < 10) ? "0" + min : min;
			var secStr = (sec < 10) ? ":0" + sec : ":" + sec;
			var milStr = (mil < 10) ? ".00" + mil : ((mil < 100) ? ".0" + mil : "." + mil);
			return(minStr + secStr + milStr);
		};
		
		return factory;
	});