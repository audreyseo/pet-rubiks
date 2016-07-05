/**
 * http://usejsdoc.org/
 */
//app.config(['$cookieStoreProvider', function($cookiesProvider) {
//		var date = new Date();
//		date.setDate(date.getDate() + 60);
//		$cookiesProvider.defaults.expires = date;
//	}]
angular.module('myApp').controller('dictator', function($scope) {
	
	})
	.controller('myController', ['$scope', '$cookieStore',  'filterFilter', function($scope, cookieStore, filterFilter) {
		$scope.cases = [
		                {num: 27, code: "OCLL1", solve1: {alg: "(R U R' U) R U2 R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 26, code: "OCLL2", solve1: {alg: "R U2 R' U' R U' R'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 22, code: "OCLL3", solve1: {alg: "[f (R U R' U') f'][F (R U R' U') F']",  length: 12}, solve2: {alg: "R U2' R2' U' R2 U' R2' U2 R2", length: 9}, prob: 1/54},
		                {num: 21, code: "OCLL4", solve1: {alg: "F (R U R' U')(R U R' U')(R U R' U') F'",  length: 14}, solve2: {alg: "y (R' U' R) U' (R' U R) U' (R' U2 R)", length: 12}, prob: 1/108},
		                {num: 24, code: "OCLL5", solve1: {alg: "(r U R' U') (r' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 25, code: "OCLL6", solve1: {alg: "F' (r U R' U') (r' F R)",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 23, code: "OCLL7", solve1: {alg: "R2 [D (R' U2) R] [D' (R' U2) R']",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 58, code: "OCLL8", solve1: {alg: "",  length: 0}, solve2: {alg: "", length: 0}, prob: 1/216},
		                {num: 57, code: "E1", solve1: {alg: "(R U R' U')M'(U R U' r')",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 28, code: "E2", solve1: {alg: "M' U M U2 M' U M",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 44, code: "P1", solve1: {alg: "f (R U R' U') f'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 43, code: "P2", solve1: {alg: "f' (L' U' L U) f",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 32, code: "P3", solve1: {alg: "R U B' U' R' U R B R'",  length: 9}, solve2: {alg: "R D L' D' R' U R B R'", length: 9}, prob: 1/54},
		                {num: 31, code: "P4", solve1: {alg: "R' U' F U R U' R' F' R",  length: 9}, solve2: {alg: "y2 L' d' R d L U' L' B' L", length: 9}, prob: 1/54},
		                {num: 38, code: "W1", solve1: {alg: "(R U R' U) (R U' R' U') (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 36, code: "W2", solve1: {alg: "(L' U' L U') (L' U L U) (L F' L' F)",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 6, code: "S1", solve1: {alg: "r U2 R' U' R U' r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 5, code: "S2", solve1: {alg: "r' U2 (R U R' U) r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 48, code: "L1", solve1: {alg: "F (R U R' U') (R U R' U') F'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 47, code: "L2", solve1: {alg: "F' (L' U' L U) (L' U' L U) F",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 53, code: "L3", solve1: {alg: "l' U' L U' L' U L U' L' U2 l",  length: 11}, solve2: {alg: "y2 r' U' R U' R' U R U' R' U2 r", length: 12}, prob: 1/54},
		                {num: 54, code: "L4", solve1: {alg: "(r U R' U) R U' R' U R U2' r'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 49, code: "L5", solve1: {alg: "(R' F R' F') R2 U2 y (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 50, code: "L6", solve1: {alg: "R' F R2 B' R2' F' R2 B R'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 9, code: "F1", solve1: {alg: "(R' U' R) y' x' (R U') (R' F) (R U R')",  length: 12}, solve2: {alg: "(R U R' U')R' F R2 U R' U' F'", length: 11}, prob: 1/54},
		                {num: 10, code: "F2", solve1: {alg: "R U R' y R' F R U' R' F' R",  length: 11}, solve2: {alg: "(R U R' U)(R' F R F') R U2 R'", length: 11}, prob: 1/54},
		                {num: 35, code: "F3", solve1: {alg: "(R U2 R') (R' F R F') (R U2 R')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 37, code: "F4", solve1: {alg: "F R U' R' U' R U R' F'",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 30, code: "A1", solve1: {alg: "R2 U R' B' R U' R2 U R B R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 29, code: "A2", solve1: {alg: "(R U R' U') R U' R' F' U' F R U R'",  length: 13}, solve2: {alg: "[F (R U R' U') F'] U2 [(R U R' U') (R' F R F')", length: 15}, prob: 1/54},
		                {num: 41, code: "A3", solve1: {alg: "[(R U R' U) R U2 R'] [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 42, code: "A4", solve1: {alg: "[R' U2 (R U R' U) R] y [F (R U R' U') F']",  length: 14}, solve2: {alg: "(R' F R F') (R' F R F') (R U R' U') (R U R')", length: 15}, prob: 1/54},
		                {num: 7, code: "LB1", solve1: {alg: "(r U R' U) R U2 r'",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 8, code: "LB2", solve1: {alg: "r' U' R U' R' U2 r",  length: 7}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 11, code: "LB3", solve1: {alg: "[F' (L' U' L U) F] y [F (R U R' U') F']",  length: 13}, solve2: {alg: "y (r U R' U) (R' F R F') R U2 r'", length: 11}, prob: 1/54},
		                {num: 12, code: "LB4", solve1: {alg: "[F (R U R' U') F'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 39, code: "LB5", solve1: {alg: "R B' R' U' R U B U' R'",  length: 9}, solve2: {alg: "y2 L F' (L' U' L U) F U' L'", length: 10}, prob: 1/54},
		                {num: 40, code: "LB6", solve1: {alg: "R' [F (R U R' U') F'] U R",  length: 9}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 45, code: "T1", solve1: {alg: "F (R U R' U') F'",  length: 6}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 33, code: "T2", solve1: {alg: "(R U R' U') (R' F R F')",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 46, code: "C1", solve1: {alg: "R' U' (R' F R F') U R",  length: 8}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 34, code: "C2", solve1: {alg: "(R U R2' U') (R' F) (R U) (R U') F'",  length: 11}, solve2: {alg: "(R U R' U') x D' R' U R U' D x'", length: 12}, prob: 1/54},
		                {num: 55, code: "I1", solve1: {alg: "R' U2 R2 U R' U R U2 x' U' R' U",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 52, code: "I2", solve1: {alg: "(R U R' U) R d' R U' R' F'",  length: 10}, solve2: {alg: "R' U' R U' R' d R' U R B", length: 10}, prob: 1/54},
		                {num: 56, code: "I3", solve1: {alg: "F (R U R' U') R F' (r U R' U') r'",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 51, code: "I4", solve1: {alg: "f (R U R' U') (R U R' U') f'",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 16, code: "K1", solve1: {alg: "(r U r') (R U R' U') (r U' r')",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 15, code: "K2", solve1: {alg: "(l' U' l) (L' U' L U) (l' U l)",  length: 10}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 13, code: "K3", solve1: {alg: "F U R U' R2 F' R (U R U' R')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 14, code: "K4", solve1: {alg: "R' F R U R' F' R y' R U' R'",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 1, code: "O1", solve1: {alg: "R U2 R' (R' F R F') U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/108},
		                {num: 2, code: "O2", solve1: {alg: "[F (R U R' U') F'] [f (R U R' U') f']",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 3, code: "O3", solve1: {alg: "[f (R U R' U') f'] U' [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 4, code: "O4", solve1: {alg: "[f (R U R' U') f'] U [F (R U R' U') F']",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 18, code: "O5", solve1: {alg: "[F (R U R' U) F'] y' U2 (R' F R F')",  length: 12}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 19, code: "O6", solve1: {alg: "M U (R U R' U') M' (R' F R F')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 17, code: "O7", solve1: {alg: "(R U R' U) (R' F R F') U2 (R' F R F')",  length: 13}, solve2: {alg: "", length: 0}, prob: 1/54},
		                {num: 20, code: "O8", solve1: {alg: "M U (R U R' U') M2 (U R U' r')",  length: 11}, solve2: {alg: "", length: 0}, prob: 1/216}];
		$scope.useCookieInfo = function() {
			$scope.hiddenRowsData();
			$scope.hiddenColsData();
		};
		
		$scope.hiddenRowsData = function() {
			var cookie = cookieStore.get('OLLCookie');
			if (cookie) {
//				console.log("Hidden Rows Cookie safe");
				$scope.hiddenRows = cookie;
//				for (var i = 0; i < $scope.cases.length; i++) {
//					if ($scope.hiddenRows[$scope.cases[i].code] == 1) {
//						var idstring = "#" + $scope.cases[i].code;
//						console.log(idstring);
//						$(idstring).trigger('click');
//						console.log($(idstring));
//						console.log($scope.cases[i].code + " preserved");
//					}
//				}
			} else {
				$scope.hiddenRows = {};
			}
		};
		
		$scope.hiddenColsData = function() {
			var hidingCookie = cookieStore.get('OLLHideCookie');
			if (hidingCookie) {
//				console.log("hiding cookie safe");
				$scope.hidden = hidingCookie;
			} else {
				$scope.hidden = {};
			}
			
			for (var ind = 0; ind < $scope.classes.length; ind++) {
				if ($scope.hidden[$scope.classes[ind]] == 1) {
					$($scope.colClasses[ind]).hide();
				}
			}
			
			cookieStore.put('OLLCookie', $scope.hiddenRows);
		};
		
		// Inits all of my things
		$scope.initialize = function() {
			// Table row/column info
			$scope.cols = ["num", "code", "solve1.alg", "solve1.length", "solve2.alg", "solve2.length", "prob"];
			$scope.hidden = {num: 0, code: 0, solve1:0, length1:0, solve2:0, length2:0, prob:0};
			$scope.colClasses = [".num", ".code", ".solve1", ".length1", ".solve2", ".length2", ".prob"];
			$scope.classes = ["num", "code", "solve1", "length1", "solve2", "length2", "prob"];
			$scope.hiddenRows = {};
			for (var i = 0; i < $scope.cases.length; i++) {
				$scope.cases[i].src = "/img/" + $scope.cases[i].num + ".png";
			}
			
			$scope.showingEditRow = false;
			$scope.showingEditCol = false;
			
			// More Table row/column info
			$scope.filteredCases = $scope.cases;
			$scope.reverse = true;
			$scope.column = 'num';
			
			// Editing helper
			$scope.editString = "Edit Shown Columns and Rows";
			
			$scope.useCookieInfo();
			$("#editRow").hide();
			console.log("hiding known");
			$(".known").hide();
			console.log("known hidden");
		};
		
		// Set up everything
		$scope.initialize();
		
		$scope.isShowable = function(val) {
			if ($scope.hidden[val]) {
				return !$scope.hidden[val] || $scope.showingEditRow;
			} else if ($scope.hiddenRows[val]) {
				return $scope.hiddenRows[val] == 0 || $scope.showingEditCol;
			}
		};
		
		$scope.cookiefy = function(event) {
			var cl = declassify(event);
			var checkbox = $(event.target);
			if (checkbox.is(":checked")) {
				$scope.hiddenRows[cl] = 1;
			} else {
				$scope.hiddenRows[cl] = 0;
			}
			console.log($scope.hiddenRows[cl]);
		}
		
		
		// Cookie storage
		$scope.$watchCollection('hiddenRows', function(newValue, oldValue) {
			cookieStore.put('OLLCookie', newValue);
			
			console.log("Saved OLL Cookie");
		});
		$scope.$watchCollection('hidden', function(newValue, oldValue) {
			cookieStore.put('OLLHideCookie', newValue);
			console.log("Saved OLLHideCookie");
		});
		
		
		$scope.editTable = function() {
			$scope.editString = ($scope.editString == "Edit Shown Columns and Rows") ? "Save Table Configuration" : "Edit Shown Columns and Rows";
			
			$scope.showingEditRow = !$scope.showingEditRow;
			$scope.showingEditCol = !$scope.showingEditCol;
			var editingRow = $("#editRow");
			if (editingRow.is(":visible")) {
//				console.log("Hiding");
				$("#editRow").hide();
				$(".known").hide();
				for (id in $scope.hiddenRows) {
					if ($scope.hiddenRows[id] == 1) {
						console.log(id);
						$("." + id).hide();
					}
				}
//				$("td > input[type='checkbox']").each(function() {
//					if ($(this).is(":checked")) {
//						$scope.hidden[$(this).attr("class")] = 1;
//					}
//				});
				for (var ind = 0; ind < $scope.classes.length; ind++) {
//					console.log("index: " + ind);
//					console.log("Hidden?: " + $scope.hidden[$scope.classes[ind]]);
					if ($scope.hidden[$scope.classes[ind]] == 1) {
//						console.log(ind);
//						console.log("Will Hide: " + $scope.colClasses[ind]);
						$($scope.colClasses[ind]).hide();
					}
				}
			} else {
				$("#editRow").show();
				$(".known").show();
				for (id in $scope.hiddenRows) {
					if ($scope.hiddenRows[id] == 1) {
						console.log(id);
						$("." + id).show();
					}
				}
				for (var ind = 0; ind < $scope.cols.length; ind++) {
					if ($scope.hidden[$scope.classes[ind]] == 1) {
						$($scope.colClasses[ind]).show();
//						$("input." + $scope.classes[ind]).attr("checked", true);
					}
				}
			}
		};
		
//		$scope.hide = function(event) {
//			var c = $(event.target).attr("class");
//			c = c.substring(1, c.length);
//			
//			if ($(event.target).is(":checked")) {
//				$scope.hidden[c] = 1;
//			} else {
//				$scope.hidden[c] = 0;
//			}
//			
////			console.log(c + ":  " + $scope.hidden[c] + " : " + $scope.classes.indexOf(c));
//		};
		
		//console.log("hi there");
		
		$scope.setSort = function(column) {
			$scope.column = column;
			$scope.reverse = !$scope.reverse;
		};
		
		$scope.filterString = '';
		$scope.setFilter = function() {
			console.log($scope.filterString);
			$scope.filteredCases = filterFilter($scope.cases, $scope.filterString);
		};
	}])
	.controller("infoController", function($scope) {
//		$scope.known = 0;
		$scope.toggle = "Hide";
		$scope.show = function(event) {
			var goal = "class";
			
			if ($(event.target).attr(goal) == "Length1") {
				if ($(event.target).is(":checked")) {
					$(".length1").show();
					$scope.hidden["solve1.length"] = 0;
				} else {
					$(".length1").hide();
					$scope.hidden["solve1.length"] = 1;
				}
			} else if ($(event.target).attr(goal) == "Length2") {
				if ($(event.target).is(":checked")) {
					$(".length2").show();
					$scope.hidden["solve2.length"] = 0;
				} else {
					$(".length2").hide();
					$scope.hidden["solve2.length"] = 1;
				}
			} else if ($(event.target).attr(goal) == "Solve2") {
				if ($(event.target).is(":checked")) {
					$(".solve2").show();
					$scope.hidden["solve2.alg"] = 0;
				} else {
					$(".solve2").hide();
					$scope.hidden["solve2.alg"] = 1;
				}
			}
		};
//		$scope.calculateKnown = function() {
//			$scope.known = 0;
//			$(".known").each(function() {
//				if ($(this).is(":checked")) {
//					$scope.known++;
//				}
//			})
//			return $scope.known;
//		};
		$scope.toggleCases = function() {
			
		};
	});
//	.controller('cubeScrambler', function($scope) {
//		$scope.code333 = [
//		          		    [
//		          		      "R", "R'", "R2"
//		          		    ]
//		          		    , [
//		          		      "L", "L'", "L2"
//		          		    ]
//		          		    , [
//		          		      "B", "B'", "B2"
//		          		    ]
//		          		    , [
//		          		      "F", "F'", "F2"
//		          		    ]
//		          		    , [
//		          		      "U", "U'", "U2"
//		          		    ]
//		          		    , [
//		          		      "D", "D'", "D2"
//		          		    ]
//		          		  ];
//		          		
//		          		$scope.code = "";
//		          		
//		          		$scope.scramble = function() {
//		          			var indexX = [];
//		          			var indexY = [];
//		          			for (var i = 0; i < 25; i++) {
//		          	      var n = Math.floor(Math.random() * $scope.code333.length);
//		          	      var m = Math.floor(Math.random() * $scope.code333[0].length);
//		          	      
//		          	      if (i >= 1 && i <= 24) {
//		          	        if (m == indexY[i - 1] && n == indexX[i-1]) {
//		          	          while (m == indexY[i-1]) {
//		          	            m = Math.floor(Math.random() * $scope.code333[0].length);
//		          	          }
//		          	        }
//		          	        if (n == indexX[i-1]) {
//		          	          while (n == indexX[i-1]) {
//		          	            n = Math.floor(Math.random() * $scope.code333.length);
//		          	          }
//		          	        }
//		          	      }
//		          	      indexX.push(n);
//		          	      indexY.push(m);
//		          	    }
//		          			$scope.code = "";
//		          			for (var i = 0; i < 25; i++) {
//		          				$scope.code = $scope.code.concat($scope.code333[indexX[i]][indexY[i]] + " ");
//		          			}
//		          			$scope.code = $scope.code.substring(0, $scope.code.length - 1);
//		          		};
//		          		$scope.scramble();
//		          	});

function returnAddress(value) {
	var string = "img/" + value + ".png";
	console.log(string);
	return string;
}

function declassify(event) {
	var str = $(event.target).attr("id");
//	str = str.substring(1, str.length);
	return str;
}