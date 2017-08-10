jQuery.support.cors = true;
var dataBase;//session
var roleMenu;//权限菜单
$(function () {
	selectSession();
	$("#update_password").click(function(){
		$("#update").modal();
	});
});
//获取用户信息
function selectSession() {
	dataBase = ajax_async_t("../../getLogin_message.do",{},"json");
	if ( dataBase == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
}
//退出
function outLogin() {
	var data = ajax_async_t("login_out.do",{},"json");
	if(data=="1"){
		window.location.href="index.html"
	} else {
		
	}
}
//修改密码
function xiugaimima_anniu() {
	var old_pass = $("#old_pass").val();
	if(old_pass == "" || old_pass == null || old_pass == undefined ) {
		toastr["info"]("提示","原密码不能为空");
		return;
	}
	var str = $("#new_pass").val();
	var str1 = $("#new_pass_2").val();
	if(str == "" || str == null || str == undefined ) {
		toastr["info"]("提示","新密码不能为空");
		return;
	}
	if(str1 == "" || str1 == null || str1 == undefined ) {
		toastr["info"]("提示","确认密码不能为空");
		return;
	}
	if( str != str1){
		toastr["info"]("提示","两次新密码不相同");
		return;
	}
	if(str == old_pass ) {
		toastr["info"]("提示","新旧密码不能相同");
		return;
	}
	if(str.length<6) {
		toastr["info"]("提示","新密码长度不能小于6");
		return;
	}
	var user_id = dataBase.Login_map.SOLE
	var data = ajax_async_t("updatePassword.do",{old_password:old_pass,new_password:str,u_id:user_id},"json");
	if ( data == "1" ) {
		toastr["success"]("提示","修改成功");
		$('#update').modal('toggle');
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		
	} else if ( data == "2" ) {
		toastr["info"]("提示","修改失败");
	} else if ( data == "3" ) {
		toastr["info"]("提示","原密码错误");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
	
	
}