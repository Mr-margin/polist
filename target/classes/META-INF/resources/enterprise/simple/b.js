var taskId = "";
var version = "1.0";
var edit_state_url = BackstageIP+"dto/insert.do";//默认执行新建地址
var stype = "";//编辑还是保存

//$.fn.editableform.buttons = 
//	  '<button type="submit" class="btn btn-success editable-submit btn-mini"><i class="icon-ok icon-white"></i></button>' +
//	 '<button type="button" class="btn editable-cancel btn-mini"><i class="icon-remove"></i></button>';   

var map = new BMap.Map("map",{
	mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]
});
var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
map.addControl(new BMap.NavigationControl(opts));

$(function (){
	if(typeof window.sessionStorage.getItem("taskId") != "undefined"){
		taskId = window.sessionStorage.getItem("taskId");
		stype = window.sessionStorage.getItem("type");
		if ( stype == "look" ) {
			$("#edit").hide();
		} else {
			$("#edit").show();
		}
	}else{
		//没有获取到任务ID，所有按钮关闭
		$("#edit").hide();
		$("#save").hide();
		$("#close").hide();
	}
	
	$("#out_login").click(function(){
		var data = ajax_async_t("../../login_out.do",{},"json");
		if(data=="1"){
			window.location.href="../../index.html"
		} else {
			
		}
	});
	
	$("#update_password").click(function(){
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		$( "#dialog-update").dialog("open");
	});
	//修改密码
	$( "#dialog-update").dialog({
		autoOpen: false,
		width: 500,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "400",
		buttons: [{
			text: "确定",
			click: function() {
				var str = $("#new_pass").val();
				var str1 = $("#new_pass_2").val();
				var old_pass = $("#old_pass").val();
				if(old_pass == "" || old_pass == null || old_pass == undefined ) {
					$("#jiaoyan_1").html("不能为空");
				}else if(str == "" || str == null || str == undefined ) {
					$("#jiaoyan_2").html("新密码不能为空");
				} else if(str1 == "" || str1 == null || str1 == undefined ) {
					$("#jiaoyan_3").html("不能为空");
				} else if( str != str1){
					$("#jiaoyan_3").html("新密码不相同");
				}else{
					xiugaimima_anniu(old_pass,str);
				}
			}
		},{
			text: "取消",
			click: function() {
				$( this ).dialog( "close" );
			}
		}]
	});
	$( "#dialog-xmsb").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-tiaozhuan").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-dengdai").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	   // 创建Map实例
	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));  //添加地图类型控件
	map.disableScrollWheelZoom();
	map.disableDragging();
	
	$("#lon1").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lon2").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lon3").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat1").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat2").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat3").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	//初始化编辑控件
	$.each(columns, function(i, column) {
		column.emptytext = emptytext;
		$("#"+column.field).editable(column);
	});
	
	
	Load_enterprise();
	
	//编辑按钮事件
	$("#edit").click(function(){
		$("#edit").hide();
		$("#save").show();
		$("#close").show();
		$('.editable').editable('enable');
		$('#prov').editable('disable');
		$('#city').editable('disable');
		$("#add_sccp").show();
		$("#add_yjrj").show();
		$("#add_guolu").show();
		$("#add_lydc").show();
		
	});
	//保存按钮事件
	$("#save").click(function(){
		//首先校验数据，必填项通过后，可以执行保存方法
		var check_Result = Data_check();
//		console.log(check_Result);
		if(check_Result.length>0){
			//有错误，出提示框
			console.log(check_Result);
			var str_html = "<ul style='color:red'>";
			for(var i = 0;i<check_Result.length;i++){
				str_html += "<li>"+check_Result[i]+"</li>";
			}
			str_html += "</ul>";
			$("#dialog-xmsb-content").html(str_html);
			$("#dialog-xmsb").dialog("open");
		}else{
			//没有错误，执行保存
			Data_save();
		}
	});
	//取消按钮事件
	$("#close").click(function(){
		$("#edit").show();
		$("#save").hide();
		$("#close").hide();
		//页面初始化，加载企业信息
//		Load_enterprise();
		$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
	});
	
	//取消返回事件
	$("#close_Return").click(function(){
		window.location.href="../a.html";
	});
	
	//首页的跳转事件
	$("#sy").click(function(){
		if ( stype != "look" ) {
			if(edit_show()){
				window.location.href="../a.html";
			}else{
				//如果任务ID有内容，说明处于正常的编辑状态，不允许跳转
				if(taskId != ""){
					if( edit == false ) {
						window.location.href="../a.html";
					} else {
						$("#dialog-tiaozhuan-content").html("离开当前页面将无法保存您的信息，请保存或取消后继续操作。");
						$("#dialog-tiaozhuan").dialog("open");
					}
				}else{
					//任务ID为空说明页面不正常，可以跳转到其他页面
					window.location.href="../a.html";
				}
				
			}
		} else {
			window.location.href="../a.html";
		}
	});
	$("#add_sccp").click(function(){add_sccp()})
	$("#add_yjrj").click(function(){add_yjrj()})
	$("#add_guolu").click(function(){add_guolu()})
	$("#add_lydc").click(function(){add_lydc()})
	
