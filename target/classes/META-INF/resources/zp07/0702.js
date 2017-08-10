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
	hq_szdw();//所在单位
	$("#szdw_1").height($("#szdw_2").height());
	hq_fzhy();//负责行业
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
//存放负责行业的json，每次进行临时操作的时候，暂时存放到这个表格中，点击保存操作的时候，就将这个传到后台
var fzhy_map = {
		createUserId:dataBase.Login_map.SOLE,
		mappings:[]
};

//所在单位的选项
function hq_szdw(){
	var data = ajax_async_t(BackstageIP+"cityUser/findOffices.do",{version:version,createUserId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			var html = "<div class='checkbox checkbox-info' style='margin-bottom: 0px;margin-top: 0px;'>";
			var datalen = data.data.length
			if(datalen>0){
				html += "<input id='all_o' type='checkbox' value='全选' name='all_office' checked onclick="+"checkall('all_o','classdanwei')"+"><label for='all_o'>全选</label>";
			}
			for(var i=0; i<datalen; i++){
				html += "<input id='office"+i+"' type='checkbox' value='"+data.data[i]+"' onclick=notallsel('1') name='classdanwei'>";
				html += "<label for='office"+i+"'>"+data.data[i]+"</label>";
			}
			html += "</div>"

				$("#szdw_2").html(html);

			$("#szdw_2 input[name='classdanwei']").prop("checked","true");
			$("#szdw_2 input[name='classdanwei']").parent(".icheckbox_square-green").addClass("checked");
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//所在单位的选项
function hq_szdw_2(){
	var data = ajax_async_t(BackstageIP+"cityUser/findOffices.do",{version:version,createUserId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			var html = "<div class='checkbox checkbox-info' style='margin-bottom: 0px;margin-top: 0px;'>";
			var datalen = data.data.length
			if(datalen>0){
				html += "<input id='all_o2' type='checkbox' value='全选' name='all_office' checked onclick="+"checkall('all_o2','classdanwei_2')"+"><label for='all_o2'>全选</label>";
			}
			for(var i=0; i<datalen; i++){
				html += "<input id='2_office"+i+"' type='checkbox' value='"+data.data[i]+"' onclick=notallsel('2') name='classdanwei_2'>";
				html += "<label for='2_office"+i+"'>"+data.data[i]+"</label>";
			}
			html += "</div>"
				$("#szdw_2_2").html(html);

			$("#szdw_2_2 input[name='classdanwei_2']").prop("checked","true");
			$("#szdw_2_2 input[name='classdanwei_2']").parent(".icheckbox_square-green").addClass("checked");
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//点击某个人的红叉
function del_name(sourceId,userid){
	var arr;
	for(var i=0; i<fzhy_map.mappings.length; i++){
		if(fzhy_map.mappings[i].sourceId == sourceId){
			arr = fzhy_map.mappings[i].userIds;
		}
	}
	if(change_flag.contains(sourceId+userid)){
		change_flag.removeByValue(sourceId+userid);
	}else{
		change_flag.push(sourceId+userid);
	}
	arr.splice($.inArray(userid,arr),1);
	$("#tiaojian"+sourceId+userid).remove();
}

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

var table_data;
function hq_fzhy(){
	fzhy_map.mappings=[];
	fzhy_map.createUserId=dataBase.Login_map.SOLE;
	var datas = ajax_async_t(BackstageIP+"cityUser/findSource.do",{version:version,createUserId:dataBase.Login_map.SOLE,userType:"4"},"JSON","1","POST");
	if(datas != undefined&&datas!=null&&datas!=""){
		if(datas.status == "success"){
			table_data=datas;
			var data = datas.data;
			var element;
			var html = "";
			var fzhy_json = {};
			var i=0;
			for(; i<data.length; i++){
				element = data[i];
				html += "<tr style='text-align:left'><td  rowspan='"+element.value.length+"' style='width: 20%;border: 1px solid #e7eaec; text-align:left;'>"+"<div class='col-sm-2'></div>"+"<div class='col-sm-10 checkbox checkbox-info'><input  id='"+element.id+"' type='checkbox' value='' onclick='check_1("+element.id+")' name='section'><label for='"+element.id+"' style='margin-right:0px'>"+element.name+"</label><code class='code1' id='code"+element.id+"'></code></div></td>";
				for(var y=0; y<element.value.length; y++){
					//临时存放行业 与 它所有的用户
					fzhy_json = {
							sourceId:element.value[y].id,
							userIds:[]
					}
					if(y != 0){
						html += "<tr style='text-align:left'>"
					}
					html += "<td style='width: 20%;border: 1px solid #e7eaec;'>"+"<div class='col-sm-2'></div>"+"<div class='col-sm-10  checkbox checkbox-info' style='margin:0px'><input class='indus' id='"+element.value[y].id+"' type='checkbox' value='"+element.value[y].id+"' value='"+element.value[y].name+"' onclick='check_3("+element.id+")' name='"+element.id+"'><label for='"+element.value[y].id+"'>"+element.value[y].name+"</label></div></td>";
					html += "<td id='id"+element.value[y].id+"' style='width: 60%;border: 1px solid #e7eaec;'>";

					var ele_2 = element.value[y].value;
					for(var x=0; x<ele_2.length; x++){
						//依次将用户名称放入数组
						
						fzhy_json.userIds.push(ele_2[x].userId);
						html += "<div class='tiaojian' id='tiaojian"+element.value[y].id+ele_2[x].userId+"'><label>"+ele_2[x].informant+"</label>";
						if(ele_2[x].flag == "2"){//如果状态为2，则表示可以删除
							html += "<em onclick=\"del_name('"+element.value[y].id+"','"+ele_2[x].userId+"');\"></em>";
						}
						html += "</div>";
					}
					html += "</td>";
					//html += "<td style='width: 10%;border: 1px solid #e7eaec;'><a onclick=\"add_yonghu('"+element.value[y].id+"');\">添加用户</a></td></tr>";
					fzhy_map.mappings.push(fzhy_json);
				}
			}
			$("#hy_body").html(html);
		}else{
			toastr["info"]("无数据",JSON.stringify(datas));
		}
	}else{
		toastr["info"]("无数据","cityUser/findSource.do 无返回值");
	}
}


//取消添加用户模态窗
function quxiaomtk_2(){
	$("#fzhy_modal").modal("hide");
}
var change_flag=[];
//保存添加负责行业的操作
function quedingadd(){
	if(change_flag.length<1)
	{
		toastr["info"]("没有新修改的记录");
		return;
	}
	datas = JSON.stringify(fzhy_map);
	var data = ajax_async_t(BackstageIP+"cityUser/setSource.do",{data:datas},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			change_flag=[];
			swal({
				title: "成功",
				text: "设置负责行业成功！",
				type: "success"
			})
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//确定添加负责行业操作到页面上
function add_button_2(){
	var industries =  $("input:checkbox[class='indus']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
	var row = $("#metTable2").bootstrapTable('getSelections');
	if(row.length<1){
		toastr["info"]("", "请选择要添加的用户");
		return;
	}
	var str = "";//存id
	var name = "";//存名字
	//生成名字id数组
	$.each(row,function(i,item){
		str += item.userId+",";
		name += item.informant+",";
	});
	str = str.substring(0,str.length-1);
	name = name.substring(0,str.length-1);
	var strs = str.split(",");
	var names = name.split(",");
	for(var j=0;j<industries.length;j++){
		//对页面进行赋值
		var html = $("#id"+industries[j]).html();
		//对全局变量fzhy_map进行赋值
		for(var i=0; i<fzhy_map.mappings.length; i++){
			if(fzhy_map.mappings[i].sourceId == industries[j]){
				for(var y=0; y<strs.length; y++){
					if($.inArray(strs[y], fzhy_map.mappings[i].userIds) == -1){
						fzhy_map.mappings[i].userIds.push(strs[y]);
						html += "<div class='tiaojian' id='tiaojian"+industries[j]+strs[y]+"'><label>"+names[y]+"</label><em onclick=\"del_name('"+industries[j]+"','"+strs[y]+"');\"></em></div>";
						if(change_flag.contains(industries[j]+strs[y])){
							change_flag.removeByValue(industries[j]+strs[y]);
						}else{
							change_flag.push(industries[j]+strs[y]);
						}
					
					}else
					{
						toastr["info"]("错误信息", names[y]+"用户已存在");
					}
				}
			}
		}
		$("#id"+industries[j]).html(html);
	}
	$("#fzhy_modal").modal("hide");
	chaxun_2();
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
				version:version
		}
		datas = JSON.stringify(datas);
		var data = ajax_async_t(BackstageIP+"cityUser/add.do",{data:datas},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				hq_szdw();//获取单位
				quxiaomtk();//关闭模态窗
				chaxun();//刷新主页面表格
				//chaxun_2();//刷新添加行业模态窗的表格
				swal({
					title: "成功",
					text: "添加市填报用户成功！",
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
				version:version
		}
		datas = JSON.stringify(datas);
		var data = ajax_async_t(BackstageIP+"cityUser/update.do",{data:datas},"JSON","1","POST");
		if(data != undefined&&data!=null&&data!=""){
			if(data.status == "success"){
				hq_szdw();
				quxiaomtk();
				chaxun();
				swal({
					title: "成功",
					text: "修改市填报用户成功！",
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
					hq_szdw();
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

//点击重置按钮
function refresh_company(){
	$("#szdw_2 input[name='classdanwei']").prop("checked","true");
	$("#szdw_2 input[name='classdanwei']").parent(".icheckbox_square-green").addClass("checked");
	$("#all_o").prop("checked","true");
	$("#all_o").parent(".icheckbox_square-green").addClass("checked");
	chaxun();
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
	var dw_value1 = $("input:checkbox[name='classdanwei']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
//	if(dw_value1.length<1){
//		toastr["info"]("至少选择一个单位");
//		return;
//	}
	$('#metTable1').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization();
}
//点击查询2
function chaxun_2(){
	var dw_value1 = $("input:checkbox[name='classdanwei_2']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
	if(dw_value1.length<1){
		toastr["info"]("至少选择一个单位");
		return;
	}
	$('#metTable2').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization_2();
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
	var dw_value =[];
	var dwdatalen = dw_data.length;
	for(var i=0; i<dwdatalen; i++){
		dw_value.push(dw_data[i]);
	}
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.version = version;//版本号
	temp.createUserId = dataBase.Login_map.SOLE;
	temp.office = dw_value;//所在单位
	var temps = JSON.stringify(temp);
	return {data:temps};
}
//数据初始化
function metTable_initialization_2(){
	$('#metTable2').bootstrapTable({
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
		queryParams: queryParams_2, //参数
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
function queryParams_2(params) {  
	var dw_value1 = $("input:checkbox[name='classdanwei_2']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(",,,");
	var dw_data = dw_value1.split(",,,");
	var dw_value =[];
	var dwdatalen = dw_data.length;
	for(var i=0; i<dwdatalen; i++){
		dw_value.push(dw_data[i]);
	}
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.search = params.search;
	temp.version = version;//版本号
	temp.createUserId = dataBase.Login_map.SOLE;
	temp.office = dw_value;//所在单位
	var temps = JSON.stringify(temp);
	return {data:temps};
}
Array.prototype.contains = function ( needle ) {
	  for (i in this) {
	    if (this[i] == needle) return true;
	  }
	  return false;
	}
Array.prototype.removeByValue = function(val) {
	  for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      break;
	    }
	  }
	}

function change_table(num){
	if(num==2){
		$("#all").show();
	}else{
		$("#all").hide();
	}
}
//行业
function check_3(id){
	var check_arry =  $("input:checkbox[name='"+id+"']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get();
	if(check_arry.length==table_data.data[id-1].value.length){
		$("#"+id).prop("checked","true");
		$("#code"+id).html("(全部选择)");
	}else{
		if(check_arry.length<1){
			$("#code"+id).html("");
			$("#"+id).removeAttr("checked");
		}else{
			$("#code"+id).html("(部分选择)");
			$("#"+id).prop("checked","true");
		}
	}
}
//部门
function check_1(id){
		if($("#"+id).is(':checked')){
			$("input:checkbox[name='"+id+"']").prop("checked","true");
			$("#code"+id).html("(全部选择)");
		}else{
			$("input:checkbox[name='"+id+"']").removeAttr("checked");
			$("#code"+id).html("");
		}
}
function checkall(param,param1){
	if($("#"+param)["0"].checked == true){
		$("input[name='"+param1+"']").prop("checked","true");
		$("input[name='"+param1+"']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("input[name='"+param1+"']").removeAttr("checked")
		$("input[name='"+param1+"']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}
//全选 选项联动
function notallsel(n){
	var str="";
	var str1="";
	if(n=="1"){
		str="all_o";
		str1="classdanwei";
	}else{
		str="all_o2";
		str1="classdanwei_2";
	}
	var checkList = $("input:checkbox[name='"+str1+"']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var regionList = $("input:checkbox[name='"+str1+"']").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	var regionSize = regionList.split(",");
	if(checkList != ""){
		var checkSize = checkList.split(",")
		if(regionSize.length == checkSize.length){
			$("#"+str).prop("checked","true");
			$("#"+str).parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#"+str).removeAttr("checked");
			$("#"+str).parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#"+str).removeAttr("checked");
		$("#"+str).parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	
}
function selhb(){
if($("#selhb").is(':checked')){
		
		$("#hy_body :input").prop("checked","true");
		$("#hy_body :input").parent(".icheckbox_square-green").addClass("checked");
		$(".code1").html("全部选择");
	}else{
		$("#hy_body :input").removeAttr("checked");
		$("#hy_body :input").parent(".icheckbox_square-green").removeAttr("checked");
		$(".code1").html("");
			}
}
/**
 * 导出全部用户
 */
function export_all (){
	var dw_value1 = $("input:checkbox[name='classdanwei']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(",,,");
	var dw_data = dw_value1.split(",,,");
	var dw_value =''
	var dwdatalen = dw_data.length;
	for(var i=0; i<dwdatalen; i++){
		dw_value+=dw_data[i]+",";
	}
	dw_value = dw_value.substring(0,dw_value.length-1)
	console.log(dw_value)
	if ( dw_value == "" || dw_value == null || dw_value == undefined ) {
		return toastr["info"]("", "请选择所在单位");
	} else {
		window.location.href = BackstageIP+"/cityUser/exportExcel?createUserId="+dataBase.Login_map.SOLE+"&office="+dw_value

	}  
	
	
}
