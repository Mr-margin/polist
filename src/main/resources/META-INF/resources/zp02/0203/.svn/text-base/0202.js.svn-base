jQuery.support.cors = true;
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();

	metTable_initialization('metTable1',columns,BackstageIP+'taskDataFill/list');
	qy_table();//企业用户表格
	sj_table();//市级填报部门表格
})
var sort = "";//排序的字段
//(传进来的参数)表格名称，任务ID，版本号，文件ID
var version = "1.0";
//调用父页面的全局变量
var dataBase = parent.dataBase;
//删除任务记录
function del_data(dataid){
	swal({
		title: "您确定要删除这条任务吗",
		text: "删除后将无法恢复，请谨慎操作！",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	}, function () {
		var data = ajax_async_t(BackstageIP+"taskDataFill/del.do",{taskId:dataid,version:version,createUserId:dataBase.Login_map.SOLE},"json","1","POST");
		if(data !=undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				swal({
					title: "删除成功",
					text: "成功删除任务",
					type: "success"
				})
				refreshTable();//刷新表格
			}else{
				swal({
					title: "删除失败",
					text: data.error,
					type: data.status
				})
			}
		}else{
			swal({
				title: "删除失败",
				text: "请求失败",
				type: "error"
			})
		}
	});
}
//用户点击上一页、下一页
function qy_button(i){
	if(i==1){
		$("#sjtb_a").tab('show');
	}else if(i==2){
		$("#qytb_a").tab('show');
	}else if(i==3){
		$('#hbbm_a').tab('show');
	}else if(i==4){
		$("#sjtb_a").tab('show');
	}
}
//企业用户表格
function qy_table(){
	var sourcenum;//某一部门下，行业总的个数
	var countnum;//某一部门下，行业有值的个数
	var industrynum;
	var totle = 0;
	var datas = ajax_async_t(BackstageIP+"taskDataFill/findCompanyNumGroupByIndustry.do",{version:version,userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(datas != undefined&&datas!=null&&datas!=""){
		if(datas.status == "success"){
			qy_had = datas.data;
			//为复选框全选
			for(var i=0; i<qy_data.length; i++){
				sourcenum = qy_data[i].value.length;
				countnum = 0;
				industrynum=0;
				notIndustry = qy_had.count;
				for(var y=0; y<qy_data[i].value.length; y++){//循环bmhy.js其中一项的value

					if(datas.data[qy_data[i].value[y].id] > 0){//判断后台返来的这个个数是否是0
						countnum += parseInt(datas.data[qy_data[i].value[y].id]);
						industrynum++;
						//部门
						$("#qy_tbody input[name='qy_checkbox"+i+"'][value='"+qy_data[i].name+"']").prop("disabled",false);
//						//行业
						$("#qy_tbody input[name='qy_add_class"+i+"'][value='"+qy_data[i].value[y].id+"']").prop("disabled",false);
					}
				}
//				if(countnum == 0){//循环完这个部门后，如果这个部门内的行业没有一个有人
//					$("#qy_code"+i).html("");
//				}else if(industrynum == sourcenum){//循环完这个部门后，如果这个部门内的行业全部有人
//					$("#qy_code"+i).html("(全部选择,共"+countnum+"个企业)");
//				}else{//循环完这个部门后，如果这个部门内的行业部分有人
//					$("#qy_code"+i).html("(部分选择,共"+countnum+"个企业)");
//				}
				totle += countnum;
			}
			$("#totle_foot").html(totle);
			uptotlefoot();
		}else{
			toastr["info"]("错误信息", JSON.stringify(datas));
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//市级填报部门表格
function sj_table(){
	var sourcenum;//某一部门下，行业总的个数
	var countnum;//某一部门下，行业有值的个数
	//选中复选框
	for(var i=0; i<sj_data.length; i++){
		sourcenum = sj_data[i].value.length;
		countnum = 0
		for(var y=0; y<sj_data[i].value.length; y++){
			if(sj_had.length > 0){
				for(var x=0; x<sj_had.length; x++){
					if(sj_had[x].sourceId == sj_data[i].value[y].id){
						countnum += 1;
						//部门
						$("#sj_tbody input[name='sj_checkbox"+i+"'][value='"+sj_data[i].name+"']").prop("disabled",false);
//						//行业
						$("#sj_tbody input[name='sj_add_class"+i+"'][value='"+sj_data[i].value[y].id+"']").prop("disabled",false);
					}
				}
			}
		}
		if(countnum == 0){//循环完这个部门后，如果这个部门内的行业没有一个有人
			$("#sj_code"+i).html("");
		}else if(countnum == sourcenum){//循环完这个部门后，如果这个部门内的行业全部有人
			$("#sj_code"+i).html("(全部选择)");
		}else{//循环完这个部门后，如果这个部门内的行业部分有人
			$("#sj_code"+i).html("(部分选择)");
		}
	}
}
//点击行业，对部门进行操作
function djhy(chname,qy_sj,i){
	var data = $("input:checkbox[name='"+chname+"']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	//复选框中未选择
	if(data == ""){
		$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_checkbox"+i+"'][value='"+eval(qy_sj+"_data")[i].name+"']").removeAttr("checked");
		$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_checkbox"+i+"'][value='"+eval(qy_sj+"_data")[i].name+"']").parent(".icheckbox_square-green").removeAttr("checked");
		//复选框全选
	}else if(data.split(",").length == eval(qy_sj+"_data")[i].value.length){
		$("#"+qy_sj+"_checkbox"+i).prop("checked","true");
		$("#"+qy_sj+"_checkbox"+i).parent(".icheckbox_square-green").addClass("checked");
		//复选框未全选
	}else{
		$("#"+qy_sj+"_checkbox"+i).prop("checked","true");
		$("#"+qy_sj+"_checkbox"+i).parent(".icheckbox_square-green").addClass("checked");
	}
	updatacode(chname,qy_sj,i);//判断部门后面的红色字显示什么
}

//点击行业后，判断部门后面的红色字显示什么
function updatacode(chname,qy_sj,i){
	var data = $("input:checkbox[name='"+chname+"']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(qy_sj == "qy"){//当操作的是企业部分的时候
		var len = 0;
		if(data == ""){
			$("#"+qy_sj+"_code"+i).html("");
		}else{
			var qy_taskid = data.split(",");
			for(var x=0; x<qy_taskid.length; x++){
				len += parseInt(qy_had[qy_taskid[x]]);
			}
			//复选框全选
			if(data.split(",").length == eval(qy_sj+"_data")[i].value.length){
				$("#"+qy_sj+"_code"+i).html("(全部选择,共"+len.toString()+"个企业)");
				//复选框未全选
			}else{
				$("#"+qy_sj+"_code"+i).html("(部分选择,共"+len.toString()+"个企业)");
			}
		}
		uptotlefoot();//更新企业下面的总数
	}else{//当操作的是市级填报用户的时候
		//复选框中未选择
		if(data == ""){
			$("#"+qy_sj+"_code"+i).html("");
			//复选框全选
		}else if(data.split(",").length == eval(qy_sj+"_data")[i].value.length){
			$("#"+qy_sj+"_code"+i).html("(全部选择)");
			//复选框未全选
		}else{
			$("#"+qy_sj+"_code"+i).html("(部分选择)");
		}
	}
}
//更新企业下面的总数
function uptotlefoot(){
	var num = 0;
	for(var i=0; i<qy_data.length; i++){
		var html = $("#qy_code"+i).html()
		if(html!=""){
			html = html.split("共")[1].split("个")[0];
			num += parseInt(html);
		}
	}
	$("#totle_foot").html(num);
}
var sj_had = [];//市级用户中行业有人的数组。
//发布任务记录
var pup_id = "";
var qy_font=false;
function pup_data(dataid){
	$("#qy_tbody input").prop("checked",false);
	$("#qy_tbody input").parent("");
	for (i = 0 ; i < 10 ; i ++ ) {
		$("#qy_code"+i).html("");
	}
	$("#totle_foot").html("");
	
	pup_id = dataid;
	var data = ajax_async_t(BackstageIP+"taskDataFill/info.do",{version:version,masterTaskId:dataid,createUserId:dataBase.Login_map.SOLE},"JSON","POST");
	if ( data !="" && data!=null && data != undefined ) {
		if ( data.status == "success" ) {
			$("#rwmc").val(data.data.name);
			$("#qdnf").val(data.data.goalYear);
			$("#rwjzrq").val(data.data.endTime);
			$('input[name="qiyezhuangtai"][value='+data.data.enterpriceUserFilter.closeStatus+']').prop("checked","true");
			var qy_checked = data.data.enterpriceUserFilter.mapping;
			for ( var i = 0 ; i < qy_checked.length; i ++ ) {
				for ( var j = 0 ; j < 10 ; j ++ ) {
					$("#qy_tbody input[name='qy_add_class"+j+"'][value='"+qy_checked[i]+"']").prop("checked","true");
					$("#qy_tbody input[name='qy_add_class"+j+"'][value='"+qy_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
					djhy('qy_add_class'+j,'qy',j);
					qy_font = true;
				}
			}
			var shi_checked = data.data.cityUserFilter.mapping;
			for ( var i = 0 ; i < shi_checked.length; i ++ ) {
				for ( var j = 0 ; j < 10 ; j ++ ) {
					$("#sj_tbody input[name='sj_add_class"+j+"'][value='"+shi_checked[i]+"']").prop("checked","true");
					$("#sj_tbody input[name='sj_add_class"+j+"'][value='"+shi_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
				}
			}
			var hb_checked = data.data.hbUserFilter.mapping;
			for ( var i = 0 ; i < hb_checked.length; i ++ ) {
				for ( var j = 0 ; j < 11 ; j ++ ) {
					$("#tab-3 input[name='hb_add_class"+j+"'][value='"+hb_checked[i]+"']").prop("checked","true");
					$("#tab-3 input[name='hb_add_class"+j+"'][value='"+hb_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
				}
			}
			$("#save_task").modal();
			$("#save_task input").prop("disabled","true");
		} else {
			toastr["info"]("错误信息", data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//确认发布
function sj_button() {
	var data = ajax_async_t(BackstageIP+"taskDataFill/pub.do",{taskId:pup_id,version:version,createUserId:dataBase.Login_map.SOLE},"json","1","POST");
	if(data !=undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			toastr["success"]("发布成功");
			$("#save_task").modal("hide");
			refreshTable();//刷新表格
		}else {
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}

}
//刷新列表
function refreshTable(){
	//销毁现有表格数据
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization('metTable1',columns,BackstageIP+'taskDataFill/list');
	$('#metTable1').bootstrapTable('refreshOptions', {pageNumber: pageNum});
}
var pageNum = 1;
//数据初始化
function metTable_initialization(tablename,columns,url){
	$('#'+tablename).bootstrapTable({
		method: 'POST',
		url: url,
//		data: fdssdf,
		dataType: "json",
		columns: columns, //列
		iconSize: "outline",
		clickToSelect: true,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		pageSize: 10,	//页面大小
		pageNumber: pageNum,	//页数
		pageList: [10, 20, 50, 100],
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: false,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		onSort: function (name, order) {
			
			sort=name+" "+order;
		
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}});
}

//配置参数
function queryParams(params) {  
	console.log(params)
	var temp = {};
	temp.name=$("#taskName").val();
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.version = version;//版本号
	temp.createUserId = dataBase.Login_map.SOLE;
	temp.orderBy=sort;
	pageNum = params.offset == 0 ? 1 : (params.offset/params.limit)+1;
	return temp;
}
var columns = [
               {
            	   title: '序号',
            	   field: 'order',
            	   align: 'center',
            	   sortable:true,
            	   valign: 'middle'
               }, {
            	   title: '清单年份',
            	   field: 'goalYear',
            	   align: 'center',
            	   sortable:true,
            	   valign: 'middle'
               }, {
            	   title: '任务名称',
            	   sortable:true,
            	   field: 'name',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '创建时间',
            	   sortable:true,
            	   field: 'createTime',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '发布时间',
            	   sortable:true,
            	   field: 'publishTime',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '截止日期',
            	   sortable:true,
            	   field: 'endTime',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '状态',
            	   field: 'status',
            	   sortable:true,
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '操作',
            	   field: 'operation',
            	   align: 'center',
            	   valign: 'middle'
               }
               ];
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
			toastr["info"]("错误", "服务器异常："+url);
		}  
	});
	return rel;
}
/**
 * 查看详情
 */
function look_data(taskId){
	window.parent.$("#yincang_caidan").attr("href","zp02/0203/cha_0201.html?pkid="+taskId+"&task_type=1");
	window.parent.$("#yincang_caidan").html("查看任务");
	window.parent.$("#yincang_caidan").click();
}
/*编辑按钮*/
function  edit_data (pkid,name) {
//	var row = getSelectedRow("#metTable1");
	window.parent.$("#yincang_caidan").attr("href","zp02/0203/cha_0201.html?pkid="+pkid+"&task_type=0");
	window.parent.$("#yincang_caidan").html(name);
	window.parent.$("#yincang_caidan").click();
}
//获取选中行数据
function getSelectedRow() {
	var index = $("#metTable1").find('tr.success').data('index');
	return  $("#metTable1").bootstrapTable('getData')[index];
}