jQuery.support.cors = true;
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	taskId=Request['taskId'];//任务ID
	version=Request['version'];//版本号
	fileId=Request['fileId'];//文件ID
	bigIndex=Request['bigIndex'];//表格名称
	commit = Request['commit'];//是否提交（1：提交，0：未提交）
	type = Request['type'];//是点源面源还是排放量
	shi_dian = Request['shi_dian'];//调用不同的接口
	edit = Request['edit'];
	level=dataBase.Login_map.TYPE
	dataLavel = Request['dataLevel'];//查看的是简单版还是通用版还是专用版
//	index = Request['index'].replace("\"", "");
	shuaxin_table();//初始化表格
	
});
var dataLevel;//1、简化版 2、通用版 3、专用版
var sort = {};//排序的字段
var level;//登录用的级别
var bigIndex,taskId,version,fileId,type,shi_dian;//(传进来的参数)表格名称，任务ID，版本号，文件ID，点面量
var sheet_public,row_sheetname;//表格内的sheet,点击的哪个sheet，点击的那个table
var sfscsh = 0;//是否是初始化的表格
var reValue = new Array();//存储编辑后的结果数据，每个sheet页是一个元素，每个元素是json对象
var tablepageSize = 10;
var edit='false';
//调用父页面的全局变量
var dataBase = parent.dataBase;
//var level=dataBase.Login_map.TYPE;
//开关
var flag=true;
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
var mus = new Array();
//初始化表格
var glo_data;
function shuaxin_table(){
	var html_title = "" , html_body = ""; /*标签头，标签体*/
	var ste = "";
	if ( dataLavel == "3" ) ste = bigIndex;
//	var data = ajax_async_t("../../getUpdateTemplate.do",{Subsector:bigIndex,type:type,userType:level},"JSON","1");//获取表头数据
	var data = ajax_async_t("../../getUpdateTemplate.do",{Subsector:ste,type:type,userType:level,level:dataLavel},"JSON","1");//获取表头数据
	console.log(JSON.stringify(data));
	glo_data=data;
	if(data!=undefined&&data!=null&&data!=""){
			var html_button =" ";
			if(commit != "PASSED"&&commit != "WAIT_REVIEW"){
				html_button += "<div class=\"col-sm-12\" style='margin-bottom:10px;'>";
				html_button += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"bianji_sb\" style='margin-right:20px;display:none' onclick=\"bianji('true');\"><i class='fa fa-edit'></i> 编辑</button>";
				html_button += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"tianjia\" style='margin-right:20px;display:none;' onclick=\"xinjian()\"><i class='fa fa-external-link-square'></i> 添加</button>";
				html_button += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"del_sb\" style='margin-right:20px;display:none;' onclick=\"shanchu_xx();\"><i class='fa fa-trash'></i> 删除</button>";
				html_button += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"baocun\" style='margin-right:20px;display:none;' onclick=\"saveDB();\"><i class='fa fa-save'></i> 保存</button>";
				html_button += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"concel\" style='display:none;' onclick=\"concel_xx();\" hidden><i class='fa fa-trash'></i> 撤销</button>";
				html_button += "</div>";
				$("#buttons").html(html_button);
			}
			for(var i=1; i<data.head.length+1; i++){
				sort[data.head[i-1]] = {};
				var sheetValue = {};//每个sheet页一个对象，存储本页内需要编辑的内容，每次保存清空
				sheetValue.index = i;//sheet页的编号
				sheetValue.sheetName = data.head[i-1];//sheet页的中文名称
				sheetValue.value = {};
				sheetValue.standard = {};
				var t=[];
				for(var yic=0; yic<data[data.head[i-1]].length; yic++){
					for(var erc=0; erc<data[data.head[i-1]][yic].length; erc++){
						var vv = data[data.head[i-1]][yic][erc];
						if(vv.title.indexOf("必填")>0)
							t.push(vv.field);
						if (typeof vv.field != "undefined") {
//							sheetValue.value[vv.field] = "";//缺失校验规则，暂时注销
							sheetValue.standard[vv.field] = "";	
						}
					}
				}
				reValue.push(sheetValue);//将对象存道数组里，便于补充数据的时候增加内容
				mus.push(t);
				if(i==1){
					html_title += "<li id='li"+i+"' class='active'>";
				}else{
					html_title += "<li id='li"+i+"'>";
				}
				html_title += "<a data-toggle='tab' href='#tab-"+i+"' aria-expanded='true' sheet='"+data.head[i-1]+"' id='idmetTable"+i+"'>"+data.head[i-1]+"</a>";
				html_title += "</li>";
				if(i==1){
					html_body += "<div id='tab-1' class='tab-pane active'>";
				}else{
					html_body += "<div id='tab-"+i+"' class='tab-pane'>";
				}
				html_body += "<div class='panel-body'>";
				html_body += "<div class='row'>";
				html_body += "<div style='margin-top: 18px;margin-left:0px;'>";
				html_body += "<div class='col-sm-12' style='padding-left: 0px;'>";
				html_body += "<div class='example-wrap'>";
				html_body += "<div class='example'>";
				html_body += "<table id='metTable"+i+"' class='table-bordered' style='padding-left: 0px;'></table>";
				html_body += "</div></div></div></div></div></div></div>";
			}
			$("#tab_title").html(html_title);
			$("#tab_body").html(html_body);
			var url = "";
			if ( shi_dian == "1" ) {
				url =BackstageIP+"analysis/check/file/dataList.do";
			}else if(level=="3"){
				url = BackstageIP+"file/data/list.do";
			}else if(level=="4"||level=="6"){
				if(flag==true){url = BackstageIP+"analysis/cueFile/query.do";
				}
				else{url = BackstageIP+"file/data/list.do";}
			}else{
				url = BackstageIP+"file/data/list.do";
			}
			for(var i=1; i<data.head.length+1; i++){
				metTable_initialization("metTable"+i,data[data.head[i-1]],url,data.head[i-1]);
			}
		
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
	sfscsh += 1;
}

//开启、结束编辑
function bianji(e){
	if(e=='true'){
		edit='true';
		if(level=="6"){
			$('#tianjia').hide();
			$('#baocun').show();
			$('#bianji_sb').hide();
			$('#del_sb').hide();
			$(' td A').show();
			$('td span').hide();
		}else if(level=="4"){
			$('#tianjia').show();
			$('#baocun').show();
			$('#bianji_sb').hide();
			$('#del_sb').show();
			$(' td A').show();
			$('td span').hide();
		}
	}else if(level=="6"||level=="4"){
		edit='false';
		$('#tianjia').hide();
		$('#baocun').hide();
		$('#bianji_sb').show();
		$('#del_sb').hide();
		$(' td A').hide();
		$('td span').show();
	}
}

//后台存储数据
function saveDB(){
	var datas = {
		userId:dataBase.Login_map.SOLE,
		version: version,
		fileId: fileId
	};
	var row_tablename=lookat();
	row_tablename=$("ul li a[sheet='"+row_tablename+"']").attr('id');
	row_tablename=row_tablename.substring(2,row_tablename.length);
	var ps = $('#'+row_tablename).bootstrapTable('getOptions').pageSize;
	var data = ajax_async_t(BackstageIP+"analysis/cueFile/save.do", datas,"JSON", "1");
	if(data !=undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			swal({
				title: "保存成功",
				text: "成功保存数据",
				type: "success"
			})
			bianji('false');
		}else{
			var r=data.data[0].rowNumber%ps;
			if(r==0)
				r=ps;
			swal({
				title: data.error,
				text: data.data[0].sheetName+":第"+Math.ceil(data.data[0].rowNumber/ps)+"页"+"第"+r+"行"+data.data[0].message,
				type: "error"
			})
		}
	}else{
		swal({
			title: "保存失败",
			text: data.error,
			type: "error"
		})
	}
}

