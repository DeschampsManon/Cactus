function display_user_data(){
	$(this).parent().find("ul").first().slideToggle();
}

function delete_user(e){
	e.preventDefault();
	
	var url_delete = $(this).attr("href");
	var user_id = $(this).data("id");

	$.ajax({
		url: url_delete, 
		success: function() {
	        $("tr#user_"+user_id).remove();
	        display_alert("success","user has been deleted");
      	},
      	error: function() {
      		display_alert("error","an error occured");
      	}
	});
}

function close_alert(){
	$(this).closest(".alert").addClass("hidden");
}

function display_alert(status, msg){
	$(".alert").addClass("hidden");
	$(".alert.ajax-notice").removeClass("hidden").addClass(status).find(".result").html(msg);
}

$(document).ready(function(){
	$('select[multiple="multiple"]').select2();
	$("#user-data > li > a").click(display_user_data);
	$(".delete-user-btn").click(delete_user);
	$(".close-alert").click(close_alert)
});



