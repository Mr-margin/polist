jQuery.support.cors = true;
var version = "1.0";
var dataBase = parent.dataBase;
var level=dataBase.Login_map.TYPE;
$(function () {
	if(level == "3" || level =="2" ){//当用户类型为3，市级管理员用户时
		$("#sjtb_a").tab('show');
		$("#countdown2").tab('show');
		$("#rwlb").html("清单任务列表");
		renwu("taskProvince/findCityUserTask.do");
		getOverTime("1");
	}
	if( level == "4"||level == "6") {
		$("#listAction").remove();
		get_list();
		$("#release").hide();
		$("#qytb_a").hide();
		$("#sjtb_a").tab('show');
		$("#countdown1").hide();
		$("#countdown2").tab('show');
		$("#ul1")[0].style.width="9rem";
		$("#ul2")[0].style.width="9rem";
		//$("#sjtb_a").hide();
	} else if(level == "1" ){
		$("#sjtb_a").hide();
		$("#qytb_a").tab('show');
		$("#daojishi").hide();
		$("#zhongyaogonggao").attr("class","col-sm-6")
		$("#denglurizhi").attr("class","col-sm-6")
		$("#renwuliebiao").hide()
		$("#ul1")[0].style.width="9rem";
		$("#ul2")[0].style.width="9rem";
	}
	$("#data_1 .input-group.date").datepicker({
		minViewMode: 0,
		todayBtn: "linked",
		keyboardNavigation: !1,
		forceParse: !1,
		autoclose: !0,
		format: "yyyy-mm-dd",
	});
	
	$("#release").click(function(){//发布公告按钮
		$("#release_gg").modal();
		$("#add_title").val("");
		$("#add_content").val("");
		 $(":checkbox").prop("checked",false);
		show_user();
	})
	login_journal();//查看登录日志
	select_task();//查看公告
});

//调用父页面的全局变量

