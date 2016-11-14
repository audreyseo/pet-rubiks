/**
 * http://usejsdoc.org/
 */
angular
	.module('myApp')
	.filter('colorCodeAlgorithms', colorCodeAlgorithms);

function colorCodeAlgorithms() {
	return function(input) {
		var groupsToHide = ["\\(R U R' U'\\)", "\\(r U R' U'\\)", "\\(R U R' U\\)", "\\(r U R' U\\)", "\\(R' F R F'\\)", "\\(R' F R' F'\\)", "\\(r' F R F'\\)", "\\(L' U' L U\\)", "\\(L' U' L U'\\)","\\(L F' L' F\\)"];
		var replacementText = ["<span class='rurpup'>(R U R' U')</span>",
		                       "<span class='rurpup'>(<span class='abnormal'>r</span> U R' U')</span>",
		                       "<span class='rurpu'>(R U R' U)</span>",
		                       "<span class='rurpu'>(<span class='abnormal'>r</span> U R' U)</span>",
		                       "<span class='rpfrfp'>(R' F R F')</span>",
		                       "<span class='rpfrfp'>(R' F <span class='abnormal'>R'</span> F')</span>",
		                       "<span class='rpfrfp'>(<span class='abnormal'>r'</span> F R F')</span>",
		                       "<span class='rurpup'>(L' U' L U)</span>",
		                       "<span class='rurpu'>(L' U' L U')</span>",
		                       "<span class='rpfrfp'>(L F' L' F)</span>"];
		var output = input;
//		console.log("1: " + input + " | " + output);
		if (output !== "") {
			for (var i = 0; i < groupsToHide.length; i++) {
				// Need a regex that replaces all instances instead of just one instance
				var regex = new RegExp(groupsToHide[i], "g");
				// Uses replace to insert the new text from replacementText[i]
				// where the regex found a match
				output = output.replace(regex, replacementText[i]);
			}
//			console.log("2: " + input + " | " + output);
		} else {
			output = ""
		}
		return(output);
	};
}
angular.module('myApp')
  .filter('colorCodeProbability', colorCodeProbability);

function colorCodeProbability() {
  return function(input) {
    var possiblesA = [1.0/18.0, 1.0/36.0, 1.0/72.0];
    var possiblesB = [1.0/54.0, 1.0/108.0, 1.0/216.0];
    var wrappers = ["<span class=\"blue-prob\">$1</span>",
                    "<span class=\"green-prob\">$1</span>",
                    "<span class=\"red-prob\">$1</span>"];
    var round = function(number, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = number * factor;
      var roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
    };

    input = round(input, 5);

    var output = "" + input;
    //		console.log("1: " + input + " | " + output);
    if (output !== "") {
      for (var i = 0; i < wrappers.length; i++) {
        if (Math.abs(possiblesA[i] - input) < 0.0001 || Math.abs(possiblesB[i] - input) < 0.0001) {
          // Need a regex that replaces all instances instead of just one instance
          var regex = new RegExp(/(\d+\.\d+)/);
          // Uses replace to insert the new text from replacementText[i]
          // where the regex found a match
          output = output.replace(regex, wrappers[i]);
          return output;
        }
      }
      //			console.log("2: " + input + " | " + output);
    } else {
      output = ""
    }
    return(output);
  };
}

/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.filter('millisToString', ['timeConversion', function(converter) {
		return function(input) {
			if (String(input).indexOf(":") < 0 && (typeof input === "number")) {
//				console.log("int: " + parseInt(input) + " " + input);
				var num = parseInt(input);
				if (input <= 0) {
					return("--:--.---");
				} else if (input > 0 && input < 200) {
					return input;
				} else {
					return converter.millisToString(Math.round(parseInt(input)));
				}
			} else if (String(input).indexOf(":") < 0 && (!String(input).match(/^[a-zA-Z]+$/) || String(input) === "undefined")){
				return converter.millisToString(0);
			}
			return input;
		};
	}]);
