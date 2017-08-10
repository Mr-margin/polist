jQuery.support.cors = true;
var sa = {"化石燃料固定燃烧源":"1","工艺过程源":"2","移动源":"3","溶剂使用源":"4","农业源":"5","扬尘源":"6","储存运输源":"7","生物质燃烧源":"8","废物处理源":"9","其他排放源":"10"
}
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	parameter=Request['par'];
	updatacity();//对地区赋值
	uplist();//对任务赋值
	metTable_initialization();//生成企业表格
	$("#caozuo_div2").css("margin-top",($("#caozuo_div1").height()-33)/2);
 });
function zhenduan_select(){
	var section = $("#zhenduan_select :selected").text();
	var html="";
	for(prop in dataAll1){
		if(prop == section){
			var data=dataAll1[prop];
			for(var i=0;i<data.length;i++)
			{
				html+="<option id='hangye"+i+"' value='"+data[i].ID+"' name='hy_name' >"+data[i].SCC2+"</option>";
			}
		}
	}
	$("#zhenduan_select1").html(html);
}
var referparam = [];//判断是点击查询按钮出现的表格还是通过点击分析图的点柱出现的表格。""为查询，否则为点击图。
var sourceNum = "";//缓存排放源

var myChart_1,myChart_2,myChart_3,myChart_4;
//调用父页面的全局变量
var dataBase = parent.dataBase;

window.onresize=function () { //浏览器调整大小后，自动对所有的图进行调整
	try{
		if(myChart_1){
			myChart_1.resize();
		}
		if(myChart_2){
			myChart_2.resize();
		}
		if(myChart_3){
			myChart_3.resize();
		}
		if(myChart_4){
			myChart_4.resize();
		}
	}catch(e){
	}
};

