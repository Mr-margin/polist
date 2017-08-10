jQuery.support.cors = true;
var dataBase;//session
var roleMenu;//权限菜单
var statusCode;//审核用户跳转进来所带的参数
$(function () {
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	taskId=Request['taskId'];
	userId = Request['userId'];
	statusCode = Request['status'];
	userName = Request['userName'];
	update = Request['update'];
	year = Request['year'];
	$("#update_password").click(function(){
		$("#update").modal();
	});
	
	console.log(taskId);
});
var taskId,userId,userName,year,update ;
//获取参数
function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}
