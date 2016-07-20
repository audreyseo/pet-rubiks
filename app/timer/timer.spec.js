/**
 * http://usejsdoc.org/
 */

function returnNaN() {
	return (Math.sqrt(-1));
}

describe('	Test:	', function() {
	describe('Controller: TimerController', function() {
		
		var ctrl, createController, scope, $interval, $cookies, $log, statistics, $intervalSpy;
		
		beforeEach(module('myApp', 'ngCookies'));		
		
		beforeEach(inject(
			function ($rootScope, _$interval_, _$cookies_, _$log_, _statistics_, $controller) {
  	    scope = $rootScope.$new();
  			$interval = _$interval_;
  			$intervalSpy = jasmine.createSpy('$interval', _$interval_).and.callThrough();
  			$cookies = _$cookies_;
  			$log = _$log_;
  			statistics = _statistics_;
  	    createController = function(myInt) {
	        return $controller('TimerController', {
	            '$scope': scope,
	            '$interval': (arguments.length == 1) ? myInt : $interval,
	            '$cookies': $cookies,
	            '$log': $log,
	            'statistics': statistics
  	      });
    	  };
			}
		));
		
		describe("Variables", function() {
			beforeEach(function() {
				ctrl = createController();
			});
			
			it("variables should be defined", function() {
				expect(scope.cookieOpts).toBeDefined();
				expect(scope.clock).toBeDefined();
				expect(scope.displayTimeString).toBeDefined();
				expect(scope.encodedUri).toBeDefined();
				expect(scope.interval).toBe(null);
				expect(scope.offset).toBe(undefined);
				expect(scope.options).toBeDefined();
				expect(scope.options.delay).toBeDefined();
				expect(scope.options.delay).toBe(5);
				expect(scope.records).toBeDefined();
				expect(scope.numRecords).toBeDefined();
				expect(scope.pairs).toBeDefined();
				expect(scope.pairNames).toBeDefined();
				expect(scope.recordsCookie).toBeDefined();
				expect(scope.state).toBeDefined();
				expect(scope.state.running).toBe(false);
				expect(scope.state.stopped).toBe(false);
				expect(scope.myStats).toBeDefined();
				expect(scope.time).toBeDefined();
			});
		});
		
		
		
		describe('Function', function() {
			beforeEach(function() {
				ctrl = createController();
			});
			
			it("all functions should be defined", function() {
				expect(scope.deleteRecord).toBeDefined();
				expect(scope.deleteAll).toBeDefined();
				expect(scope.deleteRecord).toBeDefined();
				expect(scope.delta).toBeDefined();
				expect(scope.downloadClicked).toBeDefined();
				expect(scope.isEncoded).toBeDefined();
				expect(scope.getCookies).toBeDefined();
				expect(scope.render).toBeDefined();
				expect(scope.reset).toBeDefined();
				expect(scope.returnObjects).toBeDefined();
				expect(scope.returnNames).toBeDefined();
				expect(scope.save).toBeDefined();
				expect(scope.saveRecords).toBeDefined();
				expect(scope.start).toBeDefined();
				expect(scope.stop).toBeDefined();
				expect(scope.update).toBeDefined();
			});
			describe('deleteIndex', function() {
				it("if called with negative index, length should be the same", function() {
					var length1 = scope.numRecords;
					scope.deleteIndex(-1);
					var length2 = scope.numRecords;
					expect(length1).toEqual(length2);
				});
			});
			describe('deleteRecord', function() {
  			describe('with normal data', function() {
  				beforeEach(function() {
    				scope.records = [{time: "00:00.000", index: 1}, {time: "00:00.000", index: 2}];
    			});
    			
    			it('Deletes a record given an index that is smaller than $scope.records.length', function() {
    				var index=1;
    				scope.deleteRecord(index);
    				var newObject = [{time: "00:00.000", index:1}];
    				expect(scope.records).toEqual(newObject);
    			});
    			
    			it('Does not delete a record that has a negative index', function() {
    				var index = -1;
    				scope.deleteRecord(index);
    				expect(scope.records).toEqual([{time: "00:00.000", index: 1}, {time: "00:00.000", index: 2}]);
    			});
    			
    			it("Does not attempt to delete if index is NaN or undefined", function() {
    				spyOn(scope, 'deleteIndex');
    				spyOn(scope, 'saveRecords');
    				var index = Math.sqrt(-1);
    				scope.deleteRecord(index);
    				expect(scope.deleteIndex).not.toHaveBeenCalled();
    				expect(scope.saveRecords).not.toHaveBeenCalled();
    				index = undefined;
    				scope.deleteRecord(index);
    				expect(scope.deleteIndex).not.toHaveBeenCalled();
    				expect(scope.saveRecords).not.toHaveBeenCalled();
    			});
  			});
  			describe('with version 2.0 data, an object with arrays', function() {
  				beforeEach(function() {
    				scope.records = {time: ["00:00.000", "00:00.00"], index: [1, 2], timeStamp: ["00:00.000", "00:00.00"], millis: [0, 0]};
    			});
    			
    			it('Deletes a record given an index that is smaller than $scope.records.length', function() {
    				var index=1;
    				scope.deleteRecord(index);
    				var newObject = {time: ["00:00.000"], index: [1], timeStamp: ["00:00.000"], millis: [0]};
    				expect(scope.records).toEqual(newObject);
    			});
    			
    			it('Does not delete a record that has a negative index', function() {
    				var index = -1;
    				scope.deleteRecord(index);
    				expect(scope.records).toEqual({time: ["00:00.000", "00:00.00"], index: [1, 2], timeStamp: ["00:00.000", "00:00.00"], millis: [0, 0]});
    			});
    			
    			it("Does not attempt to delete if index is NaN or undefined", function() {
    				var index = Math.sqrt(-1);
    				spyOn(scope, 'deleteIndex');
    				scope.deleteRecord(index);
    				expect(scope.deleteIndex).not.toHaveBeenCalled();
    				index = undefined;
    				expect(index).not.toBeDefined();
    				scope.deleteRecord(index);
    				expect(scope.deleteIndex).not.toHaveBeenCalled();
    			});
  			});
  		});
		
  		describe('getCookies', function() {
  			it("Should get the copies of Record that used to be here.", function() {
  				spyOn($cookies, 'getObject');
  				createController();
  				expect($cookies.getObject).toHaveBeenCalled();
  			});
  		});
  		describe('render', function() {
  			it("once called, should alter time.string", function() {
  				var old = angular.copy(scope.time.string);
  				scope.clock = 200000;
  				scope.render();
  				expect(old).not.toEqual(scope.time.string);
  			});
  			
  			it ("once called, time.string should be what we think it will be", function() {
  				scope.clock = (20 * 60 * 1000) + (35 * 1000) + (945);
  				scope.render();
  				expect(scope.time.string).toEqual("20:35.945");
  			});
  			
  			it ("If clock is undefined or NaN, should set time.string to 00:00.000", function() {
  				scope.clock = undefined;
  				scope.render();
  				expect(scope.time.string).toEqual('00:00.000');
  				scope.clock = Math.sqrt(-1);
  				expect(isNaN(scope.clock)).toBe(true);
  				expect(scope.time.string).toEqual('00:00.000');
  			});
  		});
  		
  		describe('reset', function(){
  			beforeEach(function() {
  				scope.state.stopped = true;
  				spyOn(scope, 'render').and.callThrough();
  				scope.reset();
  			});
  			it("Once called, state.stopped should be false", function() {
  				expect(scope.state.stopped).toBe(false);
  			});
  			it("Once called, render should also be called", function() {
  				expect(scope.render).toHaveBeenCalled();
  			});
  			it("afterwards, $scope.clock should be 0", function() {
  				expect(scope.clock).toBe(0);
  			});
  			it("time should also be 00:00.000", function() {
  				expect(scope.time.string).toEqual("00:00.000");
  			});
  		});
  		describe('returnNames', function(){
  			it("should return Stop if we're timing", function() {
  				scope.state.running = true;
  				expect(scope.returnNames()).toEqual("Stop");
  			});
  			it("should return Start if not currently timing", function() {
  				scope.state.running = false;
  				expect(scope.returnNames()).toEqual("Start");
  			});
  		});
  		describe('returnObjects', function(){
  			it("should return stop() if we're timing", function() {
  				scope.state.running = true;
  				expect(scope.returnObjects()).toEqual(scope.stop())
  			});
  			it("should return start() if we're not timing", function() {
  				scope.state.running = false;
  				expect(scope.returnObjects()).toEqual(scope.start())
  			});
  		});
  		describe('start', function(){
  			var done, time;
  			beforeEach(function() {
  				spyOn(scope, 'start').and.callThrough();
  				spyOn(scope, 'reset');
  				spyOn(scope, 'render');
  			});
  			
  			describe('syncronous testing', function() {
  				beforeEach(function() {
  					ctrl = createController();
  					scope.start();
  				});
    			it("offset should now be very close to the current time", function() {
    				var today = new Date();
    				today.setDate(today.getDate());
    				var oldDate = angular.copy(today);
    				scope.start();
    				console.log("Offset1: " + scope.offset);
    				var oldOffset = angular.copy(scope.offset);
    				console.log(today - scope.offset);
    				expect(today - scope.offset).toBe(0);
    				$interval.flush(5);
    				today.setDate(today.getDate());
    				expect(today - scope.offset).toBe(0);
    				var todayOffset = today - oldOffset;
    				console.log("Offset2: " + scope.offset);
    				console.log("Offset2 - Offset1: " + (scope.offset - oldOffset));
    				expect(todayOffset).toBe(5);
    			});
    			it("update should be called - but only after 5 milliseconds", function() {
    				spyOn(scope, 'update');
    				scope.start();
    				expect(scope.update).not.toHaveBeenCalled();
    				$interval.flush(5);
    				expect(scope.update).toHaveBeenCalled();
    			});
  			});
  			
  			beforeEach(function() {
  				ctrl = createController($intervalSpy);
  				spyOn(scope, 'start').and.callThrough();
  				spyOn(scope, 'update');
  				spyOn(scope, 'reset');
  				spyOn(scope, 'render');
  				scope.start();
  			});
  			
  			it("once called, should call reset() and render()", function() {
  				expect(scope.reset).toHaveBeenCalled();
  				expect(scope.render).toHaveBeenCalled();
  			});
  			it("$interval should have been called", function() {
  				expect($intervalSpy).toHaveBeenCalledWith(scope.update, scope.options.delay);
  			});
  			it("interval should no longer be null or undefined", function() {
  				expect(scope.interval).toBeDefined();
  				expect(scope.interval).not.toBe(null);
  			});
  		});
  		describe('stop', function(){
  			var oldNumRecords;
  			beforeEach(function() {
  				spyOn($intervalSpy, 'cancel');
  				ctrl = createController($intervalSpy);
  				scope.records = {time: ["00:00.000", "00:00.00"], index: [1, 2], timeStamp: ["00:00.000", "00:00.00"], millis: [0, 0]};
  				oldNumRecords = scope.numRecords;
  				spyOn(scope, 'render');
  				spyOn(scope, 'stop').and.callThrough();
  				scope.stop();
  			});
  			it("once called, should call and render()", function() {
  				expect(scope.render).toHaveBeenCalled();
  			});
  			it("num records should have increased", function() {
  				expect(scope.numRecords).toBeGreaterThan(oldNumRecords);
  			});
  			it("interval should have been canceled correctly", function() {
  				expect($intervalSpy.cancel).toHaveBeenCalledWith(scope.interval);
  				expect(scope.interval).not.toBeDefined();
  				expect(scope.interval).not.toBe(null);
  				expect($intervalSpy.cancel.calls.argsFor(0)[0].$$intervalId).toBe(0);
  			  expect($intervalSpy.cancel.calls.argsFor(1)[0].$$intervalId).toBe(1);
  			});
  		});
  		describe('update', function(){});
		});
	});
});