jQuery.support.cors = true;
$(function(){
	val_title_0();
	$("#gray-bg_1").hide();
});

var masterTaskId;//主任务ID
var status = "ALL";//文件状态，进入页面或者点击别的任务的时候，默认为ALL
var version = "1.0";//版本号
var dataBase = parent.dataBase;//调用父页面的全局变量

//new_element=document.createElement("script");
//
//new_element.setAttribute("type","text/javascript");
//new_element.setAttribute("src","a.js");// 在这里引入了a.js
//document.body.appendChild(new_element);

/*//新增开始
function user_div_0(val){
	var user_div=$("#user_div_1").val();
	if(val==0){
		$("#gray-bg_1").hide();
		$("#gray-bg_0").show();
		$("#user_div_0").val(0);
		val_title_0();
		
	}else if(val==1){
		$("#gray-bg_0").hide();
		$("#gray-bg_1").show();
		$("#user_div_1").val(1);
		val_title_0();
	}
}//新增结束
*/
//为选择任务下拉框赋值
function val_title_0(){
	var data = ajax_async_t(BackstageIP+"taskDataFill/listSimpleTask.do",{version:version,createUserId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			var html = "";
			if(data.data.length > 0){
				for(var i=0; i<data.data.length; i++){
					html += "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
				}
				$("#tasklist_div").html(html);
				masterTaskId = data.data[0].id

				refresh();//刷新文字介绍部分
				metTable_initialization();//刷新表格
			}

		}else{
			toastr["info"]("错误信息", data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//切换任务刷新表格和文字
function changetask(masterId){
	masterTaskId = masterId;
	status = "ALL";
	refresh();
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}

//更换条件
function change_count(state){
	status = state;
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}

//刷新文字介绍部分
function refresh(){
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/progressCheck/groupBy.do",{version:version,createUserId:dataBase.Login_map.SOLE,masterTaskId:masterTaskId},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			var html_2;
			if(data.data != null){
				html_2 = "共有企业<a class='title_a' onclick=\"change_count('ALL')\">"+data.data.ALL+"</a>个，" +
				"未提交<a class='title_a' onclick=\"change_count('WAIT_COMMIT')\">"+data.data.WAIT_COMMIT+"</a>个，" +
				"待审核<a class='title_a' onclick=\"change_count('WAIT_REVIEW')\">"+data.data.WAIT_REVIEW+"</a>个，" +
				"已通过<a class='title_a' onclick=\"change_count('PASSED')\">"+data.data.PASSED+"</a>个，"+
				"已驳回<a class='title_a' onclick=\"change_count('REJECT')\">"+data.data.REJECT+"</a>个。";
			}else{
				html = "此任务暂未分配企业";
			}
			$("#doc_2").html(html_2);
		}else{
			toastr["info"]("错误信息", "taskDataFill/process/statCityUser无数据");
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//数据初始化
function metTable_initialization(){
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url: BackstageIP+"taskDataFillChild/progressCheck/companyList.do",
		dataType: "json",
		columns: columns, //列
		iconSize: "outline",
		clickToSelect: true,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		pageSize: 10,	//页面大小
		pageNumber: 1,	//页数
		pageList: [10],
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}});
}

//配置参数
function queryParams(params) {  
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.createUserId = dataBase.Login_map.SOLE;//创建用户id
	temp.version = version;//版本号
	temp.masterTaskId = masterTaskId;//主任务id
	temp.status = status;//状态
	return temp;
}
//ajax通用方法
function ajax_async_t(url,data,dataType,async,type){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
		url: url,
		type: type,
		async:async,
		dataType: dataType,
		data: data,
		success: function (ret) {
			rel = ret;
		},
		error: function (e) { 
			toastr["info"]("错误信息", "服务器异常："+url);
		}  
	});
	return rel;
}

//列
var columns = [
               {
            	   title: '序号',
            	   field: 'number',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '企业名称',
            	   field: 'companyName',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '所在地区',
            	   field: 'region',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '行业类别',
            	   field: 'industry',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '填报人',
            	   field: 'leader',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '联系电话',
            	   field: 'phone',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '邮箱',
            	   field: 'email',
            	   align: 'center',
            	   valign: 'middle'
               }
               ];