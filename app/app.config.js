/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.config(function($cookiesProvider) {
		var date = new Date();
		date.setDate(date.getDate() + 60);
//		console.log(date.toTimeString());
		$cookiesProvider.defaults.expires = date.toUTCString();
	});