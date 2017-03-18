$("#user-form").validate({
	rules: {
	    "user[phone]" : {
	    	minlength: 8,
            maxlength: 13,
            digits: true
	    } 
  	},
  	messages: {
	    "user[phone]": {
            minlength: "not enougth numbers",
            maxlength: "too much numbers",
            digits: "number only"
        }
  	},
  	errorElement: "span",
  	highlight: function(element) {
        $(element).parent().addClass("form-error-container");
    },
    unhighlight: function(element) {
        $(element).parent().removeClass("form-error-container");
    },
});

function remove_string_spaces(){
    var str = $(this).val().replace(/\s+/g, '');
    $(this).val(str);
}

$(document).ready(function(){
    $("#user_phone").keyup(remove_string_spaces);
    $("#user_phone").on('paste', remove_string_spaces); 
    $("#user_phone").on('change', remove_string_spaces); 
})