//	document.getElementsByTagName("input")[1].onclick=function(){
//		alert(1);
//	}
//	document.getElementsByTagName("input")[1].click(function(){
//		alert(3)
//	})
//	$("#mouth").find("input[value]").eq("all").click(function(){
//		alert(333)
//	})
//	
});
function add_sccp(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"sccp"+index+"ver\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td><a id=\"aproducttotal\"></a></td>" +
			"<td><a id=\"productunit\"></a></td>" +
			"<td><a id=\"materialtype\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a id=\"materialunit\"></a></td></tr>";
	var kongzhi1 = "<tr id=\"sccp"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"aheatfueltotal\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"pfkheight\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_sccp_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_sccp_table1").append(kongzhi);
	$("#add_sccp_table2").append(kongzhi1);
	$.each(columns_sccp, function(i, column) {
		column.emptytext = emptytext;
		$("#sccp"+index+" #"+column.field).editable(column);
		$("#sccp"+index+"ver #"+column.field).editable(column);
	});
	return index;
}
function add_yjrj(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yjrj"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"asolventtypename\"></a></td>" +
			"<td><a id=\"asolventname\"></a></td>" +
			"<td><a id=\"solventstate\"></a></td>" +
			"<td><a id=\"asolventtotal\"></a></td>" +
			"<td><a id=\"etaVOCname\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_sccp_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yjrj_table").append(kongzhi);
	$.each(columns_yjrj, function(i, column) {
		column.emptytext = emptytext;
		$("#yjrj"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_guolu(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"guolu"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"capacity\"></a></td>" +
			"<td><a id=\"startdate\"></a></td>" +
			"<td><a id=\"enddate\"></a></td>" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"aheatfueltotal\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"pfkheight\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_sccp_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_guolu_table").append(kongzhi);
	$.each(columns_guolu, function(i, column) {
		column.emptytext = emptytext;
		$("#"+column.field).editable(column);
		$("#guolu"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_lydc(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"lydc"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"dctype\"></a></td>" +
			"<td><a id=\"dcmat\"></a></td>" +
			"<td><a id=\"dcheight\"></a></td>" +
			"<td><a id=\"dcaera\"></a></td>" +
			"<td><a id=\"dcamount\"></a></td>" +
			"<td><a id=\"dcmeantrans\"></a></td>" +
			"<td><a id=\"dctransamount\"></a></td>" +
			"<td><a id=\"dustcontrol\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_sccp_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_lydc_table").append(kongzhi);
	$.each(columns_ltdc, function(i, column) {
		column.emptytext = emptytext;
		$("#lydc"+index+" #"+column.field).editable(column);
	});
	return index;
}

//通用的设备删除行
function moduan_delete(obj, table){
	if ( stype == "update" ) {
		if($('#edit').css('display') == "none"){
			if ( table == "add_sccp_table" ) {
				$(obj).parent().parent().parent().remove();
				var ss = $(obj).parent().parent().parent();
				$("#"+$(obj).parent().parent().parent()[0].id+"ver").remove();
			} else {
				$(obj).parent().parent().parent().remove();
			}
		} 
	}
}
//判断编辑按钮的样式，决定是否可以执行操作
function edit_show(){
	if($('#edit').is(':visible')){
		return true;
	}else{
		return false;
	}
}
var edit = true;
//页面初始化，加载企业信息
function Load_enterprise(){
	console.log({taskId:taskId,userId:userId,version:version});
	var data = ajax_async_t(BackstageIP+"dto/selectSimpAndComm.do",{taskId:taskId,userId:userId,version:version,dataType:1},"json ","true");
	if( data != null && data !=undefined && data!=null) {
		if( data.status == "success"){
			if (data.data.表simp00_企业基本信息表[0] !="" && data.data.表simp00_企业基本信息表[0] != null && data.data.表simp00_企业基本信息表[0] != undefined){
				$.each(data.data.表simp00_企业基本信息表[0],function(i,g){//表simp00_企业基本信息表
					if(i == "openmonths" ){
						var a = data.data.表simp00_企业基本信息表[0].openmonths.replace(/\s+/g,"");
						var s = a.substring(1, data.data.表simp00_企业基本信息表[0].openmonths.length);
						var ss = s.substring(0,s.length-1);
						var str = ss.split(",");
						$("#openmonths").editable("setValue",str);
					} else {
						$("#"+i).editable("setValue",data.data.表simp00_企业基本信息表[0][i]);
					}
				});
			}
			if ( data.data.表simp01_产品生产信息表 != "" && data.data.表simp01_产品生产信息表 != null && data.data.表simp01_产品生产信息表 != undefined){
				if(data.data.表simp01_产品生产信息表.length > 0 ) {//生产产品信息
					for ( var j = 0 ; j < data.data.表simp01_产品生产信息表.length; j ++ ) {
						var index = add_sccp();
						$.each(data.data.表simp01_产品生产信息表[j],function(i,g) {
							$("#sccp"+index+" #"+i).editable("setValue",g);
							$("#sccp"+index+"ver #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表simp02_锅炉信息表 != "" && data.data.表simp02_锅炉信息表 != null && data.data.表simp02_锅炉信息表 != undefined){
				if(data.data.表simp02_锅炉信息表.length > 0 ) {//锅炉信息
					for ( var j = 0 ; j < data.data.表simp02_锅炉信息表.length; j ++ ) {
						var index = add_guolu();
						$.each(data.data.表simp02_锅炉信息表[j],function(i,g) {
							$("#guolu"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			
			if ( data.data.表simp03_露天堆场信息表 != "" && data.data.表simp03_露天堆场信息表 != null && data.data.表simp03_露天堆场信息表 != undefined){
				if(data.data.表simp03_露天堆场信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表simp03_露天堆场信息表.length; j ++ ) {
						var index = add_lydc();
						$.each(data.data.表simp03_露天堆场信息表[j],function(i,g) {
							$("#lydc"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if( data.data.表simp04_溶剂使用信息表 != "" && data.data.表simp04_溶剂使用信息表 != undefined && data.data.表simp04_溶剂使用信息表!=null) {
				if(data.data.表simp04_溶剂使用信息表.length > 0 ) {//露天堆场信息
					for ( var j = 0 ; j < data.data.表simp04_溶剂使用信息表.length; j ++ ) {
						var index = add_yjrj();
						$.each(data.data.表simp04_溶剂使用信息表[j],function(i,g) {
							$("#yjrj"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
//			if ( data.data.edit == false ) {
//				$("#edit").hide();
//				edit = false;
//			} else {
//				$("#edit").show();
//				edit = true;
//			}
			$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
			edit_state_url = BackstageIP+"dto/updateSimpAndComm.do";//如果已经有值，执行保存地址
			get_lon_lat();//获取经纬度坐标并进行定位
			window.sessionStorage.setItem("industrytype",data.industrytype);
		} else {
			//没有数据，编辑状态打开
			$("#edit").hide();
			$("#save").show();
			$("#close_Return").show();
			$('.editable').editable('enable');
			$("#add_sccp").show();
			$("#add_yjrj").show();
			$("#add_guolu").show();
			$("#add_lydc").show();
		}
	}else{
		//没有数据，编辑状态打开
		$("#edit").hide();
		$("#save").show();
		$("#close_Return").show();
		$('.editable').editable('enable');
		$("#add_sccp").show();
		$("#add_yjrj").show();
		$("#add_guolu").show();
		$("#add_lydc").show();
	}
}

//数据校验
function Data_check(){
	var check_Result = [];
	
	if($("#companyname").editable("getValue").companyname === "") check_Result.push("企业名称");
	if($("#companaynumber").editable("getValue").companaynumber === "") check_Result.push("组织机构代码");
	if($("#industrytype").editable("getValue").industrytype === "") check_Result.push("行业类别");
	
	if(typeof $("#intermitornot").editable("getValue").intermitornot === "undefined") check_Result.push("连续／间歇生产");
	if(typeof $("#openmonths").editable("getValue").openmonths === "undefined") check_Result.push("生产月份");
	
	if($("#legalentitylx").editable("getValue").legalentitylx === "") check_Result.push("企业联系人");
	if($("#interviewperson").editable("getValue").interviewperson === "") check_Result.push("调查员");
	if($("#informant").editable("getValue").informant === "") check_Result.push("填报人");
	
	if($("#legaltel").editable("getValue").legaltel === "") check_Result.push("联系电话");
	if($("#interviewtel").editable("getValue").interviewtel === "") check_Result.push("调查员手机号");
	if($("#tel").editable("getValue").tel === "") check_Result.push("填表人手机号");
	
	if($("#county").editable("getValue").county === ""){
		check_Result.push("企业所在省、市、县");
	}
	
	if($("#lon1").editable("getValue").lon1 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lon2").editable("getValue").lon2 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lon3").editable("getValue").lon3 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat1").editable("getValue").lat1 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat2").editable("getValue").lat2 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat3").editable("getValue").lat3 === ""){
		check_Result.push("企业经维度坐标");
	}
	$("#shebei").find(".editable").each(function(el,n){
		var obj = $(n);
		if(obj.is(':visible')){
			var html_id = obj.attr("id");//页面上每个编辑框的ID
			var html_value = obj.editable("getValue")[html_id];//获取到页面的实际的值
			if(html_id == "equipId"){
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("编号");
				}
			} else if ( html_id == "equiptype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("生产工段名称");
				}
			}else if ( html_id == "aproducttype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("产品名称");
				}
			}else if ( html_id == "aproducttotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年产量");
				}
			}else if ( html_id == "productunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "materialtype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("原料名称");
				}
			}else if ( html_id == "amaterialtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "materialunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "fueltype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料名称");
				}
			}else if ( html_id == "aheatfueltotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "etaSO2name" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("脱硫工艺");
				}
			}else if ( html_id == "etaPMname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("除尘工艺");
				}
			}else if ( html_id == "pfkheight" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("排放口高度");
				}
			}else if ( html_id == "asolventtypename" ) {//有机溶剂使用信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂类型");
				}
			}else if ( html_id == "asolventname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂名称");
				}
			}else if ( html_id == "solventstate" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂性质");
				}
			}else if ( html_id == "asolventtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年使用量");
				}
			}else if ( html_id == "etaVOCname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("VOC治理技术");
				}
			}else if ( html_id == "equipId" ) {//锅炉信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("编号");
				}
			}
			else if ( html_id == "fueltype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料名称");
				}
			}else if ( html_id == "aheatfueltotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "etaSO2name" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("脱硫工艺");
				}
			}else if ( html_id == "etaPMname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("除尘工艺");
				}
			}else if ( html_id == "排放口高度" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("pfkheight");
				}
			}else if ( html_id == "equipId" ) {//露天堆场信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("编号");
				}
			}else if ( html_id == "dctype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("料堆类型");
				}
			}else if ( html_id == "dcmat" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("料堆材料");
				}
			}else if ( html_id == "dcheight" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("料堆高度");
				}
			}else if ( html_id == "dcaera" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("占地面积");
				}
			}else if ( html_id == "dcamount" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("日常存储量");
				}
			}else if ( html_id == "dcmeantrans" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单车运载量");
				}
			}else if ( html_id == "dctransamount" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年物料运载车次");
				}
			}else if ( html_id == "dustcontrol" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("扬尘控制措施");
				}
			}
		}
	});
	return check_Result;
}