//新建数据
var nex=false;
function xinjian(){
	url="analysis/cueFile/updateV2";
	var tem=lookat();
	edit='true';
	var row_tablename=lookat();
	row_tablename=$("ul li a[sheet='"+row_tablename+"']").attr('id');
	row_tablename=row_tablename.substring(2,row_tablename.length);
	var ps = $('#'+row_tablename).bootstrapTable('getOptions').pageSize;
	var ns=$('#'+row_tablename).bootstrapTable('getOptions').data.length;
	var datas = JSON.stringify({
		taskId:taskId,
		version:version,
		fileId:fileId,
		userId: dataBase.Login_map.SOLE,
		smallIndex:tem,
		value:[{
				opType:"insert"}]
	})
	$.ajax({  		       
		url: BackstageIP+url,
		type: "POST",
		async:false,
		contentType:"application/json",
		dataType: "JSON",
		data: datas,
		success: function (ret) {
			if(ret.status=="success")
				{
				var num=ret.data.size[tem];
				var n=Math.ceil(num/ps);
				$('#'+row_tablename).bootstrapTable('selectPage', n);
				if(ns==ps){
					nex=true;
				}
				$('#'+row_tablename).bootstrapTable('refresh');
			}
		},
		error: function () { 
			swal({
				title: "添加失败",
				text: data.error,
				type: "error"
			})
		}  
	});
}

//数据初始化
function metTable_initialization(tablename,columns,url,sheet){
	sheet_public = sheet;
	$('#'+tablename).bootstrapTable({
		method: 'POST',
		url: url,
		dataType: "json",
		columns: columns, //列
		iconSize: "outline",
		clickToSelect: true,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		},
		pageSize: tablepageSize,	//页面大小
		pageNumber: 1,	//页数
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
			row_sheetname = sheet;
		},
		onLoadSuccess: function(rows){
			bianji(edit);
			if(nex==true)
			{	
				var ps = $('#'+tablename).bootstrapTable('getOptions').pageSize;
				var n=Math.ceil(rows.total/ps);
				$('#'+tablename).bootstrapTable('selectPage', n);
				nex=false;
			}
		},
		onSort: function (name, order) {
			sort[sheet] = {};
			sort[sheet][name] = order;
		},
		onEditableSave: function (field, row, oldValue, $el){
			if(row.id == "insert"){
				$.each(reValue, function(i, column) {
					if(column.sheetName == sheet){
						column.value[field] = row[field];
					}
				});
			}else{
				dandu_save(row.id, field, row[field]);//保存方法
			}
		}
	});
}


