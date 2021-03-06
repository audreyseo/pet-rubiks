
/**
 * http://usejsdoc.org/
 */

angular
	.module('myApp')
	.config(function($cookiesProvider) {
		var date = new Date();
		date.setDate(date.getDate() + 60);
		$cookiesProvider.defaults.expires = date.toUTCString();
	})
	.run(function($templateCache) {
		$templateCache.put("templates/dividingBox.html",
			'<div class="divider" id={{dividerId}}>'+'<div class="title divider" data-toggle="tooltip" title="Click to hide/show the following content." style="cursor:pointer">{{dividerTitle}}</div>' +'<div class="replaceable" ng-transclude></div>'+"</div>");
	});