var version ="1.0";
var countryLength = 0;//存放城市长度
//对排放源赋值
function upsource(){
	parameter=$("#zhenduan_select").val();
	a:for(var i=0; i<sj_data.length; i++){//为标题赋值
		if(sj_data[i].id == parameter){
			var pangfangyuan = sj_data[i].value;
			var html = "";
			for(var y=0; y<pangfangyuan.length; y++){
				html += "<option id='hangye"+y+"' value='"+pangfangyuan[y].id+"' name='hy_name' >"+pangfangyuan[y].value+"</label>";
			}
			$("#zhenduan_select1").html(html);
			break a;
		}
	}
}
var dataALl;
//对任务赋值
function uplist(){
	var data = ajax_async_t(BackstageIP+"taskDataFill/taskList",{version:version,region:dataBase.Message_map.REGION,type:dataBase.Login_map.TYPE},"JSON","1","POST");
	var html = "";
	dataAll=data.data;
	if(data != undefined && data !=null && data != ""){
		if(data.status == "success"){
			var datas = data.data.task;
			if(datas.length > 0){
				for(var i=0; i<datas.length; i++){//循环出任务下拉框
					html += "<option value='"+datas[i].id+"'>"+datas[i].name+"("+datas[i].goalYear+"清单)"+"</option>"; 
				}
				$("#select_1").html(html);
			}else{
				toastr["info"]("","暂无提交任务");
				return;
			}
			var verifier = "";
			if ( dataBase.Login_map.TYPE == "3" ) {
        verifier = { name: dataBase.Message_map.NAME, region: dataBase.Message_map.REGION};
        $("#shr_name").append('<option value = '+verifier['region']+'>'+verifier['name']+'</option>');
        $.each(data.data.check,function(i,g){
          $("#shr_name").append('<option value = '+g['region']+'>'+g['name']+'</option>');
        });
			}else{
        verifier = {name: dataBase.Message_map.INFORMANT, region: dataBase.Message_map.REGION};
        $("#shr_name").append('<option value = '+verifier['region']+' selected>'+verifier['name']+'</option>');
        $('#shenHe').css("display", "none");
			}
			
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//对地区赋值
function updatacity(){
	var data = ajax_async_t(BackstageIP+"userManager/findRegion.do",{userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data !=undefined&&data != null && data !=""){
		if(data.status=="success"){
			if(data.data.length>0){
				countryLength = data.data.length;
				var html = "<div class='checkbox checkbox-info' style='margin:0px;width:100%;'>";
				html += "<input onclick=\"quanxuan();\" id='quanxuan' name='classdiquAll' type='checkbox' value='' checked='true'/>";
				html += "<label for='quanxuan' style='width:10%;'>全选</label>";
				
				for(var i=0; i<countryLength; i++){
					html += "<input onclick=\"notallsel();\" id='checkbox"+i+"' type='checkbox' value='"+data.data[i].code+"' name='classdiqu' checked='true'/>";
					html += "<label for='checkbox"+i+"' style='width:10%;'>"+data.data[i].name+"</label>";
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
//应该查询哪个文件列表
function uptbody(i){
	$('#metTable1').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization();//生成企业表格
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
}
//点击全选-状态
function all_status(){
	if($("#all_status")["0"].checked == true){
		$("#zt_div input[name='zt']").prop("checked","true");
		$("#zt_div input[name='zt']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("#zt_div input[name='zt']").removeAttr("checked")
		$("#zt_div input[name='zt']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}
//点击状态
function only_status(){
  // 20170802-xugy: 状态由复选框变为单选框
  var countyList = $("input:radio[name='zt']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	console.log(countyList);
	if(countyList != ""){
		var countrySize = countyList.split(",")
		if( 5 == countrySize.length){
			$("#all_status").prop("checked","true");
			$("#all_status").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#all_status").removeAttr("checked");
			$("#all_status").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#all_status").removeAttr("checked");
		$("#all_status").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}

//点击通过
function passbody(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	passCompany("通过");//通过企业
}
//点击全部通过
function allPassbody(){
	var qysj = "";
	var taskId = $("#select_1").val();//任务id
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	// 20170802-xugy: 状态由复选框变为单选框
	var status = $("input:radio[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	if($('#metTable1').bootstrapTable('getOptions').data.length>0) allpassCompany();
	else return toastr["info"]("没有可通过的企业");
}
//企业 通过
function passCompany(value){
	var row = $("#metTable1").bootstrapTable('getSelections');
	if (row.length>0 ) {
		var str = "";
		var str1 ="" 
		var str2 = "";
		var verifier = "";
		if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
		else verifier = dataBase.Message_map.INFORMANT;
		
		$.each(row,function(i,item){
			str += item.taskId+",";
			str1 += item.equipId+",";
			str2 += item.userId+",";
		});
		str = str.substring(0,str.length-1);
		str1 = str1.substring(0,str1.length-1);
		str2 = str2.substring(0,str2.length-1);
		swal({
			title: "您确定要"+value+"这些企业吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			var advice = "3";
			if ( value == "建议驳回") advice = "6";
			var data = ajax_async_t(BackstageIP+"taskDataFill/passAndRejectAndAdvice",{taskIds:str,status:advice,verifier:$("#shr_name").val(),userName:verifier},"JSON","1","POST");
			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization();//生成企业表格
//					$('#metTable1').bootstrapTable('selectPage', page_qy);
					swal("操作成功！", "这些企业状态改为"+value+"", "success");
				}else if(data.status == "fail"){
					swal("操作失败", data.error, "error");
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		});
	}else{
		toastr["info"]("请选择要"+value+"的企业");
	}

}
//企业 全部通过
function allpassCompany(){
	swal({
		title: "您确定要全部通过企业吗？",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	},
	function() {
		var taskId = $("#select_1").val();//任务id
		var status = $("input:radio[name='zt']:checked").map(function(index,elem) {//状态
			return $(elem).val();
		}).get().join(',');
		var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
			return $(elem).val();
		}).get().join(',');
		
		var verifier ="";
		if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
		else verifier = dataBase.Message_map.INFORMANT;
		
		var url = BackstageIP+'taskDataFill/allPass'
		var data = ajax_async_t(url,{taskId:$("#select_1").val(),region:region,status:status,verifier:$("#shr_name").val(),companyNameLike:$("#qy_name").val(),userName:verifier},"JSON","1","POST");
	
		if ( data != undefined && data != null && data != "" ){
			if(data.status == "success"){
				$('#metTable1').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization();//生成企业表格
				swal("操作成功！", "这些企业状态改为通过", "success");
			}else if(data.status == "fail"){
				swal("操作失败", data.error, "error");
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	});
}

//点击驳回
function reject(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	$("#reject_table").modal();

}
//建议驳回
function suggest(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	passCompany("建议驳回");//通过企业
}	

function rejectbody(){
	var file=$("#file");
	var str= $("#reject_content").val();
	if($.trim(file.val())==""&&str=="")  return toastr["info"]("请选择文件，或填写驳回原因");
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	rejectCompany();//企业
}
//企业 驳回
function rejectCompany(){
	var rejectContent = $("#reject_content").val();
	var row = $("#metTable1").bootstrapTable('getSelections');
	var file= $("#file");
	if (row.length>0 ) {
		var str = "";
		var str1 = "";
		var str2 = "";
		var companyNames='';
		var verifier ="";
		if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
		else verifier = dataBase.Message_map.INFORMANT;
		$.each(row,function(i,item){
			str += item.name+",";
			str1 += item.taskId+",";
			str2 +=item.userId+",";
			var companyName=item.companyName;
			var indexOf = companyName.indexOf(">");
			var lastIndexOf = companyName.lastIndexOf("<");
			companyNames+=companyName.substring(indexOf+1,lastIndexOf)+',';
		});
		companyNames=companyNames.substring(0,companyNames.length-1);
		str = str.substring(0,str.length-1);
		str1 = str1.substring(0,str1.length-1);
		str2 = str2.substring(0,str2.length-1);
		swal({
			title: "您确定要驳回这些文件吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			$.ajaxFileUpload
            (
                    {
                        url: BackstageIP+'taskDataFill/reject?taskId='+str1+'&reason='+rejectContent+
                        '&fUserId='+dataBase.Login_map.SOLE+'&zUserId='+str2+'&userName='+verifier+"&companyName="+str+"&taskName="+$("#select_1").find("option:selected").text(), //用于文件上传的服务器端请求地址
                        secureuri: false, //是否需要安全协议，一般设置为false
                        data:{
                        },
                        fileElementId: 'file', //文件上传域的ID
                        dataType:'json',
                        success: function (data, status)  //服务器成功响应处理函数
                        {	
                        	if(data != undefined){
                				if(data.status == "success"){
                					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
                					metTable_initialization();//生成企业表格
                					$('#metTable1').bootstrapTable('selectPage', page_qy);
                					swal("操作成功！", "这些文件状态改为驳回", "success");
                					$("#reject_table").modal('toggle');
                				}else if(data.status == "fail"){
                					swal("操作失败", data.error, "error");
                				}
                			}
                        },
                        error: function (data, status, e)//服务器响应失败处理函数
                        {
                        	console.log(e)
                            swal("操作失败", data.error, "error");
                        }
                    }
            )
		});

	}else{
		toastr["info"]("请选择要驳回的企业");
	}
}
//点击企业文件名称
function openCompany(taskId,userId,level,status,userName,year,reason){
  var statusNow = $("input:radio[name='zt']:checked").map(function(index,elem) {//状态
    return $(elem).val();
  }).get().join(',');
	if(statusNow === 'WAIT_SURVEY') {
		if(reason && reason.indexOf('uploadPicture/') >= 0) {
      $('#showImg').css('display','block');
      $("#yunyin").css('display','none')
      $('#showImg').attr('src',"../../gg/"+ reason);
		}else {
      $("#yunyin").css('display','block')
      $('#showImg').css('display','none');
      $("#yunyin").html(reason)
		}
    $("#description_modal").modal();
	}else {
    swal({
			title: "您确定要跳转页面审核企业(有可能您的浏览器不支持)？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			try {
				if ( level == "1" ) window.open("../../zp_qy/0101/b.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year);
				else if ( level == "2" ) window.open("../../zp_qy/0102/bb.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year);
				else if ( level == "3") window.open("../../zp_qy/0103/b.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year);
				swal("操作成功！", "成功跳转", "success");
			} catch (e) {
				swal("操作失败！", "浏览器不支持", "error");
			}

		});
	}
};

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
var indexs='';	//index数据
var index_arr=[];
var index_strs='';
var page_qy;
var pageNum = 1;//企业表格-当前页数
//数据初始化-企业表格
function metTable_initialization(){
	// 20170802-xugy: 状态由复选框变为单选框
	var status = $("input:radio[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	if ( status == "" ) return toastr["info"]("请选择状态");
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');
	if (region=="") return toastr["info"]("请选择地区");
	var url = BackstageIP+'taskDataFill/selectCompanyAndStatus'
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url: url,
		columns : [{
			field : 'state',
			checkbox : true,
		},  
		{
			field : 'companyName',
			title : '企业名称',
			align : 'center'
		}, {
			field : 'status',
			title : '状态',
			align : 'center'
		}, {
			field : 'id',
			title : 'ID',
			align : 'center',
			visible:false
		} ], // 列
		dataType: "json",
		iconSize: "outline",
		clickToSelect: false,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		pageSize: 10,	//页面大小
		pageNumber: pageNum,	//页数
		pageList: [10],
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onLoadSuccess:function (data) {
			indexs=data.rows;
			page_qy=data.page;
			if (indexs != undefined ) {
				for(var i=0;i<indexs.length;i++){
					index_arr.push(indexs[i].index);
				}
				var index_str=JSON.stringify(index_arr);
				index_strs=index_str.replace(/"/g, '');
			}
		},
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
	var taskId = $("#select_1").val();//任务id
	
	// 20170802-xugy: 状态由复选框变为单选框
	var status = $("input:radio[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');

	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.masterTaskId = taskId;//任务id
	temp.version = version;//版本号
	temp.region = region;//地区
	temp.status = status;//状态
	if ( $("#shr_name").val() != "" && $("#shr_name").val() != undefined && $("#shr_name").val() != null ) temp.verifier= $("#shr_name").val().join(",");
	else temp.verifier= "";
	
	
  
  	if (dataBase.Login_map.TYPE != "8") {
  		if ( $("#shr_name").val() != "" && $("#shr_name").val() != undefined && $("#shr_name").val() != null ) {
  		    temp.verifierName = '';
  		    var tempNameList = [];
  		    $("#shr_name").find('option:selected').each(function () {tempNameList.push($(this).text());});
  		    if(tempNameList.length > 0) { temp.verifierName = tempNameList.join(',');}
  			} else temp.verifierName= "";
  	}
  	
	temp.companyNameLike = $("#qy_name").val();
	pageNum = params.offset == 0 ? 1 : (params.offset/params.limit)+1;
	return temp;
}
//获取参数
function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串，获取访问链接的.search键中的值
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {	//判断该变量中是否存在？号，不村在则返回-1
		var str = url.substr(1);	//获取该变量下标从1开始的后面的值
		strs = str.split("&");		//使用&对str进行截取并放到数组中
		for(var i = 0; i < strs.length; i ++) {	//循环该数组
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}
//
function uploadFile(){
	$("#mod_head_1").hide();
	$("#mod_head_2").show();
	$("#ImportForm").hide();
	$("#modal_foot").hide();
	$("#modal-re").hide();
	
	$.ajaxFileUpload({
		//taskId 填报任务编号，version 版本,bigIndex 行业类别，description 文件描述,file Excel上传文件
		url: BackstageIP+'file/uploadData?sourceId='+iJson[parseInt(parameter)-1].sourceId+'&taskId='+taskId+'&dataType='+dml+'&version='+version+'&description=上传文件&userId='+dataBase.Login_map.SOLE, //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file', //文件上传域的ID
		dataType: 'json', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			if(data != undefined){
				if(data.status == "success"){
					$("#reject_table").modal("hide");
					html_value();
					swal({
						title: "上传成功",
						text: "成功上传"+iJson[parseInt(parameter)-1]["data_"+dml_2],
						type: "success"
					});
				}else{
					if(data.code == "2001"){
						//隐藏标题
						$(".modal-title").hide();
						var html = "<button type='button' class='btn btn-warning' data-dismiss='modal'>关闭</button>";
						$("#modal_foot").html(html);
						$("#modal_foot").show();
						$("#ImportForm").hide();
						$("#ImportForm_2").html("<p style='text-align: center;'><strong style='color:red;'>上传文件数据格式错误，请下载错误报告。</strong></p><br>" +
								"<p style='text-align: center;'>" +
								"<a href='"+BackstageIP+data.data+"' style='text-decoration:underline;' target=_blank>点击下载错误报告</a></p>");
						$("#ImportForm_2").show();
					}else if(data.code == "2000"){
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}else{
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}
				}
			}else{
				toastr["info"]("错误信息","无返回值")
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			$("#Import_modal").modal("hide");
			swal({
				title: "上传失败",
				text: "网络错误",
				type: "error"
			});
		}
	});
}
