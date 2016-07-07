/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.factory(
			'statistics', ['timeConversion', 
			function(timeConversion) {
				var converter = timeConversion;
				var factory = {
						data: [],
						raw: [],
						stats: {
							mean: 0,
							stdDev: 0,
							variance: 0,
							mean5: 0,
							mean35: 0,
							mean10: 0,
							mean1012: 0,
							median: 0,
							best: 0,
							worst: 0,
							q1: 0,
							q3: 0,
							iqr: 0,
							mean100: 0,
							range: 0
						}
				};
				
				function compareNums(a, b) {
					return a - b;
				}
				
				function convert(num) {
					return(converter.millisToString(Math.round(num)));
				}
				
				factory.loadData = function(value) {
					factory.raw = value;
					console.log(angular.toJson(value));
					factory.data = [];
					
					var times = "";
					var times2 = "";
					for (var i = 0; i < factory.raw.length; i++) {
						times = times + factory.raw[i].time + " ";
						factory.data.push(converter.stringToMillis(factory.raw[i].time));
						times2 = times2 + factory.data[i] + " ";
					}
					console.log(times);
					console.log(times2);
				};
				
				function getSum(total, newValue) {
					return total + newValue;
				}
				
				factory.mean = function() {
					
					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
						total = factory.data.reduce(getSum);
						console.log("Total: " + total + " Length: " + length);
						factory.stats.mean = total / length;
						console.log("Mean: " + factory.stats.mean);
					}
					
					return factory.stats.mean;
				}
				
				function getVariance(total, newValue) {
					var mean = factory.stats.mean;
					total += Math.pow(newValue - mean, 2);
					return total;
				}
				
				factory.variance = function() {
					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
						var mean = factory.data.mean;
						total = factory.data.reduce(getVariance);
						factory.stats.variance = (total / length);
					}
					
				};
				
				factory.stdDev = function() {
					if (factory.data.length > 5) {
						factory.stats.stdDev = (Math.pow(factory.stats.variance, .5));
					}
					
				};
				
				factory.mean5 = function() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
						var total = last5.reduce(getSum);
						factory.stats.mean5 = (total / 5);
					}
				};
				
				factory.mean35 = function() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
						last5.sort(compareNums);
						var middle = last5.slice(1, 4);
						var total = middle.reduce(getSum);
						factory.stats.mean35 = (total / 3);
					}
				};
				
				factory.mean10 = function() {
					var length = factory.data.length;
					if (length >= 10) {
						var last10 = factory.data.slice(length - 10, length);
						var total = last10.reduce(getSum);
						factory.stats.mean10 = (total / 10);
					}
				};
				
				factory.mean1012 = function() {
					var length = factory.data.length;
					if (length >= 12) {
						var last12 = factory.data.slice(length - 12, length);
						last12.sort(compareNums);
						var middle = last12.slice(1, 11);
						var total = middle.reduce(getSum);
						factory.stats.mean1012 = (total / 10);
					}
				};
				
				factory.mean100 = function() {
					var length = factory.data.length;
					if (length >= 100) {
						var last100 = factory.data.slice(length-100, length);
						var total = last100.reduce(getSum);
						factory.stats.mean100 = (total / 100);
					}
				};
				
				factory.q1 = function() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 === 0 || length % 4 == 3) {
							// Splits perfectly into 4 segments
							var qB = Math.ceil(length * .25);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q1 = (avg);
						} else if (length % 4 === 1 || length % 4 == 2) {
							var q = Math.floor(length * .25);
							factory.stats.q1 = (sorted[q]);
						}
					}
				};
				
				factory.median = function() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 2 == 1) {
							var q = Math.round(length * .5);
							factory.stats.median = (sorted[q]);
						} else {
							var qB = Math.ceil(length * .5);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.median = (avg);
						}
					}
				};
				
				factory.q3 = function() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 == 1 || length % 4 == 2) {
							var q = Math.round((length - 1) * .75);
							factory.stats.q3 = (sorted[q]);
						} else if (length % 4 == 3 || length % 4 == 0) {
							var qB = Math.ceil(length * .75);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q3 = avg;
						}
					}
				};
				
				factory.best = function() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
						factory.stats.best = sorted[0];
					}
				};
			
				factory.worst = function() {
					var length = factory.data.length;
          if (length > 10) {
          	var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
          	factory.stats.worst = sorted[sorted.length - 1];
					}
				};
				
				factory.iqr = function() {
					var length = factory.data.length;
					if (length > 10) {
						factory.stats.iqr = factory.stats.q3 - factory.stats.q1;
					}
				};
				
				factory.range = function() {
					var length = factory.data.length;
					if (length > 10) {
						factory.stats.range = "(" + convert(factory.stats.best) + ", " + convert(factory.stats.worst) + ")";
					}
					
				};
				
				factory.calculate = function() {
					factory.mean();
					factory.variance();
					factory.stdDev();
					factory.mean5();
					factory.mean35();
					factory.mean10();
					factory.mean1012();
					factory.mean100();
					factory.q1();
					factory.q3();
					factory.median();
					factory.best();
					factory.worst();
					factory.iqr();
					factory.range();
				};
				
				return factory;
			}]);