//单元格精确保存数据
function dandu_save(dataId, param, value){
	var axiba = {};
	var url;
	var row_tablename=lookat();
	row_tablename=$("ul li a[sheet='"+row_tablename+"']").attr('id');
	row_tablename=row_tablename.substring(2,row_tablename.length);
	axiba["id"] = dataId;
	if(flag==true)
	{
		url="analysis/cueFile/updateV2.do";
		axiba["opType"] = "update";
		axiba["columnName"] = param;
		axiba["columnValue"] = value;
	}else{
		url="file/data/update.do";
		axiba[param] = value;
	}
	var datas = JSON.stringify({
		taskId: taskId,
		userId: dataBase.Login_map.SOLE,
		version: version,
		fileId: fileId,
		smallIndex:lookat(),
		value:[axiba]
	})
	$.ajax({  		       
		url: BackstageIP+url,
		type: "POST",
		async:false,
		contentType:"application/json",
		dataType: "JSON",
		data: datas,
		success: function (data) {
			if(data.status=="success"){
			}
			else
			{
				toastr["info"](data.data.message);
				$('#'+row_tablename).bootstrapTable('refresh');
			}
		},
		error: function () { 
			toastr["info"]("保存失败", JSON.stringify(datas));
			$('#'+row_tablename).bootstrapTable('refresh');
		}  
	});
}

//配置参数
function queryParams(params) {
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.version = version;//版本号
	temp.fileId = fileId;//文件id
	temp.userId = parent.dataBase.Login_map.SOLE;//用户id
	temp.INDEX = parent.renwuINDEX;
	temp.taskId = taskId;//任务id
	if(sfscsh==0){//如果是第一次进入页面初始化
		temp.smallIndex = sheet_public;//sheet
	}else{//分页刷新
		temp.smallIndex = lookat();//sheet
	}
	temp.sort = JSON.stringify(sort[temp.smallIndex]);
	return temp;
}

//删除信息
function shanchu_xx(){
	edit='true';
	url="analysis/cueFile/updateV2";
	var row_tablename=lookat();
	row_tablename=$("ul li a[sheet='"+row_tablename+"']").attr('id');
	row_tablename=row_tablename.substring(2,row_tablename.length);
	var row = getSelectedRow(row_tablename);//获取选中的行
	var ds=$('#'+row_tablename).bootstrapTable('getOptions').data.length;
	var cs=$('#'+row_tablename).bootstrapTable('getOptions').columns.length;
	if(typeof row != "undefined"){
		var sheet = $("#id"+row_tablename).attr("sheet");
		swal({
			title: "您确定要删除这条信息吗",
			text: "删除后将无法恢复，请谨慎操作！",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			closeOnConfirm: false
		}, function () {
			var datas = JSON.stringify({
				taskId:taskId,
				version:version,
				fileId:fileId,
				userId: dataBase.Login_map.SOLE,
				smallIndex:sheet,
				value:[{id:row.id,
						opType:"delete"}]
			})
			$.ajax({  		       
				url: BackstageIP+url,
				type: "POST",
				async:false,
				contentType:"application/json",
				dataType: "JSON",
				data: datas,
				success: function (ret) {
					swal({
						title: "删除成功",
						text: "删除成功",
						type: "success"
					})
					if(ds==1)
						$('#'+row_tablename).bootstrapTable('prevPage');
					$('#'+row_tablename).bootstrapTable('refresh');
						
				},
				error: function () { 
					swal({
						title: "删除失败",
						text: "删除失败",
						type: "error"
					})
				}  
			});
		});
	}else{
		toastr["info"]("提示", "请点击选择一条记录");
	}
}
//ajax通用方法
function ajax_async_t(url,data,dataType,async){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
		url: url,
		type: "POST",
		async:false,
		dataType: dataType,
		data: data,
		success: function (ret) {
			rel = ret;
		},
		error: function () {
			toastr["info"]("错误信息", "服务器异常");
		}  
	});
	return rel;
}
//获取当前显示的是哪个页签
function lookat(){
	var sheet = "";
	$(".tabs-container").find("ul").find("li").each(function(){
		if($(this)[0].className=="active"){
			sheet = $(this).find("a")[0].innerHTML;
			return false;
		}
	});
	return sheet;
}
//获取选中行数据
function getSelectedRow(row_tablename) {
	var index = $('#'+row_tablename).find('tr.success').data('index');
	return $('#'+row_tablename).bootstrapTable('getData')[index];
}
function concel_xx(i){
	var s=$("table[id='metTable1'] th[data-field='companyId']")[0].textContent;
/*	$("#idmetTable2").click();
	
	var s=$("ul li a[sheet='表p1011_机组信息表']").attr('href');*/
	//data-toggle='tab' href='#tab-"+i+"' aria-expanded='true' sheet='"+data.head[i-1]+"' id='idmetTable"+i+"'>"+data.head[i-1]+"</a>
}
