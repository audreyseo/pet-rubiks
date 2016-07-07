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