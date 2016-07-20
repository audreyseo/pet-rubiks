/**
 * http://usejsdoc.org/
 */

function returnNaN() {
	return (Math.sqrt(-1));
}

describe('	Test:	', function() {
	describe('Controller: TimerController', function() {
		
		var ctrl, createController, scope, $interval, $cookies, $log, statistics;
		
		beforeEach(module('myApp', 'ngCookies'));		
		
		beforeEach(inject(
			function ($rootScope, _$interval_, _$cookies_, _$log_, _statistics_, $controller) {
  	    scope = $rootScope.$new();
  			$interval = _$interval_;
  			$cookies = _$cookies_;
  			$log = _$log_;
  			statistics = _statistics_;
  	    createController = function() {
	        return $controller('TimerController', {
	            '$scope': scope,
	            '$interval': $interval,
	            '$cookies': $cookies,
	            '$log': $log,
	            'statistics': statistics
  	      });
    	  };
			}
		));
		
		describe("Variables", function() {
			it("variables should be defined", function() {
				
			});
		});
		
		describe('Functions', function() {
			beforeEach(function() {
				ctrl = createController();
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
  		
  		describe('reset', function(){});
  		describe('returnNames', function(){});
  		describe('returnObjects', function(){});
  		describe('start', function(){});
  		describe('stop', function(){});
  		describe('update', function(){});
		});
	});
});