angular.module('myApp')
  .filter('colorCodeProbability', colorCodeProbability);

function colorCodeProbability() {
  return function(input) {
    var possibles = [1.0/18.0, 1.0/36.0, 1.0/72.0];
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
        if (possibles[i] - input < 0.0001) {
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
