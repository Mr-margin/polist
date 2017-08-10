var version = "1.0";
$(function () {
	$("#banner_qian").css("background","url(../img/logo/"+css_photo+".png) no-repeat left center");
	$("#update_password").click(function(){
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		$( "#dialog-update").dialog("open");
	});
	window.setTimeout(function(){
		$('.ui-dialog-titlebar-close').each(function(i,e){
			$(e).hide();
		})
	},20);
	//修改密码
	$( "#dialog-update").dialog({
		autoOpen: false,
		width: 500,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "400",
		buttons: [{
			class:'btn btn-outline btn-lB',
			text: "确定",
			click: function() {
				
				var str = $("#new_pass").val();
				var str1 = $("#new_pass_2").val();
				var old_pass = $("#old_pass").val();
				if(old_pass == "" || old_pass == null || old_pass == undefined ) {
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>原密码不能为空！</b></span>");
				}else if(str == "" || str == null || str == undefined ) {
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>新密码不能为空！</b></span>");
				} else if(str1 == "" || str1 == null || str1 == undefined ) {
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>确认密码不能为空！</b></span>");
				} else if( str != str1){
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>新密码两次不相同！</b></span>");
				} else if( str == old_pass){
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>新旧密码不可相同！</b></span>");
				}else{
					xiugaimima_anniu(old_pass,str);
				}
			}
		},{
			class:'btn btn-outline btn-lO',
			text: "取消",
			click: function() {
				$( this ).dialog( "close" );
			}
		}]
	});
	$( "#dialog-yuanyin").dialog({//补充说明
		autoOpen: false,
		width: 500,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "400",
		buttons: [{
			class:'btn btn-outline btn-lB',
			text: "确定",
			click: function() {
				if($("#yunyin").val().length>100){
					$("#dialog-tiaozhuan").dialog("open");
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>理由文字超过100字！</b></span>");
				} else {
					bcsming();
				}
			}
		},{
			class:'btn btn-outline btn-lO',
			text: "取消",
			click: function() {
				$( this ).dialog( "close" );
			}
		}]
	});
	$( "#dialog-photo").dialog({//照片
		autoOpen: false,
		width: 1000,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "800",
		closeOnEscape:true,
		buttons: [{
			class:'btn btn-outline btn-lO',
			text: "关闭",
			click: function() {
				$( this ).dialog( "close" );
			}
		}]
	});
	$( "#dialog-tiaozhuan").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			class:'btn btn-outline btn-lB',
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-task").dialog({
		autoOpen: false,
		width: 600,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			class:'btn btn-outline btn-lB',
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	
	$("#out_login").click(function(){
		var data = ajax_async_t("../login_out.do",{},"json");
		if(data=="1"){
			window.location.href="../index.html"
		} else {
			
		}
	});
	task_select();//公告信息
	login_journal();//登录日志
	renwu();
	
	show_copyright();//版权
});
//补充说明按钮s
var buchong_id ="";
function wei_yuanyin (id) {
	buchong_id=id;
	$( "#dialog-yuanyin").dialog("open");
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/selectReason",{taskId:id},"json")
	if( data != null && data != "" && data != undefined ) {
		if(data.status == "success" ) {
			$("#yunyin").val(data.data);
		} else {
			$("#yunyin").val("");
		}
	} else {
		$("#yunyin").val("");
	}
}
//现场照片
var photo_taskId="";
function wei_photo (id) {
	photo_taskId = id;
	$("#dialog-photo").html("");
	
	$("#dialog-photo").dialog("open");
	$("#dialog-photo").html(photo_html);
	Img_load('1',id,'bangfucuoshi');
	photo_select(id);
}
//提交补充说明
function bcsming(){
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/addReason",{taskId:buchong_id,reason:$("#yunyin").val()},"json")
	if( data != "" && data != null && data != undefined ) {
		if(data.status == "success" ) {
			$("#dialog-yuanyin").dialog("close")
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
		} else {
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存失败！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
		}
	} else {
		$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>"+data+"！</b></span>");
		$("#dialog-tiaozhuan").dialog("open");
	}
}
//修改密码
function xiugaimima_anniu(old_pass,str){
	var data = ajax_async_t("../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		$( "#dialog-update").dialog("close")
		$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>修改成功！</b></span>");
		$("#dialog-tiaozhuan").dialog("open");
	} else if ( data == "2" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>修改失败！</b></span>");
	} else if ( data == "3" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>原密码错误！</b></span>");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
}
//登录日志
function login_journal(){
	var data = ajax_async_t("../login_jouranl.do",{user_id:userId},"json");
	var html = "" ;
	if ( data != "" && data != null && data != undefined ) {
		$.each(data,function(i,item){
			html += '<li>'+item.datetime+','+item.city+'（'+item.ip+'）登录</li>'
			
		});
		$("#show_journal").html(html);
	}
}
//任务列表
function renwu () {
	var time = getNowFormatDate();
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/user/listAllTask.do",{userId:userId,version:version},"json");
	console.log(data)
	var k = 0;
	if ( data != "" && data != null && data != undefined ){
		if(data.status == "success" ) {
			var html ="";
			var html1="";
			$.each(data.data,function(i,item){
				var num = i+1;
				html += '<tr><td>'+num+'</td><td>'+item.completeName+'</td><td>'+item.status+'</td><td>'+item.publishTime+'</td><td>'+item.endTime+'</td>';
				if(item.status=="未提交" || item.status=="已驳回" ) {
					var tian = DateDiff(item.endTime,time);
					
//					html += '<td><a onclick="edit_task('+item.id+',\'update\','+item.goalYear+')">编辑</a>&nbsp;&nbsp;&nbsp;<a onclick="tijiao('+item.id+')">提交</a></td></tr>';
					
					if (tian  == "NaN" || tian == "" || tian == NaN) {
						html += '<td><a onclick="edit_task('+item.id+',\'update\','+item.goalYear+','+item.dataLevel+')">编辑</a>&nbsp;&nbsp;&nbsp;<a onclick="tijiao('+item.id+','+item.commit+')">提交</a></td></tr>';
						html1 += '<li>距&nbsp;<b>'+item.completeName+'</b>&nbsp;截止还有&nbsp;<b style="color:red;">0</b>&nbsp;天 &nbsp;&nbsp;&nbsp;</li>';
					} else {
						html += '<td><a onclick="edit_task('+item.id+',\'update\','+item.goalYear+','+item.dataLevel+')">编辑</a>&nbsp;&nbsp;&nbsp;<a onclick="tijiao('+item.id+','+item.commit+')">提交</a>'+
						'&nbsp;&nbsp;&nbsp;<a onclick="wei_yuanyin('+item.id+')">补充说明</a>&nbsp;&nbsp;&nbsp;<a onclick="wei_photo('+item.id+')">现场照片</a></td></tr>';
						html1 += '<li>距&nbsp;<b>'+item.completeName+'</b>&nbsp;截止还有&nbsp;<b style="color:red;">'+tian+'</b>&nbsp;天 &nbsp;&nbsp;&nbsp;</li>';
					}
					
				}else {
					html += '<td><a onclick="look_task('+item.id+',\'look\','+item.goalYear+','+item.dataLevel+')">查看</a></td></tr>';
				}
				k += 34;
			});
			$("#show_renwu").html(html);
			$("#tian_num").html(html1);
		}
	}
	var zhanwei_height = document.body.clientHeight-(86+56+56+182+56+56+130+188+k)
	if(zhanwei_height>0){
		$("#zhanwei").css("height",zhanwei_height+"px");
		$("#zhanwei").show();
	}
}
//删除照片
function pic_del(id){
	var data = ajax_async_t(BackstageIP+"picture/deletePicture",{id:id},"json");
	if ( data != "" && data != null && data != null ) {
		if(data.status == "success" ) {
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>删除成功！</b></span>");
			photo_select(photo_taskId);
		} else {
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>删除失败！</b></span>");
		}
	} else {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>删除失败！</b></span>");
	}
}
//查看图片
function photo_select (taskId) {
//	$("#dialog-photo_select").dialog("open");
	var data = ajax_async_t(BackstageIP+"picture/selectPicture",{taskId:taskId},"json");
	if (data!= "" && data != undefined && data != null ) {
		if ( data.status == "success" ) {
	    	//现有图片
	    	var tupian_html = "";
	    	$.each(data.data,function(i,item){
	    		tupian_html += "<li id=\"pin_li_"+item.id+"\"><p class=\"imgWrap\"><a href=\"../gg/"+item.realUrl+"\" title=\"现场照片\" data-gallery=\"\"  target='_blank'>" +
	    				"<img src=\"../gg/"+item.realUrl+"\" style=\"margin:0;vertical-align:baseline;width:130px;height:85px;\"></a></p>" +
	    				"<div id=\"pin_del_"+item.id+"\" class=\"file-panel\" style=\"height: 0px;\"><span class=\"cancel\" onclick='pic_del("+item.id+");'>删除</span></div></li>";
	    	});
	    	
	    	$('#poht_list').html(tupian_html);//要先循环一遍加上html后 再循环一遍，添加事件
	    	$.each(data.data,function(i,item){
	    		$("#pin_li_"+item.id).mouseenter(function(){  
	    			$("#pin_del_"+item.id).stop().animate({
		            	height: 30
		            });
	    		}); 
	    		$("#pin_li_"+item.id).mouseleave(function(){
	    			$("#pin_del_"+item.id).stop().animate({
			                height: 0
			        });
			    });
	    	});
		} else {
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>图片加载错误！</b></span>");
		}
	} else {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>图片加载错误！</b></span>");
	}
}
//开始编辑任务
function edit_task(task_id,update,year,level){
	window.sessionStorage.setItem("taskId",task_id);
	window.sessionStorage.setItem("type",update);
	window.sessionStorage.setItem("year",year);
	if ( level == "1" ) return window.location.href="0101/b.html";
	else if (level == "2" ) return window.location.href="0102/b.html";
	else if ( level == "3" ) return window.location.href="0103/b.html";
	
}
//查看任务
function look_task(task_id,look,year,level){
	window.sessionStorage.setItem("taskId",task_id);
	window.sessionStorage.setItem("type",look);
	if( level == "1" ) window.location.href="0101/b.html";
	else if ( level == "2" ) window.location.href="0102/b.html";
	else if ( level == "3" ) window.location.href="0103/b.html";
	
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
//天数----火狐、ie不支持
function DateDiff1(sDate1, sDate2){
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("/")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //轉換為12-18-2002格式
    aDate = sDate2.split("/")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒數轉抽象為天數
    return iDays
}
//天数 ---火狐、ie支持
function  DateDiff (sDate1,sDate2){
	//结束时间  
	var end_str = sDate1.replace(/-/g,"/");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。  
	var end_date = new Date(end_str);//将字符串转化为时间  
	//开始时间  
	var sta_str = sDate2.replace(/-/g,"/");  
	var sta_date = new Date(sta_str);  
	var num = (end_date-sta_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
	var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）  
	return days;
}
/**
 * 提交
 */
function tijiao(taskId,str){
	if( str){
		var data = ajax_async_t(BackstageIP+"taskDataFillChild/updateCompanyTaskStatus.do",{userId:userId,version:version,id:taskId,dataType:dataBase.Message_map.DATA_LEVEL},"json");
		if ( data != "" && data != null && data != undefined ){
			if (data.status == "success") {
				renwu();
				$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>提交成功！</b></span>");
				$("#dialog-tiaozhuan").dialog("open");
			} else if ( data.status == "fail") {
				$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>"+data.error+"</b></span>");
				$("#dialog-tiaozhuan").dialog("open");
			}
		}
	} else {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>未进行编辑不能提交！</b></span>");
	}

}
//查看公布信息
function task_select () {
	var data = ajax_async_t("../selectTask.do",{type:parent.dataBase.Login_map.TYPE,user_id:dataBase.Login_map.SOLE},"json");
	
	if(data!="" && data !=null && data!=undefined ) {
		if(data != "0" ) {
			var html = '';
			$.each(data,function(i,item){
				if(item.title.length>10){
					html+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+item.content+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+(item.title).substring(0,10)+'......</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
				}else {
					html+='<li style="margin:0px 0px 5px 0px;"><a onclick="show_task(\''+item.content+'\',\''+item.title+'\',\''+item.datetime+'\',\''+item.z_name+'\',\''+item.related_file+'\')">'+item.title+'</a><span style="float: right; padding-right:15px;">'+item.datetime+'</span></li>';
				}

			});
			$("#task_select").html(html);
		}
	}
} 
//公告详情
function show_task (content,title,datetime,z_name,related_file){
	if(related_file!=null&&related_file!=undefined&&related_file!=""){
		$("#fujian").show();
		var lastIndexOf=related_file.lastIndexOf("/");
		var related_file_m=related_file.substring(lastIndexOf+1, related_file.length);
		var h="<a href='"+BackstageIP+"file/download?fileId="+related_file+"' target=_blank><i class='glyphicon glyphicon-save'></i>&nbsp;"+related_file_m+"</a>";
		$("#data_2").html(h);
	}else{
		$("#fujian").hide();
	}
	
	$("#dialog-task").dialog("open");
	
	$("#task_fbr").val(z_name);
	$("#task_title").val(title);
	$("#task_time").val(datetime);
	$("#task_content").val(content);
}

var photo_html = '<div id="cuoshi_img_load"><div class="page-container"><p>您可以尝试文件拖拽，使用QQ截屏工具，然后激活窗口后粘贴，或者点击添加图片按钮。支持：gif,jpg,jpeg,png,bmp。</p><div id="uploader" class="wu-example">'+
				'<div class="queueList"><div id="dndArea" class="placeholder"><div id="filePicker"></div><p>或将照片拖到这里，单次最多可选15张，单张照片限5M，总共限45M</p></div>'+
				'</div><div class="statusBar" style="display:none;"><div class="progress"><span class="text">0%</span><span class="percentage"></span></div>'+
				'<div class="info"></div><div class="btns"><div id="filePicker2"></div><div class="uploadBtn">开始上传</div></div></div></div></div></div>'+
				'<div class=""><div class=""  id="yidi_pic_show"><div class="" id="qilegeguaile"><div class="lightBoxGallery"><div class="queueList filled">'+
				'<ul class="filelist" id="poht_list"></ul></div><div id="blueimp-gallery" class="blueimp-gallery"><div class="slides"></div>'+
				'<a class="prev">‹</a><a class="next">›</a><a class="close">×</a><a class="play-pause"></a><ol class="indicator"></ol> </div></div></div></div></div>';
