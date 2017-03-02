function page_width() {
	var main_header_width = $("#main-header").width();
	var window_width = $(window).width();
	var calc_width = window_width - main_header_width;
	$(".page").css("width",calc_width);
}

function display_user_roles(){
	$(".user-roles").each(function(){
		var content = $(this).text();
		//content = $.trim(content);
		var new_content = content.replace(/_/g, ' ').replace(/role/gi, '');;
		console.log(new_content)
		$(this).text(new_content)
	})
}

$(document).ready(function(){
	page_width();
	display_user_roles();
})

$(window).resize(function(){
	page_width();
})