function page_width() {
	var main_header_width = $("#main-header").width();
	var window_width = $(window).width();
	var calc_width = window_width - main_header_width;
	$(".page").css("width",calc_width);
}

function display_user_roles(){
	$(".user-roles").each(function(){
		var content = $(this).text();
		var new_content = content.replace(/_/g, ' ').replace(/role/gi, '');;
		console.log(new_content)
		$(this).text(new_content)
	})
}

function display_modal(){
	var modal = $(this).data("target");
	$(modal).fadeIn();
	$("body").addClass("modal-open");
}

function close_modal(){
	$(".modal").fadeOut();
	$("body").removeClass("modal-open");
}

$(document).ready(function(){
	page_width();
	display_user_roles();
	$("[data-toggle='modal']").click(display_modal);
	$(".close-modal, .modal").click(close_modal);
	$('select').select2();
})

$(window).resize(function(){
	page_width();
})