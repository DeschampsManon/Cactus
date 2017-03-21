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
	var upload_loader;

	$.ajax({
		type: 'POST', 
		url: url, 
		data: data, 
		dataType: 'html', 
		processData: false,
		contentType: false,
		beforeSend: function() {
            $("label[for='original-file-upload']")
            .css({"opacity" : "1"})
        	upload_loader = setInterval(function() {
	      		$("label[for='original-file-upload']").animate({
	      			backgroundColor: 'rgba(0,0,51,.6)',
	      		}, 800).animate({
	       			backgroundColor: 'rgba(0,156,139,.6)',
	      		}, 800).animate({
	       			backgroundColor: 'rgba(220,17,86,.6)',
	      		}, 800); 
	    	}, 900);
	    },
		success: function(result) {
        	$form.find("#user-avatar").html(result);
        	clearInterval(upload_loader);
      	},
      	error: function(result) {
        	clearInterval(upload_loader);
    	}
	})
}

$(document).ready(function(){
	login_form();
	$("#original-file-upload").change(upload_avatar_ajax);
});
