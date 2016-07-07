/**
 * http://usejsdoc.org/
 */

describe('TimerController', function() {
	beforeEach(module('myApp'));
	
	var $controller;
	
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));
	
	describe('$scope.deleteRecord', function() {
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
	
	describe('$scope.getCookies', function() {});
	
	describe('$scope.render', function() {});
	
	describe('$scope.reset', function(){});
	describe('$scope.returnNames', function(){});
	describe('$scope.returnObjects', function(){});
	describe('$scope.start', function(){});
	describe('$scope.stop', function(){});
	describe('$scope.update', function(){});
});