/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.controller('TimerController',  TimerController);

TimerController.$inject = ['$scope', '$interval', '$cookies', '$log', 'statistics'];

function TimerController($scope, $interval, $cookies, $log, statistics) {
	
  $scope.clock = 0;
  $scope.deleteAll = deleteAll;
  $scope.deleteRecord = deleteRecord;
  $scope.delta = delta;
  $scope.displayTimeString = "00:00.00";
  $scope.getCookies = getCookies;
  $scope.interval = null;
  $scope.offset;
  $scope.options = {delay: 5};
  $scope.records = [];
  $scope.recordsCookie = "TimeRecordsCookie";
  $scope.render = render;
  $scope.reset = reset;
  $scope.returnObjects = returnObjects;
  $scope.returnNames = returnNames;
  $scope.save = save;
  $scope.start = start;
  $scope.state = {running: false, stopped: false};
  $scope.myStats = statistics;
//  angular.copy(statistics, $scope.statistics);
//  console.log(angular.toJson(statistics));
  $scope.stop = stop;
  $scope.time = {string: "00:00.00"};
  $scope.update = update;
  
//  for (thing in $scope.statistics) {
//  	console.log(typeof $scope.statistics[thing]);
//  }
  $scope.getCookies();
  
  $scope.reset();
  
  $scope.myStats.loadData($scope.records);
  
  function deleteAll() {
  	var confirmed = window.confirm("This will delete all of your currently saved times. Do you really wish to proceed?");
  	
  	if (confirmed) {
  		$scope.records = [];
  	}
  }
  
  function deleteRecord(index) {
  	if (index < $scope.records.length && index >= 0) {
  		$scope.records.splice(index, 1);
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
  
  function getCookies() {
  	try {
  		$scope.records = $cookies.getObject($scope.recordsCookie);
//  		console.log("Defined?: " + (typeof $scope.records));
//  		console.log("Records: " + angular.toJson($scope.records));
  		if (angular.isUndefined($scope.records)) {
//  			console.log("Caught #1");
  			$scope.records = [];
  			$cookies.putObject($scope.recordsCookie, $scope.records);
  		}
  	} catch(e) {
//  		console.log("Caught #2");
  		$scope.records = [];
  		$cookies.putObject($scope.recordsCookie, $scope.records);
  	}
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
  
  function returnObjects() {
  	if ($scope.state.running) {
  		console.log('please help me 1 ' + $scope.time.string);
  		return $scope.stop();
  	}
  		console.log('please help me 3 ' + $scope.time.string);
  		return $scope.start();
  	
  }
  
  function save() {
        $("#downloadLink").remove();
  	var csvContent = "data:text/csv;charset=utf-8,";
  	$scope.records.forEach(function(infoArray, index){
  		var dataString = "";
			for (var str in infoArray) {
				dataString += infoArray[str] + ",";
			} 
  		
//  	   var dataString = infoArray.join(",");
//  	   dataString = dataString.substring(0, dataString.length - 1);
  	   csvContent += (index < $scope.records.length) ? dataString + "\n" : dataString;

  	}); 
  	var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("id", "downloadLink");
  	link.setAttribute("href", encodedUri);
  	link.setAttribute("download", "my_data.csv");
  	$(link).html("Download");
  	$("#saveTimesButton").after('<br>').after(link);
  }
  
  function start() {
  		$scope.reset();
  		console.log("helllpppp");
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
  	var timeRecordsObject = {index: ($scope.records.length + 1), time: "", millis: $scope.clock, timeStamp: date};
  	timeRecordsObject.time = $scope.time.string;
  	$scope.records.push(timeRecordsObject);
  	$scope.interval = undefined;
  	$scope.render();
  }
  
  
  function update() {
  		$scope.clock += $scope.delta();
    	$scope.render();
//    	return $scope.display;
  }
  
  $scope.$watchCollection(
  		"records",
  		function(newValue, oldValue) {
//  	  	$log.info("Filed!");
//  	  	$log.info("Our records: \n" + angular.toJson($scope.records));
  	  	$cookies.putObject($scope.recordsCookie, $scope.records);
//  	  	$log.info("Cookie records: \n" + angular.toJson($cookies.getObject($scope.recordsCookie)));
  	  	$log.info("Records: " + angular.toJson($scope.records));
  	  	$scope.myStats.loadData($scope.records);
  	  	$scope.myStats.calculate();
  	  	$log.info("Stats Mean: " + $scope.myStats.stats.mean);
  	    $log.info("Stats Mean Undefined?: " + angular.isUndefined($scope.myStats.stats.mean));	
  	  	$log.info("Stats: " + angular.toJson($scope.myStats));
  		}
  );
  
  
}
