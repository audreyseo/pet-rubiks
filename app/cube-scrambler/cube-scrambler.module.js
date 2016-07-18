/**
 * http://usejsdoc.org/
 */

angular.module('myApp').controller('cubeScrambler', CubeScrambler);

function CubeScrambler($scope) {	
	$scope.code = "";
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
	$scope.scramble = scramble;
	
	$scope.scramble();
	
	
	
	function scramble() {
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
	
};