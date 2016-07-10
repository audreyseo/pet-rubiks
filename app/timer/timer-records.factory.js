/**
 * http://usejsdoc.org/
 */

angular.module('myApp')
	.factory('timerRecords',
			['statistics', function(statistics) {
				var recordsCookie = "TimeRecordsCookie";
				var factory = {dates: {}, allData: [], dateKeys: []};
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
					return(na);
				}
				
				function findSame(timeStamp) {
					return (getDayOnly(timeStamp) == comparator);
				}
				
				factory.loadData = function(newData) {
					var oldLength = factory.allData.length;
					var newLength = newData.length;
					factory.allData = factory.allData.concat(newData.slice(oldLength, newLength - oldLength));
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
				}
				
				factory.update = function(newData) {
					factory.loadData(newData);
					for (var i = 0; i < factory.dateKeys.length; i++) {
						factory.dates[factory.dateKeys[ilength]]
					}
				}
			}]);