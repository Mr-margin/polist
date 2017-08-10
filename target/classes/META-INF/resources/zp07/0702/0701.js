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

//部门行业 以及对应的关系
var trade = {全部部门:["全部行业"],化石燃烧固定燃烧源:["电力","工业锅炉","民用源"],工艺过程源:["玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业"],移动源:["机动车","飞机","船舶","非道移机械"],溶剂使用源:["工业喷涂","建筑涂料","印刷印染","农药使用","其它溶剂使用"],农业源:["氮肥施用","固氮植物","秸秆堆肥","人体粪便","畜禽养殖","土壤本底"],扬尘源:["道路扬尘","堆场扬尘","施工扬尘","土壤扬尘"],存储运输源:["油气储存","油气输送","加油站"],生物质燃烧源:["生物质燃料","生物质开放燃烧"],废物处理源:["废水处理","固废处理","烟气脱硝"],其他排放源:["餐饮油烟"]};
var bumen = ["全部部门","化石燃烧固定燃烧源","工艺过程源","移动源","溶剂使用源","农业源","扬尘源","存储运输源","生物质燃烧源","废物处理源","其他排放源"];
var hangye = ["电力","工业锅炉","民用源","玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业","机动车","飞机","船舶","非道移机械","工业喷涂","建筑涂料","印刷印染","农药使用","其它溶剂使用","氮肥施用","固氮植物","秸秆堆肥","人体粪便","畜禽养殖","土壤本底","道路扬尘","堆场扬尘","施工扬尘","土壤扬尘","油气储存","油气输送","加油站","生物质燃料","生物质开放燃烧","废水处理","固废处理","烟气脱硝","餐饮油烟"];

//调用父页面的全局变量
var dataBase = parent.dataBase;
var version = "1.0";
var region=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';

//获取企业行业类别
function hq_hylb1(){
	change_hy();
}

//获取账号列表行业类别
function hq_hylb2(){
	var html = "";
	for(var i=0; i<bumen.length; i++){
		html += "<option value='"+bumen[i]+"'>"+bumen[i]+"</option>";
	}
	$("#select_1").html(html);
	hy_xlk();//行业下拉框只有全部选择
}

//行业下拉框只有全部选择
function hy_xlk(){
	var str = $("#select_1").val();
	var html = "";
	$.each(trade[str],function(i,item){
		html += '<option value ="'+item+'">'+item+'</option>';
	})
	$("#select_2").html(html);
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
	if(name=="qy_hymc") ids = "hylb_2";
	else ids = "szdq_2";
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
//创建单条用户
function chuangjian(){
	var validate = $("#add_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		if ( $("#qdName_select").val() == "" || $("#qdName_select").val() == null || $("#qdName_select").val() == undefined ){
			return toastr["info"]("", "请选择所在行业。");
		}
		var data = ajax_async_t(BackstageIP+"userCheck/createCheckUser",{industry:$("#qdName_select").val(),region:$("#sel_xian").val(),regionName:$("#sel_xian").find("option:selected").text(),userId:dataBase.Login_map.SOLE,phone:$("#lxdh_in").val(),email:$("#yx_in").val(),name:$("#tbr_in").val()},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				$("#creat_modal").modal("hide");
				$('#metTable1').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization();//刷新表格
				swal({
					title: "成功",
					text: "创建账号成功！",
					type: "success"
				})
			}else{
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
			$("#title_zh").html("用户修改");
			$("#add_button").hide();
			$("#up_button").show();
			$("#creat_modal").modal();
			
			console.log(row);
			$("#tbr_in").val(row[0].name);
			$("#sel_xian").val(row[0].regionId);
			updata_change_hy(row[0].industry);
			var str = row[0].industry.split(",");
			$('#qdName_select').selectpicker('val', str);
			
			$("#lxdh_in").val(row[0].phone);
			$("#yx_in").val(row[0].email);
			
		}else{
			toastr["info"]("", "只能选择一条数据进行修改");
		}
	}else{
		toastr["info"]("", "请选择一条要修改的数据");
	}
}

