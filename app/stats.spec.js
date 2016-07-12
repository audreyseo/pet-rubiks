/**
 * http://usejsdoc.org/
 */

describe('Factory: statistics', function() {
	var statistics;
	
	beforeEach(module('myApp'));
	beforeEach(inject(function(_statistics_) {
		statistics = _statistics_;
	}));
	
	describe('addData', function() {});
	describe('loadData', function() {});
	describe('mean', function() {});
	describe('variance', function() {});
	describe('stdDev', function() {});
	describe('mean5', function() {});
	describe('mean35', function() {});
	describe('mean10', function() {});
	describe('mean1012', function() {});
	describe('mean100', function() {});
	describe('q1', function() {});
	describe('median', function() {});
	describe('q3', function() {});
	describe('best', function() {});
	describe('worst', function() {});
	describe('iqr', function() {});
	describe('calculate', function() {});
});