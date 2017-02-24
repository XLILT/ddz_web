$(".login-box-sbt").bind("click", function() {
    $.ajax( {
        type : 'post',
        url : '/login',
        dataType : 'text',
        data : $('#f1').serialize(),

        success : function (xmlq) {
            alert(xmlq);
        },

        error : function (xmlq, errq) {
            alert(errq);
        }
    });
});
