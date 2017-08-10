jQuery.support.cors = true;
var version = "1.0";
var update_taskId = "";
$(function() {
	select_task();
	groupByStatus();
	schedule_select('ALL');
});

var sc_taskId="";

//任务下拉框
function select_task () {
	var data = ajax_async_t(BackstageIP+"taskProvince/selectTaskName.do", {provinceUserId:parent.dataBase.Login_map.SOLE,version:version,flag:false}, "json");
	console.log(data);
	if(data != "" && data != null && data != undefined ) {
		if ( data.status == "success" ) {
			var html = '';
			$.each(data.data,function(i,item){
				if ( i == 0 ) {
					sc_taskId = item.taskId;
				}
				html += '<option value="'+item.taskId+'">'+item.taskName+'</option>'
			});
			$("#renwu_select").html(html);
		}else{
			toastr["info"](data.code);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//城市，未提交、待审核、已通过、已驳回
function groupByStatus () {
	var data = ajax_async_t(BackstageIP+"taskProvince/groupByStatus.do", {taskId:sc_taskId,version:version}, "json");
	console.log(data);
	if ( data != "" && data != null && data != undefined ) {
		if( data.status == "success" ) {
			$("#all").text(data.data.ALL);
			$("#wait_commitwait").text(data.data.WAIT_COMMIT);//未提交
			$("#wait_reviewwait").text(data.data.WAIT_REVIEW);//待审核
			$("#passed").text(data.data.PASSED);//已通过
			$("#reject").text(data.data.REJECT);//已驳回
		}else{
			toastr["info"]("错误信息", data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
// 数据初始化
function schedule_select(str) {
	if ( sc_taskId == "" || sc_taskId == null || sc_taskId == undefined ) return toastr["info"]("暂无任务");
	$('#schedule_select').bootstrapTable({
		method : 'POST',
		url : BackstageIP+'taskProvince/findCityUserMessage.do',
		dataType : "json",
		columns : [ {
			field : 'number',
			title : '序号',
			align : 'center'
		}, {
			field : 'city',
			title : '城市',
			align : 'center'
		}, {
			field : 'leader',
			title : '联系人',
			align : 'center'
		}, {
			field : 'phone',
			title : '联系电话',
			align : 'center'
		}, {
			field : 'email',
			title : '邮箱',
			align : 'center'
		}], // 列
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
				taskId:sc_taskId,
				status:str,
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
//	alert(1)
}
//选择任务名称
function chonse_renwu() {
	sc_taskId=$("#renwu_select").val();
	groupByStatus();
	$('#schedule_select').bootstrapTable('destroy');
	schedule_select('ALL');
}
//全部 未通过。。数字点击
function schedule_show(str){
	$('#schedule_select').bootstrapTable('destroy');
	schedule_select(str);
}