/**
 * http://usejsdoc.org/
 */

$(window).load(function() {
//	console.log("hi");
//	$("#sortControl").prop("opacity", 0);
//	$("#sortControl").prop("height", "0px")
	$(".controlBox").each(function() {
		$(this).slideUp(200);
	});
	
	$("#sort").change(function() {
		if ($(this).is(":checked")) {
			$(".controlBox").each(function() {
				if ($(this).attr("id") != "sortControl") {
					$(this).slideUp(200);
				}
			});
			$("#sortControl").stop(true).slideDown(200);
		} else {
			$("#sortControl").stop(true).slideUp(200);
		}
	});
	
	$("#card").change(function() {
		if ($(this).is(":checked")) {
			$(".controlBox").each(function() {
				if ($(this).attr("id") != "cardControl") {
					$(this).slideUp(200);
				}
			});
			$("#cardControl").stop(true).slideDown(200);
		} else {
			$("#cardControl").stop(true).slideUp(200);
		}
	});
	
	$("#known").change(function() {
		if ($(this).is(":checked")) {
			$(".controlBox").each(function() {
				if ($(this).attr("id") != "caseControl") {
					$(this).slideUp(200);
//					$(this).show(1000);
				}
			});
			$("#caseControl").stop(true).slideDown(200);
		} else {
			$("#caseControl").stop(true).slideUp(200);
		}
	});
	
	
	$("body").keydown(function(event) {
		
		if (event.which == 32) {
			$("#timerButton").trigger('click');
			event.preventDefault();
			// Case : Just started -- don't want to change value of scramble
			// Case : Just reset -- don't want to change value of scramble
			// Case : Just stopped -- want to change value of scramble
			if($("#timerButton").prop("value") === "Stop") {
				$("#scrambleButton").trigger('click');
//				$("#timerButton").trigger('click');
			}
		}
	});
	
	$("#edit").trigger('click');
	
	
	var selectCards = $("select[name='numCards']");
	for (var i = 1; i < 11; i++) {
		selectCards.append("<option>" + i + "</option>");
	}
	
	$("td.prob").each(
		function() {
			if ($(this).html() == 0.01852) {
				$(this).css("color", "#0022FF");
			} else if ($(this).html() == 0.00926) {
				$(this).css("color", "#00BB22");
			} else {
				$(this).css("color", "#FF0022");
			}
		}
	);
	
//	$('tr:even').css('background-color', '#EEEEEE');
});