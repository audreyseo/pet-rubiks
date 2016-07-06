/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.value('cookieData', {
			practicing: {},
			practiceCards: [],
			cardPriorities: {},
			cardOptions: {},
			cards: {maxNumber: 0, options: []},
			practiceButton: "Select cases to practice"
	});