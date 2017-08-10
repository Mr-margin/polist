$(function () {
	
	$("#logo").css("background","url(img/logo/"+css_photo+".png) no-repeat left center");
	
	$("#footer").html(footer);
	$('#sbdl').click(function(){
		denglu();
	});
	
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
			denglu();
		} 
	});
});
//用户登录
function denglu(){
	var user_name = $("#user_name").val();
	var password = $("#password").val();
	var ip = "";
	try {
		ip=returnCitySN["cip"];
	} catch (e) {
		
	}
	var city = "";
	try {
		city = returnCitySN["cname"];
	} catch (e) {
		// TODO: handle exception
	}
	if ( user_name == "" || user_name == undefined ) {
		toastr["info"]("提示", "账号不能为空");
		return ;
	}
	if ( password == "" || password == undefined ) {
		toastr["info"]("提示", "密码不能不空");
		return;
	}
	$.ajax({
	    url: "getLogin_Controller.do",//	    type: "POST",
	    async:false,
	    dataType: "json",
	    data: {username:user_name,password:password,ip:ip,city:city,city_or_all:city_or_all},
	    crossDomain: true == !(document.all),
	    success: function (data) {
	    	if ( data.type == "100") {
	    		toastr["info"]("提示", "密码错误");
	    	} else if ( data.type  == "111" ) {
	    		toastr["info"]("提示", "用户不存在");
	    	} else if ( data.type == "5" ) {
	    		window.sessionStorage.setItem("sole",data.userId);
	    		window.location.href="zp01/a.html?sole="+data.userId;
	    	} else if (data.type == "1" || data.type == "2" || data.type=="3" || data.type == "4"|| data.type == "6" ||  data.type == "7" || data.type == "8"||data.type == "10"){
	    		window.sessionStorage.setItem("sole",data.userId);
	    		window.location.href="home.html?sole="+data.userId;
	    	} else if (data.type=="-1" ) {
	    		toastr["info"]("提示", "该账号已登录！");
	    	} 
	    },
	    error: function (ret) {
	    	
	    }  
	
	})
}