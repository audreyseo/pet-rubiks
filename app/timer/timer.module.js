/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.controller('TimerController',  TimerController);

TimerController.$inject = ['$scope', '$interval', '$cookies', '$log'];

function TimerController($scope, $interval, $cookies, $log) {
		var vm = this;
		
    vm.clock = 0;
    vm.deleteRecord = deleteRecord;
    vm.delta = delta;
    vm.displayTimeString = "00:00.00";
    vm.getCookies = getCookies;
    vm.interval = null;
    vm.offset;
    vm.options = {delay: 5};
    vm.records = [];
    vm.recordsCookie = "TimeRecordsCookie";
    vm.render = render;
    vm.reset = reset;
    vm.returnObjects = returnObjects;
    vm.returnNames = returnNames;
    vm.start = start;
    vm.state = {running: false, stopped: false};
    vm.stop = stop;
    vm.time = {string: "00:00.00"};
    vm.update = update;
    vm.watchRecords = watchRecords;
    
    vm.getCookies();
    vm.reset();
    
    function deleteRecord(index) {
    	if (index < vm.records.length && index >= 0) {
    		vm.records.splice(index, 1);
    	}
    }
    
    function delta() {
    	vm.now = Date.now(),
    	vm.d   = vm.now - vm.offset;
    	
    	vm.offset = vm.now;
    	if (isNaN(vm.d)) {
    		return(0);
    	}
    	return vm.d;
    }
    
    function getCookies() {
    	try {
    		vm.records = $cookies.getObject(vm.recordsCookie);
    		console.log("Defined?: " + (typeof vm.records));
    		console.log("Records: " + angular.toJson(vm.records));
    		if (angular.isUndefined(vm.records)) {
    			console.log("Caught #1");
    			vm.records = [];
    			$cookies.putObject(vm.recordsCookie, vm.records);
    		}
    	} catch(e) {
    		console.log("Caught #2");
    		vm.records = [];
    		$cookies.putObject(vm.recordsCookie, vm.records);
    	}
    }
    
    function render() {
    	var minutes = ((vm.clock < 1000 * 60) ? "00" : ((vm.clock < 10 * 60 * 1000) ? "0" + Math.floor(vm.clock / 60000) : Math.floor(vm.clock / 60000)));
    	var seconds = (((vm.clock % 60000) < 1000) ? ":00" : (((vm.clock % 60000) < 1000 * 10) ? ":0" + Math.floor((vm.clock % 60000) / 1000) : ":" + Math.floor((vm.clock % 60000) / 1000)));
    	var milliseconds = (((vm.clock % 1000) < 10) ? ".00" + parseInt(vm.clock % 1000) : ((vm.clock % 1000) < 100) ? ".0" + (vm.clock % 1000) : "." + (vm.clock % 1000));
    	vm.time['string'] = minutes + seconds + milliseconds;
    }
    
    function reset() {
    	vm.state.stopped = false;
    	vm.clock = 0;
    	vm.render();
    }
    
    function returnNames() {
    	if (vm.state.running) {
    		return "Stop" ;
    	}
    		return "Start";
    	
    }
    
    function returnObjects() {
    	if (vm.state.running) {
    		console.log('please help me 1 ' + vm.time.string);
    		return vm.stop();
    	}
    		console.log('please help me 3 ' + vm.time.string);
    		return vm.start();
    	
    }
    
    
    function start() {
    		vm.reset();
    		console.log("helllpppp");
    		vm.state.running = true;
    		vm.state.stopped = false;
    	  vm.offset   = Date.now();
    	  vm.interval = $interval(vm.update, vm.options.delay);
    	  vm.render();
    }
    
    function stop() {
    	vm.state.running = false;
    	vm.state.stopped = true;
    	var timeRecordsObject = {time: "", index: (vm.records.length + 1)};
    	timeRecordsObject.time = vm.time.string;
    	vm.time.string = "";
    	vm.records.push(timeRecordsObject);
    	$interval.cancel(vm.interval);
    	vm.interval = undefined;
    	vm.render();
    }
    
    
    function update() {
    		vm.clock += vm.delta();
      	vm.render();
//    	return vm.display;
    }
    
    $scope.$watchCollection(
    		"vm.records",
    		vm.watchRecords
    );
    
    function watchRecords(newValue, oldValue) {
    	$log.info("Filed!");
    	$log.info("Our records: \n" + angular.toJson(vm.records));
    	$cookies.putObject(vm.recordsCookie, vm.records);
    	$log.info("Cookie records: \n" + angular.toJson($cookies.getObject(vm.recordsCookie)));
    }
}