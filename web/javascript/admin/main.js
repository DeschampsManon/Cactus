function display_user_data(){
	$(this).parent().find("ul").slideToggle();
}

$(document).ready(function(){
	$('select').select2();
	$("#user-data > li > a").click(display_user_data);
});



