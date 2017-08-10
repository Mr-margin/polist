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
	level=dataBase.Login_map.TYPE;
	metTable_initialization();
	//validate实时验证
	$("#add_Form").validate({
		onfocusout: function(element){
			$(element).valid();
		}
	});  
});

//调用父页面的全局变量
var dataBase = parent.dataBase;
var version = "1.0";
var level;
//负责行业中的添加用户
function add_yonghu(){
	var industries =  $("input:checkbox[class='indus']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
	if(industries.length<1){
		toastr["info"]("", "请选择要添加的行业");
		return;
	}
	hq_szdw_2();
	$("#szdw_1_2").height($("#szdw_2_2").height());
	$('#metTable2').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization_2();
	$("#modal_foot_2").html("<button type='button' class='btn btn-outline btn-lB' onclick=\"add_button_2();\">确定添加</button><button type='button' class='btn btn-outline btn-lO' onclick=\"quxiaomtk_2();\">取消</button>");
	$("#fzhy_modal").modal();
}

//取消添加用户模态窗
function quxiaomtk_2(){
	$("#fzhy_modal").modal("hide");
}
//确定创建市级填报用户
function chuangjian(){
	var informant = $("#tbr_in").val();
	var office = $('#szdw_in').val();
	var department = $("#szks_in").val();
	var phone = $("#lxdh_in").val();
	var email = $("#yx_in").val();
	var validate = $("#add_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		var datas = {
				createUserId:dataBase.Login_map.SOLE,
				informant:informant,
				office:office,
				department:department,
				phone:phone,
				email:email,
				version:version,
				jurisdiction:"排放计算用户"
		}
		datas = JSON.stringify(datas);
		var data = ajax_async_t(BackstageIP+"cityUser/add.do",{data:datas},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				quxiaomtk();
				$('#metTable1').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization();
				swal({
					title: "成功",
					text: "添加排放计算用户成功！",
					type: "success"
				})
			}else{
				swal({
					title: "添加失败",
					text: data.error,
					type: "error"
				})
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}
}

//修改信息
function updata_sjtb(){
	$("#add_button").hide();
	$("#up_button").show();
	var row = $("#metTable1").bootstrapTable('getSelections');
	if (row.length>0 ) {
		if(row.length == 1){
			$("#title_zh").html('用户修改');
			$("#userid").val(row[0].userId);
			$("#tbr_in").val(row[0].informant);
			$('#szdw_in').val(row[0].office);
			$("#szks_in").val(row[0].department);
			$("#lxdh_in").val(row[0].phone);
			$("#yx_in").val(row[0].email);
			$("#creat_modal").modal(); 
		}else{
			toastr["info"]("", "只能选择一条数据进行修改");
		}
	}else{
		toastr["info"]("", "请选择一条要修改的数据");
	}
}

//点击确定修改
function xiugai(){
	var userId = $("#userid").val();
	var informant = $("#tbr_in").val();
	var office = $('#szdw_in').val();
	var department = $("#szks_in").val();
	var phone = $("#lxdh_in").val();
	var email = $("#yx_in").val();
	var validate = $("#add_Form").validate();//引号内是表单ID
	//如果不为空的话就是通过了调用提交方法
	if(validate.form()){
		var datas = {
				userId:userId,
				createUserId:dataBase.Login_map.SOLE,
				informant:informant,
				office:office,
				department:department,
				phone:phone,
				email:email,
				version:version,
				jurisdiction : "排放计算用户"
		}
		datas = JSON.stringify(datas);
		var data = ajax_async_t(BackstageIP+"cityUser/update.do",{data:datas},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				quxiaomtk();
				chaxun();
				swal({
					title: "成功",
					text: "修改排放计算用户成功！",
					type: "success"
				})
			}else{
				toastr["info"]("错误信息",data.error);
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}

	}
}
//删除信息
function del_dw(){
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
			var data = ajax_async_t(BackstageIP+"cityUser/delete.do",{userIds:str,createUserId:dataBase.Login_map.SOLE,version:version},"JSON","1","POST");
			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					chaxun();
					swal("删除成功！", "您已经删除了这些账号", "success");
				}else if(data.status == "fail"){
					swal("删除失败", data.error, "error");
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
	$("#title_zh").html('账号创建');
	$("#add_button").show();
	$("#up_button").hide();
	$("#creat_modal").modal();
}

//点击查询
function chaxun(){
	$('#metTable1').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization();
}
//关闭模态窗
function quxiaomtk(){
	$("#creat_modal").modal("hide");

	$("#userid").val("");
	$("#tbr_in").val("");
	$('#szdw_in').val("");
	$("#szks_in").val("");
	$("#lxdh_in").val("");
	$("#yx_in").val("");
	$("#tbr_in-error").hide();
	$('#szdw_in-error').hide();
	$("#lxdh_in-error").hide();
	$("#yx_in-error").hide();
}
//数据初始化
function metTable_initialization(){
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url: BackstageIP+'cityUser/list.do',
		dataType: "json",
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
	var dw_value1 = $("input:checkbox[name='classdanwei']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(",,,");
	var dw_data = dw_value1.split(",,,");
	var dwdatalen = dw_data.length;
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
//	temp.search = params.search;
	temp.version = version;//版本号
	temp.createUserId = dataBase.Login_map.SOLE;
	temp.informant = $("#taskName").val();//所在单位
	temp.jurisdiction = "排放计算用户";
	var temps = JSON.stringify(temp);
	return {data:temps};
}


