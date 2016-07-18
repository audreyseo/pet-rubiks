/**
 * http://usejsdoc.org/
 */

describe('	Test:	', function() {
	describe('Controller: TimerController', function() {
		beforeEach();
		
		var createController, scope, $interval, $cookies, $log, statistics;
		
		beforeEach(function() {
			module('myApp');
			inject(function ($rootScope, _$interval_, _$cookies, _$log_, _statistics_, $controller) {
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
			});
		});	
		
		describe('deleteRecord', function() {
			beforeEach(function() {
				var $scope = {};
				scope.records = [{time: "0:00.00", index: 1}, {time: "00:00.00", index: 2}];
			});
			
			it('Deletes a record given an index that is smaller than $scope.records.length', function() {
				var index=1;
				$controller.deleteRecord(index);
				var newObject = [{time: "0:00.00", index:1}];
				expect($scope.records).toEqual(newObject);
			});
			
			it('Does not delete a record that has a negative index', function() {
				var index = -1;
				$scope.deleteRecord(index);
				expect($scope.records).toEqual([{time: "0:00.00", index: 1}, {time: "00:00.00", index: 2}]);
			});
		});
		
		describe('getCookies', function() {
			it("Should get the copies of Record that used to be here.", function() {
				spyOn($cookies, 'getObject');
				createController();
				expect($cookies.getObject).toHaveBeenCalled();
			});
		});
		describe('render', function() {});
		
		describe('reset', function(){});
		describe('returnNames', function(){});
		describe('returnObjects', function(){});
		describe('start', function(){});
		describe('stop', function(){});
		describe('update', function(){});
	});
});