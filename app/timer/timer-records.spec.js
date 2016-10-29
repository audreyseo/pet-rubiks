/**
 * http://usejsdoc.org/
 */
describe('	Test:	', function() {
	describe('Factory: TimerRecords', function() {
		var timerRecords, statistics, $cookies;
		beforeEach(module("myApp"));
		beforeEach(inject(function(_timerRecords_, _statistics_, _$cookies_) {
			timerRecords = _timerRecords_;
			statistics = _statistics_;
			$cookies = _$cookies_;
		}));

		describe("check that everything is defined", function() {
			it("functions", function() {
				expect(timerRecords.loadData).toBeDefined();
				expect(timerRecords.update).toBeDefined();
				expect(timerRecords.save).toBeDefined();
			});

			it("fields", function() {
				expect(timerRecords.dates).toBeDefined();
				expect(timerRecords.allData).toBeDefined();
				expect(timerRecords.allStats).toBeDefined();
				expect(timerRecords.dateKeys).toBeDefined();
			});
		});

		describe('loadData', function() {
			it("given some data, creates some more data", function() {
				var data = {};
				data.index = ["blah"];
				data.time = ["more blah"];
				data.millis = [1234];
				data.timeStamp = ["blah blah"];
				var timeObj = {index: data.index[0], time: data.time[0], millis: data.millis[0], timeStamp: data.timeStamp[0]};
				timerRecords.loadData(data);
				expect(timerRecords.allData[0]).toEqual(timeObj);
			});

			it("should define a timestamp as 'na' if undefined", function() {
				var data = {};
				data.index = ["blah"];
				data.time = ["more blah"];
				data.millis = [1234];
				data.timeStamp = [undefined];
				timerRecords.loadData(data);
				expect(timerRecords.allData[0].timeStamp).toBe("na");
			});
		});
		describe('update', function() {
			it("should load data", function() {
				var data = {};
				data.index = ["blah"];
				data.time = ["more blah"];
				data.millis = [1234];
				data.timeStamp = ["blah blah"];
				spyOn(timerRecords, 'loadData');
				spyOn(timerRecords.allStats, 'loadData');
				spyOn(timerRecords.allStats, 'calculate');
				timerRecords.update(data);
				expect(timerRecords.loadData).toHaveBeenCalledWith(data);
				expect(timerRecords.allStats.loadData).toHaveBeenCalledWith(timerRecords.allData);
				expect(timerRecords.allStats.calculate).toHaveBeenCalled();
			});
		});
		describe('save', function() {
			it("should call put with $cookies", function() {
				var data = {};
				data.index = ["blah"];
				data.time = ["more blah"];
				data.millis = [1234];
				data.timeStamp = ["blah blah"];
			  spyOn($cookies, 'put');
				timerRecords.loadData(data);
				timerRecords.save();
				expect($cookies.put).toHaveBeenCalled();
			});
		});
	});
});

//{expect(true).toBe(false)}
