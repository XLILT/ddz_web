$(document).ready(function() {
	//Initialize events
	$(".login-box form").submit(function() {
		$.ajax( {  
                type : 'POST',  
                contentType : 'application/json',  
                url : '/login',
                data: encrypt_form($(this)),
                dataType : 'text',
                //同步
                async : false,  
                success : function(data) {  
                    console.log(data);
                },  
                error : function() {  
                    console.error("error");
                }  
            });		

		return false;
	});
});
	
function encrypt_form(form) {
	var form_arr = form.serializeArray();
	form_arr.forEach(function(data) {
		if(data.name === "passwd") {
			data.value = $.md5(data.value);
		}
	});

	var ret_str = $.param(form_arr);
	return ret_str;
}
