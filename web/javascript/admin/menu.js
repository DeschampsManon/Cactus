function page_width() {
	var main_header_width = $("#main-header").width();
	var window_width = $(window).width();
	var calc_width = window_width - main_header_width;
	if( $("#main-header").position().left == 0){
		$(".page").css("width", calc_width+"px");
	} else {
		$(".page").css("width", "100%");
	}
}

function change_main_nav_width(){
	if( $(window).width() >= 1300 ){
		max_nav(false);
	} else if ( $(window).width() <= 1300 && $(window).width() >= 760 ) {	
		min_nav(false);
	} else {
		mobile_nav();
	}
}

function max_nav(btn_clicked){
	var main_header = $("#main-header");
	main_header.stop().animate({ width : "30rem"}, 150, function(){
		page_width();
	});
	main_header.removeClass("min-nav");
	main_header.css({ left : 0 });
	$("#min-nav-btn").removeClass("active");
	if(btn_clicked == true){
		$("#min-nav-btn").html("format_indent_decrease");
		$("#company-data > div").first().removeClass("hidden");
	}
}

function min_nav(btn_clicked){
	var main_header = $("#main-header");
	main_header.addClass("min-nav");
	main_header.stop().animate({ width : "10rem"}, 150, function(){
		page_width();
	});
	main_header.css({ left : 0 });
	if(btn_clicked == true){
		$("#min-nav-btn").addClass("active").html("format_indent_increase");
		$("#company-data > div").first().addClass("hidden");
	}
	main_nav_hover();
}

function mobile_nav(){
	var main_header = $("#main-header");
	main_header.removeClass("min-nav");
	main_header.animate({ width : "100%"}, 150, function(){
		page_width();
	});
	main_header.css({ left : "-100%" });
}

function responsive_nav(boolean){
	if( boolean == true){
		$("#main-header").animate({ left : "0" });
	} else {
		$("#main-header").animate({ left : "-100%" });
	}
}

function main_nav_hover(){
	$("#main-nav").hover(function(){
		max_nav(true);
	}, function(){
		min_nav(true);
	});
}

$(document).ready(function(){
	change_main_nav_width();
	$("#burger-menu-open").click(function(){
		responsive_nav(true)
	});
	$("#burger-menu-close").click(function(){
		responsive_nav(false)
	});
	$("#min-nav-btn").click(function(){
		if($("#main-header").hasClass("min-nav")){
			max_nav(true);
		} else {
			min_nav(true);
		}
		
	});
});

$(window).resize(function(){
	change_main_nav_width();
});