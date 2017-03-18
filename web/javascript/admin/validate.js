$("#user-form").validate({
	rules: {
	    "user[phone]" : {
            digits: true
	    }
  	},
  	messages: {
	    "user[phone]": {
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

