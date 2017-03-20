$("#user-form").validate({
	rules: {
	    "user[phone]" : {
	    	minlength: 8,
            maxlength: 13,
            digits: true
	    },
        "user[plainPassword][second]" : {
            equalTo: "#user_plainPassword_first"
        }
  	},
  	messages: {
	    "user[phone]": {
            minlength: "not enougth numbers",
            maxlength: "too much numbers",
            digits: "number only"
        },
        "user[plainPassword][second]" : {
            equalTo: "passwords have to be identical"
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

$("#password-form").validate({
    rules: {
        "change_password[plainPassword][second]" : {
            equalTo: "#change_password_plainPassword_first"
        }
    },
    messages: {
        "change_password[plainPassword][second]" : {
            equalTo: "passwords have to be identical"
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