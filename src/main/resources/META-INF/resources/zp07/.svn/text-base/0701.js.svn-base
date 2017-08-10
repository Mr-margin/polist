jQuery.support.cors = true;

$.validator.addMethod("zh", function(value, element) {   
	var tel = /^\w+$/;
	return this.optional(element) || (tel.test(value));
}, "<i class='fa fa-times-circle'></i>只能填写英文字母、数字和下划线");
$.validator.addMethod("mc", function(value, element) {
	var zh = /^[\u0391-\uFFE5\w]+$/;
	return this.optional(element) || zh.test(value);
}, "<i class='fa fa-times-circle'></i>只能使用中文字、英文字母、数字和下划线");   
$.validator.addMethod('mobile', function( value, element ){
	var dh=/^((0\d{2,3}-?\d{6,8})|(1[35847]\d{9}))$/;
	return this.optional( element ) || dh.test( value );
}, "<i class='fa fa-times-circle'></i>请输入正确的联系方式");
$.validator.addMethod("chinese", function(value, element) {
	var chinese = /^[\u4e00-\u9fa5]+$/;
	return this.optional(element) || (chinese.test(value));
}, "<i class='fa fa-times-circle'></i>只能输入中文");
$.validator.addMethod("email", function(value, element) {
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/  ;
	return this.optional(element) || (email.test(value));
}, "<i class='fa fa-times-circle'></i>请输入正确的email");

$(function(){
	hq_hylb1();//获取单独创建行业列表
	hq_hylb2();//获取账号列表行业列表
	hq_szdq();//所在地区

	fz_hylb("qy_hymc");//为用户类别赋值
	fz_hylb("classdiqu");//为用户类别赋值

	fz_mbxz();//为模板下载赋值

	$("#hylb_1").height($("#hylb_2").height());
	$("#szdq_1").height($("#szdq_2").height());
	$("#qyzt_1").height($("#qyzt_2").height());
	$("#yhmc_1").height($("#yhmc_2").height());

	metTable_initialization();

	//validate实时验证
	$("#add_Form").validate({
		onfocusout: function(element){
			$(element).valid();
		}
	});  
	//validate实时验证
	$("#up_Form").validate({
		onfocusout: function(element){
			$(element).valid();
		}
	});  
});

//调用父页面的全局变量
var dataBase = parent.dataBase;
var version = "1.0";

//为模板下载赋值
var region=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';
function fz_mbxz(){
//	$("#mbxz_a").attr("href",BackstageIP+"file/download?fileId=companyUserExcel/企业用户批量创建.xlsx");
	$("#mbxz_a").attr("href",BackstageIP+"userManager/import/template?country="+countyName+"&region="+region);
};

//获取企业行业类别
function hq_hylb1(){
	var html = "<option value=''>请选择</option>";
	for(var i=0; i<qy_data.length; i++){
		var data_value = qy_data[i].value
		for(var y=0; y<data_value.length; y++){
			html += "<option value='"+data_value[y].id+"'>"+data_value[y].value+"</option>";
		}
	}
	$("#selec_hylb").html(html);//添加中的行业类别
	$("#in_industry").html(html);//修改里面的行业类别
}

//获取账号列表行业类别
function hq_hylb2(){
	var html = "<option value=''>全部部门</option>";
	for(var i=0; i<qy_data.length; i++){
		html += "<option value='"+qy_data[i].id+"'>"+qy_data[i].name+"</option>";
	}
	$("#select_1").html(html);
	hy_xlk();//行业下拉框只有全部选择
}

//10类源点击事件，改变后面的行业下拉框
function changesele(typeid){
	var html = "";
	if(typeid.length != 0){
		a:for(var i=0; i<qy_data.length; i++){//循环源
			if(typeid == qy_data[i].id){//找到对应的行业
				var hydata = qy_data[i].value;
				var ht_data0 = "";//全部行业的id
				for(var x=0; x<hydata.length; x++){//循环行业
					if(x != 0){
						ht_data0 += ",";
					}
					ht_data0 += hydata[x].id;
					html += "<option value='"+hydata[x].id+"'>"+hydata[x].value+"</option>"
				}
				$("#select_2").html("<option value="+ht_data0+">全部行业</option>"+html);

				break a;
			}
		}
	}else{
		hy_xlk();//行业下拉框只有全部选择
	}
}

