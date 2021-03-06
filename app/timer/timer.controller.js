/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.controller('TimerController',  TimerController);

TimerController.$inject = ['$scope', '$interval', '$cookies', '$log', '$http', 'statistics'];

function TimerController($scope, $interval, $cookies, $log, $http, statistics) {
	$scope.cookieOpts = {time: ".time", timeStamp: '.date', index: ".index", millis: ".millis"};
  $scope.clock = 0;
  $scope.deleteAll = deleteAll;
  $scope.deleteIndex = deleteIndex;
	$scope.deleteLastTime = deleteLastTime;
  $scope.deleteRecord = deleteRecord;
  $scope.delta = delta;
  $scope.displayTimeString = "00:00.00";
	$scope.downloadable;
  $scope.downloadClicked = downloadClicked;
  $scope.encodedUri = "";
  $scope.getCookies = getCookies;
	$scope.getDuration = getDuration;
  $scope.interval = null;
	$scope.isEncoded = isEncoded;
	$scope.myStats = statistics;
	$scope.numRecords = 0;
  $scope.offset;
  $scope.options = {delay: 5};
  $scope.pairs = [
		{a: "best", b: "worst"},
		{a: "q1", b: "q3"},
		{a: "mean", b: "median"},
		{a: "mean5", b: "mean35"},
		{a: "mean10", b: "mean1012"},
		{a: "variance", b: "stdDev"},
		{a: "iqr", b: "range"},
		{a: "count", b: "full_range"}
  ];
  $scope.pairNames = {
  	"best": "Best",
  	"worst": "Worst",
  	"q1": "Q1",
  	"q3": "Q3",
  	"mean": "Mean",
  	"median": "Median",
  	"mean5": "Last 5",
  	"mean35": "3 of 5",
  	"mean10": "Last 10",
  	"mean1012": "10 of 12",
  	"variance": "Variance",
  	"stdDev": "StdDev",
  	"iqr": "IQR",
  	"range": "Range",
		"count": "Count",
		"full_range": "Full Range"
  };
	$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  $scope.recordsCookie = "TimeRecordsCookie";
  $scope.render = render;
  $scope.reset = reset;
  $scope.returnObjects = returnObjects;
  $scope.returnNames = returnNames;
  $scope.save = save;
  $scope.saveRecords = saveRecords;
  $scope.start = start;
  $scope.state = {running: false, stopped: false};
  $scope.stop = stop;
  $scope.time = {string: "00:00.00"};
  $scope.update = update;

  $scope.getCookies();

  $scope.reset();

  $scope.myStats.loadData($scope.records);

//  function addRecord(index, time, millis, timeStamp) {
//
//  }

  function deleteAll() {
  	var confirmed = window.confirm("This will delete all of your currently saved times. Do you really wish to proceed?");

  	if (confirmed) {
  		$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  		$scope.saveRecords();
  		$scope.numRecords = 0;
  	}
  }

  function deleteIndex(index) {
  	if (index >= 0) {
  		if (angular.isDefined($scope.records.index)) {
    		if (index < $scope.records.index.length) {
      		for (var str in $scope.records) {
//      			console.log(str);
      			$scope.records[str].splice(index, 1);
      		}
      	}
    	} else {
    		if (index < $scope.records.length) {
    			$scope.records.splice(index, 1);
    		}
    	}
  		$scope.numRecords --;
  	}
  }

	function deleteLastTime() {
		var confirmed = window.confirm("This will delete your last time, " + $scope.records.time[$scope.records.time.length - 1] + ". Do you wish to proceed?");

		if (confirmed) {
			for (var str in $scope.records) {
				$scope.records[str].pop();
			}
			$scope.numRecords --;
			$scope.saveRecords();
		}
	}

  function deleteRecord(index) {
//  	console.log("Index: " + index);
//  	console.log("Boolean: " + (angular.isDefined(index) && !isNaN(index)));
  	if (angular.isDefined(index) && !isNaN(index)) {
  		$scope.deleteIndex(index);
  		$scope.saveRecords();
  	}
  }

  function delta() {
  	$scope.now = Date.now(),
  	$scope.d   = $scope.now - $scope.offset;

  	$scope.offset = $scope.now;
  	if (isNaN($scope.d)) {
  		return(0);
  	}
  	return $scope.d;
  }

  function downloadClicked() {
  	$scope.downloadble = false;
  }

  function getCookies() {
  	try {

  		for (ind in $scope.records) {
//  			var timeObj = {index: newData.index[i], time: newData.time[i], millis: newData.millis[i], timeStamp: newData.timeStamp[i]};
  			$scope.records[ind] = $cookies.getObject($scope.recordsCookie + $scope.cookieOpts[ind]);
  		}

  		$scope.numRecords = $scope.records.index.length;
//  		console.log("Defined?: " + (typeof $scope.records));
//  		console.log("Records: " + angular.toJson($scope.records));
  		if (angular.isUndefined($scope.records)) {
//  			console.log("Caught #1");
  			$scope.numRecords = 0;
  			$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  			for (str in $scope.records) {
  				$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
  			}
  		}
  	} catch(e) {
//  		console.log("Caught #2");
  		$scope.numRecords = 0;
  		$scope.records = {time: [], timeStamp: [], index: [], millis: []};
  		for (str in $scope.records) {
				$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
			}
  	}
  }

	function getDuration() {
		if ($scope.records.timeStamp.length > 1) {
			var date1 = $scope.records.timeStamp[0];
			var date2 = $scope.records.timeStamp[$scope.records.timeStamp.length - 1];
			console.log("date1: " + angular.isDate(date1) + "date2: " + angular.isDate(date2));
			if (angular.isDate(date1) && angular.isDate(date2)) {
				var del = date2.getTime() - date1.getTime();
				return del;
			}
		}
		return "00:00:00.000";
	}

  function isEncoded() {
  	return ($scope.downloadable);
  }

  function render() {
  	if ((typeof $scope.clock) !== 'undefined' && !isNaN($scope.clock)) {
  		var minutes = (($scope.clock < 1000 * 60) ? "00" : (($scope.clock < 10 * 60 * 1000) ? "0" + Math.floor($scope.clock / 60000) : Math.floor($scope.clock / 60000)));
    	var seconds = ((($scope.clock % 60000) < 1000) ? ":00" : ((($scope.clock % 60000) < 1000 * 10) ? ":0" + Math.floor(($scope.clock % 60000) / 1000) : ":" + Math.floor(($scope.clock % 60000) / 1000)));
    	var milliseconds = ((($scope.clock % 1000) < 10) ? ".00" + parseInt($scope.clock % 1000) : (($scope.clock % 1000) < 100) ? ".0" + ($scope.clock % 1000) : "." + ($scope.clock % 1000));
    	$scope.time['string'] = minutes + seconds + milliseconds;
  	} else {
  		$scope.time['string'] = "00:00.000";
  	}
  }

  function reset() {
  	$scope.state.stopped = false;
  	$scope.clock = 0;
  	$scope.render();
  }

  function returnNames() {
  	if ($scope.state.running) {
  		return "Stop" ;
  	}
  		return "Start";

  }

  replaceAll = function(search, replacement, look) {
    var target = look;
    return target.replace(new RegExp(search, 'g'), replacement);
	};

  function convertDate(today) {

    var day = today.getDate();
    var month = 1 + today.getMonth();

    var dateOptions = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'EDT', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    //today = today.toLocaleFormat("%a %e %B %Y %I.%M.%S %p %Z");
    today = replaceAll(':', '.', today.toLocaleString(dateOptions));
    //console.log("Today: " + today);
    today = replaceAll('/', ' ', today);
    //console.log('Month: ' + month.toString());
    today = today.replace(month.toString(), "DAY");
    today = today.replace(day.toString(), "MONTH");
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    today = today.replace("MONTH", months[month - 1]);
    today = today.replace("DAY", day.toString());
    return today;
  }

  function returnObjects() {
  	if ($scope.state.running) {
//  		console.log('please help me 1 ' + $scope.time.string);
  		return $scope.stop();
  	}
//  		console.log('please help me 3 ' + $scope.time.string);
  		return $scope.start();
  }

  function save() {
  	$("#downloadLink").remove();
  	$scope.csvContent = "data:text/csv;charset=utf-8,";
  	$scope.csvContent += "\n" + "index,timeStamp,millis,time";
		var data = "index,timeStamp,millis,time";
		for (var i = 0; i < $scope.records.index.length; i++) {
			var infoArray = ["index", "timeStamp", "millis", "time"];
			var dataString = $scope.records[infoArray[0]][i] + ",";

			// if (typeof $scope.records['timeStamp'][i] === 'date') {
			// 	dataString += convertDate($scope.records['timeStamp'][i]) + ",";
			// } else {
			// 	dataString += $scope.records['timeStamp'][i] + ",";
			// }

			for (var j = 1; j < infoArray.length; j++) {
//				dataString += "," + $scope.records[infoArray[j]][i];
				var index = infoArray[j];
				var sep = ",";
				if (j == infoArray.length - 2) {
					sep = "";
				}
				dataString += $scope.records[index][i] + ",";
			}
			dataString = dataString.substring(0, dataString.length - 1);
			$scope.csvContent += "\n" + dataString;
			data += "\n" + dataString;
		}
  	$scope.encodedUri = encodeURI($scope.csvContent);
  	shortened = encodeURI(data);

  	var httpConfig = {method: "PUT",
  			url: "/data.csv",
  			data: shortened,
  			headers: {'content-type': 'data/csv;charset=utf-8'}
  	};


  	var httpPromise = $http.put('http://0.0.0.0:3000/data.csv', shortened	, httpConfig);
  	httpPromise.then(function success(response) {
  		console.log("Success: " + response.status + " " + response.statusText + " " + response.config.method);
  	}, function failed(response) {
  		console.log("Failure: " + response.status + " " + response.statusText + " " + response.config.method);
  	});

  	var link1 = document.createElement('a');
		var date = new Date();
  	link1.setAttribute('href', "http://0.0.0.0:3000/"+ getDayOnly(date) + ".csv");
  	link1.setAttribute('download', getDayOnly(date) + '.csv');
  	link1.setAttribute('id', "downloadLink");
  	$(link1).html("Download");
  	link1 = $(link1);
  	$("#saveButtonDiv").after(link1);
  }

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

  function saveRecords() {
  	if (angular.isDefined($scope.records.index)) {
  		for (str in $scope.records) {
  			$cookies.putObject($scope.recordsCookie + $scope.cookieOpts[str], $scope.records[str]);
  		}
  	} else {
  		$cookies.putObject($scope.recordsCookie, $scope.records[str]);
  	}
  	$scope.myStats.loadData($scope.records);
  }

  function start() {
		$scope.reset();
		$scope.state.running = true;
		$scope.state.stopped = false;
	  $scope.offset   = Date.now();
	  $scope.interval = $interval($scope.update, $scope.options.delay);
	  $scope.render();
  }

  function stop() {
  	$scope.state.running = false;
  	$scope.state.stopped = true;
  	$interval.cancel($scope.interval);
		var date = new Date();
		date.setDate(date.getDate());
		$scope.numRecords++;
  	var timeRecordsObject = {index: ($scope.numRecords), time: "", millis: $scope.clock, timeStamp: date};
  	timeRecordsObject.time = $scope.time.string;
//  	$scope.records.push(timeRecordsObject);
  	saveTimeObject(timeRecordsObject);
  	$scope.saveRecords();
  	$scope.interval = undefined;
  	$scope.render();
  }

  function saveTimeObject(value) {
// 	console.log(angular.toJson($scope.records));
  	for (str in value) {
//  		console.log("Str: " + str);
  		$scope.records[str].push(value[str])
  	}
//		return {index: value.index[i], time: value.time[i], millis: value.millis[i], timeStamp: value.timeStamp[i]};
	}


  function update() {
  		$scope.clock += $scope.delta();
    	$scope.render();
//    	return $scope.display;
  }

}
