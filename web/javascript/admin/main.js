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
}

function responsive_nav(boolean){
	if( boolean == true){
		$("#main-header").animate({ left : "0" });
	} else {
		$("#main-header").animate({ left : "-100%" });
	}
}

function login_form(){
	var input = ($("#login-page .input-container input"));

	input.each(function(){
		$(this).after("<div class='input-border-focus'></div>")
		if( $(this).val() ){
			$(this).parent().find("label").animate({ bottom: "3.5rem" }, 400 );
			$(this).parent().addClass("active");
			console.log($(this).val());
		}
		
	});

	input.focus(function(){
		$(this).parent().find(".input-border-focus").animate({ left : 0 }, 400);
		$(this).parent().find("label").animate({ bottom: "3.5rem" }, 400 );
		$(this).parent().addClass("active");
	
	});
	
	input.blur(function(){
		$(this).parent().find(".input-border-focus").animate({ left : "-100%" }, 400);
		if( !$(this).val() ){
			$(this).parent().find("label").animate({ bottom: ".45rem" }, 400 );
			$(this).parent().removeClass("active");
		}
	})
}

function upload_avatar_ajax(e){
	var $form = $(this).closest('form')
	var form = $form.get(0); 
	var data = new FormData(form);
	var url  = $form.attr("action");
	
	$.ajax({
		type	: 'POST', 
		url		:  url, 
		data		: data, 
		dataType	: 'html', 
		processData: false,
		contentType: false,
		success: function(result) {
        	$form.find("#user-avatar").html(result);
      	},
	})
}

$(document).ready(function(){
	minus_nav();
	$('select').select2();
	login_form();
	$("[data-toggle='modal']").click(display_modal);
	$(".close-modal, .modal").click(close_modal);
	$("#user-data > li > a").click(display_user_data);
	$("#burger-menu-open").click(function(){
		responsive_nav(true)
	});
	$("#burger-menu-close").click(function(){
		responsive_nav(false)
	});
	$("#original-file-upload").change(upload_avatar_ajax);
})

$(window).resize(function(){
	minus_nav();
})