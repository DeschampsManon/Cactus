function page_width() {
	var main_header_width = $("#main-header").width();
	var window_width = $(window).width();
	var calc_width = window_width - main_header_width;
	if( $("#main-header").position().left == 0){
		$(".page").css("width", calc_width+"px");
	} else {
		$(".page").css("width", "100%");
	}
	console.log(main_header_width)
}

// function display_user_roles(){
// 	$(".user-roles").each(function(){
// 		var content = $(this).text();
// 		var new_content = content.replace(/_/g, ' ').replace(/role/gi, '');;
// 		console.log(new_content)
// 		$(this).text(new_content)
// 	})
// }

function display_modal(){
	var modal = $(this).data("target");
	$(modal).fadeIn();
	$("body").addClass("modal-open");
}

function close_modal(){
	$(".modal").fadeOut();
	$("body").removeClass("modal-open");
}

function display_user_data(){
	$(this).parent().find("ul").slideToggle();
}

function minus_nav(){
	var main_header = $("#main-header")
	if( $(window).width() >= 1300 ){
		main_header.animate({ width : "30rem"}, 150, function(){
			page_width();
		});
		main_header.removeClass("min-nav");
		main_header.css({ left : 0 });
	} else if ( $(window).width() <= 1300 && $(window).width() >= 760 ) {
		main_header.addClass("min-nav");
		main_header.animate({ width : "10rem"}, 150, function(){
			page_width();
		});
		main_header.css({ left : 0 });

	} else {
		main_header.removeClass("min-nav");
		main_header.animate({ width : "100%"}, 150, function(){
			page_width();
		});
		main_header.css({ left : "-100%" });
	}

	//page_width();
}

function responsive_nav(boolean){
	if( boolean == true){
		$("#main-header").animate({ left : "0" });
	} else {
		$("#main-header").animate({ left : "-100%" });
	}
}

$(document).ready(function(){
	minus_nav();
	//$.when(minus_nav()).done(page_width());
	$('select').select2();
	$("[data-toggle='modal']").click(display_modal);
	$(".close-modal, .modal").click(close_modal);
	$("#user-data > li > a").click(display_user_data);
	$("#burger-menu-open").click(function(){
		responsive_nav(true)
	});
	$("#burger-menu-close").click(function(){
		responsive_nav(false)
	});
})

$(window).resize(function(){
	minus_nav();
	//$.when(minus_nav()).done(page_width());
})