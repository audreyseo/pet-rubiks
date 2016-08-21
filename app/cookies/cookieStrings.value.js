/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.value('cookieStrings', {
		oll: {
			hiddenRows: "OLLHiddenRowsCookie",
			hiddenCols: "OLLHiddenCookie",
			cards: "OLLMaxNumCards",
			practicing: "OLLPracticing",
			practiceCards: "OLLPracticeCards",
			cardOptions: "OLLCardOptions",
			cardPriorities: "OLLCardPriorities",
			dataCards: "OLLDataCards"
		},
		pll: {
			hiddenRows: "PLLHiddenRowsCookie",
			hiddenCols: "PLLHiddenCookie",
			cardsr: "PLLMaxNumCardrs",
			practicing: "PLLPracticing",
			practiceCards: "PLLPracticeCards",
			cardOptions: "PLLCardOptions",
			cardPriorities: "PLLCardPriorities",
			dataCards: "PLLDataCards"
		}
	});
