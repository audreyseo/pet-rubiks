
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.config(function($cookiesProvider) {
		var date = new Date();
		date.setDate(date.getDate() + 60);
		$cookiesProvider.defaults.expires = date.toUTCString();
	});