jQuery.support.cors = true;
$(function(){
	updatacity();
	val_title();
	$("#jiandu_select").change(function(){
//		refresh();//刷新文字介绍部分
		if ($("#jiandu_select").val() == "1"){
			$("#caozuo_div1").show();
			$("#user_level").show();
		} else {
			$("#user_level").hide();
			$("#caozuo_div1").hide();
		}
		$('#metTable1').bootstrapTable('destroy');
		metTable_initialization();
		
	})
});

var masterTaskId;//主任务ID
var status = "ALL";//文件状态，进入页面或者点击别的任务的时候，默认为ALL
var version = "1.0";//版本号
var dataBase = parent.dataBase;//调用父页面的全局变量
//对地区赋值
function updatacity(){
	var data = ajax_async_t(BackstageIP+"userManager/findRegion.do",{userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data !=undefined&&data != null && data !=""){
		if(data.status=="success"){
			if(data.data.length>0){
				countryLength = data.data.length;
				var html = "<div class='checkbox checkbox-info' style='margin:0px;width:100%;'>";
				html += "<input onclick=\"quanxuan();\" id='quanxuan' name='classdiquAll' type='checkbox' value='' checked='true'/>";
				html += "<label for='quanxuan' style='width:6%;'>全选</label>";
				
				for(var i=0; i<countryLength; i++){
					html += "<input onclick=\"notallsel();\" id='checkbox"+i+"' type='checkbox' value='"+data.data[i].code+"' name='classdiqu' checked='true'/>";
					html += "<label for='checkbox"+i+"' style='width:6%;'>"+data.data[i].name+"</label>";
				}
				html += "</div>";
				$("#diqu_div").html(html);
			}
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

var task_type_list = {};//任务列表用户类型的联动关系
//为选择任务下拉框赋值
function val_title(){
	var data = ajax_async_t(BackstageIP+"taskDataFill/listSimpleTask.do",{version:version,createUserId:dataBase.Login_map.SOLE,flag:true,userType:dataBase.Login_map.TYPE},"JSON","1","POST");
	if(data != undefined){
		if(data.status == "success"){
			if(data.data.length == 0){
				parent.findtab();
			}else{
				var html = "";
				var html1 = "";
				if(data.data.length > 0){
					for(var i=0; i<data.data.length; i++){
						html += "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
						task_type_list[data.data[i].id] = data.data[i].userList.sort(function(a,b){if(a==5)return -1; else if (b == 5 )return 1;else return a-b;});
					}
					$("#tasklist_div").html(html);
					
					user_type();//用户类型
					
					masterTaskId = data.data[0].id

//					refresh();//刷新文字介绍部分
//					console.log(task_type_list);
					$('#metTable1').bootstrapTable('destroy');
					metTable_initialization();
				}
			}
		}else{
			toastr["info"]("错误信息", "服务器异常");
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}



//切换任务刷新表格和文字
function changetask(masterId){
	user_type();//用户类型
	masterTaskId = masterId;
	status = "ALL";
//	refresh();
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}
//用户类型
function  user_type(){
	$("#jiandu_select").html('');
	var html = '';
	var ste = task_type_list[$("#tasklist_div").val()];
	for (var i = 0 ; i < ste.length ; i ++ ) {
		if ( ste[i] == "4" ) {
			html += '<option value="2">市填报用户</option>'
		} else if ( ste[i] == "5" ) {
			html += '<option value="1">企业用户</option>';
		} else if ( ste[i] == "6" ) {
			html += '<option value="3">环保部门用户</option>';
		}
		
	}
	$("#jiandu_select").html(html);
	if ($("#jiandu_select").val() == "1"){
		$("#user_level").show();
		$("#caozuo_div1").show();
	} else {
		$("#caozuo_div1").hide();
		$("#user_level").hide();
	}
}

//更换条件
function change_count(state,dt){
	dataType=dt;
	status = state;
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}

//刷新文字介绍部分
function refresh(){
	$("#doc_1").html("");
	$("#doc_2").html("");
	if($("#jiandu_select").val()=="1"){
		var data ;
		if ( $("#jiandu_select").val() == "1" ){
			data = ajax_async_t(BackstageIP+"taskDataFillChild/progressCheck/groupBy.do",{version:version,createUserId:dataBase.Login_map.SOLE,masterTaskId:masterTaskId,region: $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
				return $(elem).val();
			}).get().join(','),dataLevel:$("input:checkbox[name='zt']:checked").map(function(index,elem) {//用户等级
				return $(elem).val();
			}).get().join(',')},"JSON","1","POST");
		} else {
			data = ajax_async_t(BackstageIP+"taskDataFillChild/progressCheck/groupBy.do",{version:version,createUserId:dataBase.Login_map.SOLE,masterTaskId:masterTaskId,region: $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
				return $(elem).val();
			}).get().join(',')},"JSON","1","POST");
		}
		if(data != undefined){
			if(data.status == "success"){
				var html_2;
				if(data.data != null){
					html_2 = "共有企业<a class='title_a' >"+data.data.ALL+"</a>个，" +
					"未提交<a class='title_a'>"+data.data.WAIT_COMMIT+"</a>个，" +
					
					"建议驳回<a class='title_a'>"+data.data.ADVICE+"</a>个，" +
					
					"待审核<a class='title_a'>"+data.data.WAIT_REVIEW+"</a>个，" +
					
					"未调查<a class='title_a'>"+data.data.WAIT_SURVEY+"</a>个，" +
					"已通过<a class='title_a'>"+data.data.PASSED+"</a>个，"+
					"已驳回<a class='title_a'>"+data.data.REJECT+"</a>个。";
				}else{
					html = "此任务暂未分配企业";
				}
				$("#doc_1").html("");
				$("#doc_2").html(html_2);
			}else{
				toastr["info"]("错误信息", "taskDataFill/process/statCityUser无数据");
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}else if($("#jiandu_select").val()=="2"){
		var data = ajax_async_t(BackstageIP+"taskDataFill/process/statCityUser.do",{version:version,createUserId:dataBase.Login_map.SOLE,masterTaskId:masterTaskId},"JSON","1","POST");
		if(data != undefined){
			if(data.status == "success"){
				var html,html_2;
				if(data.data != null){
					html = "共有<span style='margin-left: 4px;margin-right: 4px;color: red;'>"+data.data.sourceCounts.totalCount+"</span>个行业，";
					html += "<a onclick=\"change_count('NOT_COMMIT','')\"><code style='color: blue;'>"+data.data.sourceCounts.notCommitCount+"</code></a>个未提交。";
				
					html_2 = "共提交<a class='title_a' onclick=\"change_count('ALL','')\">"+data.data.fileCounts.totalCount+"</a>份文件，" +
							"<a class='title_a' onclick=\"change_count('WAIT_REVIEW','')\">"+data.data.fileCounts.waitReviewCount+"</a>份待审核，" +
							"<a class='title_a' onclick=\"change_count('PASSED','')\">"+data.data.fileCounts.passCount+"</a>份已通过，" +
							"<a class='title_a' onclick=\"change_count('REJECT','')\">"+data.data.fileCounts.rejectCount+"</a>份已驳回。";
				
				}else{
					html = "此任务暂未分配行业";
				}
				$("#doc_1").html(html);
				$("#doc_2").html(html_2);
			}else{
				toastr["info"]("错误信息", "taskDataFill/process/statCityUser无数据");
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}else if($("#jiandu_select").val()=="3"){
		
		var data = ajax_async_t(BackstageIP+"taskDataFill/process/statHbUser",{version:version,createUserId:dataBase.Login_map.SOLE,masterTaskId:masterTaskId},"JSON","1","POST");
		if(data != undefined){
			if(data.status == "success"){
				var html="";
				var html_2="";
				if(data.data != null){
					html = "共<span style='margin-left: 4px;margin-right: 4px;color: red;'>"+data.data.fileCount.total+"</span>类数据，";
					html += "<a onclick=\"change_count('NOT_COMMIT','')\"><code style='color: blue;'>"+data.data.fileCount.notCommit+"</code></a>类数据未完成提交。";
					var array=data.data.sourceCount;
					if(data.data.sourceCount!=undefined){
						for(var i=0;i<array.length;i++){
							if(i==0){
								dataType=array[i].dataType;
							}
							html_2 += array[i].name+"，共提交<a class='title_a' onclick=\"change_count('ALL','"+array[i].dataType+"')\">"+array[i].totalCount+"</a>份文件，" +
							"<a class='title_a' onclick=\"change_count('WAIT_REVIEW','"+array[i].dataType+"')\">"+array[i].waitReviewCount+"</a>份待审核，" +
							"<a class='title_a' onclick=\"change_count('PASSED','"+array[i].dataType+"')\">"+array[i].passCount+"</a>份已通过，" +
							"<a class='title_a' onclick=\"change_count('REJECT','"+array[i].dataType+"')\">"+array[i].rejectCount+"</a>份已驳回。<br>";
						}
					}
				
				}else{
					html = "此任务暂未分配行业";
				}
				$("#doc_1").html(html);
				$("#doc_2").html(html_2);
			}else{
				toastr["info"]("错误信息", "taskDataFill/process/statCityUser无数据");
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}
}
var userType="";
var dataType="";
//数据初始化
function metTable_initialization(){
	var type=$("#jiandu_select").val();
		$("#metTable1").html("");
		var url = "";
		var column=[];
		if($("#jiandu_select").val()=="2"){
			url = "taskDataFill/process/listFile.do";
			userType="4";
			if($("#qy_zhuantai").val() =="NOT_COMMIT"){
				column=columns_1;
			} else if ($("#qy_zhuantai").val() == "WAIT_COMMIT"){
				column = columns_wei;
			}else{
				column=columns;
			}
			
		}else if($("#jiandu_select").val()=="3"){
			url = "taskDataFill/process/listFile.do";
			userType="6";
			if($("#qy_zhuantai").val()=="NOT_COMMIT"){
				
				column=columns3_3;
			}else if ($("#qy_zhuantai").val() == "WAIT_COMMIT"){
				column = columns_wei;
			}else{
				column=columns3;
			}
		} else {
			userType="5";
			url = "taskDataFillChild/progressCheck/companyList.do";
			 if ($("#qy_zhuantai").val() == "WAIT_COMMIT"){
				column = columns_wei;
			} else {
				column=columns1;
			}
		}
		$('#metTable1').bootstrapTable({
			method: 'POST',
			url: BackstageIP+url,
			dataType: "json",
			columns: column, //列
			iconSize: "outline",
			clickToSelect: true,//点击选中行
			pagination: true,	//在表格底部显示分页工具栏
			pageSize: 10,	//页面大小
			pageNumber: 1,	//页数
			pageList: [10, 20, 50, 100],
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
	//}
	
}

//配置参数
function queryParams(params) {  
	var temp = {};
	temp.dataType=dataType;
	temp.userType=userType;
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.createUserId = dataBase.Login_map.SOLE;//创建用户id
	temp.version = version;//版本号
	temp.masterTaskId = masterTaskId;//主任务id
	temp.status = $("#qy_zhuantai").val();//状态
	if ( $("#jiandu_select").val() == "1" ) temp.dataLevel = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//用户等级
		return $(elem).val();
	}).get().join(',');
	
	temp.region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');

	// 20170801-xugy:取消选择未提交时的补充说明选项, 增加为调查选择项
	// if ( $("#qy_zhuantai").val() ==  "WAIT_COMMIT" ) temp.explain = $('input[name="shuoming"]').filter(':checked').val();
  if ( $("#qy_zhuantai").val() ==  "WAIT_COMMIT" ) temp.explain = '';

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
//点击全选
function quanxuan(){
	if($("#quanxuan")["0"].checked == true){
		$("#diqu_div input[name='classdiqu']").prop("checked","true");
		$("#diqu_div input[name='classdiqu']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("#diqu_div input[name='classdiqu']").removeAttr("checked")
		$("#diqu_div input[name='classdiqu']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	changeState = "1";//改变了查询条件
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}

//点击地区
function notallsel(){
	var countyList = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(countyList != ""){
		var countrySize = countyList.split(",")
		if(countryLength == countrySize.length){
			$("#quanxuan").prop("checked","true");
			$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#quanxuan").removeAttr("checked");
			$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#quanxuan").removeAttr("checked");
		$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	changeState = "1";//改变了查询条件
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}
//用户等级选择
function user_level () {
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}
//列市填报
var columns = [
               {
            	   title: '序号',
            	   field: 'fileId',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '部门',
            	   field: 'level1',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '行业',
            	   field: 'level2',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '填报人',
            	   field: 'informant',
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
               }, {
            	   title: '文件名称',
            	   field: 'fileName',
            	   align: 'center',
            	   valign: 'middle'
               }
               ];
var columns_1 = [
               {
            	   title: '序号',
            	   field: 'fileId',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '部门',
            	   field: 'level1',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '行业',
            	   field: 'level2',
            	   align: 'center',
            	   valign: 'middle'
               }, {
            	   title: '填报人',
            	   field: 'informant',
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
var columns3 = [
                {title: '序号',
            	   field: 'fileId',
            	   align: 'center',
            	   valign: 'middle'
            	 },{
             	   title: '数据类型',
             	   field: 'dataType',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '部门',
             	   field: 'level1',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '行业',
             	   field: 'level2',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '文件名称',
             	   field: 'fileName',
             	   align: 'center',
             	   valign: 'middle'
                }, {
            	   title: '填报人',
            	   field: 'informant',
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
var columns3_3 =[
                 {title: '序号',
            	   field: 'fileId',
            	   align: 'center',
            	   valign: 'middle'
            	 },{
             	   title: '数据类型',
             	   field: 'dataType',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '部门',
             	   field: 'level1',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '行业',
             	   field: 'level2',
             	   align: 'center',
             	   valign: 'middle'
                }, {
            	   title: '填报人',
            	   field: 'informant',
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
var columns1 = [
               {
            	   title: '序号',
            	   field: 'number',
            	   align: 'center',
            	   valign: 'middle'
               },{
            	   title: '企业名称',
            	   field: 'companyName',
            	   align: 'center',
            	   valign: 'middle'
               },
     
               {
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
var columns_wei = [
                {
             	   title: '序号',
             	   field: 'number',
             	   align: 'center',
             	   valign: 'middle'
                },{
             	   title: '企业名称',
             	   field: 'companyName',
             	   align: 'center',
             	   valign: 'middle'
                },
      
                {
             	   title: '所在地区',
             	   field: 'region',
             	   align: 'center',
             	   valign: 'middle'
                }, {
             	   title: '行业类别',
             	   field: 'industry',
             	   align: 'center',
             	   valign: 'middle'
                },
								// 20170801-xugy: 需求变更, 注释掉‘补充说明’
								// {
             	  //  title: '补充说明',
             	  //  field: 'reason',
             	  //  align: 'center',
             	  //  valign: 'middle'
                // },
								{
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

//企业任务状态
function qy_zhuantai (value) {
	// 20170801-xugy:取消补充说明功能, 所以设置补充说明功能区域不显示
	// if ( value == "WAIT_COMMIT" ) $("#buchong_div").show(); else $("#buchong_div").hide();
  if ( value == "WAIT_COMMIT" ) $("#buchong_div").hide(); else $("#buchong_div").hide();
  $('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}
//是否补充说明
function buchong_div () {
	$('#metTable1').bootstrapTable('destroy');
	metTable_initialization();
}