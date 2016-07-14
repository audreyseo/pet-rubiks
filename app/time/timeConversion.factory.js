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
		
		factory.getHours = function(mil) {
			return(Math.floor((mil % (24 * 3600 * 1000)) / (3600 * 1000)));
		}
		
		factory.getMinutes = function(mil) {
			return(Math.floor((mil % (60 * 60000)) / 60000));
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
		
		factory.hourToMilli = function(hour) {
			return(hour * 60 * 60 * 1000);
		}
		
		factory.stringToMillis = function(time) {
//			console.log(time.time);
			var string = time;
//			console.log(string);
			if (string.length > 0) {
				var a, a1, b, c;
				
				var splits = string.split(':');
				
				if (splits.length === 3) {
					a1 = string.indexOf(":");
//					console.log("A1: " + a1);
//					console.log(string);
					a = string.indexOf(":", a1 + 1);
				} else {
					a = string.indexOf(":");
				}
				b = string.indexOf(".", a);
				c = string.length;
//				
//				console.log(string.substring(0, a));
//				console.log(string.substring(a, b));
//				console.log(string.substring(b, c));
				var hour = 0;
				if (splits.length === 3) {
					hour = parseInt(string.substring(0, a1));
					hour = factory.hourToMilli(hour);
				}
				var min, sec, mil;
				
				if (splits.length === 3) {
					min = parseInt(string.substring(a1 + 1, a));
				} else {
					min = parseInt(string.substring(0, a));
				}
				sec = parseInt(string.substring(a + 1, b));
				mil = string.substring(b + 1, c);
				
				if (mil.length < 2) {
					mil = mil + '0';
					mil = parseInt(mil);
				} else {
					mil = parseInt(mil);
				}
				
				var minM = factory.minuteToMilli(min);
				var secM = factory.secondToMilli(sec);
				
				
//				console.log(a + " " + b + " " + c + "\n" +
//						'Type of Mil: ' + (typeof mil) + "\n" +
//						min + " " + sec + " " + mil + "\n" +
//						minM + " " + secM + " " + mil);
//				console.log('Type of Mil: ' + (typeof mil));
//				console.log(min + " " + sec + " " + mil);
				return (hour + minM + secM + mil);
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