//点击保存修改
function xiugai(){
	var validate = $("#add_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		if ( $("#qdName_select").val() == "" || $("#qdName_select").val() == null || $("#qdName_select").val() == undefined ){
			return toastr["info"]("", "请选择所在行业。");
		}
		var row = $("#metTable1").bootstrapTable('getSelections');
		var data = ajax_async_t(BackstageIP+"userCheck/updateCheckUser",{
			industry:$("#qdName_select").val(),
			region:$("#sel_xian").val(),
			phone:$("#lxdh_in").val(),
			email:$("#yx_in").val(),
			id:row[0].id,
			name:$("#tbr_in").val()
		},"JSON","1","POST");

		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				$("#creat_modal").modal('hide');
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
//行业（根据县）
function change_hy (value) {
	var data = ajax_async_t(BackstageIP+"userCheck/selectIndustry",{region:$("#sel_xian").val()},"JSON","1","POST");
	if (data != "" && data != null && data != undefined ) {
		if (data.status == "success" ) {
			if ( data.data.length >0 ) {
				$("#qdName_select").empty();
				$.each(data.data,function(i,g){
					$("#qdName_select").append('<option value = '+g+' selected>'+g+'</option>');
				});
				$('#qdName_select').selectpicker('refresh');
				$('#qdName_select').selectpicker('val', "");
			} else {
				if ( value!="" && value!=null && value != undefined ) toastr["info"]("该地区没有可选的所在行业。");
				
			}
		}
	}
}
//修改时候更新行业
function updata_change_hy (str) {
	$("#qdName_select").empty();
	for (var i = 0 ; i<str.split(",").length;i++ ) {
		$("#qdName_select").append('<option value = '+str.split(",")[i]+' selected>'+str.split(",")[i]+'</option>');
	}
	var data = ajax_async_t(BackstageIP+"userCheck/selectIndustry",{region:$("#sel_xian").val()},"JSON","1","POST");
	if (data != "" && data != null && data != undefined ) {
		if (data.status == "success" ) {
			$.each(data.data,function(i,g){
				$("#qdName_select").append('<option value = '+g+' selected>'+g+'</option>');
			});
			$('#qdName_select').selectpicker('refresh');
		}
	}
}

//删除企业用户
function deleteCompany(){
	var row = $("#metTable1").bootstrapTable('getSelections');
	if (row.length>0 ) {
		var str = "";
		$.each(row,function(i,item){
			str += item.id+",";
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
			var data = ajax_async_t(BackstageIP+"userCheck/deleteCheckUser",{ids:str},"JSON","1","POST");
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
function creat_user(str){
	$("#title_zh").html("用户创建");
	$("#add_button").show();
	$("#up_button").hide();
	$("#creat_modal").modal();
//	hq_szdq_add();
	$("#sel_xian").val("");
	clear();
}

function quxiaomtk (){
	$("#creat_modal").modal('hide');
}
//清空模态窗口内容
function clear (){
	$("#tbr_in").val("");
	$("#lxdh_in").val("");
	$("#yx_in").val("");
	$("#qdName_select").empty();
	
	hq_hylb1();
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
		traditional : true,
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
		url: BackstageIP+'userCheck/selectCheckUser',
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
	//所在地区
	var country = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var companyName = $("#yhmc_inp").val();
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.userId = dataBase.Login_map.SOLE;
	temp.industry = $("#select_2").val();//行业类别
	temp.region = country;//所在地区
	temp.name = $("#yhmc_inp").val();//企业名称
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
 * 导出全部
 */
function  export_all(){
	//行业类别
	var industry = $("#select_2").val();
	//所在地区
	var country = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if ( country == "" || country == null || country == undefined ) {
		toastr["info"]("", "请选择地区");
	} else {
		window.location.href = BackstageIP+"/userCheck/exportCheckUser?industry="+industry+"&userId="+dataBase.Login_map.SOLE+"&region="+country+"&name="+$("#yhmc_inp").val()
	}
 
}
