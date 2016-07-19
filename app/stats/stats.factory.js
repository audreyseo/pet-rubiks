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
				
				factory.addData = addData;
				factory.avg = avg;
				factory.best = best;
				factory.calculate = calculate;
				factory.compareNums = compareNums;
				factory.convert = convert;
				factory.getSum = getSum;
				factory.getVariance = getVariance;
				factory.iqr = iqr;
				factory.loadData = loadData;
				factory.mean = mean;
				factory.mean10 = mean10;
				factory.mean100 = mean100;
				factory.mean1012 = mean1012;
				factory.mean35 = mean35;
				factory.mean5 = mean5;
				factory.median = median;
				factory.q1 = q1;
				factory.q3 = q3;
				factory.range = range;
				factory.stdDev = stdDev;
				factory.variance = variance;
				factory.worst = worst;

				
				function timeObject(value, i) {
					return {index: value.index[i], time: value.time[i], millis: value.millis[i], timeStamp: value.timeStamp[i]};
				}
				
				function compareNums(a, b) {
					return a - b;
				}
				
				function convert(num) {
					return(converter.millisToString(Math.round(num)));
				}
				
				function addData(value) {
					if (angular.isDefined(value.time) && angular.isDefined(value.timeStamp)) {
						factory.raw.push(value);
						factory.data.push(converter.stringToMillis(value.time));
					}
					factory.calculate();
				}
				
				function loadData(value) {
					var data = [];
					console.log("Type of value: " + typeof value);
					if ((typeof value) === 'object') {

						for (var i = 0; i < value.index.length; i++) {
							var timeObj = timeObject(value, i);
							data.push(timeObj);
						}
						
						factory.raw = data;
//						console.log(angular.toJson(value));
						factory.data = [];
						
						var times = "";
						var times2 = "";
						for (var i = 0; i < factory.raw.length; i++) {
							times = times + factory.raw[i].time + " ";
							factory.data.push(converter.stringToMillis(factory.raw[i].time));
							times2 = times2 + factory.data[i] + " ";
						}
						factory.calculate();
						//console.log(times);
						//console.log(times2);
					}
				}
				
				function getSum(total, newValue) {
					return total + newValue;
				}
				factory.avg = avg;
				function avg(data, length) {
					return(data.reduce(getSum) / length);
				}
				
				function mean() {
					
//					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
//						total = factory.data.reduce(getSum);
						//console.log("Total: " + total + " Length: " + length);
						factory.stats.mean = factory.avg(factory.data, length);
						//console.log("Mean: " + factory.stats.mean);
					} else {
						factory.stats.mean = -1;
					}
				}
				
				function getVariance(total, newValue) {
					var mean = factory.stats.mean;
					total += Math.pow(newValue - mean, 2);
					return total;
				}
				
				function variance() {
					var total = 0;
					var length = factory.data.length;
					if (length > 5) {
						var mean = factory.stats.mean;
						if (mean <= 0) {
							factory.mean();
						}
						total = factory.data.reduce(getVariance);
						factory.stats.variance = (total / length);
					} else {
						factory.stats.variance = -1;
					}
					
				}
				
				function stdDev() {
					if (factory.data.length > 5 && factory.stats.variance >= 0) {
						var mean = factory.stats.mean;
						var variance = factory.stats.variance;
						if (mean <= 0 || variance <= 0) {
							factory.mean();
							factory.variance();
						}
						factory.stats.stdDev = (Math.pow(factory.stats.variance, 0.5));
					} else {
						factory.stats.stdDev = -1;
					}
					
				}
				
				function mean5() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
//						var total = last5.reduce(getSum);
						factory.stats.mean5 = factory.avg(last5, 5); //(total / 5);
					} else {
						factory.stats.mean5 = -1;
					}
				}
				
				function mean35() {
					var length = factory.data.length;
					if (length >= 5) {
						var last5 = factory.data.slice(length - 5, length);
						last5.sort(compareNums);
						var middle = last5.slice(1, 4);
//						var total = middle.reduce(getSum);
						factory.stats.mean35 = factory.avg(middle, 3); //(total / 3);
					} else {
						factory.stats.mean35 = -1;
					}
				}
				
				function mean10() {
					var length = factory.data.length;
					if (length >= 10) {
						var last10 = factory.data.slice(length - 10, length);
//						var total = last10.reduce(getSum);
						factory.stats.mean10 = factory.avg(last10, 10); //(total / 10);
					} else {
						factory.stats.mean10 = -1;
					}
				}
				
				function mean1012() {
					var length = factory.data.length;
					if (length >= 12) {
						var last12 = factory.data.slice(length - 12, length);
						last12.sort(compareNums);
						var middle = last12.slice(1, 11);
						var total = middle.reduce(getSum);
						factory.stats.mean1012 = factory.avg(middle, 10); //(total / 10);
					} else {
						factory.stats.mean1012 = -1;
					}
				}
				
				function mean100() {
					var length = factory.data.length;
					if (length >= 100) {
						var last100 = factory.data.slice(length-100, length);
//						var total = last100.reduce(getSum);
						factory.stats.mean100 = factory.avg(last100, 100); //(total / 100);
					} else {
						factory.stats.mean100 = -1;
					}
				}
				
				function q1() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 === 0 || length % 4 == 3) {
							// Splits perfectly into 4 segments
							var qB = Math.ceil(length * 0.25);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q1 = (avg);
						} else if (length % 4 === 1 || length % 4 == 2) {
							var q = Math.floor(length * 0.25);
							factory.stats.q1 = (sorted[q]);
						}
					} else {
						factory.stats.q1 = -1;
					}
				}
				
				function median() {
					var length = factory.data.length;
					if (length > 3) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 2 == 1) {
							var q = Math.round(length * 0.5);
							factory.stats.median = (sorted[q]);
						} else {
							var qB = Math.ceil(length * 0.5);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.median = (avg);
						}
					} else {
						factory.stats.median = -1;
					}
				}
				
				function q3() {
					var length = factory.data.length;
					if (length > 10) {
						var sorted = (factory.data.slice(0, length)).sort(compareNums);
						if (length % 4 == 1 || length % 4 == 2) {
							var q = Math.round((length - 1) * 0.75);
							factory.stats.q3 = (sorted[q]);
						} else if (length % 4 == 3 || length % 4 === 0) {
							var qB = Math.ceil(length * 0.75);
							var qA = qB - 1;
							var avg = (sorted[qB] + sorted[qA]) / 2;
							factory.stats.q3 = avg;
						}
					} else {
						factory.stats.q3 = -1;
					}
				}
				
				function best() {
					var length = factory.data.length;
					if (length > 3) {
						var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
						factory.stats.best = sorted[0];
					} else {
						factory.stats.best = -1;
					}
				}
			
				function worst() {
					var length = factory.data.length;
          if (length > 3) {
          	var sorted = (factory.data.slice(0, factory.data.length)).sort(compareNums);
          	factory.stats.worst = sorted[sorted.length - 1];
					} else {
						factory.stats.worst = -1;
					}
				}
				
				function iqr() {
					var length = factory.data.length;
					if (length > 10) {
						factory.stats.iqr = factory.stats.q3 - factory.stats.q1;
					} else {
						factory.stats.iqr = -1;
					}
				}
				
				function range() {
					var length = factory.data.length;
					if (length > 3) {
						factory.stats.range = "(" + convert(factory.stats.best) + ", " + convert(factory.stats.worst) + ")";
					} else {
						factory.stats.range = -1;
					}
					
				}
				
				function calculate() {
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
				}
				
				return factory;
			}]);