//获取经纬度坐标并进行定位
function get_lon_lat(){
	var lon1 = $("#lon1").html();
	var lon2 = $("#lon2").html();
	var lon3 = $("#lon3").html();
	var lat1 = $("#lat1").html();
	var lat2 = $("#lat2").html();
	var lat3 = $("#lat3").html();
	
	if(lon1!=""&& lon1!="请填写" && lon2!="" && lon2!="请填写" && lon3!=""&& lon3!="请填写" &&  lat1!=""&& lat1!="请填写" && lat2!="" && lat2!="请填写" && lat3!="" && lat3!="请填写"){
		var lon = parseInt(lon1)+(parseInt(lon2)/60)+(parseInt(lon3)/3600);
		var lat = parseInt(lat1)+(parseInt(lat2)/60)+(parseInt(lat3)/3600);
		var point = new BMap.Point(lon, lat);
		map.centerAndZoom(point, 13);
		
		var marker = new BMap.Marker(point);  // 创建标注
		map.clearOverlays(); //清除覆盖物
		map.addOverlay(marker);               // 将标注添加到地图中
	}
}

//数据保存
function Data_save(){
	window.sessionStorage.setItem("industrytype",industrytype);
	$("#dialog-dengdai-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-dengdai").dialog("open");
	var jsonobj = {};
	jsonobj.userId = userId;
	jsonobj.taskId = taskId;
	jsonobj.version = version;
	jsonobj.isCompany = true;
	jsonobj.dataType = 1;
	jsonobj.value = {};
	//用户填写的行业
	var industrytype = $("#industrytype").editable("getValue").industrytype;
	
	var jiben_jihe = {"prov":$("#prov").html(),"city":$("#city").html()};
	var sccp = [];//生产产品信息
	var yjrj = [];//有机溶剂使用信息
	var guolu = [];//锅炉信息
	var ltdc = [];//露天堆场信息
	
	$("#qiye .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
		if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
	});
	
	$("#add_sccp_table1 tr").each(function(){//生产产品信息 
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			sccp.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_sccp_table2 tr").each(function(){//生产产品信息 
		if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){
			sccp.push($(this).find(".editable").editable("getValue"));
		}
	});
	
	$("#add_yjrj_table tr").each(function(){//锅炉信息
		if(typeof $(this).find("#asolventtypename").editable("getValue").asolventtypename != "undefined"){
			yjrj.push($(this).find(".editable").editable("getValue"));
		}
	});
	
	$("#add_guolu_table tr").each(function(){//锅炉信息
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			guolu.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_lydc_table tr").each(function(){//露天堆场信息
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			ltdc.push($(this).find(".editable").editable("getValue"));
		}
	});
	if(!$.isEmptyObject(jiben_jihe)) jsonobj.value["表simp00_企业基本信息表"] = [jiben_jihe];
	if(!$.isEmptyObject(sccp)) jsonobj.value["表simp01_产品生产信息表"] = sccp;
	if(!$.isEmptyObject(yjrj)) jsonobj.value["表simp04_溶剂使用信息表"] = yjrj;
	if(!$.isEmptyObject(guolu)) jsonobj.value["表simp02_锅炉信息表"] = guolu;
	if(!$.isEmptyObject(ltdc)) jsonobj.value["表simp03_露天堆场信息表"] = ltdc;
	if ( jsonobj.value.表simp01_产品生产信息表 != "" && jsonobj.value.表simp01_产品生产信息表 != null && jsonobj.value.表simp01_产品生产信息表 != undefined ){
		if( jsonobj.value.表simp01_产品生产信息表.length > 0 ) {
			var str = [];
			var ss = jsonobj.value.表simp01_产品生产信息表;
			var lengths = ss.length;
			for ( var i = 0 ;  i < lengths/2; i ++ ) {
				var a = ss[i];
				var b = ss[i+lengths/2];
				var obj = Object.assign(a, b);
				str.push(obj);
			}
			jsonobj.value.表simp01_产品生产信息表=str;
		}
	}
	console.log(JSON.stringify(jsonobj));
	window.setTimeout(function(){
		var data = ajax_async_t(edit_state_url,{data:JSON.stringify(jsonobj)},"json","");
		if(data.status == "success") {
			window.sessionStorage.setItem("industrytype",industrytype);
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-dengdai").dialog("close");

			//保存成功
			$("#edit").show();
			$("#save").hide();
			$("#close").hide();
			$("#close_Return").hide();
			$('.editable').editable('disable');
			
			$("#add_sccp").hide();
			$("#add_yjrj").hide();
			$("#add_guolu").hide();
			$("#add_lydc").hide();
			return true;
		}else if ( data.status == "fail" ){
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>保存失败！</b><br>错误代码："+JSON.stringify(data.code)+"</span>");
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-dengdai").dialog("close");
			return false;
		}
	},0)
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}
//修改密码
function xiugaimima_anniu() {
	var old_pass = $("#old_pass").val();
	if(old_pass == "" || old_pass == null || old_pass == undefined ) {
		toastr["info"]("提示","原密码不能为空");
		return;
	}
	var str = $("#new_pass").val();
	var str1 = $("#new_pass_2").val();
	if(str == "" || str == null || str == undefined ) {
		toastr["info"]("提示","新密码不能为空");
		return;
	}
	if(str1 == "" || str1 == null || str1 == undefined ) {
		toastr["info"]("提示","确认密码不能为空");
		return;
	}
	if( str != str1){
		toastr["info"]("提示","两次新密码不相同");
		return;
	} 
	if(str.length<6){
		toastr["info"]("提示","新密码长度不能小于6");
		return;
	}
	var user_id = dataBase.Login_map.ID
	var data = ajax_async_t("../../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		toastr["success"]("提示","修改成功");
		$( "#dialog-update").dialog("close")
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		
	} else if ( data == "2" ) {
		toastr["info"]("提示","修改失败");
	} else if ( data == "3" ) {
		toastr["info"]("提示","原密码错误");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
}

//修改密码
function xiugaimima_anniu(old_pass,str){
	var data = ajax_async_t("../../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		$( "#dialog-update").dialog("close")
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>修改成功！</b></span>");
	} else if ( data == "2" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>修改失败！</b></span>");
	} else if ( data == "3" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>原密码错误！</b></span>");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
}

/**
 * 生成随机数
 * @param Min
 * @param Max
 * @returns
 */
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}  