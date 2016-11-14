/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.factory('timerRecords',
			['statistics', '$cookies', function(statistics, $cookies) {
				var recordsCookie = "TimeRecordsCookie";
				var factory = {dates: {}, allData: [], allStats: statistics, dateKeys: []};
				factory.getDayOnly = getDayOnly;
				var comparator = "";

				function getDayOnly(date) {
					if (angular.isDate(date)) {
						var y = date.getFullYear();
						var m = date.getMonth();
						var d = date.getDate();
						var months = [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December"
						];
						return d + " " + months[m] + " " + y;
					}
					return("na");
				}

				function findSame(timeStamp) {
					return (getDayOnly(timeStamp) == comparator);
				}

				factory.loadData = function(newData) {
					var data = [];

					for (var i = 0; i < newData.index.length; i++) {
						var timeObj = {index: newData.index[i], time: newData.time[i], millis: newData.millis[i], timeStamp: newData.timeStamp[i]};
						data.push(timeObj);
					}

					var oldLength = factory.allData.length;
					var newLength = data.length;
					factory.allData = data.slice(oldLength, newLength - oldLength);
					for (var i = oldLength; i < newLength; i++) {
						var index = null;

						if (angular.isUndefined(factory.allData[i].timeStamp)) {
							factory.allData[i].timeStamp = "na";
							comparator = "na";
						} else {
							comparator = getDayOnly(factory.allData[i].timeStamp);
						}

						index = factory.dateKeys.indexOf(findSame);

						if (index < 0) {
							factory.dateKeys.push(comparator);
							factory.dates[comparator] = statistics;
							factory.dates[comparator].addData(factory.allData[i]);
						} else {
							factory.dates[comparator].addData(factory.allData[i]);
						}
					}
				};

				factory.update = function(newData) {
					factory.loadData(newData);
					factory.allStats.loadData(factory.allData);
					factory.allStats.calculate();
					for (var i = 0; i < factory.dateKeys.length; i++) {
						factory.dates[factory.dateKeys[i]].calculate();
					}
				};

				factory.save = function() {
					for (var i = 0; i < factory.dateKeys.length; i++) {
						$cookies.put(recordsCookie + factory.dateKeys[i], factory.dates[factory.dateKeys[i]]);
					}
				};
				return factory;
			}]);
