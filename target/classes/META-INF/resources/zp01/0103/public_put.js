jQuery.support.cors = true;
var dataBase;//session
var roleMenu;//权限菜单
$(function () {
	selectSession();
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
