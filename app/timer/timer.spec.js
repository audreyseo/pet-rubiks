/**
 * http://usejsdoc.org/
 */

describe('TimerController', function() {
	beforeEach(module('myApp'));
	
	var $controller;
	
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));
	
	describe('deleteRecord', function() {
		beforeEach(function() {
			var $scope = {};
			var controller = $controller('timerController', {$scope: $scope});
			$scope.records = [{time: "0:00.00", index: 1}, {time: "00:00.00", index: 2}];
		});
		
		it('Deletes a record given an index that is smaller than $scope.records.length', function() {
			var index=1;
			$scope.deleteRecord(index);
			expect($scope.records).toEqual([{time: "0:00.00", index:1}]);
		});
		
		it('Does not delete a record that has a negative index', function() {
			var index = -1;
			$scope.deleteRecord(index);
			expect($scope.records).toEqual([{time: "0:00.00", index: 1}, {time: "00:00.00", index: 2}]);
		});
	});
	
	describe('getCookies', function() {});
	
	describe('render', function() {});
	
	describe('reset', function(){});
	describe('returnNames', function(){});
	describe('returnObjects', function(){});
	describe('start', function(){});
	describe('stop', function(){});
	describe('update', function(){});
});