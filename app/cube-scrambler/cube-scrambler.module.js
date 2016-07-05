/**
 * http://usejsdoc.org/
 */

var cubeModule = angular.module('cubeScrambler', ['hiddenRowsY']);

module.controller('cubeScrambler', ['$scope', 'hiddenRowsY', function($scope, hiddenRows) {
	$scope.code333 = [
	          		    [
	          		      "R", "R'", "R2"
	          		    ]
	          		    , [
	          		      "L", "L'", "L2"
	          		    ]
	          		    , [
	          		      "B", "B'", "B2"
	          		    ]
	          		    , [
	          		      "F", "F'", "F2"
	          		    ]
	          		    , [
	          		      "U", "U'", "U2"
	          		    ]
	          		    , [
	          		      "D", "D'", "D2"
	          		    ]
	          		  ];
	          		
	$scope.code = "";
	$scope.blah = hiddenRows;
	          		
	$scope.scramble = function() {
	var indexX = [];
	var indexY = [];
	for (var i = 0; i < 25; i++) {
		var n = Math.floor(Math.random() * $scope.code333.length);
		var m = Math.floor(Math.random() * $scope.code333[0].length);
		if (i >= 1 && i <= 24) {
			if (m === indexY[i - 1] && n === indexX[i-1]) {
				while (m === indexY[i-1]) {
					m = Math.floor(Math.random() * $scope.code333[0].length);
				}
			}
			if (n === indexX[i-1]) {
				while (n === indexX[i-1]) {
					n = Math.floor(Math.random() * $scope.code333.length);
				}
			}
		}
	  indexX.push(n);
	  indexY.push(m);
	}
	$scope.code = "";
	for (var i = 0; i < 25; i++) {
		$scope.code = $scope.code.concat($scope.code333[indexX[i]][indexY[i]] + " ");
	}
	$scope.code = $scope.code.substring(0, $scope.code.length - 1);
};
$scope.scramble();
}]);

app.controller('timerController', ['$scope', '$interval', '$cookies', function($scope, $interval, $cookies) {
  $scope.offset;
  $scope.clock;
  $scope.state;
  $scope.options;
  $scope.interval = null;
  $scope.records = [];
  $scope.recordsCookie = "TimeRecordsCookie";
  
  $scope.getCookies = function() {
  	try {
  		$scope.records = $cookies.getObject($scope.recordsCookie);
  		if (angular.isUndefined($scope.records)) {
  			$scope.records = [];
  			$scope.putObject($scope.recordsCookie, $scope.records);
  		}
  	} catch(e) {
//  		console.log("caught!");
  		$scope.records = [];
  		$cookies.putObject($scope.recordsCookie, $scope.records);
  	}
  }
  
  // default options
  $scope.options = {delay: 5};
  $scope.getCookies();
  
  // Another one of my additions:
  $scope.state = {running: false, stopped: false};
  $scope.time = {string: "00:00.00"};
  $scope.displayTimeString = "00:00.00";
  $scope.clock = 0;
  
  $scope.returnObjects = function() {
  	if ($scope.state.running) {
  		console.log('please help me 1 ' + $scope.time.string);
  		$scope.stop();
  	} else {
  		console.log('please help me 3 ' + $scope.time.string);
  		$scope.start();
  	}
  };
  
  $scope.returnName = function() {
  	if ($scope.state.running) {
  		return("Stop");
  	} else {
  		return("Start");
  	}
  }
  
  $scope.start = function() {
  		$scope.reset();
  		console.log("helllpppp");
  		$scope.state.running = true;
  		$scope.state.stopped = false;
  	  $scope.offset   = Date.now();
  	  $scope.interval = $interval($scope.update, $scope.options.delay);
  };
  
  $scope.stop = function() {
  		$scope.state.running = false;
  		$scope.state.stopped = true;
  		$scope.records.push($scope.time.string);
  	  $interval.cancel($scope.interval);
  	$scope.render();
  };
  
  $scope.reset = function() {
  	$scope.state.stopped = false;
  	$scope.clock = 0;
  	$scope.render();
  };
  
  $scope.update = function() {
  		$scope.clock += $scope.delta();
    	$scope.render();
//  	return $scope.display;
  };
  
  $scope.render = function() {
  	var minutes = (($scope.clock < 1000 * 60) ? "00" : (($scope.clock < 10 * 60 * 1000) ? "0" + Math.floor($scope.clock / 60000) : Math.floor($scope.clock / 60000)));
  	var seconds = ((($scope.clock % 60000) < 1000) ? ":00" : ((($scope.clock % 60000) < 1000 * 10) ? ":0" + Math.floor(($scope.clock % 60000) / 1000) : ":" + Math.floor(($scope.clock % 60000) / 1000)));
  	var milliseconds = ((($scope.clock % 1000) < 10) ? ".00" + parseInt($scope.clock % 1000) : (($scope.clock % 1000) < 100) ? ".0" + ($scope.clock % 1000) : "." + ($scope.clock % 1000));
  	$scope.time.string = minutes + seconds + milliseconds;
  };
  
  $scope.delta = function() {
  	$scope.now = Date.now(),
  	$scope.d   = $scope.now - $scope.offset;
  	
  	$scope.offset = $scope.now;
  	if (isNaN($scope.d)) {
  		return(0);
  	}
  	return $scope.d;
  };
  
  $scope.$watchCollection('time', function(newValue, oldValue) {
//  	console.log("scope fired");
  	$scope.displayTimeString = $scope.time.string;
  });
  
  $scope.$watchCollection('records', function(newValue, oldValue) {
  	console.log("Filed!");
  	$cookies.putObject($scope.recordsCookie, newValue);
  	console.log("Cookie records: \n" + angular.toJson($cookies.getObject($scope.recordsCookie)));
  });
  
  $scope.deleteRecord = function(event, index) {
  	if (index < $scope.records.length) {
  		$scope.records.splice(index, 1);
  	}
  };
  
//  console.log("help");
  
  $scope.reset();
}]);