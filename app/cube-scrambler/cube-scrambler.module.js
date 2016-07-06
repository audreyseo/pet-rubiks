/**
 * http://usejsdoc.org/
 */

angular.module('myApp').controller('cubeScrambler', CubeScrambler);

function CubeScrambler() {
	var vm = this;
	
	vm.code = "";
	vm.code333 = [
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
	vm.scramble = scramble;
	
	vm.scramble();
	
	
	
	function scramble() {
		var indexX = [];
		var indexY = [];
		for (var i = 0; i < 25; i++) {
			var n = Math.floor(Math.random() * vm.code333.length);
			var m = Math.floor(Math.random() * vm.code333[0].length);
			if (i >= 1 && i <= 24) {
				if (m === indexY[i - 1] && n === indexX[i-1]) {
					while (m === indexY[i-1]) {
						m = Math.floor(Math.random() * vm.code333[0].length);
					}
				}
				if (n === indexX[i-1]) {
					while (n === indexX[i-1]) {
						n = Math.floor(Math.random() * vm.code333.length);
					}
				}
			}
  		indexX.push(n);
			indexY.push(m);
		}
		vm.code = "";
		for (var i = 0; i < 25; i++) {
			vm.code = vm.code.concat(vm.code333[indexX[i]][indexY[i]] + " ");
		}
		vm.code = vm.code.substring(0, vm.code.length - 1);
	};
	
};