/**
 * http://usejsdoc.org/
 */


// Provides default data for various flashcard purposes
// So it really needs to be renamed to something more
// descriptive than cookieData
angular
	.module('myApp')
	.value('cookieData', {
			practicing: {"OCLL8": false},
			practiceCards: [],
			cardPriorities: {"OCLL8": -1},
			cardOptions: {"L3": -1, "OCLL8": -1},
			cards: {maxNumber: 5, options: range(0, 5)},
			practiceButton: "Select cases to practice"
	});


function range(start, count) {
  return Array.apply(0, Array(count))
    .map(function (element, index) { 
      return index + start;  
  });
}