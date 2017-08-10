jQuery.support.cors = true;
var version = "1.0";
var update_taskId = "";
$(function() {
	task_select();
	$("#data_1 .input-group.date").datepicker({
		endDate:'+0y',
		minViewMode : 2,
		startView : 1,
		keyboardNavigation : !1,
		forceParse : !1,
		autoclose : !0,
		format: "yyyy",
	})
	$("#data_2 .input-group.date").datepicker({
		startDate: '+2d',
		minViewMode: 0,
		todayBtn: "linked",
		keyboardNavigation: !1,
		forceParse: !1,
		autoclose: !0,
		format: "yyyy-mm-dd",
	});
	
	 /*$("#update_task1").draggable();//为模态对话框添加拖拽
     $("#update_task").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
*/
});
// 数据初始化
function task_select() {
	$('#renwu_select').bootstrapTable({
		method : 'POST',
		url : BackstageIP+'taskProvince/selectCityUserTask',
		dataType : "json",
		columns : [ {
			field : 'number',
			title : '序号',
			align : 'center'
		},  
		{
			field : 'taskName',
			title : '任务名称',
			align : 'center'
		}, {
			field : 'listYear',
			title : '清单年份',
			align : 'center'
		}, {
			field : 'createTime',
			title : '创建时间',
			align : 'center'
		}, {
			field : 'publishTime',
			title : '发布时间',
			align : 'center'
		}, {
			field : 'endTime',
			title : '截止日期',
			align : 'center'
		}, {
			field : 'status',
			title : '状态',
			align : 'center',
			formatter:function(value,row,index){
				if ( row.status == "1" ) {
					return "未发布";
				} else if(row.status=="6"){
					return "已结束";
				}else {
					return "已发布";
				}
			}
		}, {
			field : 'taskId',
			title : 'taskId',
			align : 'center'
		},{
			field : 'operation',
			title : '操作',
			formatter : function(value, row, index) {
				if(row.status == "1" ) {
					var s = '<a class = "remove"><i class="fa fa-trash"></i>删除</a>';
					var d = '<a class = "save"><i class="fa fa-volume-up"></i>发布</a>&nbsp;&nbsp;';
					var u = '<a class = "update"><i class="fa fa-pencil"></i>编辑</a>';
					return u + '&nbsp;&nbsp; ' + s + '&nbsp;&nbsp; ' + d;
				} else if (row.status == "6" ) {
					var u = '<a class = "look"><i class="fa fa-binoculars"></i>查看</a>';
					return u;
				} else {
				/*	var s = '<a class = "remove"><i class="fa fa-trash"></i>&nbsp;&nbsp;删除</a>';*/
					var u = '<a class = "update"><i class="fa fa-pencil"></i>编辑</a>';
					return u ;
				}
			},
			events : 'operateEvents',
			align : 'center'
		} ], // 列
		iconSize : "outline",
		clickToSelect : true,// 点击选中行
		pagination : true, // 在表格底部显示分页工具栏
		pageSize : 10, // 页面大小
		pageNumber : 1, // 页数
		pageList : [ 10, 20, 50, 100 ],
		striped : true, // 使表格带有条纹
		sidePagination : "server",// 表格分页的位置 client||server
		queryParams : function(params) {
			return {
				pageSize : params.limit,
				pageNumber : params.offset,
				userId : parent.dataBase.Login_map.SOLE,
				version:version,
			}
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		silent : true, // 刷新事件必须设置
		contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型。
		onClickRow : function(row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons : {
			refresh : "glyphicon-repeat",
			toggle : "glyphicon-list-alt",
			columns : "glyphicon-list"
		}
	});
	 $('#renwu_select').bootstrapTable('hideColumn', 'taskId');
}
// 操作列发布与删除
window.operateEvents = {
		
	'click .save' : function(e, value, row, index) {
		var data = ajax_async_t(BackstageIP+"taskProvince/publishTaskProvince", {userId:parent.dataBase.Login_map.SOLE,taskId:row.taskId,version:version}, "json");
		
		if (data != "" && data != null || data != undefined) {
			if (data.status == "success") {
				$('#renwu_select').bootstrapTable('destroy');
				task_select();
				toastr["success"]("提示", "发布成功");
			} else {
				toastr["info"]("错误信息", "发布失败");
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	},
	'click .remove' : function(e, value, row, index) {
		
		swal({
			title: "删除",
			text: "确定要删除这条信息吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			closeOnConfirm: false
		},
		function() {
			var data = ajax_async_t(BackstageIP+"taskProvince/deleteTaskProvince.do", {userId:parent.dataBase.Login_map.SOLE,taskId:row.taskId,version:version}, "json");
			if (data != "" && data != null || data != undefined) {
				if (data.status == "success") {
					$('#renwu_select').bootstrapTable('destroy');
					task_select();
					swal("删除成功！", "您已经删除这条信息。", "success");
				} else {
					swal("删除失败！", "未成功删除这条信息。", "warning");
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
			
			
		});

		
	
	},
	'click .update' : function (e,value,row,index) {
		var data = ajax_async_t(BackstageIP+"taskProvince/findProvinceUserManager.do",{userId:parent.dataBase.Login_map.SOLE},"json");
		if ( data != "" && data != null && data != undefined ) {
			if ( data.status == "success" ) {
				$("#click_h2").html("编辑信息");
				$("#task_update").show();
				$("#update_task").modal();
				//获取所有用户
				var html = '<div class="row">';
				$.each(data.data,function(i,item){
					html += '<div class="col-sm-3" style="height:40px;"><input onclick="" id="user_checkbox'+i+'" type="checkbox" value="'+item.userId+'"  name="v1"> <label for="user_checkbox'+i+'">'+item.userName+'</label></div>';
				})
				html += '</html>';
				$("#user_select").html(html);
				//允许编辑获取他的值
				var datas = ajax_async_t(BackstageIP+"taskProvince/updateTaskProvince.do",{taskId:row.taskId},"json");
				if ( datas != "" && datas != null && datas != undefined ) {
					if (datas.status == "success" ) {
						update_taskId = row.taskId;
						$("#renwu_name").val(datas.data.taskName);
						$("#qdnf").val(datas.data.listYear);
						$("#rwjzrq").val(datas.data.endTime.substring(0,10));
						var str = datas.data.cityUserId.split(",");
						
						for ( var i = 0 ; i < str.length; i ++ ) {
							var m = document.getElementsByName('v1');
					        var l = m.length;  
					        var tvalue = str[i];
					        for ( var j=0; j< l; j++){
					        	if(tvalue.indexOf(m[j].value) != -1 ){
					        		 m[j].checked = true;  
					        		 m[j].disabled=true;
					        	}
					        }
						}
					}
				}
				
			}else {
				
				toastr["info"]("错误信息", data.error);
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
		
	},
	'click .look' : function(e,value,row,index){
		var data = ajax_async_t(BackstageIP+"taskProvince/findProvinceUserManager.do",{userId:parent.dataBase.Login_map.SOLE},"json");
		if ( data != "" && data != null && data != undefined ) {
			if ( data.status == "success" ) {
				$("#click_h2").html("查看信息");
				$("#task_update").hide();
				$("#update_task").modal();
				//获取所有用户
				var html = '<div class="row">';
				$.each(data.data,function(i,item){
					html += '<div class="col-sm-3" style="height:40px;"><input onclick="" id="user_checkbox'+i+'" type="checkbox" value="'+item.userId+'"  name="v1" disabled = true> <label for="user_checkbox'+i+'">'+item.userName+'</label></div>';
				})
				html += '</html>';
				$("#user_select").html(html);
				//允许编辑获取他的值
				var datas = ajax_async_t(BackstageIP+"taskProvince/updateTaskProvince.do",{taskId:row.taskId},"json");
				if ( datas != "" && datas != null && datas != undefined ) {
					if (datas.status == "success" ) {
						update_taskId = row.taskId;
						$("#renwu_name").val(datas.data.taskName);
						$("#qdnf").val(datas.data.listYear);
						$("#rwjzrq").val(datas.data.endTime.substring(0,10));
						var str = datas.data.cityUserId.split(",");
						for ( var i = 0 ; i < str.length; i ++ ) {
							var m = document.getElementsByName('v1');
//							m[i].disabled=true;
					        var l = m.length;  
					        var tvalue = str[i];
					        for ( var j=0; j< l; j++){
					        	if(tvalue.indexOf(m[j].value) != -1 ){
					        		 m[j].checked = true;  
					        	}
					        }
						}
						$("#renwu_name").attr("disabled",true);
				        $("#qdnf").attr("disabled",true);
				        $("#rwjzrq").attr("disabled",true);
					}
				}
			}else {
				toastr["info"]("错误信息", data.error);
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
		
	}
};

//修改任务
function task_update() {
	var noe_time = getNowFormatDate();//当前时间
	var end_time = $("#rwjzrq").val();
	var cha_time = DateDiff(noe_time,end_time);
	if (cha_time < 7 ) {
		toastr["info"]("提示","任务截止时间不能小于当前时间的7天");
		return;
	}
	var a=document.getElementsByName("v1");
	var chk_value =[]; 
	$('input[name="v1"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	$.ajax({  		       
	    url: BackstageIP+'taskProvince/updateSaveTaskProvince.do',
	    type: "POST",
	    async:false,
	    dataType: 'json',
	    traditional : true,
	    data: {taskName:$("#renwu_name").val(),listYear:$("#qdnf").val(),endTime:$("#rwjzrq").val(),version:version,userIds:chk_value,ProvinceUserId:parent.dataBase.Login_map.SOLE,taskId:update_taskId},
	    success: function (data) {
	    	console.log(data);
	    	if(data.status=="success"){
	    		toastr["success"]("提示","修改成功");
	    		$("#renwu_name").val("");
	    		$("#qdnf").val();
	    		$("#rwjzrq").val("");
	    		$(":checkbox").prop("checked",false);
	    		$("#update_task").modal("hide");
	    		
				task_select();
				$('#renwu_select').bootstrapTable('refresh');
	    	} else if ( data.status == "fail" ) {
	    		toastr["info"]("错误信息",data.code);
	    	}
	    },
	    error: function (data) {
	    	toastr["info"](data.error);
	    	//console.log(data);
	    }  
	})
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
    return iDays
}