//行业下拉框只有全部选择
function hy_xlk(){
	var html = "";
	for(var i=0; i<qy_data.length; i++){//循环源
		var hydata = qy_data[i].value;
		for(var x=0; x<hydata.length; x++){//循环行业
			if(i == 0){
				if(x != 0){
					html += ",";
				}
			}else{
				html += ",";
			}
			html += hydata[x].id;
		}
	}
	$("#select_2").html("<option value="+html+",-1"+">全部行业</option>");
}
var countyName = "";
//获取账号列表中的所在地区
function hq_szdq(){
	var html = "<div class='checkbox checkbox-info' style='margin:1px'>";
	var html_2 = "<option value=''>请选择</option>";
	var data = ajax_async_t(BackstageIP+"userManager/findRegion.do",{userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	html+="<input type='checkbox' id='q' value='q' name='q' onClick='all_checkbox()' checked><label for='q' style='width:6%;'>全选</label>";

	if(data !=undefined&&data!=null&&data!=""){
		if(data.status=="success"){
			if(data.data.length>0){
				for(var i=0; i<data.data.length; i++){
					html += "<input id='checkbox"+i+"' type='checkbox' onclick='notallsel();' value='"+data.data[i].code+"' name='classdiqu'>";
					html += "<label for='checkbox"+i+"' style='width:6%;'>"+data.data[i].name+"</label>";
					html_2 += "<option value='"+data.data[i].code+"'>"+data.data[i].name+"</option>";

					if(i != 0){
						countyName += ",";
					}
					countyName += data.data[i].name;
				}
				html += "</div>";
			}
		}else{
			toastr["info"]("错误信息",data.status,data.error)
		}
	}else{
		toastr["info"]("错信息","无返回值");
	}
	$("#szdq_2").html(html);
	$("#in_region").html(html_2);
	$("#sel_xian").html(html_2);
}

//全选行业类别/所在地区
function fz_hylb(name){
	var ids="";
	if(name=="qy_hymc"){
		ids = "hylb_2";
	}else{
		ids = "szdq_2";
	}
	$("#"+ids+" input[name='"+name+"']").prop("checked","true");
	$("#"+ids+" input[name='"+name+"']").parent(".icheckbox_square-green").addClass("checked");
}
//取消全选行业类别/所在地区
function qx_hylb(name){
	$("#chaxun input[name='"+name+"']").removeAttr("checked")
	$("#chaxun input[name='"+name+"']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
}
//查询按钮
function chaxun(){
	var country = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
	if(country.length<1){
		toastr["info"]("至少选择一个地区");
		return;
	}
	$('#metTable1').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization();//初始化
}
//点击确定上传文件
function shangchuan(){

	if($("#file").val() == "" || $("#file").val() == null || $("#file").val() == undefined ) {
		return toastr["info"]("", "请上传文件");
	}
	$("#tishi_modal").modal();
	$.ajaxFileUpload({
		url: BackstageIP+'userManager/batchCreateCompnayUser?description=1&country='+countyName+'&version='+version+'&region='+region, //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file', //文件上传域的ID
		dataType: 'json', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			if(data != undefined){
				if(data.status == "success"){
					$("#creat_modal").modal("hide");
					swal({
						title: "成功",
						text: "文件上传成功！",
						type: "success"
					});
					$("#tishi_modal").modal("hide");
					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization();//刷新表格
				}else{
					if(data.code == "-1"){
						//隐藏标题
						$(".modal-title").hide();
						var html = "<p style='text-align: center;'><strong style='color:red;'>上传文件错误，请下载正确的模板</strong></p><br>" +
						"<p style='text-align: center;'><button type='button' class='btn btn-warning' onclick='quxiaomtk();'><i class='fa fa-undo'></i> 取消</button></p>";
						$("#ImportForm").html(html);
					}else if(data.code == "1"){
						//隐藏标题
						$(".modal-title").hide();

						var html = "<p style='text-align: center;'><strong style='color:red;'>上传文件数据格式错误，请下载错误报告。</strong></p><br>" +
						"<p style='text-align: center;'>" +
						"<a href='"+BackstageIP+"file/download?fileId="+data.error+"' style='text-decoration:underline;' target=_blank>点击下载错误报告</a></p>" +
						"<p style='text-align: center;'><button type='button' class='btn btn-warning' onclick='quxiaomtk();'><i class='fa fa-undo'></i> 取消</button></p>";
						$("#ImportForm").html(html);
					}else{
						$("#creat_modal").modal("hide");
						var str ;
						if (data.code == "" || data.code == null || data.code == undefined ) {
							str = "文件上传失败，请联系管理员！"
						} else {
							str = data.code;
						}
						swal({
							title: "失败",
							text: str,
							type: "error"
						});
					}
					$("#tishi_modal").modal("hide");
				}
			}else{
				$("#tishi_modal").modal("hide");
				toastr["info"]("错误","无返回值")
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			$("#tishi_modal").modal("hide");
			$("#creat_modal").modal("hide");
			swal({
				title: "失败",
				text: "网络异常",
				type: "error"
			});
			console.log(data);
			console.log(e);
		}
	});
}

//创建单条用户
function chuangjian(){
	//企业名称
	var companyName = $("#qymc_in").val();
	//企业状态
	var status = $('input[name="qiyezhuangtai"]').filter(':checked').val();
	//行业类别
	var industry = $("#selec_hylb").val();
	if(industry == ""){
		industry = "-1";
	}
	//省
	var province = $("#sel_sheng").val();
	//市
	var city = $("#sel_shi").val();
	//县
	var country = $("#sel_xian").val();

	var validate = $("#add_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		var data = ajax_async_t(BackstageIP+"userManager/createCompanyUser.do",{companyName:companyName,dataLevel:status,industry:industry,province:province,city:city,country:country},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				quxiaomtk();
				$('#metTable1').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization();//刷新表格
				swal({
					title: "成功",
					text: "创建账号成功！",
					type: "success"
				})
			}else{
				//toastr["info"]("无数据",JSON.stringify(data));
				toastr["info"](data.code.substr(data.code.indexOf(':')+1));
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}
}

//打开修改模态窗
function updata_qy(){
	var row = $("#metTable1").bootstrapTable('getSelections');
	if (row.length>0 ) {
		if(row.length == 1){
			$("#in_userName").html(row[0].userName);//用户名
			$("#in_compnayName").val(row[0].compnayName);//企业名称
			$("#in_region").val(row[0].region);//所在地区
			var industry = row[0].industry;//行业类别
			if(industry == "-1"){
				$("#in_industry").val("");
			}else{
				$("#in_industry").val(industry);
			}
			$("input[type=radio][name='status']").attr("checked",false);//清空状态
			if (row[0].statusName == "简化版" ) {
				$("input[type=radio][name='status'][value='1']").attr("checked",true);//状态
				$("input[type=radio][name='status'][value='1']").click();
			}
			if (row[0].statusName == "通用版" ) {
				$("input[type=radio][name='status'][value='2']").attr("checked",true);//状态
				$("input[type=radio][name='status'][value='2']").click();
			}
			if (row[0].statusName == "专用版" ){
				$("input[type=radio][name='status'][value='3']").attr("checked",true);//状态
				$("input[type=radio][name='status'][value='3']").click();
			}
			
			$("#in_leader").val(row[0].leader);//填报人姓名
			$("#in_phone").val(row[0].phone);//填报人手机
			$("#in_Email").val(row[0].Email);//填报人邮箱
			$("#user_id").val(row[0].userId);//填报人邮箱

			$("#up_modal").modal();
		}else{
			toastr["info"]("", "只能选择一条数据进行修改");
		}
	}else{
		toastr["info"]("", "请选择一条要修改的数据");
	}
}

//点击保存修改
function chuangjian_2(){
	var companyName = $("#in_compnayName").val();//企业名称
	var region = $("#in_region").val();//所在地区
	var industry = $("#in_industry").val();//行业类别
	if(industry == ""){
		industry = "-1";
	}
	var status = $('input[name="status"]').filter(':checked').val();//状态
	var user_id = $("#user_id").val();
	var leader = $("#in_leader").val();//填报人姓名
	var phone = $("#in_phone").val();//填报人手机
	var Email = $("#in_Email").val();//填报人邮箱

	var validate = $("#up_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		var data = ajax_async_t(BackstageIP+"userManager/updateCompanyUser.do",{
			companyName:companyName,
			userId:user_id,
			region:region,
			industry:industry,
			status:status,
//			leader:leader,
//			phone:phone,
//			Email:Email
		},"JSON","1","POST");

		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				quxiaomtk_2();
				swal({
					title: "成功",
					text: "修改成功！",
					type: "success"
				})
				$('#metTable1').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization();//刷新表格
			}else{
				toastr["info"](data.code.substr(data.code.indexOf(':')+1));
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}
}

//删除企业用户
function deleteCompany(){
	var row = $("#metTable1").bootstrapTable('getSelections');
	if (row.length>0 ) {
		var str = "";
		$.each(row,function(i,item){
			str += item.userId+",";
		});
		str = str.substring(0,str.length-1);
		swal({
			title: "您确定要删除这些账号吗？",
			text: "删除后，列表中将不会再显示此账号，请谨慎！",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			closeOnConfirm: false
		},
		function() {
			var data = ajax_async_t(BackstageIP+"userManager/deleteCompanyUser.do",{userId:str,createUserId:dataBase.Login_map.SOLE,version:version},"JSON","1","POST");
			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization();//刷新表格
					swal("删除成功！", "您已经删除了这些账号", "success");
				}else if(data.status == "fail"){
					swal("删除失败", data.code, "error");
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		});
	}else{
		toastr["info"]("请选择要删除的数据");
	}
}

//打开创建用户的模态窗
function creat_user(){
	//显示标题
	$(".modal-title").show();
	$("#creat_modal").modal();
	//企业名称
	$("#qymc_in").val("");
	//行业类别
	$("#selec_hylb").val("");
	//省
	$("#sel_sheng").val("");
	//市
	$("#sel_shi").val("");
	//县
	$("#sel_xian").val("");
	var html = "<div class='form-group' style='padding-top:0px; margin-bottom:1px; margin-left:1px; margin-right:1px;'>";
	html += "<label class='font-noraml' style='color:#FFFFFF;'>文件选择（单选）</label>";
	html += "<a id='mbxz_a' style='float: right;color: red;text-decoration:underline;' href=''>模板下载</a>";
	html += "<input type='file' id='file' name='file' class='file' accept='.xlsx' style='width:100%;'/>";
	html += "<div class='col-sm-12' style='text-align: center;'>";
	html += "<button type='button' class='btn btn-outline btn-lB white' style='margin-right:5px;' onclick='shangchuan();'><i class='fa fa-check'></i> 确定上传</button>";
	html += "<button type='button' class='btn btn-outline btn-lO white' onclick='quxiaomtk();'><i class='fa fa-undo'></i> 取消</button></div>";
	html += "</div>";
	$("#ImportForm").html(html);
	fz_mbxz();//为模板下载赋值
}

//关闭模态窗
function quxiaomtk(){
	$("#creat_modal").modal("hide");
}
//关闭模态窗
function quxiaomtk_2(){
	$("#up_modal").modal("hide");
}

//点击重置按钮
function refresh_company(){
	//全选所在地区
	$("#szdq_2 input[name='classdiqu']").prop("checked","true");
	$("#szdq_2 input[name='classdiqu']").parent(".icheckbox_square-green").addClass("checked");
	$("#q").prop("checked","true");
	$("#q").parent(".icheckbox_square-green").addClass("checked");
	//企业等级
	$('input[name="qyzt"]').removeAttr('checked'); 
	$("#qyzt1").prop("checked","true");
	$("#qyzt2").prop("checked","true");
	$("#qyzt3").prop("checked","true");
	//清空企业名称输入框
	$("#yhmc_inp").val("");
	//重新获取部门行业下拉框
	hq_hylb2();
	chaxun();
	
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
		async:false,
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

//数据初始化
function metTable_initialization(){
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url: BackstageIP+'userManager/findCompanyUser',
		dataType: "json",
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
}

//配置参数
function queryParams(params) {  
	//行业类别
	var industry = $("#select_2").val();
	//所在地区
	var country = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var status = "";
	$('input[name="qyzt"]:checked').each(function(){ 
		status += $(this).val()+",";
	});
	status = status.substring(0, status.length-1);
	var companyName = $("#yhmc_inp").val();
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.version = version;//版本号
	temp.createUserId = dataBase.Login_map.SOLE;
	temp.industry = industry;//行业类别
	temp.country = country;//所在地区
	temp.status = status;//状态
	temp.companyName = companyName;//企业名称
	return temp;
}
//获取选中行数据
function getSelectedRow() {
	var index = $('#metTable1').find('tr.success').data('index');
	return $('#metTable1').bootstrapTable('getData')[index];
}
//全选 选项联动
function notallsel(){
	var checkList = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var regionList = $("input:checkbox[name='classdiqu']").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var regionSize = regionList.split(",");
	if(checkList != ""){
		var checkSize = checkList.split(",")
		if(regionSize.length == checkSize.length){
			$("#q").prop("checked","true");
			$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#q").removeAttr("checked");
			$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#q").removeAttr("checked");
		$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	
}
//全选与全不选
function all_checkbox(){
	var checkbox = document.getElementById('q');
	  if(checkbox.checked){
		  $("input:checkbox[name='classdiqu']").prop("checked",true); 
	  }else{
		  $("input:checkbox[name='classdiqu']").prop("checked",false);
	  } 
}
/**
 * 导出账号信息
 */
function export_all (){
	//行业类别
	var industry = $("#select_2").val();
	//所在地区
	var country = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var status = "";
	$('input[name="qyzt"]:checked').each(function(){ 
		status += $(this).val()+",";
	});
	status = status.substring(0, status.length-1);
	var companyName = $("#yhmc_inp").val();
	if ( industry == "" || industry == null || industry == undefined ) {
		return toastr["info"]("", "请选择行业");
	} else if ( country == "" || country == null || country == undefined ) {
		return toastr["info"]("", "请选择所在地区");
	} else if ( status == "" || status == null || status == undefined ) {
		return toastr["info"]("", "请选择企业等级");
	}else {
		window.location.href = BackstageIP+"/userManager/exportCompanyUser?industry="+industry+"&country="+country+"&status="+status+"&companyName="+companyName

	}  
}
