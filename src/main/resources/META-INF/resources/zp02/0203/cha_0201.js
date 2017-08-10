jQuery.support.cors = true;
var pkid="";//查看还是编辑的ID
var task_type = "";//查看还是编辑

$(function(){
	$("#data_1 .input-group.date").datepicker({
		endDate:'+0y',
		minViewMode : 2,
		startView : 1,
		keyboardNavigation : !1,
		forceParse : !1,
		autoclose : !0,
		format: "yyyy",
	})
	$("#data_2 .input-group.date").datepicker({
		startDate: '+0d',
		minViewMode: 0,
		keyboardNavigation: !1,
		forceParse: !1,
		autoclose: !0,
		format: "yyyy-mm-dd",
	});

	//获取市级填报那些行业有人
	var hdata = ajax_async_t(BackstageIP+"taskDataFill/findUserCountInSource.do",{version:version,createUserId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(hdata != undefined&&hdata!=null&&hdata!=""){
		if(hdata.status == "success"){
			sj_had = hdata.data.city;
			hb_had = hdata.data.hb;
		}else{
			toastr["info"](JSON.stringify(sj_hdata));
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
//
	$("input[type=radio][name=qiyezhuangtai][value='1']").attr("checked",'checked');//将i企业未关停选中
	
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	pkid=Request['pkid'];
	task_type = Request['task_type'];
	if ( task_type == "1" ) {
		$("#update_button").hide();
		$("#rwmc").prop("disabled",true);
		$("#qdnf").prop("disabled",true);
		$("#rwjzrq").prop("disabled",true);
	}
	hb_data = sj_data;
	var tb={id:11,
			name:"数据填报",
			value:[
     	          {
    	        	  id:1001,value:"末端去除效率",name:[]
    	          },{
    	        	  id:1002,value:"气象参数",name:[]
    	          },{
    	        	  id:1003,value:"社会经济参数",name:[]
    	          },{
    	        	  id:1005,value:"时空分配参数",name:[]
    	          },{
    	        	  id:1004,value:"源谱数据",name:[]
    	          }
    	          ]};
	qy_table();//企业用户表格
	hb_data.push(tb);
	taskMessage();
	
	sj_table();//市级填报部门表格
	hb_table();
	

});

//调用父页面的全局变量
var dataBase = parent.dataBase;
var version ="1.0";
var sj_had = [];//市级用户中行业有人的数组。
var hb_had = [];//市级用户中行业有人的数组。
var qy_had = {};//企业用户中行业有人的数组。
var notIndustry = 0;//对于企业用户来说，没有选择任何行业的企业总数

//企业用户表格
function qy_table(){
	var sourcenum;//某一部门下，行业总的个数
	var countnum;//某一部门下，行业有值的个数
	var industrynum;//
	var totle = 0;
	var status = $('input[name="qiyezhuangtai"]').filter(':checked').val();//企业状态
	var datas = ajax_async_t(BackstageIP+"taskDataFill/findCompanyNumGroupByIndustry.do",{version:version,userId:dataBase.Login_map.SOLE,status:status},"JSON","1","POST");
	if(datas != undefined&&datas!=null&&datas!=""){
		if(datas.status == "success"){
			qy_had = datas.data;
			//为复选框全选
			for(var i=0; i<qy_data.length; i++){
				sourcenum = qy_data[i].value.length;
				countnum = 0;
				industrynum = 0;
				notIndustry = qy_had.count;
				for(var y=0; y<qy_data[i].value.length; y++){//循环bmhy.js其中一项的value
					if(datas.data[qy_data[i].value[y].id] > 0){//判断后台返来的这个个数是否是0
						countnum += parseInt(datas.data[qy_data[i].value[y].id]);
						industrynum++;
						//部门
						$("#qy_tbody input[name='qy_checkbox"+i+"'][value='"+qy_data[i].name+"']").prop("disabled",false);
//							//行业
						$("#qy_tbody input[name='qy_add_class"+i+"'][value='"+qy_data[i].value[y].id+"']").prop("disabled",false);
					}
				}
//				if ( qy_font ){
//					if(!countnum > 0){//循环完这个部门后，如果这个部门内的行业没有一个有人
//						$("#qy_code"+i).html("");
//					}else if(industrynum == sourcenum){//循环完这个部门后，如果这个部门内的行业全部有人
//						$("#qy_code"+i).html("(全部选择,共"+countnum+"个企业)");
//					}else{//循环完这个部门后，如果这个部门内的行业部分有人
//						$("#qy_code"+i).html("(部分选择,共"+countnum+"个企业)");
//					}
					totle += countnum;
//				}
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
	console.log(sj_data);
	console.log(sj_had)
	for(var i=0; i<sj_data.length; i++){
		sourcenum = sj_data[i].value.length;
		countnum = 0
		for(var y=0; y<sj_data[i].value.length; y++){
			if(sj_had.length > 0){
				for(var x=0; x<sj_had.length; x++){
					if(sj_had[x].sourceId == sj_data[i].value[y].id){
						countnum += 1;
						if(sj_data[i].value[y].id== 42 ){
							console.log(sj_had[x].sourceId);
							console.log(i)
						}
						
						//部门
						$("#sj_tbody input[name='sj_checkbox"+i+"'][value='"+sj_data[i].name+"']").prop("disabled",false);
//						//行业
						$("#sj_tbody input[name='sj_add_class"+i+"'][value='"+sj_data[i].value[y].id+"']").prop("disabled",false);
					}
				}
			}
		}
	}
}
//环保部门表格
function hb_table(){
	var sourcenum;//某一部门下，行业总的个数
	var countnum;//某一部门下，行业有值的个数
	//选中复选框
	for(var i=0; i<hb_data.length; i++){
		sourcenum = hb_data[i].value.length;
		countnum = 0
		for(var y=0; y<hb_data[i].value.length; y++){
			if(hb_had.length > 0){
				for(var x=0; x<hb_had.length; x++){
					if(hb_had[x].sourceId == hb_data[i].value[y].id){
						countnum += 1;
						$("#tab-3 input[name='hb_checkbox"+i+"'][value='"+hb_data[i].name+"']").prop("disabled",false);
						$("#tab-3 input[name='hb_add_class"+i+"'][value='"+hb_data[i].value[y].id+"']").prop("disabled",false);
					}
				}
			}
		}
	}
}
/**
 * 任务的详细信息
 */
var closeStatus = "" ;

var qy_font = false ; //企业文字显示（红色）
function taskMessage(){
	var data = ajax_async_t(BackstageIP+"taskDataFill/info.do",{version:version,masterTaskId:pkid,createUserId:dataBase.Login_map.SOLE},"JSON","POST");
	if ( data !="" && data!=null && data != undefined ) {
		if ( data.status == "success" ) {
			$("#rwmc").val(data.data.name);
			$("#qdnf").val(data.data.goalYear);
			$("#rwjzrq").val(data.data.endTime);
			$('input[name="qiyezhuangtai"][value='+data.data.enterpriceUserFilter.closeStatus+']').prop("checked","true");
			closeStatus =data.data.enterpriceUserFilter.closeStatus;
			var qy_checked = data.data.enterpriceUserFilter.mapping;
			if ( qy_checked.length > 0 ) {
				for ( var i = 0 ; i < qy_checked.length; i ++ ) {
					for ( var j = 0 ; j < 10 ; j ++ ) {
						$("#qy_tbody input[name='qy_add_class"+j+"'][value='"+qy_checked[i]+"']").prop("checked","true");
						$("#qy_tbody input[name='qy_add_class"+j+"'][value='"+qy_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
						$("#qy_tbody input[name='qy_add_class"+j+"'][value='"+qy_checked[i]+"']").prop("disabled","true");
						djhy('qy_add_class'+j,'qy',j);
					}
				}
				qy_font = true;
			}
		
			var shi_checked = data.data.cityUserFilter.mapping;
			if ( shi_checked.length > 0 ) {
				for ( var i = 0 ; i < shi_checked.length; i ++ ) {
					for ( var j = 0 ; j < 10 ; j ++ ) {
						$("#sj_tbody input[name='sj_add_class"+j+"'][value='"+shi_checked[i]+"']").prop("checked","true");
						$("#sj_tbody input[name='sj_add_class"+j+"'][value='"+shi_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
						$("#sj_tbody input[name='sj_add_class"+j+"'][value='"+shi_checked[i]+"']").prop("disabled","true");
						djhy('sj_add_class'+j,'sj',j);
					}
				}
			}
			var hb_checked = data.data.hbUserFilter.mapping;
			for ( var i = 0 ; i < hb_checked.length; i ++ ) {
				for ( var j = 0 ; j < 11 ; j ++ ) {
					$("#tab-3 input[name='hb_add_class"+j+"'][value='"+hb_checked[i]+"']").prop("checked","true");
					$("#tab-3 input[name='hb_add_class"+j+"'][value='"+hb_checked[i]+"']").parent(".icheckbox_square-green").addClass("checked");
					$("#tab-3 input[name='hb_add_class"+j+"'][value='"+hb_checked[i]+"']").prop("disabled","true");
				}
			}
		} else {
			toastr["info"]("错误信息", JSON.stringify(data));
		}
		
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//下一页
function qy_button(i){
	if(i==1){
		//$("#sjtb_a").click();
		//document.getElementById('qytb_a').scrollIntoView();//定位锚点
		$("#sjtb_a").tab('show');
	}else if(i==2){
		//$("#qytb_a").click();
		//document.getElementById('sjtb_a').scrollIntoView();//定位锚点
		$("#qytb_a").tab('show');
	}else if(i==3){
		$('#hbbm_a').tab('show');
	}else if(i==4){
		$("#sjtb_a").tab('show');
	}
}

//市级填报用户点击下一页
function sj_button(){
	addTask();
}

//新建任务
function addTask(){
	//任务名称
	var name = $("#rwmc").val();
	//清单年份
	var goalYear = $("#qdnf").val();
	//结束时间
	var rwjzrq = $("#rwjzrq").val();
	//企业用户
	var qy_mapping = [];//企业用户--->部门行业键值对
	for(var i=0; i<qy_data.length; i++){
		var qy_value = $("input:checkbox[name='qy_add_class"+i+"']:checked").map(function(index,elem) {
			return $(elem).val();
		}).get().join(',,,');
		if(qy_value != ""){
			var value_s = qy_value.split(",,,");
			for(var x=0; x<value_s.length; x++){
				qy_mapping.push(value_s[x]);
			}
		}
	};
	var status_qy = $('input[name="qiyezhuangtai"]').filter(':checked').val();//企业状态
	var enterpriceUserFilter = {
			closeStatus:status_qy,
			mapping:qy_mapping
	}	
	//市级填报用户
	var sj_mapping = [];//市填报用户--->部门行业键值对
	for(var i=0; i<sj_data.length; i++){
		var sj_value = $("input:checkbox[name='sj_add_class"+i+"']:checked").map(function(index,elem) {
			return $(elem).val();
		}).get().join(',,,');

		if(sj_value != ""){
			var value_s = sj_value.split(",,,");
			for(var x=0; x<value_s.length; x++){
				sj_mapping.push(value_s[x]);
			}
		}
	}
	var cityUserFilter = {
			mapping:sj_mapping
	}
	var mydate = new Date();
	var strYear = mydate.getFullYear();
	var strMonth = (mydate.getMonth()+1);
	var strDate = mydate.getDate();
	//开始传后台
	if(name == ""){
		toastr["info"]("请填写任务名称");
		//$('#title').scrollIntoView();//定位锚点
		var oInput = $("#rwmc");
		oInput.focus();
	}else if(!testmc(name)){
		toastr["info"]("只能填写汉字、英文字母、数字和下划线");
		var oInput = document.getElementById("rwmc");
		oInput.focus();
	}else if(name.length>20){
		toastr["info"]("任务名称超过了20个字");
	//	$('#title').scrollIntoView();//定位锚点
		var oInput = $("#rwmc");
		oInput.focus();
	}else if(goalYear == ""| goalYear < "1949" | goalYear > "2900"){ 
		toastr["info"]("请输入正确的清单年份");
	//	$('#title').scrollIntoView();//定位锚点
		var oInput = $("#qdnf");
		oInput.focus();
	}else if(rwjzrq == ""| rwjzrq.indexOf("-")== -1 | rwjzrq.split("-").length !=3 | rwjzrq.split("-")[0]<strYear | rwjzrq.split("-")[1]<strMonth){
		toastr["info"]("任务截止日期必须大于当前日期");
	//	$('#title').scrollIntoView();//定位锚点
		var oInput = $("#rwjzrq");
		oInput.focus();
	}else{
		rwjzrq = rwjzrq.replace(new RegExp("-",'gm'),'/');
		var datas = {
				version:version,
				createUserId:dataBase.Login_map.SOLE,
				goalYear:goalYear,
				id:pkid,
				name:name,
				endTime:rwjzrq,
				cityUserFilter:cityUserFilter,
//				hbUserFilter:HbUserFilter,
				enterpriceUserFilter:enterpriceUserFilter}
		datas = JSON.stringify(datas);
		if(parseInt($("#totle_foot").html()) == 0 && sj_mapping.length == 0){
			toastr["info"]("未选择任何企业和市级填报部门");
		}else{
			$.ajax({
				  url: BackstageIP+'taskDataFill/update',
	                type: 'post',
	                contentType:"application/json",
	                type: "POST",
	        		async:false,
	        		dataType: "json",
	                data:datas,
	                success :function(data) {
	                	if(data != undefined&&data!=null&&data!=""){
	        				if(data.status == "success"){
	        					parent.clickRefresh();
	        					parent.toastr["success"]("修改成功");
	        				}else{
	        					toastr["info"]("错误信息",data.error);
	        				}
	        			}else{
	        				toastr["info"]("错误信息", "未连接"+BackstageIP);
	        			}
	                },
	                error : function (data) {
	                	
	                }
			})
		}
	}
}

//点击部门，进行全选，全不选操作
function djbm(chname,qy_sj,i){
	var data = $("input:checkbox[name='"+chname+"']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(data == ""){
		//清空行业
		for(var y=0; y<eval(qy_sj+"_data")[i].value.length; y++){
			$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_add_class"+i+"'][value='"+eval(qy_sj+"_data")[i].value[y].id+"']").removeAttr("checked")
			$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_add_class"+i+"'][value='"+eval(qy_sj+"_data")[i].value[y].id+"']").parent(".icheckbox_square-green").removeAttr("checked");
		}
		$("#"+qy_sj+"_code"+i).html("");
		uptotlefoot();//更新企业下面的总数
	}else{
		var num = 0;//计算有多少企业的总数
		var len = 0;//是否全部选择的变量
		var htm = "";//全部选择或者部分选择的变量
		for(var y=0; y<eval(qy_sj+"_data")[i].value.length; y++){
			if(typeof($("#"+qy_sj+"_tbody input[name='"+qy_sj+"_add_class"+i+"'][value='"+eval(qy_sj+"_data")[i].value[y].id+"']").attr("disabled"))=="undefined"){
				len += 1;
				$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_add_class"+i+"'][value='"+eval(qy_sj+"_data")[i].value[y].id+"']").prop("checked","true");
				$("#"+qy_sj+"_tbody input[name='"+qy_sj+"_add_class"+i+"'][value='"+eval(qy_sj+"_data")[i].value[y].id+"']").parent(".icheckbox_square-green").addClass("checked");
				if(qy_sj == "qy"){
					num += parseInt(qy_had[eval(qy_sj+"_data")[i].value[y].id]);
				}
			}
		}
		if(len == eval(qy_sj+"_data")[i].value.length){
			htm = "全部选择";
		}else{
			htm = "部分选择";
		}
		if(qy_sj == "qy"){
			$("#"+qy_sj+"_code"+i).html("("+htm+",共"+num.toString()+"个企业)");
			uptotlefoot();//更新企业下面的总数
		}else{
			$("#"+qy_sj+"_code"+i).html("("+htm+")");
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

//切换企业用户的企业状态
function updataqytable(){
//	alert()
	for(var i=0; i<qy_data.length; i++){
		for(var y=0; y<qy_data[i].value.length; y++){//循环bmhy.js其中一项的value
			//部门
			$("#qy_tbody input[name='qy_checkbox"+i+"'][value='"+qy_data[i].name+"']").prop("disabled",true);
			$("#qy_tbody input[name='qy_checkbox"+i+"'][value='"+qy_data[i].name+"']").removeAttr("checked");
			$("#qy_tbody input[name='qy_checkbox"+i+"'][value='"+qy_data[i].name+"']").parent(".icheckbox_square-green").removeAttr("checked");
			//行业
			$("#qy_tbody input[name='qy_add_class"+i+"'][value='"+qy_data[i].value[y].id+"']").prop("disabled",true);
			$("#qy_tbody input[name='qy_add_class"+i+"'][value='"+qy_data[i].value[y].id+"']").removeAttr("checked");
			$("#qy_tbody input[name='qy_add_class"+i+"'][value='"+qy_data[i].value[y].id+"']").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}
	qy_table();
	if ( $('input[name="qiyezhuangtai"]').filter(':checked').val() == closeStatus ) {
		taskMessage();
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
//汉字，数字，字母，下划线
function testmc(value){
	var zh = /^[\u0391-\uFFE5\w]+$/;
	return zh.test(value);
}
