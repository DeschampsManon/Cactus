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
	$("[data-toggle='modal']").click(display_modal);
	$(".close-modal, .modal").click(close_modal);
});