//获取任务列表
function get_list(){
	//获取任务列表数据
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/user/listAllTask.do",{version:"1.0",userId:dataBase.Login_map.SOLE},"JSON","1");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			var html = "";
			if(data.data.length > 0){
				for(var i=0; i<data.data.length; i++){
					html += "<tr><td>"+data.data[i].order+"</td>";
					html += "<td>"+data.data[i].name+"</td>";
					html += "<td>"+data.data[i].goalYear+"</td>";
					html += "<td>"+data.data[i].publishTime+"</td>";
					html += "<td>"+data.data[i].endTime+"</td>";
					html +=	"<td>"+"</td>";//审核意见
					html += "<td>"+data.data[i].status+"</td></tr>";
				}
				$("#show_renwu").html(html);
				parent.user_list = "1";
				getOverTime("2");
			}else{
				parent.user_list = "0";
			}
		}else{
			toastr["info"]("错误信息","暂无任务信息");
			parent.user_list = "0";
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//市级填报用户的倒计时通知
function getOverTime(f){
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/countDown.do",{version:"1.0",userId:dataBase.Login_map.SOLE},"JSON","1");
	if(data != undefined){
		if(data.status == "success"){
			var html = "";
			var datas;
			if(f=="1"){
				datas = data.data.fromMe;
			}else{
				datas = data.data;
			}
			if(datas!=undefined&&datas.length > 0){
				a:for(var i=0; i<datas.length; i++){
						html += '<li>距&nbsp;<b>'+datas[i].name+'</b>&nbsp;截止还有&nbsp;<b style="color:red;">'+datas[i].remainDay+'</b>&nbsp;天 &nbsp;&nbsp;&nbsp;</li>';
				}
				if(f=="1"){
					$("#tian_num1").html(html);
				}else{
					$("#tian_num").html(html);
				}
			}else{
				//toastr["info"]("data为空");
			}
		}else{
			toastr["info"](data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

/**
 * 登录日志
 */
function login_journal(){
	var data = ajax_async_t("login_jouranl.do",{user_id:dataBase.Login_map.SOLE},"json");
	var html = "" ;
	if ( data != "" && data != null && data != undefined ) {
		$.each(data,function(i,item){
			html += '<li>'+item.datetime+'登录&nbsp;&nbsp;&nbsp;'+item.city+'&nbsp;'+item.ip+'</li>'
		});
		$("#show_journal").html(html);
	}
}
//任务列表
function renwu (url) {
	var time = getNowFormatDate();
	var data = ajax_async_t(BackstageIP+url,{userId:dataBase.Login_map.SOLE,version:version},"json");
	if ( data != "" && data != null && data != undefined ){
		if(data.status == "success" ) {
			var html ="";
			var html1="";
			$.each(data.data,function(i,item){
				var num = i+1;
				html += '<tr><td>'+num+'</td><td>'+item.taskName+'</td><td>'+item.listYear+'</td>';
				if(item.publishTime == "" || item.publishTime == null || item.publishTime == undefined ) {
					
					html +='<td></td>'
				} else {
					html += '<td>'+item.publishTime+'</td>';
				}
				if(item.endTime == "" || item.endTime == null || item.endTime == undefined ) {
					
					html +='<td></td>'
				} else {
					html += '<td>'+item.endTime+'</td>';
				}
				html +='<td></td>';//审核意见
				if ( item.status == "1" ) {
					html += '<td>新创建</td>'
				} else if ( item.status == '2' ) {
					html += '<td>未提交</td>'
					
				} else if (item.status == '3' ) {
					html += '<td>已提交</td>'
				}else if (item.status == '4' ) {
					html += '<td>已通过</td>'
				} else if ( item.status == '5' ) {
					html += '<td>已驳回</td>'
				} else if ( item.status == "6" ) {
					html += '<td>已结束</td>'
				}
				if(item.status=="2" || item.status=="5" ) {
					var tian = DateDiff(item.endTime,time);
					html1 += '<li>距&nbsp;<b>'+item.taskName+'</b>&nbsp;截止还有&nbsp;<b style="color:red;">'+tian+'</b>&nbsp;天 &nbsp;&nbsp;&nbsp;</li>';
				}else {
					html += '</tr>';
				}
			});
			$("#show_renwu").html(html);
			$("#tian_num").html(html1);
		}
	}else{
		toastr["info"]("错误信息", "服务器繁忙");
	}
}
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
//天数
function DateDiff(sDate1, sDate2){
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("/")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //轉換為12-18-2002格式
    aDate = sDate2.split("/")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒數轉抽象為天數
    if(iDays >0) {
    	return iDays
    } else {
    	return "0"
    }
}
//获取所有用户信息
var checkedObj = {};
function show_user (){
	var data = ajax_async_t(BackstageIP+"taskProvince/findProvinceUserManager.do",{userId:parent.dataBase.Login_map.SOLE},"json");
	if ( data != "" && data != null && data != undefined ) {
		if(data.status == "success" ) {
			var html = '<input onclick="all_checkbox()" id="user_0" type="checkbox" value="全选"  name="" ><label for="user_0" style="width:21%;">全选</label> ';
			$.each(data.data,function(i,item){
				html += '<input id="user_checkbox'+i+'" onclick="onle_checked(\'user_checkbox'+i+'\')" type="checkbox" value="'+item.userId+'"  name="v1"> <label for="user_checkbox'+i+'" style="width:21%;">'+item.userName+'</label>';
				checkedObj['user_checkbox'+i] = false;
			})
			$("#user_select").html(html);
		}
	}
}
//全选与全不选
function all_checkbox(){
	var checkbox = document.getElementById('user_0');
	  if(checkbox.checked){
		  $(":checkbox").prop("checked",true);
			for(var ce in checkedObj){
				checkedObj[ce] = true;
			}
	  }else{
		  $(":checkbox").prop("checked",false);
			for(var ce in checkedObj){
				checkedObj[ce] = false;
			}
	  }
}
function onle_checked(id){
	var checkbox = document.getElementById('user_0');
	var onlecheckbox = document.getElementById(id);
	if(onlecheckbox.checked){
		checkedObj[id] = true;
	}else{
		checkedObj[id] = false;
	}
	var i = 0;
	for(var ce in checkedObj){
		if(!checkedObj[ce]){
			i++;
			$(checkbox).prop("checked",false);
		}
	}
	if(!i){
		$(checkbox).prop("checked",true);
	}
	i=0;
}
//发布公告
function save_task (){
	var chk_value =[]; 
	$('input[name="v1"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	});
	if(chk_value == "" || chk_value == null || chk_value == undefined){
		toastr["info"]("","没有选择用户或者没有下级用户信息。");
		return;
	}
	if( $("#add_title").val() =="" || $("#add_title").val() == null || $("#add_title").val()==undefined){
		toastr["info"]("","发布标题不能为空。");
		return;
	}
	if( $("#add_content").val() =="" || $("#add_content").val() == null || $("#add_content").val()==undefined){
		toastr["info"]("","发布内容不能为空。");
		return;
	}
	if ($("#add_title").val().length > 20 ) {
		toastr["info"]("","发布标题要小于20个字符。");
		return;
	}
	$.ajax({  		       
	    url:'saveStak.do',
	    type: "POST",
	    async:false,
	    dataType: 'json',
	    traditional : true,
	    data: {
	    	z_user_id:dataBase.Login_map.SOLE,f_user:chk_value,title:$("#add_title").val(),content:$("#add_content").val()
	    },
	    success: function (data) {
	    	if ( data == "0" ) {
	    		toastr["success"]("","发布成功");
	    		$("#release_gg").modal("toggle");
	    		select_task();
	    	}else {
	    		toastr["info"]("","发布失败");
	    	}
	    },
	    error: function (data) {
	    	toastr["info"]("错误信息","发布失败");
	    }  
	})
}
//查看公告
function select_task () {
	var data = ajax_async_t("selectTask.do",{type:level,user_id:dataBase.Login_map.SOLE},"json");
	if(data!="" && data !=null && data!=undefined ) {
		if(data != "0" ) {
			var html = '';
			var html1 = '';
			var userName=dataBase.Message_map.NAME;
			if ( level == "4" || level == "6" || level == "7" || level == "8") {
				userName = dataBase.Message_map.INFORMANT;
			}
			
			$.each(data,function(i,item){
				var ccc=item.content.split("\n").join("\\n");
				if(item.z_name==userName){//自己发布
					if(item.title.length > 10 ) {
						html+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+ccc+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+(item.title).substring(0,10)+'......</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
					} else {
						html+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+ccc+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+item.title+'</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
					}
				}else{//上级发布
					if(item.title.length > 10 ) {
						html1+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+ccc+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+(item.title).substring(0,10)+'......</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
					} else {
						html1+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+ccc+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+item.title+'</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
					}
				}
			});
			$("#task_select").html(html);
			$("#task_select1").html(html1);
		}
	}
}
//公告详情
function show_task (content,title,datetime,z_name,related_file){
	$("#task_fbr").val("");
	$("#task_title").val("");
	$("#task_time").val("");
	$("#task_content").val("");
	$("#task_message").modal();
	$("#task_fbr").val(z_name);
	$("#task_title").val(title);
	$("#task_time").val(datetime);
	$("#task_content").val(content);
	$("#data_2").html("");
	var lastIndexOf=related_file.lastIndexOf("/");
	var related_file_m=related_file.substring(lastIndexOf+1, related_file.length);
	if(related_file!=null&&related_file!=undefined&&related_file!=""){
		var h="<a href='"+BackstageIP+"file/download?fileId="+related_file+"' target=_blank><i class='glyphicon glyphicon-save'></i>&nbsp;"+related_file_m+"</a>";
		$("#fujian").show();
		$("#data_2").html(h);
	}else{
		$("#fujian").hide();
	}
}